import Image from "next/image";
import { Button } from "@/components/ui/button";
import { onboardingStore } from "../../../../store/onboardingStore";
import { ArrowLeft } from "lucide-react";
import TonePicker from "../onboarding/TonePicker";
import { ToggleCard } from "../onboarding/ToggleCard";

const Step3 = () => {
  const data = onboardingStore((state) => state.data);
  const updateData = onboardingStore((state) => state.updateData);
  const nextStep = onboardingStore((state) => state.nextStep);
  const prevStep = onboardingStore((state) => state.prevStep);
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
            Set Your AI Preferences
          </h3>
          <p className="font-medium text-center max-w-sm">
            These become the default for every interview. Override anytime per
            interview.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <TonePicker />

          <div className="flex flex-col gap-3">
            <ToggleCard
              title="Dynamic follow-ups"
              description="AI adapts questions based on interviews"
              enabled={data.preferences.dynamic}
              onToggle={() =>
                updateData({
                  preferences: {
                    ...data.preferences,
                    dynamic: !data.preferences.dynamic,
                  },
                })
              }
            />
            <ToggleCard
              title="Auto record all interviews"
              description="Every session recorded by default"
              enabled={data.preferences.autoRecord}
              onToggle={() =>
                updateData({
                  preferences: {
                    ...data.preferences,
                    autoRecord: !data.preferences.autoRecord,
                  },
                })
              }
            />
            <ToggleCard
              title="Announce recording to client"
              description="AI notifies candidate at the start"
              enabled={data.preferences.announce}
              onToggle={() =>
                updateData({
                  preferences: {
                    ...data.preferences,
                    announce: !data.preferences.announce,
                  },
                })
              }
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <Button
            onClick={nextStep}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Continue
          </Button>
          <Button onClick={prevStep} variant="ghost" className="w-fit">
            <ArrowLeft></ArrowLeft>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step3;
