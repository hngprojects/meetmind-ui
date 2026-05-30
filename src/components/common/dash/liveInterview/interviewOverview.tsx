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

  if (overviewLoading) return <div>Loading...</div>;
  if (overviewError) return <div>Error: {overviewError}</div>;
  if (!overview) return null;

  return (
    <div className="px-2 md:px-10 lg:px-20 py-10 flex flex-col gap-4">
      <h1 className=" text-2xl lg:text-3xl text-text-color-primary font-bold">
        Good morning, {candidate.full_name || "John Doe"}
      </h1>

      <div className="bg-[#e1e3e462] p-7 flex flex-col gap-8 rounded-2xl">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-4 md:flex-row justify-between">
            <div className=" flex flex-col gap-2">
              <h1 className="font-bold text-2xl text-text-color-primary">
                Set up a new interview
              </h1>
              <p>
                You have {overview.stats.in_progress} interviews running and{" "}
                {overview.stats.completed} results ready to review.
              </p>
            </div>

            <Buttons
              text="Create interview"
              type="button"
              style2="w-full md:w-[20%]"
              onClick={toggle}
            />
          </div>
        </div>

        {/* numbers */}
        <div className="flex flex-col gap-4 md:flex-row justify-between">
          {/* total interviews */}
          <div
            className="flex flex-row justify-between
           md:flex-col md:items-center md:justify-center"
          >
            <p className="text-text-subtext">Total Interviews</p>
            <p className="text-2xl md:text-3xl text-text-color-primary font-bold">
              {overview.stats.total}
            </p>
          </div>

          <p className="w-full h-0.5 md:h-14 md:w-0.5 bg-gray-400"></p>
          {/* in progress */}
          <div
            className="flex flex-row justify-between
           md:flex-col md:items-center md:justify-center"
          >
            <p className="text-text-subtext">In Progress</p>
            <p className="text-2xl md:text-3xl text-[#4600A9] font-bold">
              {overview.stats.in_progress}
            </p>
          </div>

          <p className="w-full h-0.5 md:h-14 md:w-0.5 bg-gray-400"></p>

          {/* scheduled */}
          <div
            className="flex flex-row justify-between
           md:flex-col md:items-center md:justify-center"
          >
            <p className="text-text-subtext">Scheduled</p>
            <p className="text-2xl md:text-3xl text-text-color-primary font-bold">
              {overview.stats.scheduled}
            </p>
          </div>

          <p className="w-full h-0.5 md:h-14 md:w-0.5 bg-gray-400"></p>
          {/* completed */}
          <div
            className="flex flex-row justify-between
           md:flex-col md:items-center md:justify-center"
          >
            <p className="text-text-subtext">Completed</p>
            <p className="text-2xl md:text-3xl text-text-color-primary font-bold">
              {overview.stats.completed}
            </p>
          </div>

          <p className="w-full h-0.5 md:h-14 md:w-0.5 bg-gray-400"></p>
          {/* need attention */}
          <div
            className="flex flex-row justify-between
           md:flex-col md:items-center md:justify-center"
          >
            <p className="text-text-subtext">Need Attention</p>
            <p className="text-2xl md:text-3xl text-[#EF4444] font-bold">
              {overview.stats.needs_attention}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewOverview;
