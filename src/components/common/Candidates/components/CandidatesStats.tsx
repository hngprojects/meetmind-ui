import React, { useMemo } from "react";
import { Candidate } from "../types";
import StatCard from "./StatCard";

type Props = {
  data: Candidate[];
};

const CandidatesStats = ({ data }: Props) => {
  const stats = useMemo(() => {
    return {
      total: data.length,
      completed: data.filter((c) => c.status === "completed").length,
      ongoing: data.filter((c) => c.status === "ongoing").length,
      needsAttention: data.filter((c) => c.status === "needs_review").length,
    };
  }, [data]);
  return (
    <div className="flex bg-bg-secondary rounded-lg w-full divide-x divide-text-white-secondary">
      <StatCard
        label="Total Candidates"
        value={stats.total}
        valueClassName="text-text-purple-accent"
      />

      <StatCard
        label="Completed"
        value={stats.completed}
        valueClassName="text-text-color-secondary"
      />

      <StatCard
        label="Ongoing"
        value={stats.ongoing}
        valueClassName="text-text-color-secondary"
      />

      <StatCard
        label="Needs attention"
        value={stats.needsAttention}
        valueClassName="text-error"
      />
    </div>
  );
};

export default CandidatesStats;
