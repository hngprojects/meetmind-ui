import { create } from "zustand";
import { persist } from "zustand/middleware";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export interface OnboardingData {
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
  setStep: (step: StepNumber) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (partial: Partial<OnboardingData>) => void;
  toasts: Toast[];
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
  validateStep: () => boolean;
  hasAttemptedStep: boolean;
  setHasAttemptedStep: (value: boolean) => void;
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
      toasts: [],
      hasAttemptedStep: false,
      setHasAttemptedStep: (value) => set({ hasAttemptedStep: value }),
      setStep: (step) => set({ step }),
      nextStep: () => {
        set({ hasAttemptedStep: true });
        const { step, validateStep } = get();
        if (!validateStep()) {
          return;
        }
        set({
          step: Math.min(step + 1, 5) as StepNumber,
          hasAttemptedStep: false,
        });
      },
      addToast: (message, type = "info") => {
        const id =
          globalThis.crypto?.randomUUID?.() ??
          `${Date.now()}-${Math.random().toString(16).slice(2)}`;

        set((state) => ({
          toasts: [...state.toasts, { id, message, type }],
        }));
        setTimeout(() => {
          get().removeToast(id);
        }, 3000);
      },
      removeToast: (id) => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
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
