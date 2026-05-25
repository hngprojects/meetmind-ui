import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCandidates } from "@/lib/api/candidates";
import { CandidateQueryParams } from "../types/candidates";
import { useDebounce } from "@/lib/hooks/useDebounce";

export const useCandidates = (params: CandidateQueryParams) => {
  const debouncedSearch = useDebounce(params.q, 400);

  const debouncedParams = {
    ...params,
    q: debouncedSearch,
  };

  return useQuery({
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

    queryFn: () => getCandidates(debouncedParams),
    placeholderData: keepPreviousData,
    retry: 1,
    select: (res) => ({
      candidates: res.data,
      pagination: res.pagination,
    }),
  });
};
