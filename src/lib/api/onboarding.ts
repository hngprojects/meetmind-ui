import api from "@/lib/api";

const setRole = async (data: {
  companyName: string;
  role: string;
  hires: string;
}) => {
  const res = await api.post("/api/v1/onboarding/role", data);
  return res.data;
};

const setPreferences = async (data: {
  tone: string;
  preferences: {
    dynamic: boolean;
    autoRecord: boolean;
    announce: boolean;
  };
}) => {
  const res = await api.post("/api/v1/onboarding/preferences", data);
  return res.data;
};

const setIntegrations = async (data: {
  integrations: "google" | "zoom" | null;
}) => {
  const res = await api.post("/api/v1/onboarding/integrations", data);
  return res.data;
};

const completeOnboarding = async () => {
  const res = await api.post("/api/v1/onboarding/complete");
  return res.data;
};

export const onboardingAPI = {
  setRole,
  setPreferences,
  setIntegrations,
  completeOnboarding,
};
