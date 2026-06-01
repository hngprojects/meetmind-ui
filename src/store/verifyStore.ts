// store/verifyStore.ts

import { create } from "zustand";

interface VerifyStore {
  pendingEmail: string | null;

  setPendingEmail: (email: string) => void;
  clearPendingEmail: () => void;
}

export const useVerifyStore = create<VerifyStore>((set) => ({
  pendingEmail: null,

  setPendingEmail: (email) =>
    set({
      pendingEmail: email,
    }),

  clearPendingEmail: () =>
    set({
      pendingEmail: null,
    }),
}));
