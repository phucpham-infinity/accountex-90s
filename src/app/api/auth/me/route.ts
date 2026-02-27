import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/User";
import { apiResponse } from "@/lib/apiResponse";
import { withAuth } from "@/lib/withAuth";

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current logged in user
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
export const GET = withAuth(async (req: NextRequest, _: any, userId: string) => {
  await connectToDatabase();

  const user = await User.findById(userId).select("-password");
  if (!user) {
    return apiResponse({ message: "User not found", status: 404 });
  }

  return apiResponse({
    data: { id: user._id, username: user.username, email: user.email },
    status: 200,
  });
});
