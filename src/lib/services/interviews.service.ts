import api from "@/lib/api";
import { unwrapData } from "@/lib/api-response";
import axios from "axios";
import {
  INTERVIEW_SESSION_STATUSES,
  REJOIN_SESSION_MESSAGE,
  SESSION_STATUS_LABELS,
  type ChatMessage,
  type InterviewDetail,
  type InterviewListItem,
  type InterviewSession,
  type InterviewSessionRejoinResponse,
  type InterviewSessionStatus,
  type InterviewSummaryExportFormat,
  type ScorecardEvidence,
  type ScorecardResponse,
  type ScorecardSection,
  type ScorecardSubRubric,
  type TranscriptMessage,
} from "@/types/interview";
import {
  getMockInterviewById,
  MOCK_CHAT,
  MOCK_INTERVIEW_SESSION,
  MOCK_INTERVIEW_LIST,
  MOCK_SCORECARD,
  MOCK_TRANSCRIPT,
} from "@/lib/mocks/interviews.mock";

const MOCKS_ENABLED = process.env.NEXT_PUBLIC_USE_MOCKS === "true";

// ── Raw API shapes ─────────────────────────────────────────────────────────────

type ApiInterview = {
  id: string;
  title?: string | null;
  role_title?: string | null;
  status?: string;
  platform?: string | null;
  scheduled_start?: string | null;
  scheduled_end?: string | null;
  elapsed_display?: string;
  elapsed_seconds?: number;
  participants_count?: number;
  resume_url?: string | null;
  portfolio_url?: string | null;
  session?: ApiInterviewSession | null;
  candidate_name?: string;
  candidate_email?: string | null;
  candidate?: {
    name?: string;
    email?: string;
    resume_url?: string | null;
    portfolio_url?: string | null;
  };
};

type ApiListResponse = {
  items?: ApiInterview[];
  interviews?: ApiInterview[];
  data?: ApiInterview[];
  total?: number;
  page?: number;
  page_size?: number;
  meta?: {
    pagination?: {
      total?: number;
      page?: number;
      page_size?: number;
      total_pages?: number;
    };
  };
};

type ApiChatTurn = {
  id?: string;
  role?: "user" | "assistant";
  content?: string;
  title?: string;
  bullets?: string[];
};

type ApiChatAnswer = {
  title?: string;
  summary?: string;
  points?: Array<{
    label?: string;
    detail?: string;
  }>;
};

type ApiChatResponse = ApiChatTurn & {
  message_id?: string;
  answer?: ApiChatAnswer;
};

type ApiTranscriptTurn = {
  id?: string;
  speaker?: "meet_mind" | "candidate";
  speaker_label?: string;
  speakerLabel?: string;
  timestamp?: string;
  content?: string;
  text?: string;
  sequence_no?: number;
  is_typing?: boolean;
  is_active?: boolean;
};

type ApiScorecardEvidence = {
  question_turn_id?: string;
  response_turn_id?: string;
  reason?: string | null;
};

type ApiScorecardSubRubric = {
  id?: string | null;
  title?: string | null;
  score?: number | null;
  confidence?: number | null;
  score_bar_percent?: number | null;
  strengths?: string[] | null;
  weaknesses?: string[] | null;
  justification?: string | null;
  evidence?: ApiScorecardEvidence[] | null;
  expanded?: boolean;
};

type ApiScorecardSection = ApiScorecardSubRubric & {
  questions_asked?: string[] | null;
  signals_detected?: string[] | null;
  sub_rubrics?: ApiScorecardSubRubric[] | null;
};

type ApiScorecardResponse = {
  interview_id?: string;
  total_score?: number | null;
  overall_confidence?: number | null;
  sections?: ApiScorecardSection[] | null;
};

type ApiInterviewSession = {
  interview_id?: string;
  session_status?: string;
  meeting_status?: string;
  agent_status_display?: string;
  elapsed_display?: string;
  elapsed_seconds?: number;
  participants_count?: number;
  platform?: string | null;
  dropped_at_display?: string | null;
  partial_data_saved?: boolean;
  message?: string | null;
};

type ApiInterviewSessionRejoinResponse = {
  success?: boolean;
  message?: string;
  session_status?: string;
  interview_id?: string;
};

