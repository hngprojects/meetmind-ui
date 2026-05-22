import { ApiErrorType } from "@/api/base/base.type";
import { ApiErrorCode } from "@/api/base/base.const";

export function isApiErrorType(error: unknown): error is ApiErrorType {
  return (
    typeof error === "object" &&
    error !== null &&
    "success" in error &&
    (error as ApiErrorType).success === false &&
    "message" in error &&
    "error" in error
  );
}

export class ApiError extends Error {
  public status?: number;
  public code: string;
  public details: ApiErrorType["error"]["details"];
  public raw: ApiErrorType;

  constructor(raw: ApiErrorType, status?: number) {
    super(raw.message);
    this.name = "ApiError";
    this.status = status;
    this.raw = raw;
    this.code = raw.error.code;
    this.details = raw.error.details;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function buildApiError(
  message: string,
  code: string = ApiErrorCode.unknown,
  status?: number,
): ApiError {
  return new ApiError(
    {
      success: false,
      message,
      error: { code, details: null },
    },
    status,
  );
}
