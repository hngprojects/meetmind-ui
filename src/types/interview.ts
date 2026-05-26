// ── Status types ───────────────────────────────────────────────────────────────

export type InterviewStatus =
  | "draft"
  | "scheduled"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "needs_attention";

export type InterviewListStatus = "live" | "upcoming" | "none";

// ── Platform ───────────────────────────────────────────────────────────────────
// Kept as string — backend returns values beyond zoom/google_meet (e.g. discord)
// Use InterviewPlatform for display, CreateInterviewPayload restricts to API-accepted values

export type InterviewPlatform = string; //zoom, google_meet, discord etc

// ── AI participation mode ──────────────────────────────────────────────────────

export type ParticipationMode = "passive" | "standard" | "proactive";

// ── Session phase ──────────────────────────────────────────────────────────────
// UI-only — driven by WebSocket events from the backend (not stored in API)
// Represents what the AI agent is currently doing during a live interview

export type SessionPhase =
  | "connecting" // AI joining the call
  | "listening" // AI hearing the conversation
  | "thinking" // AI generating a follow-up question
  | "speaking" // AI talking in the call
  | "reconnecting" // AI lost connection, retrying
  | "connection_lost" // AI dropped, cannot rejoin
  | "live_transcript" // AI transcribing normally
  | "transcript_error"; // Transcript stream interrupted

// ── Summary phase ──────────────────────────────────────────────────────────────
// Separate from SessionPhase — only drives the Summary tab, not the transcript

export type SummaryPhase =
  | "summary_pending" // Interview ended, AI generating summary
  | "summary_ready" // Summary generated, ready to display
  | "summary_error"; // Summary generation failed

// ── Interview tab ──────────────────────────────────────────────────────────────

export type InterviewTab =
  | "chat"
  | "transcript"
  | "summary"
  | "scorecard"
  | "profile";

// ── List item (sidebar) ────────────────────────────────────────────────────────

export type InterviewListItem = {
  id: string;
  initials: string;
  roleTitle: string;
  candidateName: string;
  scheduledLabel: string; // formatted for display, derived from scheduled_start
  listStatus: InterviewListStatus;
};

// ── Interview detail ───────────────────────────────────────────────────────────

export type InterviewDetail = {
  id: string;
  roleTitle: string;
  candidateName: string;
  candidateEmail: string;
  phone: string; // not in spec — UI only, empty from API
  initials: string; // derived, not from API
  date: string; // derived from scheduled_start
  time: string; // derived from scheduled_start
  duration: string; // derived from scheduled_start + scheduled_end
  platform: InterviewPlatform | null;
  questionProgress: string; // not in spec — UI only
  aiTone: string | null;
  participationMode: ParticipationMode | null;
  status: InterviewStatus;
  listStatus: InterviewListStatus;
  rating: string | null;
  customQuestion: string;
  keySkills: string[];
  jobDescription: string;
  scoringRubric: string;
  scheduledStart: string | null;
  scheduledEnd: string | null;
  callLink: string | null;
  observation: string;
  highlights: string[];
  redFlags: string[];
  // sessionPhase removed — UI-only state, lives in InterviewsWorkspace
  // summaryPhase removed — UI-only state, lives in SummaryTab
  elapsed: string; // not in spec — UI only
  participants: number; // not in spec — UI only
};

// ── Transcript message ─────────────────────────────────────────────────────────

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

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  title?: string;
  bullets?: string[];
};

// ── Scorecard ──────────────────────────────────────────────────────────────────
// No scorecard endpoint in spec yet

export type ScorecardCategory = {
  id: string;
  title: string;
  score: number;
  color: "green" | "orange" | "gray";
  questions?: string[];
  signals?: string[];
  expanded?: boolean;
};
