import React from "react";
import CandidatesHeader from "./components/CandidatesHeader";
import CandidatesToolbar from "./components/CandidatesToolbar";
import CandidatesViewToggle from "./components/CandidatesViewToggle";
import CandidatesStats from "./components/CandidatesStats";
import CandidatesTableView from "./components/CandidatesTableView";

const Candidates = () => {
  return (
    <div>
      <CandidatesHeader />
      <CandidatesStats />
      <CandidatesToolbar />
      <CandidatesViewToggle />
      <CandidatesTableView />
    </div>
  );
};

export default Candidates;
