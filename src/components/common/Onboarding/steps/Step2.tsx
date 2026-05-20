import Image from "next/image";
import { Button } from "@/components/ui/button";
import { onboardingStore } from "../../../../store/onboardingStore";
import { HireRadioGroup, type HireOption } from "../onboarding/RadioCard";
import Input from "../onboarding/Input";
import Select from "../onboarding/Select";
import { GoArrowLeft } from "react-icons/go";

const hireOptions: HireOption[] = [
  {
    value: "1-5",
    title: "1 - 5 hires",
    description: "Small team or solo recruiter",
  },
  {
    value: "6-20",
    title: "6-20 hires",
    description: "Small team or solo recruiter",
  },
  {
    value: "20+",
    title: "20+ hires",
    description: "High-volume and enterprise hiring",
  },
];

const Step2 = () => {
  const data = onboardingStore((state) => state.data);
  const updateData = onboardingStore((state) => state.updateData);
  const nextStep = onboardingStore((state) => state.nextStep);
  const prevStep = onboardingStore((state) => state.prevStep);
  const hasAttemptedStep = onboardingStore((state) => state.hasAttemptedStep);
  const isValid =
    data.companyName.trim() !== "" &&
    data.role.trim() !== "" &&
    data.hires.trim() !== "";
  return (
    <div className="flex flex-col justify-center gap-6 md:w-full lg:w-auto">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-6 sm:mb-8 lg:mb-4 flex gap-4 justify-center items-center">
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

        <div className="flex flex-col items-center gap-2">
          <h3 className="font-bold text-3xl sm:text-3xl md:text-4xl leading-12 text-center">
            Set Up Your Workplace
          </h3>
          <p className="font-medium text-center max-w-sm">
            Tell us a bit about how you’ll use MeetMind. we’ll tailor things for
            you
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Input
            label="Company name"
            placeholder="e.g Emerj LLC"
            value={data.companyName}
            onChange={(e) => updateData({ companyName: e.target.value })}
          />
          <Select
            value={data.role}
            onChange={(e) => updateData({ role: e.target.value })}
            options={[
              { value: "ceo", label: "CEO" },
              { value: "founder", label: "Founder" },
              { value: "engineer", label: "Engineer" },
            ]}
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="no-of-hires">How many hires are you planning</label>

            <HireRadioGroup
              options={hireOptions}
              defaultValue={data.hires}
              onValueChange={(val) => updateData({ hires: val })}
            />
          </div>
        </div>

        {!isValid && hasAttemptedStep && (
          <p className="text-xs text-red-500">
            Please fill all required fields before continuing
          </p>
        )}

        <div className="flex flex-col gap-2 items-center">
          <Button
            onClick={nextStep}
            disabled={!isValid}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Continue
          </Button>
          <Button onClick={prevStep} variant="ghost" className="w-fit">
            <GoArrowLeft />
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step2;
