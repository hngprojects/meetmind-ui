import { fetchDashboardOverview } from "@/components/common/dash/liveInterview/apiCall";
import { create } from "zustand";

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

interface DashboardState {
  overview: DashboardOverview | null;
  loading: boolean;
  error: string | null;
  getOverview: () => Promise<void>;
}

// ── Axios-shaped error helper ─────────────────────────────────────────────────

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
  overview: null,
  loading: false,
  error: null,

  getOverview: async () => {
    set({ loading: true, error: null });
    try {
      const data: DashboardResponse = await fetchDashboardOverview();
      set({ overview: data.data });
    } catch (err: unknown) {
      set({ error: getErrorMessage(err) });
    } finally {
      set({ loading: false });
    }
  },
}));
