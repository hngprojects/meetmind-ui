import React from "react";
import { CandidateStats as CandidateStatsType } from "@/lib/types/candidates";
import StatCard from "./StatCard";

type Props = {
  stats?: CandidateStatsType;
  loading?: boolean;
};

const shimmerClass = "animate-pulse bg-bg-secondary rounded";

const StatsShimmer = () => (
  <>
    {/* Mobile: 2x2 grid */}
    <div className="grid grid-cols-2 sm:hidden w-full rounded-lg overflow-hidden border border-text-white-secondary">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className={[
            "p-4 flex flex-col gap-3 bg-bg-secondary",
            i === 0 && "border-b border-r border-text-white-secondary",
            i === 1 && "border-b border-text-white-secondary",
            i === 2 && "border-r border-text-white-secondary",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className={`h-3 w-20 ${shimmerClass}`} />
          <div className={`h-8 w-12 ${shimmerClass}`} />
        </div>
      ))}
    </div>

    {/* Desktop: single row */}
    <div className="hidden sm:flex bg-bg-secondary rounded-lg w-full divide-x divide-text-white-secondary">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-6 flex-1 flex flex-col gap-3 justify-between">
          <div className={`h-4 w-28 ${shimmerClass}`} />
          <div className={`h-10 w-16 ${shimmerClass}`} />
        </div>
      ))}
    </div>
  </>
);

const statItems = (safeStats: CandidateStatsType) => [
  {
    label: "Total Candidates",
    value: safeStats.total,
    valueClassName: "text-text-purple-accent",
  },
  {
    label: "Completed",
    value: safeStats.completed,
    valueClassName: "text-text-color-secondary",
  },
  {
    label: "Ongoing",
    value: safeStats.ongoing,
    valueClassName: "text-text-color-secondary",
  },
  {
    label: "Needs attention",
    value: safeStats.needs_review,
    valueClassName: "text-error",
  },
];

const CandidatesStats = ({ stats, loading }: Props) => {
  const safeStats = stats ?? {
    total: 0,
    completed: 0,
    ongoing: 0,
    needs_review: 0,
  };

  if (loading) return <StatsShimmer />;

  const items = statItems(safeStats);

  return (
    <>
      {/* Mobile: 2x2 grid */}
      <div className="grid grid-cols-2 sm:hidden w-full rounded-lg overflow-hidden border border-text-white-secondary">
        {items.map((item, i) => (
          <div
            key={item.label}
            className={[
              "bg-bg-secondary",
              i === 0 && "border-b border-r border-text-white-secondary",
              i === 1 && "border-b border-text-white-secondary",
              i === 2 && "border-r border-text-white-secondary",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <StatCard {...item} />
          </div>
        ))}
      </div>

      {/* Desktop: single row */}
      <div className="hidden sm:flex bg-bg-secondary rounded-lg w-full divide-x divide-text-white-secondary">
        {items.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </div>
    </>
  );
};

export default CandidatesStats;
