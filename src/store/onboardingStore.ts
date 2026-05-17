import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OnboardingData {
  companyName: string;
  role: string;
  hires: string;
  tone: string;
  preferences: {
    dynamic: boolean;
    autoRecord: boolean;
    announce: boolean;
  };
  integrations: "google" | "zoom" | null;
}

interface OnboardingState {
  step: StepNumber;
  data: OnboardingData;
  isSubmitting: boolean;
  setStep: (step: StepNumber) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (partial: Partial<OnboardingData>) => void;
  validateStep: () => boolean;
  hasAttemptedStep: boolean;
  setHasAttemptedStep: (value: boolean) => void;
  submitOnboarding: () => Promise<void>;
  reset: () => void;
}

export type StepNumber = 1 | 2 | 3 | 4 | 5;

const initialData: OnboardingData = {
  companyName: "",
  role: "",
  hires: "",
  tone: "Friendly",
  preferences: {
    dynamic: true,
    autoRecord: true,
    announce: false,
  },
  integrations: null,
};

export const onboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      step: 1,
      data: initialData,
      isSubmitting: false,
      hasAttemptedStep: false,
      setHasAttemptedStep: (value) => set({ hasAttemptedStep: value }),
      setStep: (step) => set({ step }),
      nextStep: () => {
        const { step, validateStep } = get();
        if (!validateStep()) {
          set({ hasAttemptedStep: true });
          return;
        } 
        set({
          step: Math.min(step + 1, 5) as StepNumber,
          hasAttemptedStep: false,
        });
      },
      prevStep: () => {
        set((state) => ({
          step: Math.max(1, state.step - 1) as StepNumber,
        }));
      },
      updateData: (partial) =>
        set((state) => ({
          data: {
            ...state.data,
            ...partial,
            preferences: {
              ...state.data.preferences,
              ...partial.preferences,
            },
          },
        })),
      validateStep: () => {
        const { step, data } = get();

        const validators: Record<StepNumber, () => boolean> = {
          1: () => true,
          2: () =>
            data.companyName.trim() !== "" &&
            data.role.trim() !== "" &&
            data.hires.trim() !== "",
          3: () => true,
          4: () => data.integrations !== null,
          5: () => true,
        };

        return validators[step]();
      },
      submitOnboarding: async () => {
        const { data, isSubmitting } = get();
        if (isSubmitting) return;

        set({ isSubmitting: true });

        try {
          const response = await fetch(
            "the actual api route. For when you talk to the backend",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            },
          );
          if (!response.ok) throw new Error("Failed to submit onboarding");
          const result = await response.json();
          return result;
          // NOTE TO ANYONE REVIEWING THIS PART: The api call is not complete. I just wanted to put it in place so that I wont forget.
        } catch (error) {
          console.error("Onboarding failed:", error);
        } finally {
          set({ isSubmitting: false });
        }
      },
      reset: () =>
        set({
          step: 1,
          data: initialData,
          hasAttemptedStep: false,
        }),
    }),
    {
      name: "onboarding-storage",
      partialize: (state) => ({
        step: state.step,
        data: state.data,
      }),
    },
  ),
);
