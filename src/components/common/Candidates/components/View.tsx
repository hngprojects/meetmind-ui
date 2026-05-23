"use client";

import React from "react";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useCandidatesStore } from "@/store/candidatesStore";
import CandidatesGridView from "./CandidatesGridView";
import CandidatesTableView from "./CandidatesTableView";
import { candidateColumns } from "./columns";
import { mockCandidatesData } from "../mock";
import { SortingState } from "@tanstack/react-table";
import { useState, useMemo } from "react";
import CandidatesToolbar from "./CandidatesToolbar";
import CandidatesStats from "./CandidatesStats";
import ExportModal from "./Export";

const View = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const viewMode = useCandidatesStore((s) => s.viewMode);
  const search = useCandidatesStore((s) => s.search);
  const filters = useCandidatesStore((s) => s.filters);
  const exportOpen = useCandidatesStore((s) => s.exportOpen);
  const setExportOpen = useCandidatesStore((s) => s.setExportOpen);
  const processedData = useMemo(() => {
    let data = [...mockCandidatesData];

    data = data.filter((c) => {
      const q = search.toLowerCase();

      return (
        c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
      );
    });

    data = data.filter((c) => {
      return (
        filters.status === "all" ||
        c.status.toLowerCase() === filters.status.toLowerCase()
      );
    });

    data = data.sort((a, b) => {
      const key = filters.sortBy;
      const dir = filters.sortDirection;

      const aValue = a[key];
      const bValue = b[key];

      if (key === "date") {
        const aDate = new Date(aValue).getTime();
        const bDate = new Date(bValue).getTime();

        return dir === "asc" ? aDate - bDate : bDate - aDate;
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return dir === "asc" ? aValue - bValue : bValue - aValue;
      }

      return dir === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });

    return data;
  }, [search, filters]);

  const table = useReactTable({
    data: processedData,
    columns: candidateColumns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <div>
      <div className="flex flex-col gap-4">
        <CandidatesStats data={processedData} />
        <CandidatesToolbar />
      </div>
      {viewMode === "list" ? (
        <CandidatesTableView table={table} />
      ) : (
        <CandidatesGridView table={table} />
      )}
      <ExportModal open={exportOpen} onClose={() => setExportOpen(false)} />
    </div>
  );
};

export default View;
