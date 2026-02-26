import connectToDatabase from "@/lib/mongodb";
import { apiResponse } from "@/lib/apiResponse";
import { Course, CourseStatus } from "@/models/Course";
import mongoose from "mongoose";

interface Params {
  params: Promise<{ id: string }>;
}

function isValidObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

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
export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return apiResponse({ message: "Invalid course ID", status: 400 });
    }

    await connectToDatabase();

    const course = await Course.findById(id);
    if (!course) {
      return apiResponse({ message: "Course not found", status: 404 });
    }

    return apiResponse({ data: course });
  } catch (error: any) {
    return apiResponse({
      message: error.message || "Internal server error",
      status: 500,
    });
  }
}

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
export async function PUT(req: Request, { params }: Params) {
  try {
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return apiResponse({ message: "Invalid course ID", status: 400 });
    }

    const body = await req.json();
    const { title, description, image, price, status } = body;

    if (price !== undefined && (typeof price !== "number" || price < 0)) {
      return apiResponse({
        message: "Price must be a non-negative number",
        status: 400,
      });
    }

    if (
      status &&
      !Object.values(CourseStatus).includes(status as CourseStatus)
    ) {
      return apiResponse({
        message: `Invalid status. Must be one of: ${Object.values(CourseStatus).join(", ")}`,
        status: 400,
      });
    }

    await connectToDatabase();

    const updateData: Record<string, any> = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (image !== undefined) updateData.image = image;
    if (price !== undefined) updateData.price = price;
    if (status !== undefined) updateData.status = status;

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
  } catch (error: any) {
    return apiResponse({
      message: error.message || "Internal server error",
      status: 500,
    });
  }
}

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
export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return apiResponse({ message: "Invalid course ID", status: 400 });
    }

    await connectToDatabase();

    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return apiResponse({ message: "Course not found", status: 404 });
    }

    return apiResponse({ message: "Course deleted successfully" });
  } catch (error: any) {
    return apiResponse({
      message: error.message || "Internal server error",
      status: 500,
    });
  }
}
