import { create } from "zustand";

type UploadStore = {
  UploadOpen: boolean;
  toggleUpload: () => void;
  setUploadOpen: (UploadOpen: boolean) => void;
};

type InputStore = {
  InputOpen: boolean;
  toggleInput: () => void;
  setInputOpen: (InputOpen: boolean) => void;
};

export const useInput = create<InputStore>((set) => ({
  InputOpen: false,
  toggleInput: () =>
    set((state) => ({
      InputOpen: !state.InputOpen,
    })),
  setInputOpen: (value: boolean) =>
    set({
      InputOpen: value,
    }),
}));

export const useUpload = create<UploadStore>((set) => ({
  UploadOpen: true,
  toggleUpload: () =>
    set((state) => ({
      UploadOpen: !state.UploadOpen,
    })),
  setUploadOpen: (value: boolean) =>
    set({
      UploadOpen: value,
    }),
}));
