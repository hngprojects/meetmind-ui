import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getCandidates } from "@/lib/api/candidates";
import {
  CandidateQueryParams,
  Candidate,
  Pagination,
  CandidateStats,
} from "../types/candidates";
import { useDebounce } from "@/lib/hooks/useDebounce";

export type UseCandidatesData = {
  candidates: Candidate[];
  pagination: Pagination | null;
  stats: CandidateStats | null;
};

export const useCandidates = (
  params: CandidateQueryParams,
): UseQueryResult<UseCandidatesData, unknown> => {
  const debouncedSearch = useDebounce(params.q, 400);

  // Trim whitespace from search to prevent empty-string queries to search endpoint
  const trimmedSearch = debouncedSearch?.trim() ? debouncedSearch.trim() : "";

  const debouncedParams = {
    ...params,
    q: trimmedSearch,
  };

  return useQuery<
    UseCandidatesData,
    unknown,
    UseCandidatesData,
    readonly [
      string,
      {
        q?: string;
        status?: CandidateQueryParams["status"];
        sortBy?: CandidateQueryParams["sortBy"];
        sortDirection?: CandidateQueryParams["sortDirection"];
        page?: number;
        pageSize?: number;
      },
    ]
  >({
    queryKey: [
      "candidates",
      {
        q: debouncedParams.q,
        status: debouncedParams.status,
        sortBy: debouncedParams.sortBy,
        sortDirection: debouncedParams.sortDirection,
        page: debouncedParams.page,
        pageSize: debouncedParams.pageSize,
      },
    ],

    queryFn: async (): Promise<UseCandidatesData> => {
      const res = await getCandidates(debouncedParams);
      return {
        candidates: res.data,
        pagination: res.pagination,
        stats: res.stats,
      };
    },
    retry: 1,
  });
};
