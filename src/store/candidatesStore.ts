import { create } from "zustand";

export type ViewMode = "list" | "grid";

export interface CandidateFilters {
  status: "all" | "ongoing" | "completed" | "attention";
  role: string | null;
  search: string;
  sortBy: "date" | "score" | "name";
}

interface CandidatesState {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  filters: CandidateFilters;
  setFilters: (filters: Partial<CandidateFilters>) => void;
  resetFilters: () => void;
  search: string;
  setSearch: (v: string) => void;

  page: number;
  setPage: (p: number) => void;

  pageSize: number;
  setPageSize: (n: number) => void;

  selectedCandidateId: string | null;
  setSelectedCandidateId: (id: string | null) => void;
}

const initialFilters: CandidateFilters = {
  status: "all",
  role: null,
  search: "",
  sortBy: "date",
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
      },
    })),
  resetFilters: () => set({ filters: initialFilters }),
  search: "",
  setSearch: (v) => set({ search: v }),
  page: 1,
  setPage: (p) => set({ page: p }),
  pageSize: 20,
  setPageSize: (n) => set({ pageSize: n }),
  selectedCandidateId: null,
  setSelectedCandidateId: (id) => set({ selectedCandidateId: id }),
}));
