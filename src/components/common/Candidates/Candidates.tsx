import React from "react";
import CandidatesToolbar from "./components/CandidatesToolbar";
import CandidatesStats from "./components/CandidatesStats";
import View from "./components/View";

const Candidates = () => {
  return (
    <div className="bg-bg-primary">
      <div className="flex flex-col gap-4">
        <CandidatesStats />
        <CandidatesToolbar />
      </div>
      <View />
    </div>
  );
};

export default Candidates;
