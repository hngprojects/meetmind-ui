"use client";

import React from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { useCandidatesStore } from "@/store/candidatesStore";
import CandidatesGridView from "./CandidatesGridView";
import CandidatesTableView from "./CandidatesTableView";
import { candidateColumns } from "./columns";
import { mockCandidatesData } from "../mock";

const View = () => {
  const viewMode = useCandidatesStore((s) => s.viewMode);

  const table = useReactTable({
    data: mockCandidatesData,
    columns: candidateColumns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
      {" "}
      {viewMode === "list" ? (
        <CandidatesTableView table={table} />
      ) : (
        <CandidatesGridView table={table} />
      )}
    </div>
  );
};

export default View;
