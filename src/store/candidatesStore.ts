import { create } from "zustand";

export type ViewMode = "list" | "grid";

export interface CandidateFilters {
  status: "all" | "ongoing" | "completed" | "needs_review";
  search: string;
  sortBy: "date" | "score" | "name";
  sortDirection: "asc" | "desc";
  page: number;
  pageSize: number;
}

interface CandidatesState {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  filters: CandidateFilters;
  setFilters: (filters: Partial<CandidateFilters>) => void;
  resetFilters: () => void;
  selectedCandidateId: string | null;
  setSelectedCandidateId: (id: string | null) => void;
  exportOpen: boolean;
  setExportOpen: (v: boolean) => void;
}

const initialFilters: CandidateFilters = {
  status: "all",
  search: "",
  sortBy: "date",
  sortDirection: "desc",
  page: 1,
  pageSize: 20,
};

export const useCandidatesStore = create<CandidatesState>((set) => ({
  viewMode: "list",
  setViewMode: (mode) => set({ viewMode: mode }),
  filters: initialFilters,
  setFilters: (newFilters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
        page: newFilters.page ?? 1,
      },
    })),
  resetFilters: () => set({ filters: initialFilters }),
  selectedCandidateId: null,
  setSelectedCandidateId: (id) => set({ selectedCandidateId: id }),
  exportOpen: false,
  setExportOpen: (v) => set({ exportOpen: v }),
}));
