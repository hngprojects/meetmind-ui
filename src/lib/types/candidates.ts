export type CandidateStatus = "ongoing" | "completed" | "needs_review";

export type CandidateAction = "recommended" | "maybe" | "none";

export interface Candidate {
  id: string;

  name: string;
  email: string;
  role: string;

  status: CandidateStatus;
  action: CandidateAction;

  score: number;

  createdAt: string;

  avatarUrl?: string | null;
  notes?: string | null;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface CandidatesResponse {
  data: Candidate[];
  pagination: Pagination;
  stats: CandidateStats;
}

export interface CandidateQueryParams {
  q?: string;
  status?: string;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}

export interface CandidateStats {
  total: number;
  completed: number;
  ongoing: number;
  needs_review: number;
}
