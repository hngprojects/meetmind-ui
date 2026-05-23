import api from "@/lib/api";
import { RoleType, PreferencesType, IntegrationsType } from "./types";

const setRole = async (data: RoleType) => {
  const res = await api.post("/api/v1/onboarding/role", data);
  return res.data;
};

const setPreferences = async (data: PreferencesType) => {
  const res = await api.post("/api/v1/onboarding/preferences", data);
  return res.data;
};

const setIntegrations = async (data: IntegrationsType) => {
  const res = await api.post("/api/v1/onboarding/integrations", data);
  return res.data;
};

const completeOnboarding = async () => {
  const res = await api.post("/api/v1/onboarding/submission");
  return res.data;
};

export const onboardingAPI = {
  setRole,
  setPreferences,
  setIntegrations,
  completeOnboarding,
};
