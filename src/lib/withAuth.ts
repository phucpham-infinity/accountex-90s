import { NextRequest } from "next/server";
import { apiResponse } from "./apiResponse";
import { jwtVerify } from "jose";

export function withAuth(
  handler: (req: NextRequest, props: any, userId: string) => Promise<Response>,
) {
  return async (req: NextRequest, props: any) => {
    try {
      let userId = req.headers.get("x-user-id");

      // Fallback if x-user-id is not injected (e.g. running locally without middleware proxy)
      if (!userId) {
        const authHeader = req.headers.get("authorization");
        if (authHeader && authHeader.startsWith("Bearer ")) {
          const token = authHeader.split(" ")[1];
          if (token) {
            try {
              const secret = new TextEncoder().encode(
                process.env.JWT_SECRET || "secret",
              );
              const { payload } = await jwtVerify(token, secret);
              userId = payload.userId as string;
            } catch (err) {
              console.error("Token verification failed in withAuth:", err);
            }
          }
        }
      }

      if (!userId) {
        return apiResponse({ message: "Unauthorized", status: 401 });
      }

      // We pass req, props (which contains params), and userId
      return await handler(req, props, userId);
    } catch (error: any) {
      console.error("API error:", error);
      return apiResponse({
        message: error.message || "Internal server error",
        status: 500,
      });
    }
  };
}
