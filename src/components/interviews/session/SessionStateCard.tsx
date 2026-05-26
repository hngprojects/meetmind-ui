"use client";

import { cn } from "@/lib/utils";
import type { SessionPhase } from "@/types/interview";
import { FiLoader, FiRadio, FiRefreshCw, FiZap } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { FaEarListen } from "react-icons/fa6";
import { TbActivityHeartbeat } from "react-icons/tb";
import { PiPlugsFill } from "react-icons/pi";

type SessionStateCardProps = {
  roleTitle: string;
  phase: SessionPhase;
  elapsed?: string;
  participants?: number;
  platform?: string;
  progress?: number;
  onRejoin?: () => void;
  onViewPartial?: () => void;
};

// ==================== 🧩Main Component ====================
export default function SessionStateCard({
  roleTitle,
  phase,
  elapsed = "00:00:00",
  participants = 2,
  platform = "Zoom",
  progress = 40,
  onRejoin,
  onViewPartial,
}: SessionStateCardProps) {
  const config = getPhaseConfig(phase);

  return (
    <div className="rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--color-scrollbar-track)] pb-4">
        <h3 className="text-lg font-bold text-[var(--color-text-color-primary)]">
          {roleTitle}
        </h3>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium",
            config.badgeClass,
          )}
        >
          {config.badge}
        </span>
      </div>

      {/* Status row */}
      <div className="mt-4 flex items-center justify-between">
        <div
          className={cn(
            "flex items-center gap-2 text-sm font-medium",
            config.statusClass,
          )}
        >
          <span className={cn("h-2 w-2 rounded-full", config.dotClass)} />
          {config.statusLabel}
        </div>
        <span className="font-mono text-sm text-[var(--color-text-secondary)]">
          {elapsed || "00:00:00"}
        </span>
      </div>

      {/* Phase box */}
      <div className={cn("mt-4 rounded-xl border p-5", config.boxClass)}>
        <div className="flex gap-3">
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
              config.iconBg,
            )}
          >
            {config.icon}
          </div>
          <div className="flex-1">
            <p className={cn("font-semibold", config.titleClass)}>
              {config.title}
            </p>
            <p className="mt-1 text-sm text-[var(--color-text-body)]">
              {config.description}
            </p>

            {/* Progress bar — connecting / reconnecting */}
            {config.showProgress && (
              <div className="mt-4">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-card-border)]">
                  <div
                    className="h-full rounded-full bg-[var(--color-brand-primary)] transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-[var(--color-card-text)]">
                  Authenticating...
                </p>
              </div>
            )}

            {/* Animated dots — thinking */}
            {config.showDots && (
              <div className="mt-4 flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-session-purple-text)]" />
                <span
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-session-purple-text)]/60"
                  style={{ animationDelay: "0.15s" }}
                />
                <span
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-session-purple-text)]/30"
                  style={{ animationDelay: "0.3s" }}
                />
              </div>
            )}

            {/* Audio wave — listening */}
            {config.showWave && (
              <div className="mt-4 flex items-end gap-0.5">
                {[3, 5, 4, 6, 3, 5].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 animate-pulse rounded-sm bg-[var(--color-text-success)]"
                    style={{
                      height: `${h * 3}px`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rejoin actions — connection_lost only */}
      {phase === "connection_lost" && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onRejoin}
            className="rounded-lg bg-[var(--color-brand-primary)] py-3 text-sm font-medium text-[var(--color-text-white-primary)] transition-opacity hover:opacity-80"
          >
            Rejoin Meeting
          </button>
          <button
            type="button"
            onClick={onViewPartial}
            className="rounded-lg border border-[var(--color-brand-primary)] py-3 text-sm font-medium text-[var(--color-brand-primary)] transition-opacity hover:bg-[var(--color-bg-secondary)]"
          >
            View Partial Result
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-[var(--color-text-secondary)]">
          {participants} participant{participants !== 1 ? "s" : ""}
        </span>
        {platform && (
          <span className="rounded-md border border-[var(--color-card-border)] bg-[var(--color-card-bg)] px-3 py-1 text-xs font-medium text-[var(--color-text-color-primary)]">
            {platform}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Phase config map ──────────────────────────────────────────────────────────

type PhaseConfig = {
  badge: string;
  badgeClass: string;
  statusLabel: string;
  statusClass: string;
  dotClass: string;
  boxClass: string;
  iconBg: string;
  icon: React.ReactNode;
  title: string;
  titleClass: string;
  description: string;
  showProgress?: boolean;
  showDots?: boolean;
  showWave?: boolean;
};

function getPhaseConfig(phase: SessionPhase): PhaseConfig {
  const map: Record<SessionPhase, PhaseConfig> = {
    connecting: {
      badge: "Connecting...",
      badgeClass:
        "bg-[var(--color-badge-upcoming-bg)] text-[var(--color-badge-upcoming-text)]",
      statusLabel: "Connecting...",
      statusClass: "text-[var(--color-session-orange-text)]",
      dotClass: "bg-[var(--color-session-orange-dot)]",
      boxClass:
        "border-[var(--color-session-orange-border)] bg-[var(--color-session-orange-bg)]",
      iconBg: "bg-[var(--color-session-orange-icon-bg)]",
      icon: (
        <FiRadio className="h-4 w-4 text-[var(--color-session-orange-dot)]" />
      ),
      title: "Joining meeting room",
      titleClass: "text-[var(--color-session-orange-text-dark)]",
      description:
        "Establishing connection to Zoom. This usually takes 10–20 seconds.",
      showProgress: true,
    },
    listening: {
      badge: "Live",
      badgeClass:
        "bg-[var(--color-bg-success)] text-[var(--color-session-green-text)]",
      statusLabel: "Listening",
      statusClass: "text-[var(--color-session-green-text)]",
      dotClass: "bg-[var(--color-text-success)]",
      boxClass:
        "border-[var(--color-session-green-border)] bg-[var(--color-session-green-bg)]",
      iconBg: "bg-[var(--color-session-green-icon-bg)]",
      icon: (
        <FaEarListen className="h-4 w-4 text-[var(--color-session-green-text)]" />
      ),
      title: "AI is listening to the conversation",
      titleClass: "text-[var(--color-session-green-text)]",
      description:
        "Processing live audio. The agent will respond when relevant.",
      showWave: true,
    },
    thinking: {
      badge: "Processing",
      badgeClass:
        "bg-[var(--color-session-purple-bg)] text-[var(--color-session-purple-text-dark)]",
      statusLabel: "Thinking...",
      statusClass: "text-[var(--color-session-purple-text)]",
      dotClass: "bg-[var(--color-session-purple-text)]",
      boxClass:
        "border-[var(--color-session-purple-border)] bg-[var(--color-session-purple-bg)]",
      iconBg: "bg-[var(--color-session-purple-icon-bg)]",
      icon: (
        <TbActivityHeartbeat className="h-6 w-6 text-[var(--color-session-purple-text)]" />
      ),
      title: "Analyzing response",
      titleClass: "text-[var(--color-session-purple-text-dark)]",
      description: "Evaluating context and generating the most relevant reply.",
      showDots: true,
    },
    reconnecting: {
      badge: "Reconnecting...",
      badgeClass:
        "bg-[var(--color-badge-upcoming-bg)] text-[var(--color-badge-upcoming-text)]",
      statusLabel: "Reconnecting...",
      statusClass: "text-[var(--color-session-orange-text)]",
      dotClass: "bg-[var(--color-session-orange-dot)]",
      boxClass:
        "border-[var(--color-session-orange-border)] bg-[var(--color-session-orange-bg)]",
      iconBg: "bg-[var(--color-session-orange-icon-bg)]",
      icon: (
        <FiRefreshCw className="h-4 w-4 animate-spin text-[var(--color-session-orange-dot)]" />
      ),
      title: "Restoring connection",
      titleClass: "text-[var(--color-session-orange-text-dark)]",
      description:
        "Attempting to rejoin the meeting. Do not close this window.",
      showProgress: true,
    },
    connection_lost: {
      badge: "Connection lost",
      badgeClass: "bg-[var(--color-error-bg)] text-[var(--color-error)]",
      statusLabel: "Connection lost",
      statusClass: "text-[var(--color-error)]",
      dotClass: "bg-[var(--color-error)]",
      boxClass:
        "border-[var(--color-session-connection-lost-border)] bg-[var(--color-session-connection-lost-bg)]",
      iconBg: "bg-[var(--color-session-connection-lost-text)]",
      icon: <PiPlugsFill className="h-5 w-5 text-[var(--color-error)]" />,
      title: "Connection Lost",
      titleClass: "text-[var(--color-error-dark)]",
      description:
        "The agent was dropped from the meeting. Session data is saved.",
    },
    speaking: {
      badge: "Speaking",
      badgeClass:
        "bg-[var(--color-session-purple-bg)] text-[var(--color-session-purple-text-dark)]",
      statusLabel: "Speaking",
      statusClass: "text-[var(--color-session-purple-text)]",
      dotClass: "bg-[var(--color-session-purple-text)]",
      boxClass:
        "border-[var(--color-session-purple-border)] bg-[var(--color-session-purple-bg)]",
      iconBg: "bg-[var(--color-session-purple-icon-bg)]",
      icon: (
        <HiSparkles className="h-4 w-4 text-[var(--color-session-purple-text)]" />
      ),
      title: "AI is speaking",
      titleClass: "text-[var(--color-session-purple-text-dark)]",
      description: "Delivering response to the interviewee.",
    },
    live_transcript: {
      badge: "Live",
      badgeClass:
        "bg-[var(--color-badge-live-bg)] text-[var(--color-badge-live-text)]",
      statusLabel: "Live",
      statusClass: "text-[var(--color-session-green-text)]",
      dotClass: "bg-[var(--color-text-success)]",
      boxClass: "border-[var(--color-card-border)] bg-[var(--color-card-bg)]",
      iconBg: "bg-[var(--color-session-purple-bg)]",
      icon: (
        <FiLoader className="h-4 w-4 animate-spin text-[var(--color-session-purple-text)]" />
      ),
      title: "Live transcript",
      titleClass: "text-[var(--color-text-color-primary)]",
      description: "Recording in progress.",
    },
    transcript_error: {
      badge: "Error",
      badgeClass: "bg-[var(--color-error-bg)] text-[var(--color-error)]",
      statusLabel: "Error",
      statusClass: "text-[var(--color-error)]",
      dotClass: "bg-[var(--color-error)]",
      boxClass: "border-[var(--color-card-border)] bg-[var(--color-error-bg)]",
      iconBg: "bg-[var(--color-error-bg)]",
      icon: <FiZap className="h-4 w-4 text-[var(--color-error)]" />,
      title: "Transcript interrupted",
      titleClass: "text-[var(--color-error-dark)]",
      description:
        "The live transcript stream was lost. Your recording is still running.",
    },
  };

  return map[phase] ?? map.connecting;
}
