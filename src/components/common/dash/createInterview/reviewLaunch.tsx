"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import api from "@/lib/api";
import Buttons from "@/components/reuseable-component/buttons";
import { useResumeStore } from "@/store/ResumeStore";
import {
  useCreateStep1,
  useCreateStep2,
  useCreateStep3,
  useCreateStep4,
  useCreateStep5,
  useCreateStep6,
  useCreateStore,
} from "@/store/createInterviewStore";
import { useUserDetailsStore } from "@/store/userDetail";

export default function ReviewLaunch() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { setStep5 } = useCreateStep5();
  const { setStep6 } = useCreateStep6();
  const { setOpen } = useCreateStore();
  const { setStep1 } = useCreateStep1();
  const { setStep2 } = useCreateStep2();
  const { setStep3 } = useCreateStep3();
  const { setStep4 } = useCreateStep4();

  const {
    buildPayload,
    resetUserDetails,
    candidate,
    interviewDetails,
    aiConfig,
  } = useUserDetailsStore();
  const { candidateId, resetResume } = useResumeStore();

  const handleBack = () => {
    setStep6(false);
    setStep5(true);
  };

  const resetAll = () => {
    resetUserDetails();
    resetResume();
    setStep1(true);
    setStep2(false);
    setStep3(false);
    setStep4(false);
    setStep5(false);
    setStep6(false);
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!candidateId) {
      setServerError("Missing candidate ID. Please restart the process.");
      return;
    }

    try {
      setIsLoading(true);
      setServerError(null);

      const payload = buildPayload(candidateId);
      await api.post("/api/v1/interviews", payload);

      resetAll();
      router.push("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.response?.data?.error?.details?.[0]?.msg ||
          "Something went wrong. Please try again.";
        setServerError(message);
      } else {
        setServerError("Unexpected error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ── Helper function ───────────────────────────────────────────────────────────
  function getDuration(
    start: string | undefined,
    end: string | undefined,
  ): string {
    if (!start || !end) return "—";

    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffMs = endDate.getTime() - startDate.getTime();

    if (diffMs <= 0) return "Invalid range";

    const diffMins = Math.floor(diffMs / 1000 / 60);

    if (diffMins < 60) return `${diffMins} min`;

    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;

    if (mins === 0) return `${hours}hr`;
    return `${hours}hr ${mins}min`;
  }

  const [readyToLaunch, setReadyToLaunch] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h2 className="font-bold text-xl">Review & Launch</h2>
        <p className="text-sm text-gray-500">Final check then send invites</p>
      </div>

      {/* Progress bar */}
      <div className="flex flex-row gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex-1 h-1.5 rounded-full bg-[#02505E]" />
        ))}
      </div>

      {/* Candidate Info */}
      <Section title="Candidate">
        <Row label="Full Name" value={candidate.full_name} />
        <Row label="Email" value={candidate.email} />
        <Row label="Phone" value={candidate.phone} />
        <Row label="Role" value={candidate.current_role} />
        <Row
          label="Years of Experience"
          value={
            candidate.years_of_experience !== undefined
              ? `${candidate.years_of_experience} yrs`
              : undefined
          }
        />
        <Row label="Location" value={candidate.location} />
        <Row label="Portfolio" value={candidate.portfolio_url} />
        <Row label="Skills" value={candidate.skills?.join(", ")} />
      </Section>

      {/* Interview Context */}
      <Section title="Interview Context">
        <Row label="Role Title" value={interviewDetails.role_title} />
        <Row label="Job Description" value={interviewDetails.job_description} />
        <Row
          label="Skills to Assess"
          value={interviewDetails.skills_to_assess?.join(", ")}
        />
        <Row
          label="Custom Question"
          value={interviewDetails.custom_question || "—"}
        />
      </Section>

      {/* AI Configuration */}
      <Section title="AI Configuration">
        <Row
          label="AI Tone"
          value={
            aiConfig.ai_tone
              ? aiConfig.ai_tone.charAt(0).toUpperCase() +
                aiConfig.ai_tone.slice(1)
              : undefined
          }
        />
        <Row
          label="Response Detail"
          value={
            aiConfig.participation_mode
              ? aiConfig.participation_mode.charAt(0).toUpperCase() +
                aiConfig.participation_mode.slice(1)
              : undefined
          }
        />
        <Row
          label="Platform"
          value={
            aiConfig.platform === "google_meet"
              ? "Google Meet"
              : aiConfig.platform === "zoom"
                ? "Zoom"
                : aiConfig.platform === "ai_sdk"
                  ? "AI SDK"
                  : "—"
          }
        />
        <Row label="Meeting Link" value={aiConfig.call_link} />
        <Row
          label="Start"
          value={
            aiConfig.scheduled_start
              ? new Date(aiConfig.scheduled_start).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : undefined
          }
        />
        <Row
          label="End"
          value={
            aiConfig.scheduled_end
              ? new Date(aiConfig.scheduled_end).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : undefined
          }
        />

        <Row
          label="Duration"
          value={getDuration(aiConfig.scheduled_start, aiConfig.scheduled_end)}
        />
      </Section>

      {/* Ready to launch */}
      <div
        className="flex items-start gap-3 border
       border-gray-100 rounded-xl p-4"
      >
        <div className="mt-0.5 flex-shrink-0">
          <button
            type="button"
            onClick={() => setReadyToLaunch((prev) => !prev)}
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
        transition-colors duration-200 cursor-pointer
        ${readyToLaunch ? "border-[#02505E]" : "border-gray-300"}`}
          >
            {readyToLaunch && (
              <div className="w-2.5 h-2.5 rounded-full bg-[#02505E]" />
            )}
          </button>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => setReadyToLaunch((prev) => !prev)}
        >
          <p className="font-semibold text-sm">Ready to launch</p>
          <p className="text-sm text-gray-500">
            Your interview is configured and ready. Candidates will receive
            invitations immediately after launch.
          </p>
        </div>
      </div>

      {serverError && (
        <p className="text-[#C0392B] text-sm text-center bg-[#FDEDEC] border border-[#F8C6C6] rounded-lg px-3 py-2">
          {serverError}
        </p>
      )}

      <div className="flex flex-row gap-5 justify-end">
        <Buttons text="← Back" type="button" onClick={handleBack} />
        <Buttons
          type="button"
          style=" disabled:hover:cursor-not-allowed"
          disabled={isLoading || !readyToLaunch}
          text={isLoading ? "Launching..." : "Start interview →"}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col border border-gray-100 rounded-xl overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
        <h3 className="font-semibold text-sm">{title}</h3>
      </div>
      <div className="flex flex-col divide-y bg-white divide-gray-100">
        {children}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div className="flex justify-between items-start px-4 py-3 gap-4">
      <span className="text-sm text-gray-500 flex-shrink-0">{label}</span>
      <span className="text-sm font-medium text-gray-900 text-right">
        {value ?? "—"}
      </span>
    </div>
  );
}
