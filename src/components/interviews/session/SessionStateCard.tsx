"use client";

import { cn } from "@/lib/utils";
import type { SessionPhase } from "@/types/interview";
import {
  FiRadio,
  FiLoader,
  FiZap,
  FiRefreshCw,
  FiHeadphones,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

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
    <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6">
      <div className="flex items-center justify-between border-b border-[#f3f4f6] pb-4">
        <h3 className="text-lg font-bold text-[#0f172a]">{roleTitle}</h3>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium",
            config.badgeClass,
          )}
        >
          {config.badge}
        </span>
      </div>

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
        <span className="font-mono text-sm text-[#6b7280]">{elapsed}</span>
      </div>

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
            <p className="mt-1 text-sm text-[#4b5563]">{config.description}</p>
            {config.showProgress && (
              <div className="mt-4">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e5e7eb]">
                  <div
                    className="h-full rounded-full bg-[#02505e] transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-[#9ca3af]">Authenticating...</p>
              </div>
            )}
            {config.showDots && (
              <div className="mt-4 flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7c3aed]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#7c3aed]/60" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#7c3aed]/30" />
              </div>
            )}
            {config.showWave && (
              <div className="mt-4 flex items-end gap-0.5">
                {[3, 5, 4, 6, 3, 5].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 rounded-sm bg-[#12b76a]"
                    style={{ height: `${h * 3}px` }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {phase === "connection_lost" && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onRejoin}
            className="rounded-lg bg-[#02505e] py-3 text-sm font-medium text-white hover:bg-[#035a69]"
          >
            Rejoin Meeting
          </button>
          <button
            type="button"
            onClick={onViewPartial}
            className="rounded-lg border border-[#02505e] py-3 text-sm font-medium text-[#02505e] hover:bg-[#f7f9fb]"
          >
            View Partial Result
          </button>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-[#6b7280]">
          {participants} participants
        </span>
        <span className="rounded-md border border-[#e5e7eb] bg-white px-3 py-1 text-xs font-medium text-[#0f172a]">
          {platform}
        </span>
      </div>
    </div>
  );
}

function getPhaseConfig(phase: SessionPhase) {
  const map: Record<
    SessionPhase,
    {
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
    }
  > = {
    connecting: {
      badge: "Connecting...",
      badgeClass: "bg-[#fff7ed] text-[#c2410c]",
      statusLabel: "Connecting...",
      statusClass: "text-[#c2410c]",
      dotClass: "bg-[#ea580c]",
      boxClass: "border-[#fcd34d] bg-[#fffbeb]",
      iconBg: "bg-[#ffedd5]",
      icon: <FiRadio className="h-4 w-4 text-[#ea580c]" />,
      title: "Joining meeting room",
      titleClass: "text-[#b45309]",
      description:
        "Establishing connection to Zoom. This usually takes 10–20 seconds.",
      showProgress: true,
    },
    listening: {
      badge: "Live",
      badgeClass: "bg-[#ecfdf3] text-[#047857]",
      statusLabel: "Listening",
      statusClass: "text-[#047857]",
      dotClass: "bg-[#12b76a]",
      boxClass: "border-[#a7f3d0] bg-[#ecfdf3]",
      iconBg: "bg-[#d1fae5]",
      icon: <FiHeadphones className="h-4 w-4 text-[#047857]" />,
      title: "AI is listening to the conversation",
      titleClass: "text-[#047857]",
      description:
        "Processing live audio. The agent will respond when relevant.",
      showWave: true,
    },
    thinking: {
      badge: "Processing",
      badgeClass: "bg-[#f5f3ff] text-[#6d28d9]",
      statusLabel: "Thinking...",
      statusClass: "text-[#7c3aed]",
      dotClass: "bg-[#7c3aed]",
      boxClass: "border-[#ddd6fe] bg-[#f5f3ff]",
      iconBg: "bg-[#ede9fe]",
      icon: <HiSparkles className="h-4 w-4 text-[#7c3aed]" />,
      title: "Analyzing response",
      titleClass: "text-[#6d28d9]",
      description: "Evaluating context and generating the most relevant reply.",
      showDots: true,
    },
    reconnecting: {
      badge: "Connecting...",
      badgeClass: "bg-[#fff7ed] text-[#c2410c]",
      statusLabel: "Reconnecting...",
      statusClass: "text-[#c2410c]",
      dotClass: "bg-[#ea580c]",
      boxClass: "border-[#fcd34d] bg-[#fffbeb]",
      iconBg: "bg-[#ffedd5]",
      icon: <FiRefreshCw className="h-4 w-4 text-[#ea580c]" />,
      title: "Restore connection",
      titleClass: "text-[#b45309]",
      description:
        "Attempting to rejoin the meeting. Do not close this window.",
      showProgress: true,
    },
    connection_lost: {
      badge: "Connection lost",
      badgeClass: "bg-[#fef2f2] text-[#ef4444]",
      statusLabel: "Connection lost",
      statusClass: "text-[#ef4444]",
      dotClass: "bg-[#ef4444]",
      boxClass: "border-[#fecaca] bg-[#fef2f2]",
      iconBg: "bg-[#fee2e2]",
      icon: <FiZap className="h-4 w-4 text-[#ef4444]" />,
      title: "Connection Lost",
      titleClass: "text-[#dc2626]",
      description:
        "The agent was dropped from the meeting at 00:31:14. Session data is saved.",
    },
    speaking: {
      badge: "Speaking",
      badgeClass: "bg-[#f5f3ff] text-[#6d28d9]",
      statusLabel: "Speaking",
      statusClass: "text-[#7c3aed]",
      dotClass: "bg-[#7c3aed]",
      boxClass: "border-[#ddd6fe] bg-[#f5f3ff]",
      iconBg: "bg-[#ede9fe]",
      icon: <HiSparkles className="h-4 w-4 text-[#7c3aed]" />,
      title: "AI is speaking",
      titleClass: "text-[#6d28d9]",
      description: "Delivering response to the interviewee.",
    },
    live_transcript: {
      badge: "Live",
      badgeClass: "bg-[#f5f3ff] text-[#7c3aed]",
      statusLabel: "Live",
      statusClass: "text-[#7c3aed]",
      dotClass: "bg-[#7c3aed]",
      boxClass: "border-[#e5e7eb] bg-white",
      iconBg: "bg-[#f5f3ff]",
      icon: <FiLoader className="h-4 w-4 text-[#7c3aed] animate-spin" />,
      title: "Live transcript",
      titleClass: "text-[#0f172a]",
      description: "Recording in progress",
    },
    summary_pending: {
      badge: "Live",
      badgeClass: "bg-[#f5f3ff] text-[#7c3aed]",
      statusLabel: "Live",
      statusClass: "text-[#7c3aed]",
      dotClass: "bg-[#7c3aed]",
      boxClass: "border-[#e5e7eb] bg-white",
      iconBg: "bg-[#f5f3ff]",
      icon: <FiRadio className="h-4 w-4 text-[#7c3aed]" />,
      title: "Meeting is Live",
      titleClass: "text-[#0f172a]",
      description: "A summary will be provided as soon as the meeting ends.",
    },
    summary_ready: {
      badge: "Live",
      badgeClass: "bg-[#f5f3ff] text-[#7c3aed]",
      statusLabel: "Live",
      statusClass: "text-[#7c3aed]",
      dotClass: "bg-[#7c3aed]",
      boxClass: "border-[#e5e7eb] bg-white",
      iconBg: "bg-[#f5f3ff]",
      icon: null,
      title: "",
      titleClass: "",
      description: "",
    },
    summary_error: {
      badge: "Error",
      badgeClass: "bg-[#fef2f2] text-[#ef4444]",
      statusLabel: "Error",
      statusClass: "text-[#ef4444]",
      dotClass: "bg-[#ef4444]",
      boxClass: "border-[#fecaca] bg-[#fef2f2]",
      iconBg: "bg-[#fee2e2]",
      icon: null,
      title: "",
      titleClass: "",
      description: "",
    },
    transcript_error: {
      badge: "Error",
      badgeClass: "bg-[#fef2f2] text-[#ef4444]",
      statusLabel: "Error",
      statusClass: "text-[#ef4444]",
      dotClass: "bg-[#ef4444]",
      boxClass: "border-[#fecaca] bg-[#fef2f2]",
      iconBg: "bg-[#fee2e2]",
      icon: null,
      title: "",
      titleClass: "",
      description: "",
    },
  };

  return map[phase] ?? map.connecting;
}
