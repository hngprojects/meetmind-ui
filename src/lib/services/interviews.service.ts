import api from "@/lib/api";
import { unwrapData } from "@/lib/api-response";
import {
  getMockInterviewById,
  MOCK_CHAT,
  MOCK_INTERVIEW_LIST,
  MOCK_TRANSCRIPT,
} from "@/lib/mocks/interviews.mock";
import type {
  ChatMessage,
  InterviewDetail,
  InterviewListItem,
  TranscriptMessage,
} from "@/types/interview";

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
  candidate_name?: string;
  candidate_email?: string | null;
  candidate?: { name?: string; email?: string };
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

type ApiTranscriptTurn = {
  id?: string;
  speaker?: "meet_mind" | "candidate";
  speaker_label?: string;
  speakerLabel?: string;
  timestamp?: string;
  content?: string;
  is_typing?: boolean;
  is_active?: boolean;
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
// POST /api/v1/interviews/{interview_id}/ask
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

  const res = await api.post(`/api/v1/interviews/${id}/ask`, { query });
  const data = unwrapData<ApiChatTurn>(res.data);
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

// ── Export transcript ──────────────────────────────────────────────────────────
// GET /api/v1/interviews/{interview_id}/transcript/export
// Returns a plain text file (.txt) as a direct download

export async function exportTranscript(id: string): Promise<void> {
  const res = await api.get(`/api/v1/interviews/${id}/transcript/export`, {
    responseType: "blob", // ← tell axios to treat response as binary
  });

  // Extract filename from content-disposition header or use a fallback
  const disposition = String(res.headers["content-disposition"] ?? "");
  const encodedName =
    disposition.match(/filename\*\s*=\s*UTF-8''([^;]+)/i)?.[1] ?? null;
  const plainName =
    disposition.match(/filename\s*=\s*"([^"]+)"/i)?.[1] ??
    disposition.match(/filename\s*=\s*([^;]+)/i)?.[1] ??
    null;
  const parsedName = encodedName ? decodeURIComponent(encodedName) : plainName;
  const filename = (parsedName ?? `transcript_${id}.txt`).trim();

  // Create a temporary link and trigger the download
  const url = URL.createObjectURL(new Blob([res.data], { type: "text/plain" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
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
    observation: "",
    highlights: [],
    redFlags: [],
    // sessionPhase: "live_transcript",
    elapsed: "",
    participants: 0,
  };
}

function mapApiToChatMessage(raw: ApiChatTurn): ChatMessage {
  return {
    id: raw.id ?? globalThis.crypto?.randomUUID?.(),
    role: raw.role ?? "assistant",
    content: raw.content ?? "",
    title: raw.title,
    bullets: raw.bullets,
  };
}

function mapApiToTranscriptMessage(raw: ApiTranscriptTurn): TranscriptMessage {
  return {
    id: raw.id ?? crypto.randomUUID(),
    speaker: raw.speaker ?? "candidate",
    speakerLabel: raw.speaker_label ?? raw.speakerLabel ?? raw.speaker ?? "",
    timestamp: raw.timestamp ?? "",
    content: raw.content ?? "",
    isTyping: raw.is_typing ?? false,
    isActive: raw.is_active ?? false,
  };
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
