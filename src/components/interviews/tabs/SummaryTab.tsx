"use client";

import StatusBadge from "@/components/interviews/StatusBadge";
import type { InterviewDetail, SessionPhase } from "@/types/interview";
import { FaFlag, FaRedo, FaRegLightbulb, FaMagic } from "react-icons/fa";

type Props = {
  interview: InterviewDetail;
  variant: SessionPhase;
  onRetry?: () => void;
};

export default function SummaryTab({ interview, variant, onRetry }: Props) {
  if (variant === "summary_pending") {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="relative mb-6">
          <div className="h-24 w-24 rounded-full border-4 border-[#ede9fe] bg-[#f5f3ff]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-[#7c3aed]" />
          </div>
          <div className="absolute -inset-2 rounded-full border border-[#ddd6fe] opacity-60" />
        </div>
        <h3 className="text-lg font-semibold text-[#0f172a]">
          Meeting is Live
        </h3>
        <p className="mt-2 max-w-sm text-sm text-[#6b7280]">
          A summary will be provided as soon as the meeting ends.
        </p>
      </div>
    );
  }

  if (variant === "summary_error") {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
        <FaMagic className="mb-4 h-12 w-12 text-[#f87171]" />
        <h3 className="text-lg font-semibold text-[#0f172a]">
          We couldn&apos;t generate your summary
        </h3>
        <p className="mt-2 text-sm text-[#6b7280]">
          Check your connection and try again
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 flex items-center gap-2 rounded-lg border border-[#e5e7eb] px-5 py-2.5 text-sm font-medium hover:bg-[#f7f9fb]"
        >
          <FaRedo className="h-4 w-4" />
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 overflow-y-auto px-6 py-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#0f172a]">
            {interview.roleTitle}
          </h3>
          <p className="text-sm text-[#6b7280]">{interview.candidateName}</p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status="live" />
          <span className="text-sm font-medium text-[#7c3aed]">
            {interview.elapsed}
          </span>
        </div>
      </div>

      <section>
        <h4 className="font-semibold text-[#0f172a]">Custom Question</h4>
        <p className="mt-2 text-sm leading-relaxed text-[#4b5563]">
          {interview.customQuestion}
        </p>
      </section>

      <section>
        <h4 className="font-semibold text-[#0f172a]">Key skills to assess</h4>
        <div className="mt-3 flex flex-wrap gap-2">
          {interview.keySkills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-[#e5e7eb] bg-[#f9fafb] px-3 py-1 text-xs text-[#4b5563]"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <div className="rounded-xl bg-[#f0f9ff] p-4 text-sm leading-relaxed text-[#4b5563]">
        {interview.observation}
      </div>

      <section>
        <h4 className="flex items-center gap-2 font-semibold text-[#7c3aed]">
          <FaRegLightbulb className="h-4 w-4" />
          Highlights
        </h4>
        <ul className="mt-3 space-y-2 rounded-xl border border-[#ddd6fe] p-4 text-sm text-[#4b5563]">
          {interview.highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <span className="text-[#7c3aed]">•</span>
              {h}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className="flex items-center gap-2 font-semibold text-[#991b1b]">
          <FaFlag className="h-4 w-4" />
          Red flags
        </h4>
        <ul className="mt-3 space-y-2 rounded-xl border border-[#fecaca] p-4 text-sm text-[#4b5563]">
          {interview.redFlags.map((f) => (
            <li key={f} className="flex gap-2">
              <span className="text-[#ef4444]">•</span>
              {f}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
