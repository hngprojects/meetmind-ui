"use client";
import type { InterviewDetail } from "@/types/interview";
import { HiOutlineSparkles, HiOutlineFlag } from "react-icons/hi2";

type Props = {
  interview: InterviewDetail;
};

export default function SummaryTab({ interview }: Props) {
  const isLive = interview.status === "in_progress";

  if (interview.status === "scheduled") {
    return (
      <div className="flex h-full min-h-[32.5rem] items-center justify-center flex-col gap-2 p-6">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[var(--color-bg-secondary)]">
          <div className="h-4 w-4 bg-[var(--color-brand-accent)] rounded-full animate-pulse" />
        </div>
        <p className="font-medium text-[var(--color-text-color-primary)] mt-4">
          Meeting Scheduled
        </p>
        <p className="text-sm text-[var(--color-text-secondary)] text-center max-w-sm">
          A summary will be provided after the meeting ends.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[32.5rem] flex-col overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--color-scrollbar-track)] pb-4">
        <div>
          <h3 className="font-semibold text-[var(--color-text-color-primary)]">
            {interview.roleTitle}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {interview.candidateName}
          </p>
        </div>
        {isLive && (
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-brand-accent)]" />
            <span className="text-sm font-medium text-[var(--color-brand-accent)]">
              Live
            </span>
            {interview.elapsed && (
              <span className="text-sm font-medium text-[var(--color-brand-accent)] ml-1">
                {interview.elapsed}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Custom Question & Key Skills */}
      <div className="space-y-4 rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-5">
        <div>
          <h4 className="text-sm font-medium text-[var(--color-text-color-primary)] mb-2">
            Custom Question
          </h4>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            {interview.customQuestion || "No custom question provided."}
          </p>
        </div>

        <div className="border-t border-[var(--color-scrollbar-track)] pt-4">
          <h4 className="text-sm font-medium text-[var(--color-text-color-primary)] mb-3">
            Key skills to assess
          </h4>
          <div className="flex flex-wrap gap-2">
            {interview.keySkills && interview.keySkills.length > 0 ? (
              interview.keySkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-[var(--color-bg-secondary)] px-3 py-1 text-xs font-medium text-[var(--color-text-secondary)]"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-sm text-[var(--color-text-secondary)]">
                None specified
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Summary Paragraph */}
      <div className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-5">
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {interview.observation || "No summary observation generated yet."}
        </p>
      </div>

      {/* Highlights */}
      <div>
        <h4 className="flex items-center gap-2 text-sm font-semibold text-[#8B5CF6] mb-3">
          <HiOutlineSparkles className="h-4 w-4" />
          Highlights
        </h4>
        <div className="rounded-xl border border-[#8B5CF6] p-5">
          {interview.highlights && interview.highlights.length > 0 ? (
            <ul className="space-y-3">
              {interview.highlights.map((highlight, idx) => (
                <li
                  key={idx}
                  className="text-sm text-[var(--color-text-color-primary)]"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[var(--color-text-secondary)]">
              No highlights recorded.
            </p>
          )}
        </div>
      </div>

      {/* Red Flags */}
      <div>
        <h4 className="flex items-center gap-2 text-sm font-semibold text-[var(--color-error)] mb-3">
          <HiOutlineFlag className="h-4 w-4" />
          Red flags
        </h4>
        <div className="rounded-xl border border-[var(--color-error)] p-5">
          {interview.redFlags && interview.redFlags.length > 0 ? (
            <ul className="space-y-3">
              {interview.redFlags.map((flag, idx) => (
                <li
                  key={idx}
                  className="text-sm text-[var(--color-text-color-primary)]"
                >
                  {flag}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[var(--color-text-secondary)]">
              No red flags recorded.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
