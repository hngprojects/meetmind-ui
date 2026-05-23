// store/useModalStore.ts
import { create } from "zustand";

type step2Store = {
  step2: boolean;
  toggle2: () => void;
  setStep2: (step1: boolean) => void;
};
export const useCreateStep2 = create<step2Store>((set) => ({
  step2: false,
  toggle2: () => set((state) => ({ step2: !state.step2 })),
  setStep2: (value: boolean) => set({ step2: value }),
}));
