// ── Status types ───────────────────────────────────────────────────────────────
// Matches API exactly: draft | scheduled | in_progress | completed | cancelled | needs_attention

export type InterviewStatus =
  | "draft"
  | "scheduled"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "needs_attention";

export type InterviewListStatus = "live" | "upcoming" | "none";

// ── Platform ───────────────────────────────────────────────────────────────────
// Matches API enum exactly: zoom | google_meet
// Was `string` before — now strict

export type InterviewPlatform = string; //zoom, google_meet, discord etc

// ── AI participation mode ──────────────────────────────────────────────────────
// From UpdateAIConfigRequest in spec: passive | standard | proactive
// Was missing entirely

export type ParticipationMode = "passive" | "standard" | "proactive";

// ── Session / UI phases ────────────────────────────────────────────────────────
// These are UI-only states, not in the API — fine as-is

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

// ── List item (sidebar) ────────────────────────────────────────────────────────
// Derived/mapped from API — fine as-is

export type InterviewListItem = {
  id: string;
  initials: string;
  roleTitle: string;
  candidateName: string;
  scheduledLabel: string; // formatted for display, derived from scheduled_start
  listStatus: InterviewListStatus;
};

// ── Interview detail ───────────────────────────────────────────────────────────
// Expanded to include all fields the API actually returns
// Fields marked optional (?) are nullable in the spec

export type InterviewDetail = {
  id: string;
  roleTitle: string; // from role_title
  candidateName: string; // from candidate_name
  candidateEmail: string; // from candidate_email
  phone: string; // not in spec — keep for UI, will be empty from API
  initials: string; // derived, not from API
  date: string; // derived from scheduled_start
  time: string; // derived from scheduled_start
  duration: string; // derived from scheduled_start + scheduled_end
  platform: InterviewPlatform | null; // was `string` — now matches spec enum
  questionProgress: string; // not in spec — UI only
  aiTone: string | null; // from ai_tone — added null (spec allows null)
  participationMode: ParticipationMode | null; // was missing — from session-config
  status: InterviewStatus;
  listStatus: InterviewListStatus;
  rating: string | null;
  customQuestion: string; // from custom_questions in UpdateContextRequest
  keySkills: string[]; // from key_skills in UpdateContextRequest
  jobDescription: string; // was missing — from job_description
  scoringRubric: string; // was missing — from scoring_rubric
  scheduledStart: string | null; // raw ISO — was missing, useful for comparisons
  scheduledEnd: string | null; // raw ISO — was missing
  callLink: string | null; // was missing — from call_link
  observation: string;
  highlights: string[];
  redFlags: string[];
  sessionPhase: SessionPhase;
  elapsed: string;
  participants: number;
};

// ── Transcript message ─────────────────────────────────────────────────────────
// From GET /api/v1/interviews/{id}/chat/history
// Spec returns untyped {} — keeping your shape, it's reasonable

export type TranscriptMessage = {
  id: string;
  speaker: "meet_mind" | "candidate";
  speakerLabel: string;
  timestamp: string;
  content: string;
  isTyping?: boolean;
  isActive?: boolean;
};

// ── Chat message ───────────────────────────────────────────────────────────────
// From GET /api/v1/interviews/{id}/chat/history
// Same endpoint, different shape depending on turn type

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  title?: string;
  bullets?: string[];
};

// ── Scorecard ──────────────────────────────────────────────────────────────────
// No scorecard endpoint in spec yet — keeping as-is, fine for mock usage

export type ScorecardCategory = {
  id: string;
  title: string;
  score: number;
  color: "green" | "orange" | "gray";
  questions?: string[];
  signals?: string[];
  expanded?: boolean;
};

// ── Create interview payload ───────────────────────────────────────────────────
// Matches CreateInterviewRequest in spec exactly
// Fixed: platform was `string`, now `InterviewPlatform`
// Fixed: call_link was missing
// Fixed: scheduled_start / scheduled_end were missing

export type CreateInterviewPayload = {
  candidate_name: string; // required — only required field in spec
  title?: string; // optional
  candidate_email?: string;
  job_description?: string;
  scoring_rubric?: string;
  criteria?: string[]; // max 10 items per spec
  role_title?: string;
  platform?: InterviewPlatform; // was `string`
  ai_tone?: string;
  call_link?: string; // was missing
  scheduled_start?: string; // ISO datetime — was missing
  scheduled_end?: string; // ISO datetime — was missing
};

// ── Update payloads ────────────────────────────────────────────────────────────
// These were missing entirely — added to match spec

export type UpdateContextPayload = {
  role_title?: string;
  job_description?: string;
  key_skills?: string[];
  custom_questions?: string;
};

export type UpdateCriteriaPayload = {
  criteria: string[]; // 1–10 items, required
};

export type UpdateAIConfigPayload = {
  participation_mode?: ParticipationMode;
  platform?: InterviewPlatform;
  call_link?: string;
  scheduled_start?: string;
  scheduled_end?: string;
};
