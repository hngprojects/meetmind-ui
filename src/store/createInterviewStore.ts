// store/useModalStore.ts
import { create } from "zustand";

type ModalStore = {
  open: boolean;
  toggle: () => void;
  setOpen: (open: boolean) => void;
};
export const useCreateStore = create<ModalStore>((set) => ({
  open: false,
  toggle: () => set((state) => ({ open: !state.open })),
  setOpen: (value: boolean) => set({ open: value }),
}));
