import React from "react";
import { CandidateStats as CandidateStatsType } from "@/lib/types/candidates";

type Props = {
  stats?: CandidateStatsType;
};

const CandidatesStats = ({ stats }: Props) => {
  const safeStats = stats ?? {
    total: 0,
    completed: 0,
    ongoing: 0,
    needs_review: 0,
  };

  return (
    <div className="flex bg-bg-secondary rounded-lg w-full divide-x divide-text-white-secondary">
      <div className="p-6 flex-1 flex flex-col justify-between items-start gap-2">
        <p className="text-[18px] font-normal text-text-secondary">
          Total Candidates
        </p>
        <p className="text-4xl font-semibold text-text-purple-accent">
          {safeStats.total ?? 0}
        </p>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between items-start gap-2">
        <p className="text-[18px] font-normal text-text-secondary">Completed</p>
        <p className="text-4xl font-semibold text-text-color-secondary">
          {safeStats.completed ?? 0}
        </p>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between items-start gap-2">
        <p className="text-[18px] font-normal text-text-secondary">Ongoing</p>
        <p className="text-4xl font-semibold text-text-color-secondary">
          {safeStats.ongoing ?? 0}
        </p>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between items-start gap-2">
        <p className="text-[18px] font-normal text-text-secondary">
          Needs attention
        </p>
        <p className="text-4xl font-semibold text-error">
          {safeStats.needs_review ?? 0}
        </p>
      </div>
    </div>
  );
};

export default CandidatesStats;
