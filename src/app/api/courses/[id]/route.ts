import connectToDatabase from "@/lib/mongodb";
import { apiResponse } from "@/lib/apiResponse";
import { Course, CourseStatus } from "@/models/Course";
import mongoose from "mongoose";
import { withAuth } from "@/lib/withAuth";
import { NextRequest } from "next/server";
import { z } from "zod";

interface Params {
  params: Promise<{ id: string }>;
}

// Zod schemas for validation
const paramsSchema = z.object({
  id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid course ID",
  }),
});

const updateCourseSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  price: z.number().min(0, "Price must be a non-negative number").optional(),
  status: z.enum([CourseStatus.DRAFT, CourseStatus.PUBLISHED, CourseStatus.ARCHIVED]).optional(),
});

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course detail
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
 *                   $ref: '#/components/schemas/Course'
 *       400:
 *         description: Invalid course ID
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */
export const GET = withAuth(async (_req: NextRequest, { params }: Params, userId: string) => {
  const awaitedParams = await params;
  const parsedParams = paramsSchema.safeParse(awaitedParams);

  if (!parsedParams.success) {
    return apiResponse({ message: parsedParams.error.issues[0].message, status: 400 });
  }

  const { id } = parsedParams.data;

  await connectToDatabase();

  const course = await Course.findById(id);
  if (!course) {
    return apiResponse({ message: "Course not found", status: 404 });
  }

  return apiResponse({ data: course });
});

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update a course by ID
 *     tags: [Courses]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *               price:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [draft, published, archived]
 *     responses:
 *       200:
 *         description: Course updated successfully
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
 *                   $ref: '#/components/schemas/Course'
 *       400:
 *         description: Invalid course ID or invalid fields
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */
export const PUT = withAuth(async (req: NextRequest, { params }: Params, userId: string) => {
  const awaitedParams = await params;
  const parsedParams = paramsSchema.safeParse(awaitedParams);

  if (!parsedParams.success) {
    return apiResponse({ message: parsedParams.error.issues[0].message, status: 400 });
  }

  const { id } = parsedParams.data;

  const body = await req.json();
  const parsedBody = updateCourseSchema.safeParse(body);

  if (!parsedBody.success) {
    return apiResponse({
      message: parsedBody.error.issues[0].message,
      status: 400,
    });
  }

  const updateData = parsedBody.data;

  await connectToDatabase();

  const course = await Course.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!course) {
    return apiResponse({ message: "Course not found", status: 404 });
  }

  return apiResponse({
    data: course,
    message: "Course updated successfully",
  });
});

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Courses]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       400:
 *         description: Invalid course ID
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */
export const DELETE = withAuth(async (_req: NextRequest, { params }: Params, userId: string) => {
  const awaitedParams = await params;
  const parsedParams = paramsSchema.safeParse(awaitedParams);

  if (!parsedParams.success) {
    return apiResponse({ message: parsedParams.error.issues[0].message, status: 400 });
  }

  const { id } = parsedParams.data;

  await connectToDatabase();

  const course = await Course.findByIdAndDelete(id);
  if (!course) {
    return apiResponse({ message: "Course not found", status: 404 });
  }

  return apiResponse({ message: "Course deleted successfully" });
});
