export const PRICING_PLANS = [
  {
    name: "STARTER",
    price: "$0",
    description: "Open source self-hosted",
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
  },
  {
    name: "PRO",
    price: "$89",
    description: "Managed API, no infra needed",
    buttonText: "Start Free Trial",
    buttonVariant: "solid" as const,
  },
  {
    name: "ENTERPRISE",
    price: "Custom",
    description:
      "For large organizations with advanced security and compliance needs.",
    buttonText: "Talk to us",
    buttonVariant: "outline" as const,
    isCustom: true,
  },
] as const;

export const FEATURES_LIST = [
  "Python SDK access",
  "REST API endpoints",
  "Pre-session document upload",
  "Resume & candidate profile ingestion",
  "Real-time audio ingestion",
  "Live speech-to-text transcription",
  "Raised hand event detection",
] as const;
