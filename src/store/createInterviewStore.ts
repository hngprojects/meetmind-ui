// store/interviewStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AddContextFormData } from "@/schemas/addContextSchema";
import { useUserDetailsStore } from "./userDetail";

// ── Types ─────────────────────────────────────────────────────────────────────

type ModalStore = {
  open: boolean;
  toggle: () => void;
  setOpen: (open: boolean) => void;
  reset: () => void;
};

type Step2Store = {
  step2: boolean;
  toggle2: () => void;
  setStep2: (value: boolean) => void;
  reset: () => void;
};

type Step1Store = {
  step1: boolean;
  toggle1: () => void;
  setStep1: (value: boolean) => void;
  reset: () => void;
};

type UploadStore = {
  UploadOpen: boolean;
  toggleUpload: () => void;
  setUploadOpen: (value: boolean) => void;
  reset: () => void;
};

type step3Store = {
  step3: boolean;
  toggle3: () => void;
  setStep3: (value: boolean) => void;
  reset: () => void;
};

type step4Store = {
  step4: boolean;
  toggle4: () => void;
  setStep4: (value: boolean) => void;
  reset: () => void;
};

interface AddContextState {
  contextData: AddContextFormData | null;
  interviewId: string | null;
  setContextData: (data: AddContextFormData) => void;
  setInterviewId: (id: string) => void;
  resetContext: () => void;
}

// ── Initial States ────────────────────────────────────────────────────────────

const initialModalState = { open: false };
const initialStep1State = { step1: true };
const initialStep2State = { step2: false };
const initialUploadState = { UploadOpen: true };
const initialStep3State = { step3: false };
const initialStep4State = { step4: false };

// ── Stores ────────────────────────────────────────────────────────────────────

export const useCreateStore = create<ModalStore>((set) => ({
  ...initialModalState,
  toggle: () => set((state) => ({ open: !state.open })),
  setOpen: (value) => set({ open: value }),
  reset: () => set(initialModalState),
}));

export const useCreateStep1 = create<Step1Store>((set) => ({
  ...initialStep1State,
  toggle1: () => set((state) => ({ step1: !state.step1 })),
  setStep1: (value) => set({ step1: value }),
  reset: () => set(initialStep1State),
}));

export const useCreateStep2 = create<Step2Store>((set) => ({
  ...initialStep2State,
  toggle2: () => set((state) => ({ step2: !state.step2 })),
  setStep2: (value) => set({ step2: value }),
  reset: () => set(initialStep2State),
}));

export const useUpload = create<UploadStore>((set) => ({
  ...initialUploadState,
  toggleUpload: () => set((state) => ({ UploadOpen: !state.UploadOpen })),
  setUploadOpen: (value) => set({ UploadOpen: value }),
  reset: () => set(initialUploadState),
}));

export const useCreateStep3 = create<step3Store>((set) => ({
  ...initialStep3State,
  toggle3: () => set((state) => ({ step3: !state.step3 })),
  setStep3: (value) => set({ step3: value }),
  reset: () => set(initialStep3State),
}));

export const useCreateStep4 = create<step4Store>((set) => ({
  ...initialStep4State,
  toggle4: () => set((state) => ({ step4: !state.step4 })),
  setStep4: (value) => set({ step4: value }),
  reset: () => set(initialStep4State),
}));

export const useAddContextStore = create<AddContextState>()(
  persist(
    (set) => ({
      contextData: null,
      interviewId: null,
      setContextData: (data) => set({ contextData: data }),
      setInterviewId: (id) => set({ interviewId: id }),
      resetContext: () => set({ contextData: null, interviewId: null }),
    }),
    { name: "add-context-store" },
  ),
);

// ── Reset All Stores ──────────────────────────────────────────────────────────

export const resetAllStores = () => {
  // UI step stores
  useCreateStore.getState().reset();
  useCreateStep1.getState().reset();
  useCreateStep2.getState().reset();
  useUpload.getState().reset();
  useCreateStep3.getState().reset();
  useCreateStep4.getState().reset();

  // Persisted stores — clears state + localStorage
  useAddContextStore.getState().resetContext();
  useUserDetailsStore.getState().resetUserDetails(); // ← added
};
