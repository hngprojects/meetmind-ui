import axios from "axios";

export class ApiError extends Error {
  status?: number;
  detail?: unknown;

  constructor(message: string, status?: number, detail?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.detail = detail;
  }
}

export function handleApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;
    const detail = responseData?.detail || responseData?.error?.details;
    const message =
      (Array.isArray(detail) ? detail[0]?.msg : undefined) ||
      (typeof detail === "string" ? detail : undefined) ||
      responseData?.message ||
      error.message ||
      "An API error occurred";
    return new ApiError(message, error.response?.status, detail);
  }
  if (error instanceof Error) {
    return new ApiError(error.message);
  }
  return new ApiError("An unexpected error occurred");
}
