import {
  fetchInterviewOverview,
  fetchInterviewSessions,
  fetchSchedule,
  fetchCompleted,
  fetchInterviews,
} from "@/components/common/dash/liveInterview/apiCall";
import { create } from "zustand";

// ── Types ─────────────────────────────────────────────────────────────────────
interface DashboardStats {
  total: number;
  in_progress: number;
  scheduled: number;
  completed: number;
  needs_attention: number;
}

interface DashboardOverview {
  has_sessions: boolean;
  stats: DashboardStats;
}

interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardOverview;
}

interface Session {
  interview_id: string;
  candidate_name: string;
  role_title: string;
  elapsed_seconds: number | null;
  questions_asked: number;
  questions_total: number;
}

interface SessionsResponse {
  success: boolean;
  message: string;
  data: {
    live_interviews: Session[];
  };
}

interface ScheduleItem {
  interview_id: string;
  candidate_name: string;
  role: string;
  start_time: string;
  end_time: string;
}

interface ScheduleResponse {
  success: boolean;
  message: string;
  data: ScheduleItem[];
}

interface CompletedItem {
  interview_id: string;
  candidate_name: string;
  role: string;
  score: number | null;
  completed_at: string | null;
}

interface CompletedResponse {
  success: boolean;
  message: string;
  data: CompletedItem[];
}

// ── NEW: Interview types ───────────────────────────────────────────────────────
interface InterviewItem {
  id: string;
  interview_id: string | null;
  candidate_name: string;
  role_title: string;
  title: string | null;
  platform: string;
  status: string;
  scheduled_start: string | null;
  scheduled_time: string | null;
  participation_mode: string;
  created_at: string;
}

interface InterviewsResponse {
  success: boolean;
  message: string;
  data: InterviewItem[];
}

interface DashboardState {
  overview: DashboardOverview | null;
  overviewLoading: boolean;
  overviewError: string | null;
  getOverview: () => Promise<void>;

  sessions: Session[];
  sessionsLoading: boolean;
  sessionsError: string | null;
  getSessions: () => Promise<void>;

  schedule: ScheduleItem[];
  scheduleLoading: boolean;
  scheduleError: string | null;
  getSchedule: () => Promise<void>;

  completed: CompletedItem[];
  completedLoading: boolean;
  completedError: string | null;
  getCompleted: () => Promise<void>;

  // ── NEW ──
  interviews: InterviewItem[];
  interviewsLoading: boolean;
  interviewsError: string | null;
  getInterviews: () => Promise<void>;
}

// ── Axios error helper ────────────────────────────────────────────────────────
interface AxiosLikeError {
  response?: { data?: { message?: string } };
  message?: string;
}

const getErrorMessage = (err: unknown): string => {
  const e = err as AxiosLikeError;
  return e?.response?.data?.message ?? e?.message ?? "Something went wrong";
};

// ── Store ─────────────────────────────────────────────────────────────────────
export const useDashboardStore = create<DashboardState>((set) => ({
  // overview
  overview: null,
  overviewLoading: false,
  overviewError: null,
  getOverview: async () => {
    set({ overviewLoading: true, overviewError: null });
    try {
      const data: DashboardResponse = await fetchInterviewOverview();
      set({ overview: data.data });
    } catch (err: unknown) {
      set({ overviewError: getErrorMessage(err) });
    } finally {
      set({ overviewLoading: false });
    }
  },

  // sessions
  sessions: [],
  sessionsLoading: false,
  sessionsError: null,
  getSessions: async () => {
    set({ sessionsLoading: true, sessionsError: null });
    try {
      const data: SessionsResponse = await fetchInterviewSessions();
      set({ sessions: data.data.live_interviews });
    } catch (err: unknown) {
      set({ sessionsError: getErrorMessage(err) });
    } finally {
      set({ sessionsLoading: false });
    }
  },

  // schedule
  schedule: [],
  scheduleLoading: false,
  scheduleError: null,
  getSchedule: async () => {
    set({ scheduleLoading: true, scheduleError: null });
    try {
      const data: ScheduleResponse = await fetchSchedule();
      set({ schedule: data.data });
    } catch (err: unknown) {
      set({ scheduleError: getErrorMessage(err) });
    } finally {
      set({ scheduleLoading: false });
    }
  },

  // completed
  completed: [],
  completedLoading: false,
  completedError: null,
  getCompleted: async () => {
    set({ completedLoading: true, completedError: null });
    try {
      const data: CompletedResponse = await fetchCompleted();
      set({ completed: data.data });
    } catch (err: unknown) {
      set({ completedError: getErrorMessage(err) });
    } finally {
      set({ completedLoading: false });
    }
  },

  // ── NEW: interviews ───────────────────────────────────────────────────────
  interviews: [],
  interviewsLoading: false,
  interviewsError: null,
  getInterviews: async () => {
    set({ interviewsLoading: true, interviewsError: null });
    try {
      const data: InterviewsResponse = await fetchInterviews();
      set({ interviews: data.data });
    } catch (err: unknown) {
      set({ interviewsError: getErrorMessage(err) });
    } finally {
      set({ interviewsLoading: false });
    }
  },
}));
