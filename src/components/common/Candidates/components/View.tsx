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

  const { data, isLoading, isError, error } = useCandidates(queryParams);

  const candidates = data?.candidates ?? [];
  const pagination = data?.pagination;
  const setFilters = useCandidatesStore((s) => s.setFilters);

  const typedError = error as {
    response?: {
      data?: {
        message?: string;
        code?: string;
      };
    };
  };

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
    const shimmer = "animate-pulse bg-bg-secondary rounded";

    return (
      <div className="flex flex-col gap-4">
        <CandidatesStats stats={undefined} loading={isLoading} />
        <CandidatesToolbar />

        <div className="w-full overflow-hidden rounded-xl border border-card-border bg-card-bg">
          <div className="h-12 bg-bg-secondary border-b border-card-border animate-pulse" />
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center px-6 py-4 gap-6 border-b border-card-border"
            >
              <div className="flex items-center gap-3 w-[28%]">
                <div className="h-10 w-10 rounded-full bg-bg-secondary animate-pulse" />

                <div className="flex flex-col gap-2">
                  <div className={`h-3 w-32 ${shimmer}`} />
                  <div className={`h-2 w-24 ${shimmer}`} />
                </div>
              </div>
              <div className="w-[20%]">
                <div className={`h-3 w-24 ${shimmer}`} />
              </div>

              <div className="w-[15%]">
                <div className="h-6 w-20 rounded-full bg-bg-secondary animate-pulse" />
              </div>
              <div className="w-[15%]">
                <div className={`h-3 w-20 ${shimmer}`} />
              </div>

              <div className="w-[12%]">
                <div className={`h-3 w-16 ${shimmer}`} />
              </div>

              <div className="w-[5%] flex justify-end">
                <div className="h-6 w-6 rounded bg-bg-secondary animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    const message =
      typedError?.response?.data?.message ||
      "Something went wrong while loading candidates.";

    const code = typedError?.response?.data?.code;

    return (
      <div className="w-full flex flex-col items-center justify-center py-16 text-center">
        <div className="text-red-500 text-lg font-semibold">{message}</div>

        {code && (
          <div className="text-xs text-color-text-secondary mt-2 text-black">
            Error code: {code}
          </div>
        )}

        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 rounded-lg bg-black text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        <CandidatesStats stats={data?.stats} loading={isLoading} />
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
