import api from "@/lib/api";
import {
  Candidate,
  CandidatesResponse,
  CandidateQueryParams,
} from "../types/candidates";

export const getCandidates = async (
  params: CandidateQueryParams,
): Promise<CandidatesResponse> => {
  const response = await api.get("/api/v1/candidates", {
    params,
  });

  return response.data;
};

export const getCandidate = async (id: string): Promise<Candidate> => {
  const response = await api.get(`/api/v1/candidates/${id}`);

  return response.data;
};
