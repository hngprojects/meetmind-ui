export type CandidateStatus = "ongoing" | "needs_review" | "completed";

export interface Candidate {
  id: string;
  name: string;
  email: string;
  role: string;
  status: CandidateStatus;
  date: string;
  score: number;
  action: string;
  notes?: string;
}
