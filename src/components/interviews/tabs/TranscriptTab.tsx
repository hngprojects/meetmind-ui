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
          elapsed="00:00:00"
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
                className="rounded border px-2 py-1 text-xs text-[#6b7280]"
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
        <div className="mb-4 flex items-center justify-between rounded-lg bg-[#fef2f2] px-4 py-2">
          <span className="flex items-center gap-2 text-sm text-[#ef4444]">
            <span className="h-2 w-2 rounded-full bg-[#ef4444]" />
            We lost the feed - your recording is safe
          </span>
          <span className="text-sm font-medium text-[#7c3aed]">
            {interview.elapsed}
          </span>
        </div>
        <TranscriptError onRetry={() => onPhaseChange?.("live_transcript")} />
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[520px] flex-col">
      <div className="flex items-center justify-between border-b border-[#f3f4f6] px-6 py-4">
        <h3 className="font-semibold text-[#0f172a]">{interview.roleTitle}</h3>
        <div className="flex items-center gap-2 text-[#6b7280]">
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
            <div className="mb-1 flex items-center gap-2 text-xs text-[#9ca3af]">
              <span className="font-medium text-[#6b7280]">
                {msg.speakerLabel}
              </span>
              <span>{msg.timestamp}</span>
            </div>
            <div
              className={cn(
                "max-w-[85%] rounded-xl border px-4 py-3 text-sm text-[#0f172a]",
                msg.isActive
                  ? "border-[#7c3aed] bg-white"
                  : "border-[#e5e7eb] bg-white",
              )}
            >
              {msg.content}
              {msg.isTyping && (
                <div className="mt-2 flex gap-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#d1d5db]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#d1d5db] delay-75" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#d1d5db] delay-150" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-[#e5e7eb] px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#7c3aed]" />
          <span className="text-sm font-medium text-[#7c3aed]">Live</span>
          <span className="text-sm text-[#6b7280]">{interview.elapsed}</span>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-[#fef2f2] px-4 py-2 text-sm font-medium text-[#ef4444] hover:bg-[#fee2e2]"
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
      <div className="mb-4 text-[#ef4444]">
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
      <h3 className="text-lg font-semibold text-[#0f172a]">
        Transcript failed to load
      </h3>
      <p className="mt-2 max-w-md text-sm text-[#6b7280]">
        Live transcript stream was interrupted. The agent was dropped from the
        meeting at 00:05:47. Your audio recording is still running.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 flex items-center gap-2 rounded-lg border border-[#e5e7eb] px-5 py-2.5 text-sm font-medium text-[#0f172a] hover:bg-[#f7f9fb]"
      >
        Try again
      </button>
    </div>
  );
}
