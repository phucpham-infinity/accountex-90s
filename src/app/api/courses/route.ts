import connectToDatabase from "@/lib/mongodb";
import { apiResponse } from "@/lib/apiResponse";
import { Course, CourseStatus } from "@/models/Course";

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [draft, published, archived]
 *         description: Filter by status
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by title or description (case-insensitive)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, updatedAt, title, price]
 *           default: createdAt
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of courses
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
 *                     courses:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Course'
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       500:
 *         description: Internal server error
 */
const ALLOWED_SORT_FIELDS = ["createdAt", "updatedAt", "title", "price"];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.max(1, parseInt(searchParams.get("limit") || "10"));
    const status = searchParams.get("status");
    const search = searchParams.get("search")?.trim();
    const sortBy = ALLOWED_SORT_FIELDS.includes(
      searchParams.get("sortBy") || "",
    )
      ? (searchParams.get("sortBy") as string)
      : "createdAt";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;

    const filter: Record<string, any> = {};
    if (
      status &&
      Object.values(CourseStatus).includes(status as CourseStatus)
    ) {
      filter.status = status;
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    await connectToDatabase();

    const skip = (page - 1) * limit;
    const [courses, total] = await Promise.all([
      Course.find(filter)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit),
      Course.countDocuments(filter),
    ]);

    return apiResponse({
      data: {
        courses,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
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
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - price
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
 *                 default: draft
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Course'
 *       400:
 *         description: Missing required fields or invalid price
 *       500:
 *         description: Internal server error
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, image, price, status } = body;

    if (!title || !description || price === undefined) {
      return apiResponse({
        message: "Missing required fields: title, description, price",
        status: 400,
      });
    }

    if (typeof price !== "number" || price < 0) {
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

    const course = await Course.create({
      title,
      description,
      image: image || "",
      price,
      status: status || CourseStatus.DRAFT,
    });

    return apiResponse({ data: course, message: "Created", status: 201 });
  } catch (error: any) {
    return apiResponse({
      message: error.message || "Internal server error",
      status: 500,
    });
  }
}
