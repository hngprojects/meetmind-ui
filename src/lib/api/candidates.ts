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
  const response = await api.get("/api/v1/candidates/export", {
    params,
    responseType: "blob",
  });

  const data = response.data;
  if (data instanceof Blob) {
    return data;
  }
  try {
    const text = await data.text();
    const json = JSON.parse(text);
    throw new Error(json?.message || "Export not implemented on backend yet");
  } catch {
    throw new Error("Export failed: invalid response format");
  }
};
