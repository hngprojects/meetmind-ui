// Shared types for interview sessions. Config fields are stored JSON-encoded
// on the Session row; these are the decoded shapes.

export interface Question {
  text: string;
  followUpHint: string;
  maxFollowUps: number;
}

export interface RubricCriterion {
  name: string;
  description: string;
  weight: number;
}

export type SessionStatus = "created" | "in_progress" | "completed";

export interface TranscriptTurn {
  speaker: "candidate" | "interviewer";
  text: string;
}

export interface ReportCriterion {
  name: string;
  score: number; // 1-5
  justification: string;
}

export interface Report {
  criteria: ReportCriterion[];
  overall: "strong_yes" | "yes" | "no" | "strong_no";
  summary: string;
}

// Decoded session, as returned by the API to the recruiter UI.
export interface SessionDTO {
  id: string;
  role: string;
  candidateName: string | null;
  intro: string;
  questions: Question[];
  rubric: RubricCriterion[];
  durationMinutes: number;
  closing: string;
  status: SessionStatus;
  transcript: TranscriptTurn[] | null;
  report: Report | null;
  createdAt: string;
  startedAt: string | null;
  completedAt: string | null;
}

// Subset the agent fetches from /api/agent-config/[id].
export interface AgentConfig {
  role: string;
  candidateName: string | null;
  intro: string;
  questions: Question[];
  rubric: RubricCriterion[];
  durationMinutes: number;
  closing: string;
}

export const DEFAULT_CLOSING =
  "Thanks for your time. A recruiter will follow up with next steps.";
