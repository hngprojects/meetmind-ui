import { OnboardingData } from "@/store/onboardingStore";

export async function submitOnboarding(data: OnboardingData) {
  const res = await fetch(
    "https://api.staging.meetmind.hng14.com/api/onboarding",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) throw new Error("Failed to submit onboarding");

  return res.json();
}
