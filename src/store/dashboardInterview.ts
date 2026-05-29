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

export const useDashboardStore = create<DashboardState>((set) => ({
  overview: null,
  loading: false,
  error: null,

  getOverview: async () => {
    set({ loading: true, error: null });
    try {
      const data: DashboardResponse = await fetchDashboardOverview();
      set({ overview: data.data }); // unwrap the nested `data`
    } catch (err: string) {
      set({ error: err.response?.data?.message ?? err.message });
    } finally {
      set({ loading: false });
    }
  },
}));
