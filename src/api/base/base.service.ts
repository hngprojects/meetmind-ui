import { ApiError, isApiErrorType, buildApiError } from "@/api/base/base.error";
import { ApiResponse, ApiErrorType } from "@/api/base/base.type";
import { ApiVersion, ApiErrorCode } from "@/api/base/base.const";
import { clientEnv } from "@/env/client";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: `${clientEnv.NEXT_PUBLIC_API_URL}${ApiVersion.v1}`,
  timeout: 60 * 1000,
  withCredentials: true,
});

export async function callApi<TResData>({
  url,
  method = "GET",
  data,
  params,
  headers,
  signal,
}: {
  url: `/${string}`;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: unknown;
  params?: Record<string, unknown>;
  headers?: AxiosRequestConfig["headers"];
  signal?: AbortSignal;
}): Promise<TResData> {
  try {
    const response = await api.request<ApiResponse<TResData>>({
      url,
      method,
      data,
      params,
      headers: {
        "Content-Type":
          data instanceof FormData ? "multipart/form-data" : "application/json",
        ...headers,
      },
      signal,
    });

    const json = response.data as unknown;

    if (
      typeof json === "object" &&
      json !== null &&
      "data" in json &&
      "success" in json
    ) {
      return (json as ApiResponse<TResData>).data;
    }

    return json as TResData;
  } catch (e) {
    if (e instanceof AxiosError) {
      const errorData = e.response?.data;
      const status = e.response?.status;

      if (isApiErrorType(errorData)) {
        throw new ApiError(errorData as ApiErrorType, status);
      }

      if (!e.response) {
        throw buildApiError(
          e.message ?? "Network error, please check your connection",
          ApiErrorCode.networkError,
        );
      }

      throw buildApiError(
        "An unexpected error occurred",
        ApiErrorCode.unknown,
        status,
      );
    }

    throw buildApiError(
      "Something went wrong while processing your request",
      ApiErrorCode.clientError,
    );
  }
}
