import "server-only";
import { ApiError, isApiErrorType, buildApiError } from "@/api/base/base.error";
import { ApiResponse, ApiErrorType } from "@/api/base/base.type";
import { ApiVersion, ApiErrorCode } from "@/api/base/base.const";
import { cookies } from "next/headers";
import { serverEnv } from "@/env/server";

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
  next?: NextFetchRequestConfig;
}): Promise<TResData> {
  const fullUrl = new URL(`${serverEnv.API_BASE_URL}${ApiVersion.v1}${url}`);

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
    if (isApiErrorType(json)) {
      throw new ApiError(json as ApiErrorType, res.status);
    }
    throw buildApiError(
      "An unexpected error occurred",
      ApiErrorCode.unknown,
      res.status,
    );
  }

  if (
    typeof json === "object" &&
    json !== null &&
    "data" in json &&
    "success" in json
  ) {
    return (json as ApiResponse<TResData>).data;
  }

  return json as TResData;
}
