import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useDashboardStore } from "@/store/dashboardInterview";

// ── Helper to convert seconds into HH:MM:SS ──────────────────────────────────
function formatDuration(totalSeconds: number): string {
  if (!totalSeconds || totalSeconds <= 0) return "00:00:00";
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  return [hrs, mins, secs].map((v) => (v < 10 ? "0" + v : v)).join(":");
}

// ── Helper to get elapsed seconds from an ISO datetime string ─────────────────
function getElapsedSeconds(isoString: string | null): number {
  if (!isoString) return 0;
  const startMs = new Date(isoString).getTime();
  if (isNaN(startMs)) return 0;
  const elapsed = Math.floor((Date.now() - startMs) / 1000);
  return elapsed < 0 ? 0 : elapsed;
}

const LiveSession = () => {
  const router = useRouter();
  // ── FIX: also destructure interviewsError so error states are handled
  //    explicitly rather than falling through to the empty-state UI.
  const { interviews, interviewsLoading, interviewsError, getInterviews } =
    useDashboardStore();

  // Tick every second to keep elapsed timers up to date
  const [, setTick] = useState(0);

  useEffect(() => {
    getInterviews();
  }, [getInterviews]);

  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  if (interviewsLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <div className="mt-6">
              <Skeleton className="h-10 w-28 rounded-xl" />
              <Skeleton className="mt-4 h-4 w-40" />
            </div>
            <div className="mt-6 border-t border-gray-100 pt-4">
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5 py-6">
      {/* Header Container */}
      <div className="flex flex-row justify-between items-center w-full px-1">
        <h1 className="text-2xl text-gray-900 font-bold tracking-tight">
          Live Now
        </h1>
        <button
          onClick={() => router.push("/candidates")}
          className="flex flex-row items-center gap-1
         text-[var(--color-accent-teal-dark)] font-semibold
         text-sm hover:opacity-80 transition-opacity hover:cursor-pointer"
        >
          See all <MdKeyboardArrowRight className="text-xl" />
        </button>
      </div>

      {/* ── FIX: Render an explicit error state when interviewsError is set,
           instead of falling through to the "No live sessions" empty state.
           The error is also logged for observability. */}
      {interviewsError ? (
        (() => {
          console.error(
            "[LiveSession] Failed to load interviews:",
            interviewsError,
          );
          return (
            <div className="flex items-center justify-center py-12 bg-red-50/50 rounded-2xl border border-dashed border-red-200">
              <p className="text-sm text-red-400 font-medium">
                Failed to load live sessions. Please try again later.
              </p>
            </div>
          );
        })()
      ) : interviews.length === 0 ? (
        /* Empty State */
        <div className="flex items-center justify-center py-12 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-sm text-gray-400 font-medium">
            No live sessions at the moment
          </p>
        </div>
      ) : null}

      {/* Cards Horizontal Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {interviews.slice(0, 3).map((interview) => (
          <div
            key={interview.interview_id}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[200px]"
          >
            {/* Top Row: Name, Live Pill and Arrow Action Button */}
            <div className="flex flex-row justify-between items-start w-full">
              <div className="flex flex-row items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-gray-900 leading-none">
                  {interview.candidate_name || "Marcus Lee"}
                </h3>
                <span className="text-[11px] font-bold text-[var(--color-session-purple-text-dark)] bg-[var(--color-session-purple-bg)] rounded-full flex flex-row items-center gap-1 py-0.5 px-2">
                  <GoDotFill className="text-[10px] animate-pulse" /> Live
                </span>
              </div>
              <button className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-700 flex-shrink-0 transition-colors">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 10L10 2M10 2H4M10 2V8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Middle Row: Meta Information Area */}
            <div className="flex flex-col gap-2 mt-2">
              <p className="text-sm font-medium text-gray-400">
                {interview.role_title || "Product Manager"}
              </p>
              <p className="text-sm font-medium text-gray-400">
                {interview.platform || "Product Manager"}
              </p>
              <p className="text-3xl font-extrabold text-[var(--color-brand-accent)] tracking-tight font-mono">
                {formatDuration(getElapsedSeconds(interview.scheduled_start))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveSession;
