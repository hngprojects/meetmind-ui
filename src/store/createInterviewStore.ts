// store/interviewStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AddContextFormData } from "@/schemas/addContextSchema";

// ── Types ─────────────────────────────────────────────────────────────────────

type ModalStore = {
  open: boolean;
  toggle: () => void;
  setOpen: (open: boolean) => void;
};

type Step2Store = {
  step2: boolean;
  toggle2: () => void;
  setStep2: (value: boolean) => void;
};

type Step1Store = {
  step1: boolean;
  toggle1: () => void;
  setStep1: (value: boolean) => void;
};

type UploadStore = {
  UploadOpen: boolean;
  toggleUpload: () => void;
  setUploadOpen: (value: boolean) => void;
};

type step3Store = {
  step3: boolean;
  toggle3: () => void;
  setStep3: (value: boolean) => void;
};

type step4Store = {
  step4: boolean;
  toggle4: () => void;
  setStep4: (value: boolean) => void;
};

interface AddContextState {
  contextData: AddContextFormData | null;
  interviewId: string | null;
  setContextData: (data: AddContextFormData) => void;
  setInterviewId: (id: string) => void;
  resetContext: () => void;
}

// ── Stores ────────────────────────────────────────────────────────────────────

// open create interview page
export const useCreateStore = create<ModalStore>((set) => ({
  open: false,
  toggle: () => set((state) => ({ open: !state.open })),
  setOpen: (value) => set({ open: value }),
}));
// open step 1 of create interview page
export const useCreateStep1 = create<Step1Store>((set) => ({
  step1: true,
  toggle1: () => set((state) => ({ step1: !state.step1 })),
  setStep1: (value) => set({ step1: value }),
}));

// open   step 2 of create interview page
export const useCreateStep2 = create<Step2Store>((set) => ({
  step2: false,
  toggle2: () => set((state) => ({ step2: !state.step2 })),
  setStep2: (value) => set({ step2: value }),
}));

export const useUpload = create<UploadStore>((set) => ({
  UploadOpen: true,
  toggleUpload: () => set((state) => ({ UploadOpen: !state.UploadOpen })),
  setUploadOpen: (value) => set({ UploadOpen: value }),
}));

export const useCreateStep3 = create<step3Store>((set) => ({
  step3: false,
  toggle3: () => set((state) => ({ step3: !state.step3 })),
  setStep3: (value) => set({ step3: value }),
}));

export const useCreateStep4 = create<step4Store>((set) => ({
  step4: false,
  toggle4: () => set((state) => ({ step4: !state.step4 })),
  setStep4: (value) => set({ step4: value }),
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
