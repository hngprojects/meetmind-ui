import "server-only";
import {
  ApiError,
  isApiErrorType,
  isFastApiError,
} from "@/api/base/base.error";
import { ApiResponse, AnyApiError } from "@/api/base/base.type";
import { ApiVersion } from "@/api/base/base.const";
import { env } from "@/env/server";
import { cookies } from "next/headers";

export async function callApiServer<TResData>({
  url,
  method = "GET",
  data,
  params,
  next,
}: {
  url: `/${string}`;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: unknown;
  params?: Record<string, unknown>;
  next?: NextFetchRequestConfig; // for revalidate/tags
}): Promise<TResData> {
  const fullUrl = new URL(`${env.API_BASE_URL}${ApiVersion.v1}${url}`);

  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined) fullUrl.searchParams.set(k, String(v));
    });
  }

  const store = await cookies();
  const cookieHeader = store
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(fullUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { cookie: cookieHeader } : {}),
    },
    body: data ? JSON.stringify(data) : undefined,
    next,
  });

  const json = await res.json();

  if (!res.ok) {
    const error = json as AnyApiError;

    if (isApiErrorType(error) || isFastApiError(error)) {
      throw new ApiError(error, res.status);
    }

    // Fallback for unexpected error shapes
    throw new ApiError(
      {
        success: false,
        message: "An unexpected error occurred",
        error: { code: "unknown", details: null },
      },
      res.status,
    );
  }

  // Some endpoints return wrapped { success, data }, others return raw
  if ("data" in json && "success" in json) {
    return (json as ApiResponse<TResData>).data;
  }

  return json as TResData;
}
