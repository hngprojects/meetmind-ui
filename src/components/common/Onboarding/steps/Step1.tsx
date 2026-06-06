import Image from "next/image";
import { Button } from "@/components/ui/button";
import { onboardingStore } from "../../../../store/onboardingStore";
const Step1 = () => {
  const nextStep = onboardingStore((state) => state.nextStep);
  return (
    <div className="flex flex-col  gap-4">
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

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <h1 className="font-bold text-5xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-2%] md:leading-22  leading-[1.1]">
            Run Interviews. Even when you can’t.
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-7 md:leading-8 font-normal tracking-[0%] text-[#5E6470]">
            Brief Meet Mind, step away, and come back to a fully structured
            interview summary — scorecard covered, flags raised, candidate
            responses logged.
          </p>
        </div>

        <Button
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={nextStep}
          size="lg"
        >
          Get started
        </Button>
      </div>
    </div>
  );
};

export default Step1;