type ApiExportErrorPayload = {
  code?: string;
  error?: string;
  message?: string;
  detail?:
    | string
    | {
        code?: string;
        error?: string;
        message?: string;
      };
};

// ── List interviews ────────────────────────────────────────────────────────────
// GET /api/v1/interviews?page=1&page_size=20

export async function listInterviews(
  page = 1,
  pageSize = 20,
): Promise<InterviewListItem[]> {
  if (MOCKS_ENABLED) return MOCK_INTERVIEW_LIST;

  const res = await api.get("/api/v1/interviews", {
    params: { page, page_size: pageSize },
  });

  const data = unwrapData<ApiListResponse>(res.data);

  const raw: ApiInterview[] = Array.isArray(data)
    ? data
    : (data.items ?? data.interviews ?? data.data ?? []);

  return raw.map(mapApiToListItem);
}

// ── Get single interview ───────────────────────────────────────────────────────
// GET /api/v1/interviews/{interview_id}

export async function getInterview(id: string): Promise<InterviewDetail> {
  if (MOCKS_ENABLED) return getMockInterviewById(id);

  const res = await api.get(`/api/v1/interviews/${id}`);
  const data = unwrapData<ApiInterview>(res.data);
  return mapApiToDetail(data, id);
}

// ── Chat history ───────────────────────────────────────────────────────────────
// GET /api/v1/interviews/{interview_id}/chat/history

export async function getChatHistory(id: string): Promise<ChatMessage[]> {
  if (MOCKS_ENABLED) return MOCK_CHAT;

  const res = await api.get(`/api/v1/interviews/${id}/chat/history`);
  const data = unwrapData<{
    messages?: ApiChatTurn[];
    turns?: ApiChatTurn[];
    data?: ApiChatTurn[];
  }>(res.data);

  const raw = data.messages ?? data.turns ?? data.data ?? [];
  return raw.map(mapApiToChatMessage);
}

// ── Ask MeetMind a question about the interview (sends a chat message) ─────────
// POST /api/v1/interviews/{interview_id}/chat
// Body: { query: string }

export async function askQuestion(
  id: string,
  query: string,
): Promise<ChatMessage> {
  if (MOCKS_ENABLED) {
    // Return a mock assistant response
    return {
      id: globalThis.crypto?.randomUUID?.(),
      role: "assistant",
      content: `Mock response to: ${query}`,
      title: undefined,
      bullets: undefined,
    };
  }

  const res = await api.post(`/api/v1/interviews/${id}/chat`, { query });
  const data = unwrapData<ApiChatResponse>(res.data);
  return mapApiToChatMessage(data);
}

// ── Transcript ─────────────────────────────────────────────────────────────────
// GET /api/v1/interviews/{interview_id}/transcript

export async function getTranscript(id: string): Promise<TranscriptMessage[]> {
  if (MOCKS_ENABLED) return MOCK_TRANSCRIPT;

  const res = await api.get(`/api/v1/interviews/${id}/transcript`);
  const data = unwrapData<{
    turns?: ApiTranscriptTurn[];
    transcript?: ApiTranscriptTurn[];
    data?: ApiTranscriptTurn[];
  }>(res.data);

  const raw = data.turns ?? data.transcript ?? data.data ?? [];
  return raw.map(mapApiToTranscriptMessage);
}

// ── Scorecard ─────────────────────────────────────────────────────────────────
// GET /api/v1/interviews/{interview_id}/scorecard

export async function getScorecard(id: string): Promise<ScorecardResponse> {
  if (MOCKS_ENABLED) {
    return {
      interviewId: id,
      totalScore: 50,
      overallConfidence: 80,
      sections: MOCK_SCORECARD,
    };
  }

  const res = await api.get(`/api/v1/interviews/${id}/scorecard`);
  const data = unwrapData<ApiScorecardResponse>(res.data);
  return mapApiToScorecard(data, id);
}

// ── Live interview session state ──────────────────────────────────────────────
// GET /api/v1/interviews/{interview_id}/session

