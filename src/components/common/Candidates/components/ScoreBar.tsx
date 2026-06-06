import React from "react";

const ScoreBar = ({ score }: { score: number }) => {
  const displayWidth = score === 0 ? 8 : Math.max(score, 8);

  return (
    <div className="flex items-center gap-3 select-none">
      <span className="font-bold text-text-color-primary w-5 text-sm">
        {score}
      </span>

      <div className="h-2 w-18 rounded-full bg-card-border relative overflow-hidden shrink-0">
        <div
          className="h-full bg-text-primary rounded-full transition-all duration-300 ease-out"
          style={{ width: `${displayWidth}%` }}
        />
      </div>
    </div>
  );
};

export default ScoreBar;
