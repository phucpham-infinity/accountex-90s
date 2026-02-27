import { NextRequest } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/lib/minio";
import { apiResponse } from "@/lib/apiResponse";
import { withAuth } from "@/lib/withAuth";

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload an image to MinIO (S3)
 *     tags: [Upload]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Uploaded successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       example: "https://s3.ihomelap.io.vn/ai-voiceover/1234.jpg"
 *       400:
 *         description: Bad request (No file provided)
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
export const POST = withAuth(async (req: NextRequest, _: any, userId: string) => {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return apiResponse({
      message: "No file provided",
      status: 400,
    });
  }

  // Convert file to buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Generate unique filename
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const extension = file.name.split(".").pop();
  const fileName = `uploads/${uniqueSuffix}.${extension}`;

  const bucketName = process.env.S3_BUCKET_NAME || "ai-voiceover";

  // Upload to MinIO/S3
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: buffer,
    ContentType: file.type,
  });

  await s3Client.send(command);

  // Construct public URL
  const endpoint = process.env.S3_ENDPOINT || "";
  // If endpoint doesn't have protocol, default to https
  const formattedEndpoint = endpoint.startsWith("http")
    ? endpoint
    : `https://${endpoint}`;
    
  const url = `${formattedEndpoint}/${bucketName}/${fileName}`;

  return apiResponse({
    data: { url },
    message: "Uploaded successfully",
    status: 200,
  });
});
