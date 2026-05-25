"use client";

import React from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useCandidatesStore } from "@/store/candidatesStore";
import { useCandidates } from "@/lib/hooks/useCandidates";
import CandidatesGridView from "./CandidatesGridView";
import CandidatesTableView from "./CandidatesTableView";
import { getCandidateColumns } from "./columns";
import CandidatesToolbar from "./CandidatesToolbar";
import CandidatesStats from "./CandidatesStats";
import ExportModal from "./Export";
import CandidatesPagination from "./CandidatesPagination";

const View = () => {
  const viewMode = useCandidatesStore((s) => s.viewMode);
  const filters = useCandidatesStore((s) => s.filters);
  const exportOpen = useCandidatesStore((s) => s.exportOpen);
  const setExportOpen = useCandidatesStore((s) => s.setExportOpen);

  const queryParams = {
    q: filters.search,
    status: filters.status === "all" ? undefined : filters.status,
    sortBy: filters.sortBy,
    sortDirection: filters.sortDirection,
    page: filters.page,
    pageSize: filters.pageSize,
  };

  const { data, isLoading, isError } = useCandidates(queryParams);

  const candidates = data?.candidates ?? [];
  const pagination = data?.pagination;

  const setFilters = useCandidatesStore((s) => s.setFilters);

  const columns = getCandidateColumns({
    filters,
    setFilters,
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: candidates,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div>Loading candidates...</div>;
  }

  if (isError) {
    return <div>Failed to load candidates</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        <CandidatesStats stats={data?.stats} />
        <CandidatesToolbar />
      </div>
      {viewMode === "list" ? (
        <>
          <CandidatesTableView table={table} />
          <CandidatesPagination pagination={pagination} isLoading={isLoading} />
        </>
      ) : (
        <CandidatesGridView table={table} />
      )}
      <ExportModal open={exportOpen} onClose={() => setExportOpen(false)} />
    </div>
  );
};

export default View;