export async function getInterviewSession(
  id: string,
): Promise<InterviewSession> {
  if (MOCKS_ENABLED) return { ...MOCK_INTERVIEW_SESSION, interview_id: id };

  const res = await api.get(`/api/v1/interviews/${id}/session`);
  const data = unwrapData<ApiInterviewSession>(res.data);
  return mapApiToInterviewSession(data, id);
}

// ── Rejoin live interview session ─────────────────────────────────────────────
// POST /api/v1/interviews/{interview_id}/session/rejoin

export async function rejoinInterviewSession(
  id: string,
): Promise<InterviewSessionRejoinResponse> {
  if (MOCKS_ENABLED) {
    return {
      success: true,
      message: REJOIN_SESSION_MESSAGE,
      session_status: "reconnecting",
      interview_id: id,
    };
  }

  const res = await api.post(`/api/v1/interviews/${id}/session/rejoin`);
  const data = unwrapData<ApiInterviewSessionRejoinResponse>(res.data);

  return {
    success: data.success ?? true,
    message: data.message ?? REJOIN_SESSION_MESSAGE,
    session_status: normalizeSessionStatus(data.session_status),
    interview_id: data.interview_id ?? id,
  };
}

// ── Export transcript ──────────────────────────────────────────────────────────
// GET /api/v1/interviews/{interview_id}/transcript/export
// Returns a plain text file (.txt) as a direct download

export async function exportTranscript(id: string): Promise<void> {
  const res = await api.get(`/api/v1/interviews/${id}/transcript/export`, {
    responseType: "blob", // ← tell axios to treat response as binary
  });

  downloadBlob(
    res.data,
    getDownloadFilename(
      res.headers["content-disposition"],
      `transcript_${id}.txt`,
    ),
    "text/plain",
  );
}

// ── Export summary ─────────────────────────────────────────────────────────────
// GET /api/v1/interviews/{interview_id}/summary/export?format=pdf|markdown
// Returns a PDF or Markdown file as a direct download.

export async function exportInterviewSummary(
  id: string,
  format: InterviewSummaryExportFormat,
): Promise<void> {
  const extension = format === "pdf" ? "pdf" : "md";
  const contentType = format === "pdf" ? "application/pdf" : "text/markdown";
  const fallbackFilename = `interview_${id}_report.${extension}`;

  if (MOCKS_ENABLED) {
    const mockBody =
      format === "pdf"
        ? "Mock PDF export content"
        : `# Interview Summary\n\nMock summary export for interview ${id}.`;

    downloadBlob(
      new Blob([mockBody], { type: contentType }),
      fallbackFilename,
      contentType,
    );
    return;
  }

  try {
    const res = await api.get(`/api/v1/interviews/${id}/summary/export`, {
      params: { format },
      responseType: "blob",
    });

    const responseContentType =
      typeof res.headers["content-type"] === "string"
        ? res.headers["content-type"]
        : contentType;

    downloadBlob(
      res.data,
      getDownloadFilename(res.headers["content-disposition"], fallbackFilename),
      responseContentType,
    );
  } catch (error) {
    throw await toSummaryExportError(error);
  }
}

// ── Stop transcript ────────────────────────────────────────────────────────────
// POST /api/v1/interviews/{interview_id}/transcript/stop

export async function stopTranscript(id: string): Promise<void> {
  await api.post(`/api/v1/interviews/${id}/transcript/stop`);
}

// ── Respond to a question during the interview ─────────────────────────────────
// POST /api/v1/interviews/{interview_id}/respond
// Body: { content: string }

export async function respondToQuestion(
  id: string,
  content: string,
): Promise<void> {
  await api.post(`/api/v1/interviews/${id}/respond`, { content });
}

// ── Generate next AI question ──────────────────────────────────────────────────
// POST /api/v1/interviews/{interview_id}/generate-question

export async function generateQuestion(
  id: string,
): Promise<{ question: string }> {
  const res = await api.post(`/api/v1/interviews/${id}/generate-question`);
  return unwrapData<{ question: string }>(res.data);
}

// ── Complete interview ─────────────────────────────────────────────────────────
// POST /api/v1/interviews/{interview_id}/complete

export async function completeInterview(id: string): Promise<void> {
  await api.post(`/api/v1/interviews/${id}/complete`);
}

// ── Confirm interview ──────────────────────────────────────────────────────────
// POST /api/v1/interviews/{interview_id}/confirm

