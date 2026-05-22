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
  type: string;
  loc: (string | number)[];
  msg: string;
  input?: string;
  ctx?: Record<string, unknown>;
};

export type ApiErrorType = {
  success: false;
  message: string;
  error: {
    code: string;
    details: ApiErrorDetail[] | null;
  };
};

export type ApiOptions = {
  signal?: AbortSignal;
  token?: string;
};
