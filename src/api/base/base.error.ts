import { AnyApiError, ApiErrorType, FastApiError } from "@/api/base/base.type";

// Type guards to distinguish error shapes at runtime
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

export function isFastApiError(error: unknown): error is FastApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "detail" in error &&
    Array.isArray((error as FastApiError).detail)
  );
}

// Unified error class
export class ApiError extends Error {
  public status?: number;
  public code?: string;
  public details: unknown | null;
  public raw: AnyApiError;

  constructor(raw: AnyApiError, status?: number) {
    // Normalize message regardless of which error shape came back
    const message = isApiErrorType(raw)
      ? raw.message
      : raw.detail.map((d) => d.msg).join(", ");

    super(message);
    this.name = "ApiError";
    this.status = status;
    this.raw = raw;

    if (isApiErrorType(raw)) {
      this.code = raw.error.code;
      this.details = raw.error.details;
    } else {
      this.code = "validation_error";
      this.details = raw.detail;
    }
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}
