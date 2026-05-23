// store/useModalStore.ts
import { create } from "zustand";

type step1Store = {
  step1: boolean;
  toggle: () => void;
  setStep1: (step1: boolean) => void;
};
export const useCreateStep1 = create<step1Store>((set) => ({
  step1: true,
  toggle: () => set((state) => ({ step1: !state.step1 })),
  setStep1: (value: boolean) => set({ step1: value }),
}));
