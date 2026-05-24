import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCandidates } from "@/lib/api/candidates";
import { CandidateQueryParams } from "../types/candidates";

export const useCandidates = (params: CandidateQueryParams) => {
  return useQuery({
    queryKey: ["candidates", params],
    queryFn: () => getCandidates(params),
    placeholderData: keepPreviousData,
  });
};
