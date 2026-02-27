import { NextRequest } from "next/server";
import { apiResponse } from "./apiResponse";

export function withAuth(
  handler: (req: NextRequest, props: any, userId: string) => Promise<Response>
) {
  return async (req: NextRequest, props: any) => {
    try {
      const userId = req.headers.get("x-user-id");

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
