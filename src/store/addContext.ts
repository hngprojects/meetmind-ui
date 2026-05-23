// store/useModalStore.ts
import { create } from "zustand";

type addStore = {
  add: boolean;
  toggle: () => void;
  setAdd: (add: boolean) => void;
};
export const useCreateStore = create<addStore>((set) => ({
  add: true,
  toggle: () => set((state) => ({ add: !state.add })),
  setAdd: (value: boolean) => set({ add: value }),
}));
