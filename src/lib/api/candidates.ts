import api from "@/lib/api";
import {
  Candidate,
  CandidatesResponse,
  CandidateQueryParams,
  CandidateStatus,
} from "../types/candidates";

const VALID_SORT_BY = ["date", "score", "name"];
const SORT_BY_MAP: Record<string, string> = {
  date: "created_at",
  name: "full_name",
  score: "score",
};
const VALID_SORT_DIRECTION = ["asc", "desc"];
const VALID_STATUSES: CandidateStatus[] = [
  "ongoing",
  "completed",
  "needs_review",
];

type RawCandidate = Record<string, unknown>;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const getStringValue = (value: unknown): string =>
  typeof value === "string" ? value : "";

const getNullableStringValue = (value: unknown): string | null =>
  typeof value === "string" ? value : null;

const getNumberValue = (value: unknown, fallback = 0): number =>
  typeof value === "number" ? value : Number(value) || fallback;

const getRecordValue = (value: unknown): Record<string, unknown> | undefined =>
  isRecord(value) ? value : undefined;

const getNumericField = (obj: unknown, key: string): number =>
  getNumberValue(getRecordValue(obj)?.[key], 0);

const normalizeStatus = (status: unknown): CandidateStatus => {
  const normalized = String(status ?? "")
    .trim()
    .toLowerCase()
    .replace(/-/g, "_");

  return VALID_STATUSES.includes(normalized as CandidateStatus)
    ? (normalized as CandidateStatus)
    : "ongoing";
};

const normalizeCandidate = (raw: RawCandidate): Candidate => {
  const action = getStringValue(raw.action);

  return {
    id: getStringValue(raw.id),
    name: getStringValue(raw.full_name ?? raw.name),
    email: getStringValue(raw.email),
    role: getStringValue(raw.role),
    status: normalizeStatus(raw.status),
    action: action === "recommended" || action === "maybe" ? action : "none",
    score: getNumberValue(raw.score, 0),
    createdAt: getStringValue(raw.created_at ?? raw.createdAt),
    avatarUrl: getNullableStringValue(raw.avatar_url ?? raw.avatarUrl),
    notes: getNullableStringValue(raw.notes),
  };
};

const normalizeCandidatesResponse = (response: unknown): CandidatesResponse => {
  console.log("[normalizeCandidatesResponse] response", response);

  const rawResponse = isRecord(response) ? response : {};
  const rawData = rawResponse.data ?? response;

  const dataItems = Array.isArray(rawData)
    ? rawData
    : isRecord(rawData) && Array.isArray(rawData.data)
      ? rawData.data
      : [];

  const paginationSource =
    getRecordValue(rawResponse.pagination) ??
    getRecordValue(rawResponse.meta)?.pagination ??
    getRecordValue(rawData)?.pagination ??
    undefined;

  const normalizedData = dataItems.filter(isRecord).map(normalizeCandidate);

  const totalFromPagination =
    getNumericField(paginationSource, "total") ||
    getNumericField(paginationSource, "total_count");

  const rawMeta = getRecordValue(rawResponse.meta);
  const statsFromResponse =
    getRecordValue(rawResponse.stats) ??
    getRecordValue(rawData)?.stats ??
    getRecordValue(rawMeta?.stats) ??
    getRecordValue(getRecordValue(rawData)?.meta)?.stats;

  const metaPagination = getRecordValue(rawMeta?.pagination);
  const metaPaginationTotal =
    getNumericField(metaPagination, "total") ||
    getNumericField(metaPagination, "total_count");

  return {
    data: normalizedData,
    pagination: {
      page: getNumericField(paginationSource, "page") || 1,
      pageSize:
        getNumericField(paginationSource, "page_size") ||
        getNumericField(paginationSource, "pageSize") ||
        20,
      total: totalFromPagination,
      totalPages:
        getNumericField(paginationSource, "total_pages") ||
        getNumericField(paginationSource, "totalPages") ||
        1,
    },
    stats: {
      total:
        getNumericField(statsFromResponse, "total") ||
        metaPaginationTotal ||
        totalFromPagination ||
        normalizedData.length ||
        0,
      completed:
        getNumericField(statsFromResponse, "completed") ||
        normalizedData.filter((item) => item.status === "completed").length,
      ongoing:
        getNumericField(statsFromResponse, "ongoing") ||
        normalizedData.filter((item) => item.status === "ongoing").length,
      needs_review:
        getNumericField(statsFromResponse, "needs_review") ||
        normalizedData.filter((item) => item.status === "needs_review").length,
    },
  };
};

