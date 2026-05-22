import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CandidatesViewToggle = () => {
  return (
    <Tabs defaultValue="list" className="w-auto">
      <TabsList className="h-10 border border-button-outline-border bg-bg-primary p-1 gap-1 rounded-lg">
        <TabsTrigger
          value="list"
          className="px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-bg-tertiary data-[state=active]:text-color-text-primary rounded-md"
        >
          List
        </TabsTrigger>
        <TabsTrigger
          value="grid"
          className="px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-bg-tertiary data-[state=active]:text-color-text-primary rounded-md"
        >
          Grid
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default CandidatesViewToggle;
