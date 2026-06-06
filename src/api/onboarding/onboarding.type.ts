import type { ApiResponse } from "../base/base.type";

// ── Role ─────────────────────────────────────────────────────────────────────
export interface SetRolePayload {
  companyName: string;
  role: string;
  hires: string;
}

export type SetRoleResponse = ApiResponse<unknown>;

// ── Preferences ───────────────────────────────────────────────────────────────
export interface SetPreferencesPayload {
  tone: string;
  preferences: {
    dynamic: boolean;
    autoRecord: boolean;
    announce: boolean;
  };
}

export type SetPreferencesResponse = ApiResponse<unknown>;

// ── Integrations ──────────────────────────────────────────────────────────────
export interface SetIntegrationsPayload {
  integrations: "google" | "zoom" | "livekit" | null;
}

export type SetIntegrationsResponse = ApiResponse<unknown>;

// ── Complete ──────────────────────────────────────────────────────────────────
export type CompleteOnboardingResponse = ApiResponse<unknown>;
