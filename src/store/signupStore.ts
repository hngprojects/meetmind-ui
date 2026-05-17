import { create } from "zustand";
import { type SignUpType } from "@/schemas/signUpSchema";

type FocusedFields = Partial<Record<keyof SignUpType, boolean>>;

interface SignupStore {
  // ui state
  isLoading: boolean;
  isSuccess: boolean;
  serverError: string | null;
  focusedFields: FocusedFields;
  formData: SignUpType | null;
  setFormData: (data: SignUpType) => void;

  // actions
  setIsLoading: (val: boolean) => void;
  setIsSuccess: (val: boolean) => void;
  setServerError: (msg: string | null) => void;
  handleFocus: (field: keyof SignUpType) => void;
  handleBlur: (field: keyof SignUpType) => void;
}

export const useSignupStore = create<SignupStore>((set) => ({
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
