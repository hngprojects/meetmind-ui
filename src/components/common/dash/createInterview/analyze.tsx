import Buttons from "@/components/reuseable-component/buttons";
import {
  useCreateStep1,
  useCreateStep2,
  useCreateStep3,
} from "@/store/createInterviewStore";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaFileAlt,
  FaCheckCircle,
  FaUserTie,
  FaBrain,
  FaMagic,
} from "react-icons/fa";
import { IconType } from "react-icons";
import StepIndicator from "./stepIndicator";

type StepStatus = "pending" | "in-progress" | "completed";

interface Step {
  label: string;
  status: StepStatus;
  icon: IconType;
}

const INITIAL_STEPS: Step[] = [
  { label: "Reading file", status: "pending", icon: FaFileAlt },
  {
    label: "Validating data & structure",
    status: "pending",
    icon: FaCheckCircle,
  },
  {
    label: "Extracting candidate information",
    status: "pending",
    icon: FaUserTie,
  },
  { label: "Identifying roles & skills", status: "pending", icon: FaBrain },
  {
    label: "Generating smart recommendations",
    status: "pending",
    icon: FaMagic,
  },
];

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M2.5 7L5.5 10L11.5 4"
      stroke="#1D9E75"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function StatusCircle({ status }: { status: StepStatus }) {
  const borderClass =
    status === "completed" ? "border-[#1D9E75]" : "border-gray-300";

  return (
    <div
      className={`w-6 h-6 rounded-full border-[1.5px] flex items-center justify-center
         flex-shrink-0 transition-colors duration-300 ${borderClass}`}
    >
      {status === "completed" && <CheckIcon />}
    </div>
  );
}

function StatusLabel({ status }: { status: StepStatus }) {
  const colorClass =
    status === "completed"
      ? "text-[#1D9E75]"
      : status === "in-progress"
        ? "text-gray-900"
        : "text-gray-400";

  const label =
    status === "completed"
      ? "Completed"
      : status === "in-progress"
        ? "In Progress"
        : "Pending";

  return (
    <span
      className={`text-sm min-w-[80px] text-right transition-colors duration-300 ${colorClass}`}
    >
      {label}
    </span>
  );
}

export default function Analyzer() {
  const { setStep1 } = useCreateStep1();
  const { setStep2 } = useCreateStep2();
  const { setStep3 } = useCreateStep3();

  const [steps, setSteps] = useState<Step[]>(INITIAL_STEPS);

  const handleback = () => {
    setStep1(true);
    setStep2(false);
  };

  const handleContinue = () => {
    setStep2(false);
    setStep3(true);
  };

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let delay = 0;

    INITIAL_STEPS.forEach((_, index) => {
      const inProgressAt = delay + 1000;
      const completedAt = inProgressAt + 1000;

      timeouts.push(
        setTimeout(() => {
          setSteps((prev) =>
            prev.map((s, i) =>
              i === index ? { ...s, status: "in-progress" } : s,
            ),
          );
        }, inProgressAt),
      );

      timeouts.push(
        setTimeout(() => {
          setSteps((prev) =>
            prev.map((s, i) =>
              i === index ? { ...s, status: "completed" } : s,
            ),
          );
        }, completedAt),
      );

      delay = completedAt;
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);
  return (
    <div className="rounded-2xl text-lg px-3 flex flex-col gap-4">
      <StepIndicator currentStep={2} />
      <h1 className="font-bold">Processing yourdata...</h1>
      <p className="text-text-subtext text-base">
        This may take a few minutes.
      </p>

      <div>
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500">
                    <Icon size={18} />
                  </div>
                </div>
                <span className="text-[15px] text-gray-900">{step.label}</span>
              </div>

              <div className="flex items-center gap-2">
                <StatusLabel status={step.status} />
                <StatusCircle status={step.status} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-row gap-5 justify-end">
        <Buttons
          style="bg-white text-[#3F4555] hover:bg-white/70"
          icon={<FaArrowLeft />}
          text="Back"
          style2="w-[40%]"
          type="button"
          onClick={handleback}
        />
        <Buttons
          icon2={<FaArrowRight />}
          text={"Continue"}
          style2="w-[40%]"
          type="submit"
          onClick={handleContinue}
          disabled={steps.some((s) => s.status !== "completed")}
        />
      </div>
    </div>
  );
}
