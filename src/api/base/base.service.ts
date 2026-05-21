import {
  ApiError,
  isApiErrorType,
  isFastApiError,
} from "@/api/base/base.error";
import { ApiResponse, AnyApiError } from "@/api/base/base.type";
import { ApiVersion } from "@/api/base/base.const";
import { env } from "@/env/client";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: `${env.NEXT_PUBLIC_API_URL}${ApiVersion.v1}`,
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

    // Some endpoints return wrapped { success, data }, others return raw
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
      const errorData = e.response?.data as AnyApiError | undefined;
      const status = e.response?.status;

      if (
        errorData &&
        (isApiErrorType(errorData) || isFastApiError(errorData))
      ) {
        throw new ApiError(errorData, status);
      }

      // Network error or no response (e.g. timeout, offline)
      if (!e.response) {
        throw new ApiError(
          {
            success: false,
            message: e.message ?? "Network error, please check your connection",
            error: { code: "network_error", details: null },
          },
          undefined,
        );
      }

      // Unexpected error shape from backend
      throw new ApiError(
        {
          success: false,
          message: "An unexpected error occurred",
          error: { code: "unknown", details: null },
        },
        status,
      );
    }

    // Non-axios error (e.g. bug in our own code)
    throw new ApiError({
      success: false,
      message: "Something went wrong while processing your request",
      error: { code: "client_error", details: null },
    });
  }
}
