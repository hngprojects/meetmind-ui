import React from "react";
import { CandidateStats as CandidateStatsType } from "@/lib/types/candidates";
import StatCard from "./StatCard";

type Props = {
  stats?: CandidateStatsType;
  loading?: boolean;
};

const CandidatesStats = ({ stats, loading }: Props) => {
  const safeStats = stats ?? {
    total: 0,
    completed: 0,
    ongoing: 0,
    needs_review: 0,
  };

  if (loading) {
    const shimmer = "animate-pulse bg-bg-secondary rounded";

    return (
      <div className="flex bg-bg-secondary rounded-lg w-full divide-x divide-text-white-secondary">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="p-6 flex-1 flex flex-col gap-3 justify-between"
          >
            <div className={`h-4 w-28 ${shimmer}`} />
            <div className={`h-10 w-16 ${shimmer}`} />
          </div>
        ))}
      </div>
    );
  }

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

      <StatCard
        label="Total Candidates"
        value={safeStats.total}
        valueClassName="text-text-purple-accent"
      />

      <StatCard
        label="Completed"
        value={safeStats.completed}
        valueClassName="text-text-color-secondary"
      />

      <StatCard
        label="Ongoing"
        value={safeStats.ongoing}
        valueClassName="text-text-color-secondary"
      />

      <StatCard
        label="Needs attention"
        value={safeStats.needs_review}
        valueClassName="text-error"
      />
    </div>
  );
};

export default CandidatesStats;
