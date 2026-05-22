export type InterviewStatus =
  | "draft"
  | "scheduled"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "needs_attention";

export type InterviewListStatus = "live" | "upcoming" | "none";

export type SessionPhase =
  | "connecting"
  | "listening"
  | "thinking"
  | "reconnecting"
  | "connection_lost"
  | "speaking"
  | "live_transcript"
  | "summary_pending"
  | "summary_ready"
  | "summary_error"
  | "transcript_error";

export type InterviewTab =
  | "chat"
  | "transcript"
  | "summary"
  | "scorecard"
  | "profile";

export type InterviewListItem = {
  id: string;
  initials: string;
  roleTitle: string;
  candidateName: string;
  scheduledLabel: string;
  listStatus: InterviewListStatus;
};

export type InterviewDetail = {
  id: string;
  roleTitle: string;
  candidateName: string;
  candidateEmail: string;
  phone: string;
  initials: string;
  date: string;
  time: string;
  duration: string;
  platform: string;
  questionProgress: string;
  aiTone: string;
  status: InterviewStatus;
  listStatus: InterviewListStatus;
  rating: string | null;
  customQuestion: string;
  keySkills: string[];
  observation: string;
  highlights: string[];
  redFlags: string[];
  sessionPhase: SessionPhase;
  elapsed: string;
  participants: number;
};

export type TranscriptMessage = {
  id: string;
  speaker: "meet_mind" | "candidate";
  speakerLabel: string;
  timestamp: string;
  content: string;
  isTyping?: boolean;
  isActive?: boolean;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  title?: string;
  bullets?: string[];
};

export type ScorecardCategory = {
  id: string;
  title: string;
  score: number;
  color: "green" | "orange" | "gray";
  questions?: string[];
  signals?: string[];
  expanded?: boolean;
};

export type CreateInterviewPayload = {
  title: string;
  candidate_name: string;
  candidate_email?: string;
  job_description: string;
  scoring_rubric: string;
  criteria: string[];
  role_title?: string;
  platform?: string;
  ai_tone?: string;
};
