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

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const detail = error.response?.data as { message?: string } | undefined;
    return detail?.message ?? error.message ?? "Something went wrong";
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong";
}