export const getCandidates = async (
  params: CandidateQueryParams,
): Promise<CandidatesResponse> => {
  // Validate pagination parameters per API spec
  const page = Math.max(1, params.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, params.pageSize ?? 20));

  // Validate and normalize sort parameters
  const sortBy = VALID_SORT_BY.includes(params.sortBy ?? "date")
    ? (params.sortBy ?? "date")
    : "date";
  const sortDirection = VALID_SORT_DIRECTION.includes(
    params.sortDirection ?? "desc",
  )
    ? params.sortDirection
    : "desc";

  // Validate status parameter
  const status =
    params.status && VALID_STATUSES.includes(params.status)
      ? params.status
      : undefined;

  // Route to search endpoint if search term provided, otherwise use list endpoint
  if (params.q && params.q.trim().length > 0) {
    const searchParams = {
      q: params.q,
      page,
      page_size: pageSize,
    };
    const response = await api.get("/api/v1/candidates/search", {
      params: searchParams,
    });
    const payload = response.data ?? response;
    console.log("[getCandidates] search response", {
      endpoint: "/api/v1/candidates/search",
      params: searchParams,
      payload,
      payloadKeys: Object.keys(payload ?? {}),
      meta: payload?.meta,
      firstItem: payload?.data?.[0] ?? null,
    });
    return normalizeCandidatesResponse(payload);
  }

  // Use list endpoint for filtering/sorting without search
  const listParams: Record<string, unknown> = {
    status,
    sort_by: SORT_BY_MAP[sortBy] ?? sortBy,
    sort_direction: sortDirection,
    page,
    page_size: pageSize,
  };

  if (params.q?.trim().length) {
    listParams.q = params.q.trim();
  }

  const response = await api.get("/api/v1/candidates", {
    params: listParams,
  });
  const payload = response.data ?? response;
  console.log("[getCandidates] list response", {
    endpoint: "/api/v1/candidates",
    params: listParams,
    payload: payload,
    payloadKeys: Object.keys(payload ?? {}),
    meta: payload?.meta,
    firstItem: payload?.data?.[0] ?? null,
  });

  return normalizeCandidatesResponse(payload);
};

export const getCandidate = async (id: string): Promise<Candidate> => {
  const response = await api.get(
    `/api/v1/candidates/${encodeURIComponent(id)}`,
  );

  return response.data;
};

/* export const exportCandidates = async (params: CandidateQueryParams) => {
  const response = await api.get("/api/v1/candidates/export", {
    params,
    responseType: "blob",
  });

  return response.data;
};
 */

export const exportCandidates = async (
  params: CandidateQueryParams,
): Promise<Blob> => {
  // Export endpoint only accepts optional 'q' parameter per API spec
  const exportParams = {
    q: params.q,
  };

  const response = await api.get("/api/v1/candidates/export", {
    params: exportParams,
    responseType: "blob",
  });

  const data = response.data;
  if (data instanceof Blob) {
    return data;
  }

  let text: string;
  try {
    text = await data.text();
  } catch {
    throw new Error("Export failed: invalid response format");
  }

  let json: { message?: string } | null = null;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error("Export failed: invalid response format");
  }

  throw new Error(
    typeof json?.message === "string" && json.message.trim().length > 0
      ? json.message
      : "Export not implemented on backend yet",
  );
};
