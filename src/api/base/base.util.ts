import { ApiError } from "./base.error";

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}
