// store/userDetailStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ── Types ─────────────────────────────────────────────────────────────────────

interface CandidateDetails {
  candidate_id: string;
  full_name: string;
  email: string;
  phone: string;
  current_role: string;
  years_of_experience: number;
  skills: string[];
  location: string;
  portfolio_url: string;
}

interface InterviewDetails {
  role_title: string;
  job_description: string;
  custom_question: string;
  skills_to_assess: string[];
}

interface AIConfig {
  ai_tone: "professional" | "friendly" | "casual";
  participation_mode: "brief" | "moderate" | "detailed";
  platform: "zoom" | "google_meet";
  call_link: string;
  scheduled_start: string;
  scheduled_end: string;
}

interface UserDetailsState {
  candidate: Partial<CandidateDetails>;
  interviewDetails: Partial<InterviewDetails>;
  aiConfig: Partial<AIConfig>;

  setCandidate: (data: Partial<CandidateDetails>) => void;
  setInterviewDetails: (data: Partial<InterviewDetails>) => void;
  setAIConfig: (data: Partial<AIConfig>) => void;

  buildPayload: (candidateId: string) => object;
  resetUserDetails: () => void;
}

// ── Initial State ─────────────────────────────────────────────────────────────

const initialUserDetailsState = {
  candidate: {},
  interviewDetails: {},
  aiConfig: {},
} satisfies Pick<
  UserDetailsState,
  "candidate" | "interviewDetails" | "aiConfig"
>;

// ── Store ─────────────────────────────────────────────────────────────────────

export const useUserDetailsStore = create<UserDetailsState>()(
  persist(
    (set, get) => ({
      ...initialUserDetailsState,

      setCandidate: (data) =>
        set((state) => ({ candidate: { ...state.candidate, ...data } })),

      setInterviewDetails: (data) =>
        set((state) => ({
          interviewDetails: { ...state.interviewDetails, ...data },
        })),

      setAIConfig: (data) =>
        set((state) => ({ aiConfig: { ...state.aiConfig, ...data } })),

      buildPayload: (candidateId: string) => {
        const { candidate, interviewDetails, aiConfig } = get();
        return {
          candidate: {
            candidate_id: candidateId,
            full_name: candidate.full_name ?? "",
            email: candidate.email ?? "",
            phone: candidate.phone ?? "",
            current_role: candidate.current_role ?? "",
            years_of_experience: candidate.years_of_experience ?? 0,
            skills: candidate.skills ?? [],
            location: candidate.location ?? "",
            portfolio_url: candidate.portfolio_url ?? "",
          },
          role_title: interviewDetails.role_title ?? "",
          job_description: interviewDetails.job_description ?? "",
          custom_question: interviewDetails.custom_question ?? "",
          skills_to_assess: interviewDetails.skills_to_assess ?? [],
          ai_tone: aiConfig.ai_tone ?? "friendly",
          participation_mode: aiConfig.participation_mode ?? "moderate",
          platform: aiConfig.platform ?? "zoom",
          call_link: aiConfig.call_link ?? "",
          scheduled_start: aiConfig.scheduled_start ?? "",
          scheduled_end: aiConfig.scheduled_end ?? "",
        };
      },

      resetUserDetails: () => {
        set(initialUserDetailsState);
        localStorage.removeItem("user-details-store");
      },
    }),
    { name: "user-details-store" },
  ),
);
