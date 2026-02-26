import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { code: 401, message: "Unauthorized", data: null },
      { status: 401 },
    );
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return NextResponse.json(
      { code: 401, message: "Unauthorized", data: null },
      { status: 401 },
    );
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "secret");
    const { payload } = await jwtVerify(token, secret);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload.userId as string);
    // requestHeaders.set("x-username", payload.username as string);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { code: 401, message: "Invalid or expired token", data: null },
      { status: 401 },
    );
  }
}

// Config paths that require authentication middleware
export const config = {
  matcher: ["/api/auth/me", "/api/protected/:path*"],
};
