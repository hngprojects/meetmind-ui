import React, { useMemo } from "react";
import { Candidate } from "../types";

type Props = {
  data: Candidate[];
};

const CandidatesStats = ({ data }: Props) => {
  const stats = useMemo(() => {
    return {
      total: data.length,
      completed: data.filter((c) => c.status === "Completed").length,
      ongoing: data.filter((c) => c.status === "Ongoing").length,
      needsAttention: data.filter((c) => c.status === "needs_review").length,
    };
  }, [data]);
  return (
    <div className="flex bg-bg-secondary rounded-lg w-full divide-x divide-text-white-secondary">
      <div className="p-6 flex-1 flex flex-col justify-between items-start gap-2">
        <p className="text-[18px] font-normal text-text-secondary">
          Total Candidates
        </p>
        <p className="text-4xl font-semibold text-text-purple-accent">
          {stats.total}
        </p>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between items-start gap-2">
        <p className="text-[18px] font-normal text-text-secondary">Completed</p>
        <p className="text-4xl font-semibold text-text-color-secondary">
          {stats.completed}
        </p>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between items-start gap-2">
        <p className="text-[18px] font-normal text-text-secondary">Ongoing</p>
        <p className="text-4xl font-semibold text-text-color-secondary">
          {stats.ongoing}
        </p>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between items-start gap-2">
        <p className="text-[18px] font-normal text-text-secondary">
          Needs attention
        </p>
        <p className="text-4xl font-semibold text-error">
          {stats.needsAttention}
        </p>
      </div>
    </div>
  );
};

export default CandidatesStats;
