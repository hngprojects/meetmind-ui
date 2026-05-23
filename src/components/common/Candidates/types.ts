export interface Candidate {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Ongoing" | "Needs review" | "Completed";
  date: string;
  score: number;
  action: string;
  notes?: string;
}
