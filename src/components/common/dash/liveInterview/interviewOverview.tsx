"use client";
import Buttons from "@/components/reuseable-component/buttons";
import { useCreateStore } from "@/store/createInterviewStore";
import { useDashboardStore } from "@/store/dashboardInterview";
import { useUserDetailsStore } from "@/store/userDetail";
import { useEffect } from "react";

const InterviewOverview = () => {
  const { candidate } = useUserDetailsStore();
  const { toggle } = useCreateStore();

  const { overview, overviewLoading, overviewError, getOverview } =
    useDashboardStore();

  useEffect(() => {
    getOverview();
  }, [getOverview]);

  if (overviewLoading)
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-sm text-gray-400">Loading overview...</p>
      </div>
    );

  if (overviewError)
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-sm text-red-500">{overviewError}</p>
      </div>
    );

  if (!overview) return null;

  const stats = [
    {
      label: "Total Interviews",
      value: overview.stats.total,
      className: "text-text-color-primary",
    },
    {
      label: "In Progress",
      value: overview.stats.in_progress,
      className: "text-[var(--color-session-purple-text-dark)]",
    },
    {
      label: "Scheduled",
      value: overview.stats.scheduled,
      className: "text-text-color-primary",
    },
    {
      label: "Completed",
      value: overview.stats.completed,
      className: "text-text-color-primary",
    },
    {
      label: "Need Attention",
      value: overview.stats.needs_attention,
      className: "text-[var(--color-error)]",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl lg:text-3xl text-text-color-primary font-bold">
          {!candidate.full_name
            ? "Welcome back"
            : `Welcome back, ${candidate.full_name}`}
        </h1>
      </div>

      <div className="bg-white p-7 rounded-2xl shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl text-text-color-primary">
              Set up a new interview
            </h1>
            <p className="text-sm text-text-subtext">
              You have {overview.stats.in_progress} interviews running and{" "}
              {overview.stats.completed} results ready to review.
            </p>
          </div>

          <Buttons
            text="Create interview"
            type="button"
            style2="w-full md:w-[200px]"
            onClick={toggle}
          />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-5 md:divide-x md:divide-gray-200">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-row items-center justify-between gap-4 rounded-xl bg-gray-50 px-4 py-4 md:flex-col md:items-center md:justify-center ${
                index !== 0 ? "md:px-4" : ""
              }`}
            >
              <p className="text-sm text-text-subtext">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.className}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewOverview;
