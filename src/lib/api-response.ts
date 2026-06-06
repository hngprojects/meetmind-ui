import axios from "axios";

type ApiEnvelope<T> = {
  data: T;
  message?: string;
  success?: boolean;
};

export function unwrapData<T>(payload: unknown): T {
  if (
    payload &&
    typeof payload === "object" &&
    Object.prototype.hasOwnProperty.call(payload, "data")
  ) {
    return (payload as ApiEnvelope<T>).data;
  }
  return payload as T;
}

function parseApiErrorMessage(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) return value;
  if (Array.isArray(value) && value.length > 0) {
    return parseApiErrorMessage(value[0]);
  }
  if (typeof value === "object" && value !== null) {
    const record = value as Record<string, unknown>;
    return (
      parseApiErrorMessage(record.message) ||
      parseApiErrorMessage(record.error) ||
      parseApiErrorMessage(record.details) ||
      parseApiErrorMessage(record.detail) ||
      parseApiErrorMessage(record.msg)
    );
  }
  return undefined;
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const detail = error.response?.data;
    return (
      parseApiErrorMessage(detail) ?? error.message ?? "Something went wrong"
    );
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong";
}
