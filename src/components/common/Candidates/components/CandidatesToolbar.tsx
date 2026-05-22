import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CandidatesViewToggle from "./CandidatesViewToggle";
import {
  FiSearch,
  FiFilter,
  FiArrowDown,
  FiUploadCloud,
} from "react-icons/fi";

const CandidatesToolbar = () => {
  return (
    <div className="flex w-full justify-between items-center bg-bg-primary py-4">
      <div className="relative flex items-center max-w-sm w-full">
        <FiSearch className="absolute left-3 h-4 w-4 text-color-text-placeholder" />
        <Input
          type="text"
          placeholder="Search candidates by name, role, or email"
          className="pl-10 pr-4 h-10 border-button-outline-border text-color-text-color-primary focus-visible:ring-1 focus-visible:ring-input-border-focus rounded-lg"
        />
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="h-10 px-4 gap-2 border-button-outline-border text-color-text-subtext font-medium rounded-lg"
        >
          <span>All</span>
          <FiFilter className="h-4 w-4 text-color-text-secondary" />
        </Button>

        <Button
          variant="outline"
          className="h-10 px-4 gap-2 border-button-outline-border text-color-text-subtext font-medium rounded-lg"
        >
          <span>Sort by Date</span>
          <FiArrowDown className="h-4 w-4 text-color-text-secondary" />
        </Button>

        <Button
          variant="outline"
          className="h-10 px-4 gap-2 border-button-outline-border text-color-text-subtext font-medium rounded-lg"
        >
          <FiUploadCloud className="h-4 w-4 text-color-text-secondary" />
          <span>Export list</span>
        </Button>
        <CandidatesViewToggle />
      </div>
    </div>
  );
};

export default CandidatesToolbar;
