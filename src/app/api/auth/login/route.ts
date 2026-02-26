import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/User";
import { apiResponse } from "@/lib/apiResponse";

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
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
 *                     token:
 *                       type: string
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
 *         description: Missing username or password
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return apiResponse({
        message: "Missing username or password",
        status: 400,
      });
    }

    await connectToDatabase();

    const user = await User.findOne({ username });
    if (!user) {
      return apiResponse({ message: "Invalid credentials", status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return apiResponse({ message: "Invalid credentials", status: 401 });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" },
    );

    return apiResponse({
      data: {
        token,
        user: { id: user._id, username: user.username, email: user.email },
      },
      message: "Login successful",
      status: 200,
    });
  } catch (error: any) {
    return apiResponse({
      message: error.message || "Internal server error",
      status: 500,
    });
  }
}
