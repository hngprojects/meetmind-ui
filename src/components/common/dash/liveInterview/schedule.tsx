// components/common/dash/dashboard/Schedule.tsx
"use client";
import { useDashboardStore } from "@/store/dashboardInterview";
import { useEffect } from "react";

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getWeekDays() {
  const today = new Date();
  const days = [];
  const dayLabels = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  // Show 5 days centered around today
  const start = new Date(today);
  start.setDate(today.getDate() - 2);

  for (let i = 0; i < 5; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    days.push({
      label: dayLabels[date.getDay()],
      day: date.getDate(),
      date,
    });
  }
  return days;
}

function isToday(date: Date): boolean {
  return date.toDateString() === new Date().toDateString();
}

function isSameDay(isoString: string, date: Date): boolean {
  return new Date(isoString).toDateString() === date.toDateString();
}

// ── Schedule Card ─────────────────────────────────────────────────────────────
function ScheduleCard({
  candidateName,
  role,
  startTime,
  endTime,
  isFirst,
}: {
  candidateName: string;
  role: string;
  startTime: string;
  endTime: string;
  isFirst: boolean;
}) {
  const timeRange = `${formatTime(startTime)} - ${formatTime(endTime)}`;

  if (isFirst) {
    return (
      <div className="bg-[#02505E] text-white rounded-xl p-3 flex justify-between items-start">
        <div>
          <p className="font-semibold text-sm">{candidateName}</p>
          <p className="text-xs opacity-80 mt-0.5">{timeRange}</p>
        </div>
        <button className="w-7 h-7 bg-white rounded-full flex items-center justify-center flex-shrink-0">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 10L10 2M10 2H4M10 2V8"
              stroke="#02505E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-3 border border-gray-100 flex justify-between items-start">
      <div>
        <p className="font-semibold text-sm text-gray-900">{role}</p>
        <p className="text-xs text-gray-500 mt-0.5">{candidateName}</p>
        <p className="text-xs text-gray-400 mt-0.5">{timeRange}</p>
      </div>
      <button className="w-6 h-6 flex items-center justify-center text-gray-400 flex-shrink-0">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 10L10 2M10 2H4M10 2V8"
            stroke="#9CA3AF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Schedule() {
  const { schedule, scheduleLoading, scheduleError, getSchedule } =
    useDashboardStore();

  useEffect(() => {
    getSchedule();
  }, [getSchedule]);

  const weekDays = getWeekDays();
  const today = new Date();
  const todaySchedule = schedule.filter((item) =>
    isSameDay(item.start_time, today),
  );

  return (
    <div
      className="bg-white rounded-2xl p-4
     flex flex-col gap-4 flex-1"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-base">Schedule</h3>
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

      {/* Week Days */}
      <div className="flex justify-between">
        {weekDays.map(({ label, day, date }) => (
          <div key={day} className="flex flex-col items-center gap-1">
            <span className="text-xs text-gray-400">{label}</span>
            <span
              className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full
                ${isToday(date) ? "bg-[#02505E] text-white" : "text-gray-700"}`}
            >
              {day}
            </span>
          </div>
        ))}
      </div>

      {/* Content */}
      {scheduleLoading ? (
        <div className="flex items-center justify-center py-8">
          <p className="text-sm text-gray-400">Loading schedule...</p>
        </div>
      ) : scheduleError ? (
        <p className="text-sm text-[#C0392B] text-center py-4">
          {scheduleError}
        </p>
      ) : todaySchedule.length === 0 ? (
        <div className="flex items-center justify-center py-8">
          <p className="text-sm text-gray-400">No interviews scheduled today</p>
        </div>
      ) : (
        <div className="flex flex-row gap-3">
          {/* Time + avatar column */}
          <div className="flex flex-col items-center gap-1 pt-1">
            <span className="text-xs text-gray-400">
              {formatTime(todaySchedule[0].start_time).split(":")[0]}:30
            </span>
            <div className="w-px bg-gray-200 flex-1 relative my-1">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                {todaySchedule.length}
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-3 flex-1">
            {todaySchedule.map((item, index) => (
              <ScheduleCard
                key={item.interview_id}
                candidateName={item.candidate_name}
                role={item.role}
                startTime={item.start_time}
                endTime={item.end_time}
                isFirst={index === 0}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
