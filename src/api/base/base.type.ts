export type ApiResponse<TData> = {
  success: boolean;
  message?: string;
  data: TData;
};

export type PaginatedApiResponse<TData> = {
  success: boolean;
  message?: string;
  data: TData;
  meta: Record<string, unknown>;
};

export type ApiErrorDetail = {
  code: string;
  details: unknown | null;
};

export type ApiErrorType = {
  success: false;
  message: string;
  error: ApiErrorDetail;
};

export type FastApiErrorDetail = {
  loc: (string | number)[];
  msg: string;
  type: string;
  input?: string;
  ctx?: Record<string, unknown>;
};

export type FastApiError = {
  detail: FastApiErrorDetail[];
};

export type AnyApiError = ApiErrorType | FastApiError;

export type ApiOptions = {
  signal?: AbortSignal;
  token?: string;
};
