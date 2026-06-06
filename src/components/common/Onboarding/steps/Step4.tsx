"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { onboardingStore } from "../../../../store/onboardingStore";
import { IntegrationCard } from "../onboarding/IntegrationCard";
import Image from "next/image";
import { GoArrowLeft } from "react-icons/go";
import { useSetIntegrations } from "@/api/onboarding";
import { Bot } from "lucide-react";

const Step4 = () => {
  const data = onboardingStore((state) => state.data);
  const updateData = onboardingStore((state) => state.updateData);
  const nextStep = onboardingStore((state) => state.nextStep);
  const prevStep = onboardingStore((state) => state.prevStep);
  const addToast = onboardingStore((s) => s.addToast);
  useEffect(() => {
    if (data.integrations !== "livekit") {
      updateData({ integrations: "livekit" });
    }
  }, [data.integrations, updateData]);

  const mutation = useSetIntegrations({
    onSuccess: () => {
      nextStep();
    },
    onError: () => {
      addToast("Failed to save meeting tool", "error");
    },
  });
  return (
    <div className="flex flex-col justify-center gap-6 md:w-full lg:w-auto">
      <div className="flex flex-col items-center justify-center">
        <div className="flex gap-4 justify-center items-center">
          <Image
            src="/onboarding/MeetmindLogo.svg"
            width={60}
            height={60}
            alt="Meetmind Logo"
            className="h-10 sm:h-12 md:h-14 lg:h-15 w-auto"
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl tracking-[-2%] font-bold leading-14">
            Meet<span className="text-primary">Mind</span>
          </h1>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="font-bold text-[40px] leading-12 text-center">
            Connect Your Meeting Tool
          </h3>
          <p className="font-medium text-center max-w-sm">
            MeetMind AI needs to join your calls. Connect at least one platform
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="w-full space-y-3 mb-8">
          <IntegrationCard
            name="Google Meet"
            logo={
              <Image
                src="/onboarding/Google.svg"
                width={24}
                height={24}
                alt="Google"
              />
            }
            isConnected={false}
            disabled={true}
            onConnect={() => undefined}
          />
          <IntegrationCard
            name="Zoom"
            logo={
              <Image
                src="/onboarding/Zoom.svg"
                width={24}
                height={24}
                alt="Zoom"
              />
            }
            isConnected={false}
            disabled={true}
            onConnect={() => undefined}
          />
          <IntegrationCard
            name="LiveKit"
            logo={
              <Bot
                size={24}
                aria-label="LiveKit"
                className="text-[var(--color-brand-primary)]"
              />
            }
            isConnected={true}
            disabled={false}
            connectedLabel="Connected"
          />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <Button
            onClick={() =>
              mutation.mutate({
                integrations: "livekit",
              })
            }
            disabled={mutation.isPending}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {mutation.isPending ? "Saving..." : "Continue"}
          </Button>
          <Button
            onClick={prevStep}
            disabled={mutation.isPending}
            variant="ghost"
            className="w-fit"
          >
            <GoArrowLeft />
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step4;
