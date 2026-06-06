"use client";

import SessionStateCard from "@/components/interviews/session/SessionStateCard";
import {
  exportTranscript,
  stopTranscript,
} from "@/lib/services/interviews.service";
import { cn } from "@/lib/utils";
import type {
  InterviewDetail,
  InterviewSession,
  InterviewSessionStatus,
  TranscriptMessage,
  TranscriptResponse,
  TranscriptStatus,
} from "@/types/interview";
import { useEffect, useRef, useState } from "react";
import { FiSquare } from "react-icons/fi";
import {
  HiOutlineArrowDownTray,
  HiOutlineEllipsisVertical,
} from "react-icons/hi2";

type Props = {
  interview: InterviewDetail;
  transcript?: TranscriptResponse;
  messages: TranscriptMessage[];
  session?: InterviewSession;
  onRejoin?: () => Promise<void>;
  isRejoining?: boolean;
};

const SESSION_ONLY: InterviewSessionStatus[] = [
  "connecting",
  "listening",
  "thinking",
  "reconnecting",
  "connection_lost",
  "speaking",
  "processing",
];

// ==================== 🧩Main Component ====================
export default function TranscriptTab({
  interview,
  transcript,
  messages,
  session,
  onRejoin,
  isRejoining = false,
}: Props) {
  const [isStopping, setIsStopping] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [rejoinError, setRejoinError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const shouldStickToBottomRef = useRef(true);
  const visibleSession =
    session ??
    (interview.status === "in_progress" ? getFallbackSession(interview) : null);
  const transcriptStatus = transcript?.status;
  const shouldShowRecoveryCard =
    visibleSession?.session_status === "connection_lost" ||
    (messages.length === 0 &&
      visibleSession?.session_status === "reconnecting" &&
      transcriptStatus !== "transcribing");
  const showSessionCard =
    !!visibleSession &&
    SESSION_ONLY.includes(visibleSession.session_status) &&
    shouldShowRecoveryCard;

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || !shouldStickToBottomRef.current) return;

    scrollContainer.scrollTo({
      top: scrollContainer.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length, transcriptStatus]);

  const handleTranscriptScroll = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const distanceFromBottom =
      scrollContainer.scrollHeight -
      scrollContainer.scrollTop -
      scrollContainer.clientHeight;
    shouldStickToBottomRef.current = distanceFromBottom < 96;
  };

  // ── Stop transcribing ──────────────────────────────────────────────────────
  // POST /api/v1/interviews/{interview_id}/transcript/stop
  const handleStopTranscript = async () => {
    if (isStopping) return;
    setIsStopping(true);
    try {
      await stopTranscript(interview.id);
    } catch {
      // Surface error visually if needed — for now just re-enable the button
    } finally {
      setIsStopping(false);
    }
  };

  // ── Download transcript ────────────────────────────────────────────────────
  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      await exportTranscript(interview.id);
    } catch {
      // TODO: show error toast when toast system is available
    } finally {
      setIsDownloading(false);
    }
  };

  const handleRejoin = async () => {
    if (!onRejoin || isRejoining) return;

    setRejoinError(null);
    try {
      await onRejoin();
    } catch (error) {
      setRejoinError(
        error instanceof Error
          ? error.message
          : "Unable to rejoin the meeting. Please try again.",
      );
    }
  };

  if (showSessionCard && visibleSession) {
    return (
      <div className="p-6">
        <SessionStateCard
          roleTitle={interview.roleTitle}
          session={visibleSession}
          platform={visibleSession.platform ?? interview.platform ?? ""}
          onRejoin={handleRejoin}
          isRejoining={isRejoining}
        />
        {rejoinError && (
          <p className="mt-3 text-sm text-[var(--color-error)]">
            {rejoinError}
          </p>
        )}
      </div>
    );
  }

  // ── Live transcript / completed view ──────────────────────────────────────
  const isLive = interview.status === "in_progress";
  const liveElapsed = session?.elapsed_display ?? interview.elapsed;
  const statusLabel = getTranscriptStatusLabel(transcriptStatus);
  const statusMessage = getTranscriptStatusMessage(
    transcriptStatus,
    transcript?.message,
    isLive,
    messages.length,
  );
  const shouldShowStatusBanner =
    Boolean(statusMessage) &&
    (messages.length === 0 ||
      transcriptStatus === "interrupted" ||
      transcriptStatus === "failed");
  const emptyTranscriptMessage = shouldShowStatusBanner
    ? "Transcript turns will appear here."
    : (statusMessage ??
      (isLive ? "Waiting for transcript..." : "No transcript available."));

  return (
    <div className="flex h-full min-h-[32.5rem] flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--color-scrollbar-track)] px-6 py-4">
        <h3 className="font-semibold text-[var(--color-text-color-primary)]">
          {interview.roleTitle}
        </h3>
        <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
          <button
            type="button"
            aria-label="Download transcript"
            onClick={handleDownload}
            disabled={isDownloading}
            className="transition-opacity hover:opacity-70 disabled:opacity-40"
          >
            {isDownloading ? (
              <svg
                className="h-5 w-5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                />
              </svg>
            ) : (
              <HiOutlineArrowDownTray className="h-5 w-5" />
            )}
          </button>
          <button
            type="button"
            aria-label="More options"
            className="transition-opacity hover:opacity-70"
          >
            <HiOutlineEllipsisVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollContainerRef}
        onScroll={handleTranscriptScroll}
        className="flex-1 space-y-4 overflow-y-auto px-6 py-6"
      >
        {shouldShowStatusBanner && (
          <TranscriptStatusBanner
            status={transcriptStatus}
            title={statusLabel}
            message={statusMessage}
            partialSaved={transcript?.partialSaved ?? null}
          />
        )}

        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-[var(--color-text-secondary)]">
            {emptyTranscriptMessage}
          </div>
        ) : (
          messages.map((msg) => (
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
          ))
        )}
      </div>

      {/* Footer — only shown when interview is live */}
      {isLive && (
        <div className="flex items-center justify-between border-t border-[var(--color-card-border)] px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-brand-accent)]" />
            <span className="text-sm font-medium text-[var(--color-brand-accent)]">
              Live
            </span>
            {liveElapsed && (
              <span className="text-sm text-[var(--color-text-secondary)]">
                {liveElapsed}
              </span>
            )}
            {transcriptStatus && (
              <span className="text-sm text-[var(--color-text-secondary)]">
                {statusLabel}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleStopTranscript}
            disabled={isStopping}
            className="flex items-center gap-2 rounded-lg bg-[var(--color-error-bg)] px-4 py-2 text-sm font-medium text-[var(--color-error)] 
            transition-opacity hover:opacity-80 disabled:opacity-50"
          >
            <FiSquare className="h-3 w-3" />
            {isStopping ? "Stopping…" : "Stop Transcribing"}
          </button>
        </div>
      )}
    </div>
  );
}

