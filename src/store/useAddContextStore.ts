import { AddContextFormData } from "@/schemas/addContextSchema";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AddContextState {
  contextData: AddContextFormData | null;
  step: "form" | "submitted";
  setContextData: (data: AddContextFormData) => void;
  resetForm: () => void;
}

export const useAddContextStore = create<AddContextState>()(
  persist(
    (set) => ({
      contextData: null,
      step: "form",

      setContextData: (data) => set({ contextData: data, step: "submitted" }),

      resetForm: () => set({ contextData: null, step: "form" }),
    }),
    { name: "add-context-store" },
  ),
);
