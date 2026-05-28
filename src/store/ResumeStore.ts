import { create } from "zustand";
import { persist } from "zustand/middleware";

// ── Types ─────────────────────────────────────────────────────────────────────
interface ExtractedDetails {
  full_name: string;
  email: string;
  phone: string;
  current_role: string;
  years_of_experience: number;
  skills: string[];
  location: string;
  portfolio_url: string;
}

interface ResumeUploadState {
  candidateId: string | null;
  extractedDetails: ExtractedDetails | null;
  setCandidateId: (id: string) => void;
  setExtractedDetails: (details: ExtractedDetails) => void;
  resetResume: () => void;
}

// ── Store ─────────────────────────────────────────────────────────────────────
export const useResumeStore = create<ResumeUploadState>()(
  persist(
    (set) => ({
      candidateId: null,
      extractedDetails: null,
      setCandidateId: (id) => set({ candidateId: id }),
      setExtractedDetails: (details) => set({ extractedDetails: details }),
      resetResume: () => set({ candidateId: null, extractedDetails: null }),
    }),
    { name: "resume-store" },
  ),
);