function TranscriptStatusBanner({
  status,
  title,
  message,
  partialSaved,
}: {
  status?: TranscriptStatus;
  title: string;
  message: string | null;
  partialSaved: boolean | null;
}) {
  const isProblemStatus = status === "interrupted" || status === "failed";

  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3 text-sm",
        isProblemStatus
          ? "border-[var(--color-error)] bg-[var(--color-error-bg)] text-[var(--color-error)]"
          : "border-[var(--color-card-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]",
      )}
    >
      <p className="font-semibold">{title}</p>
      {message && <p className="mt-1">{message}</p>}
      {partialSaved && (
        <p className="mt-2 font-medium">
          Partial transcript has been saved and remains available.
        </p>
      )}
    </div>
  );
}

function getTranscriptStatusLabel(status?: TranscriptStatus) {
  switch (status) {
    case "idle":
      return "Transcript idle";
    case "connecting":
      return "Connecting transcript";
    case "transcribing":
      return "Live transcription";
    case "interrupted":
      return "Transcript interrupted";
    case "failed":
      return "Transcript failed";
    case "completed":
      return "Transcript complete";
    default:
      return "Transcript";
  }
}

function getTranscriptStatusMessage(
  status: TranscriptStatus | undefined,
  message: string | null | undefined,
  isLive: boolean,
  messagesCount: number,
) {
  if (message?.trim()) return message.trim();

  switch (status) {
    case "idle":
      return "Live transcription will appear here when an interview begins.";
    case "connecting":
      return "Connecting to live transcript stream...";
    case "interrupted":
      return "Live transcript stream was interrupted.";
    case "failed":
      return "Transcript failed to load.";
    default:
      if (messagesCount === 0) {
        return isLive
          ? "Waiting for transcript..."
          : "No transcript available.";
      }
      return null;
  }
}

function getFallbackSession(interview: InterviewDetail): InterviewSession {
  return {
    interview_id: interview.id,
    session_status: "connecting",
    meeting_status: "Live",
    agent_status_display: "Connecting...",
    elapsed_display: "00:00:00",
    participants_count: interview.participants,
    platform: interview.platform,
    partial_data_saved: false,
  };
}
