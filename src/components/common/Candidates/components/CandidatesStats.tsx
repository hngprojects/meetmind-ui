import React from "react";

const CandidatesStats = () => {
  return (
    <div className="flex bg-bg-secondary rounded-lg w-full divide-x divide-text-white-secondary">
      <div className="p-6 flex-1 flex flex-col justify-between items-start gap-2">
        <p className="text-[18px] font-normal text-text-secondary">
          Total Candidates
        </p>
        <p className="text-4xl font-semibold text-text-purple-accent">5</p>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between items-start gap-2">
        <p className="text-[18px] font-normal text-text-secondary">Completed</p>
        <p className="text-4xl font-semibold text-text-color-secondary">2</p>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between items-start gap-2">
        <p className="text-[18px] font-normal text-text-secondary">Ongoing</p>
        <p className="text-4xl font-semibold text-text-color-secondary">7</p>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between items-start gap-2">
        <p className="text-[18px] font-normal text-text-secondary">
          Needs attention
        </p>
        <p className="text-4xl font-semibold text-error">3</p>
      </div>
    </div>
  );
};

export default CandidatesStats;
