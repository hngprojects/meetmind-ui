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

// ── Live session polling contract ──────────────────────────────────────────────

export const INTERVIEW_SESSION_STATUSES = [
  "connecting",
  "listening",
  "thinking",
  "speaking",
  "connection_lost",
  "reconnecting",
  "processing",
] as const;

export type InterviewSessionStatus =
  (typeof INTERVIEW_SESSION_STATUSES)[number];

export const SESSION_STATUS_LABELS: Record<InterviewSessionStatus, string> = {
  connecting: "Connecting...",
  listening: "Listening",
  thinking: "Thinking...",
  speaking: "Speaking",
  connection_lost: "Connection lost",
  reconnecting: "Reconnecting...",
  processing: "Processing",
};

export const REJOIN_SESSION_MESSAGE =
  "Attempting to rejoin the meeting. Do not close this window.";

export type InterviewMeetingStatus = "Live" | "Scheduled";

export type InterviewSession = {
  interview_id: string;
  session_status: InterviewSessionStatus;
  meeting_status: InterviewMeetingStatus;
  agent_status_display: string;
  elapsed_display: string;
  participants_count: number;
  platform?: InterviewPlatform | null;
  dropped_at_display?: string | null;
  partial_data_saved?: boolean;
  message?: string | null;
};

export type InterviewSessionRejoinResponse = {
  success: boolean;
  message: string;
  session_status: InterviewSessionStatus;
  interview_id: string;
};

export type InterviewSummaryExportFormat = "pdf" | "markdown";

// ── Session phase ──────────────────────────────────────────────────────────────
// Backend-driven statuses plus legacy transcript-only local states.

export type SessionPhase =
  | InterviewSessionStatus
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
  resumeUrl: string | null;
  portfolioUrl: string | null;
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
