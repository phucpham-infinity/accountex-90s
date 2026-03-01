import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/User";
import { apiResponse } from "@/lib/apiResponse";

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               key:
 *                 type: string
 *                 description: Required to register new accounts. Matches REGISTER_KEY
 *     responses:
 *       201:
 *         description: User created successfully
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
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         username:
 *                           type: string
 *                         email:
 *                           type: string
 *       400:
 *         description: Missing required fields
 *       403:
 *         description: Invalid registration key
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
export async function POST(req: Request) {
  try {
    const { username, email, password, key } = await req.json();

    if (!username || !email || !password) {
      return apiResponse({ message: "Missing required fields", status: 400 });
    }

    if (!key || key !== process.env.REGISTER_KEY) {
      return apiResponse({ message: "Invalid registration key", status: 403 });
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return apiResponse({ message: "User already exists", status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Đẩy luồng email gửi thông báo welcome tới job
    try {
      const { agenda } = await import("@/lib/agenda");
      await agenda.now("send-welcome-email", { email: newUser.email, username: newUser.username });
    } catch (err) {
      console.error("Lỗi push job email welcome:", err);
    }

    return apiResponse({
      data: {
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      },
      message: "User created successfully",
      status: 201,
    });
  } catch (error: any) {
    return apiResponse({
      message: error.message || "Internal server error",
      status: 500,
    });
  }
}
