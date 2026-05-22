import api from "@/lib/api";
import { unwrapData } from "@/lib/api-response";
import {
  getMockInterviewById,
  MOCK_CHAT,
  MOCK_INTERVIEW_LIST,
  MOCK_SCORECARD,
  MOCK_TRANSCRIPT,
} from "@/lib/mocks/interviews.mock";
import type {
  ChatMessage,
  // CreateInterviewPayload,
  InterviewDetail,
  InterviewListItem,
  ScorecardCategory,
  TranscriptMessage,
} from "@/types/interview";

const MOCKS_ENABLED =
  process.env.NEXT_PUBLIC_USE_MOCKS === "true" ||
  process.env.NEXT_PUBLIC_USE_MOCKS === undefined;

export async function listInterviews(): Promise<InterviewListItem[]> {
  if (MOCKS_ENABLED) return MOCK_INTERVIEW_LIST;
  try {
    const [liveRes, statsRes] = await Promise.all([
      api.get("/api/v1/dashboard/live"),
      api.get("/api/v1/dashboard/stats"),
    ]);
    const live = unwrapData<unknown>(liveRes.data);
    const stats = unwrapData<{ live_interviews?: unknown[] }>(statsRes.data);

    const mapped = mapLiveInterviewsToList(live, stats);

    return mapped.length ? mapped : MOCK_INTERVIEW_LIST;
  } catch {
    return MOCK_INTERVIEW_LIST;
  }
}

export async function getInterview(id: string): Promise<InterviewDetail> {
  if (MOCKS_ENABLED) return getMockInterviewById(id);
  try {
    const res = await api.get(`/api/v1/interviews/${id}`);
    const data = unwrapData<Record<string, unknown>>(res.data);
    return mapApiToDetail(data, id);
  } catch {
    return getMockInterviewById(id);
  }
}

export async function getChatHistory(id: string): Promise<ChatMessage[]> {
  if (MOCKS_ENABLED) return MOCK_CHAT;
  try {
    const res = await api.get(`/api/v1/interviews/${id}/chat/history`);
    const data = unwrapData<{
      messages?: ChatMessage[];
      turns?: ChatMessage[];
    }>(res.data);
    return data.messages ?? data.turns ?? MOCK_CHAT;
  } catch {
    return MOCK_CHAT;
  }
}

export async function getTranscript(id: string): Promise<TranscriptMessage[]> {
  if (MOCKS_ENABLED) return MOCK_TRANSCRIPT;
  try {
    const res = await api.get(`/api/v1/interviews/${id}/chat/history`);
    const data = unwrapData<{ turns?: TranscriptMessage[] }>(res.data);
    return data.turns ?? MOCK_TRANSCRIPT;
  } catch {
    return MOCK_TRANSCRIPT;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getScorecard(_id: string): ScorecardCategory[] {
  return MOCK_SCORECARD;
}

// export async function createInterview(
//   payload: CreateInterviewPayload,
// ): Promise<{ id: string }> {
//   const res = await api.post("/api/v1/interviews", payload);
//   const data = unwrapData<{ id?: string; interview_id?: string }>(res.data);
//   return { id: data.id ?? data.interview_id ?? "1" };
// }

export async function cancelInterview(id: string): Promise<void> {
  await api.patch(`/api/v1/interviews/${id}/cancel`);
}

function mapApiToDetail(
  data: Record<string, unknown>,
  id: string,
): InterviewDetail {
  const mock = getMockInterviewById(id);
  return {
    ...mock,
    id,
    roleTitle: String(data.role_title ?? data.title ?? mock.roleTitle),
    candidateName: String(
      data.candidate_name ??
        (data.candidate as { name?: string } | undefined)?.name ??
        mock.candidateName,
    ),
    status: (data.status as InterviewDetail["status"]) ?? mock.status,
  };
}

function mapLiveInterviewsToList(
  live: string,
  stats: { live_interviews?: string[] },
): InterviewListItem[] {
  const liveArr = Array.isArray(live) ? live : [];
  const statsArr = Array.isArray(stats?.live_interviews)
    ? stats.live_interviews
    : [];

  const combined = [...liveArr, ...statsArr];

  const map = new Map<string, InterviewListItem>();

  for (const item of combined) {
    if (!item) continue;

    const id = item.id ?? item.interview_id;
    if (!id) continue;

    const candidateName =
      item.candidate_name ?? item.candidate?.name ?? "Unknown Candidate";

    const roleTitle = item.role_title ?? item.title ?? "Unknown Role";

    map.set(id, {
      id,
      candidateName,
      roleTitle,

      // 👇 derive initials safely
      // initials: getInitials(candidateName),
      initials: "AB",

      // 👇 you don’t have API value, so fallback logic
      scheduledLabel: item.scheduled_at ?? item.scheduledAt ?? "Not scheduled",

      // 👇 map API status into your UI type
      // listStatus: mapStatus(item.status),
      listStatus: "none",
    });
  }

  return Array.from(map.values());
}
