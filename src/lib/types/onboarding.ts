export type RoleType = {
  companyName: string;
  role: string;
  hires: string;
};

export type PreferencesType = {
  tone: string;
  preferences: {
    dynamic: boolean;
    autoRecord: boolean;
    announce: boolean;
  };
};

export type IntegrationsType = {
  integrations: "google" | "zoom" | "livekit" | null;
};
