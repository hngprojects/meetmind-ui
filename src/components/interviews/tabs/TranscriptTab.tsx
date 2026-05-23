"use client";

import SessionStateCard from "@/components/interviews/session/SessionStateCard";
import { cn } from "@/lib/utils";
import type {
  InterviewDetail,
  SessionPhase,
  TranscriptMessage,
} from "@/types/interview";
import {
  HiOutlineArrowDownTray,
  HiOutlineEllipsisVertical,
} from "react-icons/hi2";
import { FiSquare } from "react-icons/fi";

type Props = {
  interview: InterviewDetail;
  messages: TranscriptMessage[];
  sessionPhase: SessionPhase;
  onPhaseChange?: (phase: SessionPhase) => void;
};

const SESSION_ONLY: SessionPhase[] = [
  "connecting",
  "listening",
  "thinking",
  "reconnecting",
  "connection_lost",
  "speaking",
];

export default function TranscriptTab({
  interview,
  messages,
  sessionPhase,
  onPhaseChange,
}: Props) {
  const showSessionCard = SESSION_ONLY.includes(sessionPhase);

  if (showSessionCard) {
    return (
      <div className="p-6">
        <SessionStateCard
          roleTitle={interview.roleTitle}
          phase={sessionPhase}
          elapsed={interview.elapsed}
          participants={interview.participants}
          platform={interview.platform}
          onRejoin={() => onPhaseChange?.("connecting")}
          onViewPartial={() => onPhaseChange?.("live_transcript")}
        />
        {process.env.NODE_ENV === "development" && (
          <div className="mt-4 flex flex-wrap gap-2">
            {SESSION_ONLY.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => onPhaseChange?.(p)}
                className="rounded border px-2 py-1 text-xs text-[var(--color-text-secondary)]"
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (sessionPhase === "transcript_error") {
    return (
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between rounded-lg bg-[var(--color-error-bg)] px-4 py-2">
          <span className="flex items-center gap-2 text-sm text-[var(--color-error)]">
            <span className="h-2 w-2 rounded-full bg-[var(--color-error)]" />
            We lost the feed - your recording is safe
          </span>
          <span className="text-sm font-medium text-[var(--color-brand-accent)]">
            {interview.elapsed}
          </span>
        </div>
        <TranscriptError onRetry={() => onPhaseChange?.("live_transcript")} />
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[520px] flex-col">
      <div className="flex items-center justify-between border-b border-[var(--color-scrollbar-track)] px-6 py-4">
        <h3 className="font-semibold text-[var(--color-text-color-primary)]">
          {interview.roleTitle}
        </h3>
        <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
          <button type="button" aria-label="Download">
            <HiOutlineArrowDownTray className="h-5 w-5" />
          </button>
          <button type="button" aria-label="More">
            <HiOutlineEllipsisVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex flex-col",
              msg.speaker === "candidate" ? "items-end" : "items-start",
            )}
          >
            <div className="mb-1 flex items-center gap-2 text-xs text-[var(--color-card-text)]">
              <span className="font-medium text-[var(--color-text-secondary)]">
                {msg.speakerLabel}
              </span>
              <span>{msg.timestamp}</span>
            </div>
            <div
              className={cn(
                "max-w-[85%] rounded-xl border px-4 py-3 text-sm text-[var(--color-text-color-primary)]",
                msg.isActive
                  ? "border-[var(--color-brand-accent)] bg-[var(--color-card-bg)]"
                  : "border-[var(--color-card-border)] bg-[var(--color-card-bg)]",
              )}
            >
              {msg.content}
              {msg.isTyping && (
                <div className="mt-2 flex gap-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-bg-divider)]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-bg-divider)] delay-75" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-bg-divider)] delay-150" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-[var(--color-card-border)] px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--color-brand-accent)]" />
          <span className="text-sm font-medium text-[var(--color-brand-accent)]">
            Live
          </span>
          <span className="text-sm text-[var(--color-text-secondary)]">
            {interview.elapsed}
          </span>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-[var(--color-error-bg)] px-4 py-2 text-sm font-medium text-[var(--color-error)]
           hover:bg-[var(--color-error-bg)] hover:opacity-80"
        >
          <FiSquare className="h-3 w-3" />
          Stop Transcribing
        </button>
      </div>
    </div>
  );
}

function TranscriptError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 text-[var(--color-error)]">
        <svg
          className="mx-auto h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4l16 16"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-[var(--color-text-color-primary)]">
        Transcript failed to load
      </h3>
      <p className="mt-2 max-w-md text-sm text-[var(--color-text-secondary)]">
        Live transcript stream was interrupted. The agent was dropped from the
        meeting at 00:05:47. Your audio recording is still running.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 flex items-center gap-2 rounded-lg border border-[var(--color-card-border)] px-5 py-2.5 text-sm font-medium
         text-[var(--color-text-color-primary)] hover:bg-[var(--color-bg-secondary)]"
      >
        Try again
      </button>
    </div>
  );
}
