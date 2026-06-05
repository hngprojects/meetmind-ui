// components/common/dash/dashboard/Schedule.tsx
"use client";
import { useDashboardStore } from "@/store/dashboardInterview";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FiArrowUpRight } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });
}

function formatTimeWithPeriod(isoString: string): string {
  const timeStr = new Date(isoString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return timeStr.toLowerCase().replace(" ", "");
}

function getWeekDays() {
  const today = new Date();
  const days = [];
  const dayLabels = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
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

  if (isFirst) {
    return (
      <div className="bg-[#005162] text-white rounded-2xl p-5 flex justify-between items-start min-h-25">
        <div>
          <h4 className="font-bold text-lg leading-snug">{candidateName}</h4>
          <p className="text-xs opacity-75 mt-1.5 font-medium">{timeRange}</p>
        </div>
        <Button
          size="icon"
          variant="secondary"
          className="rounded-full bg-white text-[#005162] shadow-sm"
        >
          <FiArrowUpRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 flex justify-between items-center">
      <div>
        <p className="font-bold text-gray-900 text-sm">{candidateName}</p>
        <p className="text-xs text-gray-400 mt-1 font-medium">{timeRange}</p>
      </div>
    </div>
  );
}

export default function Schedule() {
  const { schedule, scheduleLoading, scheduleError, getSchedule } =
    useDashboardStore();

  useEffect(() => {
    getSchedule();
  }, [getSchedule]);

  const weekDays = getWeekDays();
  const today = new Date();

  const todaySchedule = schedule
    .filter((item) => isSameDay(item.start_time, today))
    .sort(
      (a, b) =>
        new Date(a.start_time).getTime() - new Date(b.start_time).getTime(),
    );

  const groupedSchedule = Object.entries(
    todaySchedule.reduce(
      (acc, item) => {
        const key = item.role;

        if (!acc[key]) acc[key] = [];
        acc[key].push(item);

        return acc;
      },
      {} as Record<string, typeof todaySchedule>,
    ),
  ).map(([role, items]) => ({
    role,
    items,
  }));

  return (
    <Card className="rounded-[24px] max-w-sm shadow-sm">
      <CardContent className="p-6 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl text-gray-900">Schedule</h3>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-8 w-8"
          >
            <FiArrowUpRight className="h-3 w-3" />
          </Button>
        </div>

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

        {scheduleLoading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm text-gray-400">Loading schedule...</p>
          </div>
        ) : scheduleError ? (
          <p className="text-sm text-red-500 text-center py-6">
            {scheduleError}
          </p>
        ) : todaySchedule.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm text-gray-400">
              No interviews scheduled today
            </p>
          </div>
        ) : (
          <div className="relative grid grid-cols-[68px_1fr] gap-x-4">
            <div className="absolute left-6 top-4 bottom-4 w-0.5 border-l-2 border-dashed border-gray-200 pointer-events-none" />
            {groupedSchedule.map((group) => {
              const firstItem = group.items[0];

              return (
                <div key={group.role} className="contents">
                  <div className="flex flex-col items-center z-10 mb-6">
                    <div className="bg-[#B983FF] text-white text-xs font-bold w-7 h-7 flex items-center justify-center rounded-full shadow-sm">
                      {group.items.length}
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-4 flex flex-col gap-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-gray-900 text-base">
                          {group.role}
                        </span>

                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-6 w-6 rounded-full"
                        >
                          <FiArrowUpRight className="h-3 w-3" />
                        </Button>
                      </div>
                      <ScheduleCard
                        candidateName={firstItem.candidate_name}
                        role={firstItem.role}
                        startTime={firstItem.start_time}
                        endTime={firstItem.end_time}
                        isFirst={true}
                      />

                      {group.items.slice(1).map((item) => (
                        <ScheduleCard
                          key={item.interview_id}
                          candidateName={item.candidate_name}
                          role={item.role}
                          startTime={item.start_time}
                          endTime={item.end_time}
                          isFirst={false}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
