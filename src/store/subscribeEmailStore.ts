import { create } from "zustand";
import { type subscribeEmailType } from "@/schemas/subscribeEmail";

type FocusedFields = Partial<Record<keyof subscribeEmailType, boolean>>;

interface subscribeStore {
  // ui state
  isLoading: boolean;
  isSuccess: boolean;
  serverError: string | null;
  focusedFields: FocusedFields;
  formData: subscribeEmailType | null;
  setFormData: (data: subscribeEmailType) => void;

  // actions
  setIsLoading: (val: boolean) => void;
  setIsSuccess: (val: boolean) => void;
  setServerError: (msg: string | null) => void;
  handleFocus: (field: keyof subscribeEmailType) => void;
  handleBlur: (field: keyof subscribeEmailType) => void;
}

export const usesubscribeStore = create<subscribeStore>((set) => ({
  isLoading: false,
  isSuccess: false,
  serverError: null,
  focusedFields: {},
  formData: null,

  setIsLoading: (val) => set({ isLoading: val }),
  setIsSuccess: (val) => set({ isSuccess: val }),
  setFormData: (data) => set({ formData: data }),
  setServerError: (msg) => set({ serverError: msg }),

  handleFocus: (field) =>
    set((state) => ({
      focusedFields: { ...state.focusedFields, [field]: true },
    })),

  handleBlur: (field) =>
    set((state) => ({
      focusedFields: { ...state.focusedFields, [field]: false },
    })),
}));
