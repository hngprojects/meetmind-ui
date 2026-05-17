import { Button } from "@/components/ui/button";
import { onboardingStore } from "../../../../store/onboardingStore";
import { ArrowLeft, LayoutGrid, Bot, Contact, Zap } from "lucide-react";
import Card from "../onboarding/Card";
import Image from "next/image";

const Step5 = () => {
  const submitOnboarding = onboardingStore((s) => s.submitOnboarding);
  const isSubmitting = onboardingStore((s) => s.isSubmitting);
  const prevStep = onboardingStore((s) => s.prevStep);
  return (
    <div className="flex flex-col justify-center gap-6 lg:max-w-md md:w-full lg:w-auto">
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

        <div className="flex flex-col items-center justify-center gap-2">
          <h3 className="font-bold text-[40px] leading-12 text-center">
            Welcome To MeetMind
          </h3>
          <p className="font-medium text-center max-w-sm">
            You’re in. Let’s do a quick 30-second tour so you know exactly where
            everything lives.
          </p>

          <div className="grid grid-cols-2 gap-4 w-full mb-10">
            <Card
              icon={<LayoutGrid size={20} strokeWidth={1.5} />}
              title="Live dashboard"
              description="See ongoing interviews and results at a glance."
            />
            <Card
              icon={<Bot size={20} strokeWidth={1.5} />}
              title="AI interviewer"
              description="Set up once, run interview autonomously."
            />
            <Card
              icon={<Contact size={20} strokeWidth={1.5} />}
              title="Candidates Profile"
              description="Full transcript score and recording per candidate."
            />
            <Card
              icon={<Zap size={20} strokeWidth={1.5} />}
              title="1-click actions"
              description="Retry, reschedule or send feedback instantly."
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Button
          onClick={submitOnboarding}
          disabled={isSubmitting}
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isSubmitting ? "Setting things up..." : "Take the tour"}
        </Button>
        <Button onClick={prevStep} variant="ghost" className="w-fit">
          <ArrowLeft></ArrowLeft>
          Back
        </Button>
      </div>
    </div>
  );
};

export default Step5;
