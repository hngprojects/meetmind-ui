"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCandidatesStore } from "@/store/candidatesStore";
import { ViewMode } from "@/store/candidatesStore";

const CandidatesViewToggle = () => {
  const viewMode = useCandidatesStore((s) => s.viewMode);
  const setViewMode = useCandidatesStore((s) => s.setViewMode);
  return (
    <Tabs
      defaultValue="list"
      className="w-full md:w-[20%]"
      value={viewMode}
      onValueChange={(v) => setViewMode(v as ViewMode)}
    >
      <TabsList
        className="h-10 border border-button-outline-border
       w-full  bg-bg-primary p-1 gap-1 rounded-lg"
      >
        <TabsTrigger
          value="list"
          className="px-4 py-2 text-sm font-medium transition-all w-[50%]
           data-[state=active]:bg-bg-tertiary data-[state=active]:text-color-text-primary rounded-md"
        >
          List
        </TabsTrigger>

        <TabsTrigger
          value="grid"
          className="px-4 py-2 text-sm font-medium transition-all  w-[50%]
           data-[state=active]:bg-bg-tertiary data-[state=active]:text-color-text-primary rounded-md"
        >
          Grid
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default CandidatesViewToggle;
