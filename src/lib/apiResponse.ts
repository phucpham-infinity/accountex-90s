import { NextResponse } from "next/server";

type ApiResponse<T = any> = {
  code: number;
  message: string;
  data?: T;
};

// Default messages theo chuẩn RESTful HTTP status codes
const DEFAULT_MESSAGES: Record<number, string> = {
  // 2xx Success
  200: "OK",
  201: "Created",
  202: "Accepted",
  204: "No Content",

  // 3xx Redirection
  301: "Moved Permanently",
  302: "Found",
  304: "Not Modified",

  // 4xx Client Errors
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  422: "Unprocessable Entity",
  429: "Too Many Requests",

  // 5xx Server Errors
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
};

export function getDefaultMessage(code: number): string {
  return DEFAULT_MESSAGES[code] ?? "Unknown Status";
}

export function apiResponse<T>({
  data = null,
  message,
  status = 200,
}: {
  data?: T | null;
  message?: string;
  status?: number;
} = {}) {
  const resolvedMessage = message ?? getDefaultMessage(status);

  const response: ApiResponse<T> = {
    code: status,
    message: resolvedMessage,
    ...(data !== null && { data }),
  };

  return NextResponse.json(response, { status });
}
