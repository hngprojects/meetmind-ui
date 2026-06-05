// components/common/dash/dashboard/Schedule.tsx
"use client";
import { useDashboardStore } from "@/store/dashboardInterview";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FiArrowUpRight } from "lucide-react";

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false, // Turned off to match "2:30" formatting without pm/am tags inside the pill
  });
}

function formatTimeWithPeriod(isoString: string): string {
  const timeStr = new Date(isoString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  // Removes spaces to match "2:30pm" from design
  return timeStr.toLowerCase().replace(" ", "");
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

// ── Schedule Card Component ───────────────────────────────────────────────────
function ScheduleCard({
  candidateName,
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
  const timeRange = `${formatTimeWithPeriod(startTime)} - ${formatTime(endTime)}`;

  // First Event: Solid Dark Teal blocks with Top Right Arrow Circle
  if (isFirst) {
    return (
      <div className="bg-[#005162] text-white rounded-2xl p-5 flex justify-between items-start min-h-[100px]">
        <div>
          <h4 className="font-bold text-lg leading-snug">{candidateName}</h4>
          <p className="text-xs opacity-75 mt-1.5 font-medium">{timeRange}</p>
        </div>
        <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 10L10 2M10 2H4M10 2V8"
              stroke="#005162"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    );
  }

  // Nested Cards under Grouping Headers (e.g. Video Editor group)
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 flex justify-between items-center">
      <div>
        <p className="font-bold text-gray-900 text-sm">{candidateName}</p>
        <p className="text-xs text-gray-400 mt-1 font-medium">{timeRange}</p>
      </div>
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

  // Filter and sort items chronologically
  const todaySchedule = schedule
    .filter((item) => isSameDay(item.start_time, today))
    .sort(
      (a, b) =>
        new Date(a.start_time).getTime() - new Date(b.start_time).getTime(),
    );

  return (
    <div className="bg-white rounded-[24px] p-6 flex flex-col gap-6 max-w-sm border border-gray-50 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-xl text-gray-900">Schedule</h3>
        <button className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-800 hover:bg-gray-50">
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

      {/* Week Days */}
      <div className="flex justify-between items-center px-1">
        {weekDays.map(({ label, day, date }) => {
          const current = isToday(date);
          return (
            <div key={day} className="flex flex-col items-center gap-1.5">
              <span
                className={`text-xs font-semibold ${current ? "text-gray-900 font-bold" : "text-gray-300"}`}
              >
                {label}
              </span>
              <span
                className={`text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full transition-colors
                  ${current ? "bg-gray-900 text-white" : "text-gray-400"}`}
              >
                {day}
              </span>
            </div>
          );
        })}
      </div>

      {/* Content Rendering Block */}
      {scheduleLoading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-gray-400">Loading schedule...</p>
        </div>
      ) : scheduleError ? (
        <p className="text-sm text-red-500 text-center py-6">{scheduleError}</p>
      ) : todaySchedule.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-gray-400">No interviews scheduled today</p>
        </div>
      ) : (
        /* The Timeline Split Grid Layout */
        <div className="relative grid grid-cols-[68px_1fr] gap-x-4">
          {/* Left Side: Solid Dashed Border Line Anchor for Timeline */}
          <div className="absolute left-[24px] top-4 bottom-4 w-0.5 border-l-2 border-dashed border-gray-200 pointer-events-none" />

          {/* Iterate Over Ordered Schedule Items */}
          {todaySchedule.map((item, index) => {
            const timeLabel = formatTime(item.start_time);

            // Logic to check if this item starts a grouped block (e.g., index 1 vs remaining index items)
            const isFirstItem = index === 0;
            const isGroupHeader = index === 1;
            const groupCount = todaySchedule.slice(index).length;

            return (
              <div key={item.interview_id} className="contents">
                {/* 1. Left Column Layout Elements */}
                <div className="flex flex-col items-center z-10 mb-6">
                  {isFirstItem ? (
                    <div className="bg-[#005162] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      {timeLabel}
                    </div>
                  ) : isGroupHeader ? (
                    <>
                      <div className="bg-[#B983FF] text-white text-xs font-bold w-7 h-7 flex items-center justify-center rounded-full shadow-sm">
                        {groupCount}
                      </div>
                      <div className="bg-white border border-gray-200 text-gray-700 text-xs font-bold px-2.5 py-1.5 rounded-full mt-6">
                        {timeLabel}
                      </div>
                    </>
                  ) : (
                    <div className="bg-white border border-gray-200 text-gray-700 text-xs font-bold px-2.5 py-1.5 rounded-full">
                      {timeLabel}
                    </div>
                  )}
                </div>

                {/* 2. Right Column Content Block Elements */}
                <div className="mb-6">
                  {isFirstItem ? (
                    <ScheduleCard
                      candidateName={item.candidate_name}
                      role={item.role}
                      startTime={item.start_time}
                      endTime={item.end_time}
                      isFirst={true}
                    />
                  ) : isGroupHeader ? (
                    /* Outer Wrapper Box Container for grouped Items like Video Editor block */
                    <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-4 flex flex-col gap-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-gray-900 text-base">
                          {item.role}
                        </span>
                        <button className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
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
                      <ScheduleCard
                        candidateName={item.candidate_name}
                        role={item.role}
                        startTime={item.start_time}
                        endTime={item.end_time}
                        isFirst={false}
                      />
                      {/* Mount subsequent items belonging to the same grouping directly inside */}
                      {todaySchedule.slice(index + 1).map((subItem) => (
                        <ScheduleCard
                          key={subItem.interview_id}
                          candidateName={subItem.candidate_name}
                          role={subItem.role}
                          startTime={subItem.start_time}
                          endTime={subItem.end_time}
                          isFirst={false}
                        />
                      ))}
                    </div>
                  ) : // Managed by the slice sequence inside GroupHeader wrapper array mapping above
                  null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