export async function confirmInterview(id: string): Promise<void> {
  await api.post(`/api/v1/interviews/${id}/confirm`);
}

// ── Cancel interview ───────────────────────────────────────────────────────────
// PATCH /api/v1/interviews/{interview_id}/cancel

export async function cancelInterview(id: string): Promise<void> {
  await api.patch(`/api/v1/interviews/${id}/cancel`);
}

function getDownloadFilename(
  contentDisposition: unknown,
  fallbackFilename: string,
): string {
  const disposition = String(contentDisposition ?? "");
  const encodedName =
    disposition.match(/filename\*\s*=\s*UTF-8''([^;]+)/i)?.[1] ?? null;
  const plainName =
    disposition.match(/filename\s*=\s*"([^"]+)"/i)?.[1] ??
    disposition.match(/filename\s*=\s*([^;]+)/i)?.[1] ??
    null;
  const parsedName = encodedName ? decodeURIComponent(encodedName) : plainName;

  const filename = (parsedName ?? "").trim();
  return filename.length > 0 ? filename : fallbackFilename;
}

function downloadBlob(
  data: BlobPart | Blob,
  filename: string,
  contentType: string,
) {
  const blob =
    data instanceof Blob ? data : new Blob([data], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function toSummaryExportError(error: unknown): Promise<Error> {
  const payload = await readExportErrorPayload(error);
  const code =
    payload?.code ?? payload?.error ?? getDetailValue(payload, "code");
  const message =
    payload?.message ??
    getDetailValue(payload, "message") ??
    (typeof payload?.detail === "string" ? payload.detail : undefined);

  if (code === "summary_not_ready") {
    return new Error(
      "Summary is not ready yet. Please try again after it has been generated.",
    );
  }

  if (message) return new Error(message);
  if (error instanceof Error) return error;

  return new Error("Unable to export summary. Please try again.");
}

async function readExportErrorPayload(
  error: unknown,
): Promise<ApiExportErrorPayload | null> {
  if (!axios.isAxiosError(error)) return null;

  const data = error.response?.data;

  if (data instanceof Blob) {
    const text = await data.text();
    if (!text) return null;

    try {
      return JSON.parse(text) as ApiExportErrorPayload;
    } catch {
      return { message: text };
    }
  }

  if (isRecord(data)) return data as ApiExportErrorPayload;

  return null;
}

function getDetailValue(
  payload: ApiExportErrorPayload | null,
  key: "code" | "message",
): string | undefined {
  const detail = payload?.detail;
  return isRecord(detail) && typeof detail[key] === "string"
    ? detail[key]
    : undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

// ── Mappers ────────────────────────────────────────────────────────────────────

function mapApiToListItem(raw: ApiInterview): InterviewListItem {
  const candidateName =
    raw.candidate_name ?? raw.candidate?.name ?? "Unknown Candidate";

  const roleTitle = raw.role_title ?? raw.title ?? "Unknown Role";

  const listStatus: InterviewListItem["listStatus"] =
    raw.status === "in_progress"
      ? "live"
      : raw.status === "scheduled"
        ? "upcoming"
        : "none";

  const initials =
    candidateName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part: string) => part[0]?.toUpperCase() ?? "")
      .join("") || "??";

  const scheduledLabel = raw.scheduled_start
    ? formatScheduledDate(raw.scheduled_start)
    : "Not scheduled";

  return {
    id: raw.id,
    candidateName,
    roleTitle,
    initials,
    scheduledLabel,
    listStatus,
  };
}

function mapApiToDetail(raw: ApiInterview, id: string): InterviewDetail {
  const candidateName = raw.candidate_name ?? raw.candidate?.name ?? "";

  const listStatus: InterviewDetail["listStatus"] =
    raw.status === "in_progress"
      ? "live"
      : raw.status === "scheduled"
        ? "upcoming"
        : "none";

  const initials =
    candidateName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "??";

  const elapsed =
    raw.status === "in_progress"
      ? normalizeElapsedDisplay(
          raw.session?.elapsed_display ?? raw.elapsed_display,
          raw.session?.elapsed_seconds ?? raw.elapsed_seconds,
        )
      : "";

  return {
    id,
    roleTitle: raw.role_title ?? raw.title ?? "",
    candidateName,
    candidateEmail: raw.candidate_email ?? raw.candidate?.email ?? "",
    platform: raw.platform ?? null,
    status: (raw.status as InterviewDetail["status"]) ?? "draft",
    scheduledStart: raw.scheduled_start ?? null,
    scheduledEnd: raw.scheduled_end ?? null,
    listStatus,
    initials,

    // ── Fields not yet returned by the API ──
    // These will be empty until the backend includes them in the response.
    // Do NOT fall back to mock data — keep them empty so missing data is visible.
    phone: "",
    date: raw.scheduled_start ? formatScheduledDate(raw.scheduled_start) : "",
    time: raw.scheduled_start
      ? new Date(raw.scheduled_start).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      : "",
    duration: "",
    questionProgress: "",
    aiTone: null,
    participationMode: null,
    rating: null,
    customQuestion: "",
    keySkills: [],
    jobDescription: "",
    scoringRubric: "",
    callLink: null,
    resumeUrl: raw.resume_url ?? raw.candidate?.resume_url ?? null,
    portfolioUrl: raw.portfolio_url ?? raw.candidate?.portfolio_url ?? null,
    observation: "",
    highlights: [],
    redFlags: [],
    // sessionPhase: "live_transcript",
    elapsed,
    participants: normalizeParticipantsCount(
      raw.session?.participants_count ?? raw.participants_count,
    ),
  };
}

function mapApiToChatMessage(raw: ApiChatResponse): ChatMessage {
  const answerPoints = raw.answer?.points
    ?.map((point) => {
      const label = point.label?.trim();
      const detail = point.detail?.trim();
      return [label, detail].filter(Boolean).join(": ");
    })
    .filter(Boolean);

  return {
    id:
      raw.id ??
      raw.message_id ??
      globalThis.crypto?.randomUUID?.() ??
      String(Date.now()),
    role: raw.role ?? "assistant",
    content: raw.content ?? raw.answer?.summary ?? "",
    title: raw.title ?? raw.answer?.title,
    bullets: raw.bullets ?? answerPoints,
  };
}

function mapApiToTranscriptMessage(raw: ApiTranscriptTurn): TranscriptMessage {
  return {
    id: raw.id ?? crypto.randomUUID(),
    speaker: raw.speaker ?? "candidate",
    speakerLabel: raw.speaker_label ?? raw.speakerLabel ?? raw.speaker ?? "",
    timestamp: raw.timestamp ?? "",
    content: raw.content ?? raw.text ?? "",
    sequenceNo: raw.sequence_no,
    isTyping: raw.is_typing ?? false,
    isActive: raw.is_active ?? false,
  };
}

function mapApiToScorecard(
  raw: ApiScorecardResponse,
  fallbackId: string,
): ScorecardResponse {
  const sections = (raw.sections ?? []).map(mapApiToScorecardSection);
  const computedTotal =
    sections.length > 0
      ? Math.round(
          sections.reduce((total, section) => total + section.score, 0) /
            sections.length,
        )
      : 0;

  return {
    interviewId: raw.interview_id ?? fallbackId,
    totalScore: normalizeScore(raw.total_score, computedTotal),
    overallConfidence: normalizeScore(raw.overall_confidence, 0),
    sections,
  };
}

function mapApiToScorecardSection(raw: ApiScorecardSection): ScorecardSection {
  const title = normalizeText(raw.title, "Untitled rubric");

  return {
    ...mapApiToScorecardRubric(raw, title),
    questionsAsked: normalizeStringArray(raw.questions_asked),
    signalsDetected: normalizeStringArray(raw.signals_detected),
    subRubrics: (raw.sub_rubrics ?? []).map(mapApiToScorecardSubRubric),
  };
}

function mapApiToScorecardSubRubric(
  raw: ApiScorecardSubRubric,
): ScorecardSubRubric {
  return mapApiToScorecardRubric(
    raw,
    normalizeText(raw.title, "Untitled sub-rubric"),
  );
}

function mapApiToScorecardRubric<T extends ApiScorecardSubRubric>(
  raw: T,
  fallbackTitle: string,
): ScorecardSubRubric {
  const title = normalizeText(raw.title, fallbackTitle);

  return {
    id: normalizeText(raw.id, toStableId(title)),
    title,
    score: normalizeScore(raw.score, 0),
    confidence: normalizeScore(raw.confidence, 0),
    scoreBarPercent: normalizeScore(raw.score_bar_percent, raw.score ?? 0),
    strengths: normalizeStringArray(raw.strengths),
    weaknesses: normalizeStringArray(raw.weaknesses),
    justification:
      typeof raw.justification === "string" && raw.justification.trim()
        ? raw.justification.trim()
        : null,
    evidence: normalizeEvidence(raw.evidence),
    expanded: raw.expanded,
  };
}

function normalizeEvidence(
  evidence: ApiScorecardEvidence[] | null | undefined,
): ScorecardEvidence[] {
  return (evidence ?? [])
    .map((item) => ({
      questionTurnId: normalizeText(item.question_turn_id, ""),
      responseTurnId: normalizeText(item.response_turn_id, ""),
      reason: normalizeText(item.reason, ""),
    }))
    .filter((item) => item.questionTurnId || item.responseTurnId);
}

function mapApiToInterviewSession(
  raw: ApiInterviewSession,
  fallbackId: string,
): InterviewSession {
  const sessionStatus = normalizeSessionStatus(raw.session_status);

  return {
    interview_id: raw.interview_id ?? fallbackId,
    session_status: sessionStatus,
    meeting_status: normalizeMeetingStatus(raw.meeting_status),
    agent_status_display: normalizeAgentDisplay(
      raw.agent_status_display,
      sessionStatus,
    ),
    elapsed_display: normalizeElapsedDisplay(
      raw.elapsed_display,
      raw.elapsed_seconds,
    ),
    participants_count: normalizeParticipantsCount(raw.participants_count),
    platform: raw.platform ?? null,
    dropped_at_display: raw.dropped_at_display ?? null,
    partial_data_saved: raw.partial_data_saved ?? false,
    message: raw.message ?? null,
  };
}

function normalizeSessionStatus(value: unknown): InterviewSessionStatus {
  if (
    typeof value === "string" &&
    (INTERVIEW_SESSION_STATUSES as readonly string[]).includes(value)
  ) {
    return value as InterviewSessionStatus;
  }

  console.warn("Unknown session_status received from API.", {
    value,
    valueType: value === null ? "null" : typeof value,
    fallback: "connecting",
  });

  return "connecting";
}

function normalizeMeetingStatus(
  value: unknown,
): InterviewSession["meeting_status"] {
  return value === "Scheduled" ? "Scheduled" : "Live";
}

function normalizeAgentDisplay(
  value: unknown,
  status: InterviewSessionStatus,
): string {
  if (typeof value === "string" && value.trim()) return value.trim();
  return SESSION_STATUS_LABELS[status];
}

function normalizeElapsedDisplay(
  value: unknown,
  elapsedSeconds?: number,
): string {
  if (typeof value === "string" && value.trim()) {
    const parts = value.trim().split(":");

    if (parts.length === 3) {
      return parts.map((part) => part.padStart(2, "0")).join(":");
    }

    if (parts.length === 2) {
      const [minutes, seconds] = parts;
      return `00:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
    }
  }

  if (typeof elapsedSeconds === "number" && Number.isFinite(elapsedSeconds)) {
    const totalSeconds = Math.max(0, Math.floor(elapsedSeconds));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds]
      .map((part) => String(part).padStart(2, "0"))
      .join(":");
  }

  return "00:00:00";
}

function normalizeParticipantsCount(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.max(0, Math.floor(value))
    : 0;
}

function normalizeScore(value: unknown, fallback: number): number {
  const score =
    typeof value === "number" && Number.isFinite(value) ? value : fallback;
  return Math.min(100, Math.max(0, Math.round(score)));
}

function normalizeText(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function normalizeStringArray(value: string[] | null | undefined): string[] {
  return (value ?? []).filter(
    (item): item is string =>
      typeof item === "string" && item.trim().length > 0,
  );
}

function toStableId(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function formatScheduledDate(isoString: string): string {
  try {
    return new Date(isoString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return isoString;
  }
}
