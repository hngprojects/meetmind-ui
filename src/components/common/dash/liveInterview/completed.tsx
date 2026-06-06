// components/common/dash/dashboard/Completed.tsx
"use client";
import { useDashboardStore } from "@/store/dashboardInterview";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(isoString: string | null): string {
  if (!isoString) return "—";

  const date = new Date(isoString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return `Today, ${date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
  }

  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// ── Score Ring ────────────────────────────────────────────────────────────────
function ScoreRing({ score }: { score: number | null }) {
  const value = score ?? 0;
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;

  const color =
    value >= 70
      ? "var(--color-success)"
      : value >= 40
        ? "var(--color-warning)"
        : "var(--color-error)";

  return (
    <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
      <svg width="56" height="56" viewBox="0 0 56 56" className="-rotate-90">
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="var(--color-card-border)"
          strokeWidth="4"
        />
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={`${progress} ${circumference}`}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-sm font-bold" style={{ color }}>
        {score ?? "—"}
      </span>
    </div>
  );
}

// ── Completed Card ────────────────────────────────────────────────────────────
function CompletedCard({
  candidateName,
  role,
  completedAt,
  score,
}: {
  candidateName: string;
  role: string;
  completedAt: string | null;
  score: number | null;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col gap-3 flex-1 min-w-0">
      {/* Name + arrow */}
      <div className="flex justify-between items-center">
        <p className="font-semibold text-sm text-gray-900 truncate pr-2">
          {candidateName}
        </p>
        <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 13L13 3M13 3H6M13 3V10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Role + score */}
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1 min-w-0">
          <p className="text-sm text-gray-500 truncate">{role}</p>
          <p className="text-xs text-gray-400">{formatDate(completedAt)}</p>
        </div>
        <ScoreRing score={score} />
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Completed() {
  const { completed, completedLoading, completedError, getCompleted } =
    useDashboardStore();

  useEffect(() => {
    getCompleted();
  }, [getCompleted]);

  return (
    <div className="bg-white rounded-2xl p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-base">Completed</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 12L12 2M12 2H5M12 2V9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      {completedLoading ? (
        <div className="flex flex-col sm:flex-row gap-3">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-xl p-4 flex-1"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
              <div className="mt-6 flex items-end justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-14 w-14 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : completedError ? (
        <p className="text-sm text-[var(--color-error-dark)] text-center py-4">
          {completedError}
        </p>
      ) : completed.length === 0 ? (
        <div className="flex items-center justify-center py-8">
          <p className="text-sm text-gray-400">No completed interviews yet</p>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-3">
          {completed.slice(0, 2).map((item) => (
            <CompletedCard
              key={item.interview_id}
              candidateName={item.candidate_name}
              role={item.role}
              completedAt={item.completed_at}
              score={item.score}
            />
          ))}
        </div>
      )}
    </div>
  );
}
