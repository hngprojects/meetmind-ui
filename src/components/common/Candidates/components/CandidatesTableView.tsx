"use client";

import React, { useState } from "react";
import { flexRender, Table as TanstackTable } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Candidate } from "@/lib/types/candidates";

const CandidatesTableView = ({
  table,
}: {
  table: TanstackTable<Candidate>;
}) => {
  const rows = table.getRowModel().rows;
  const headerGroups = table.getHeaderGroups();
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (rowId: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      next.has(rowId) ? next.delete(rowId) : next.add(rowId);
      return next;
    });
  };

  return (
    <>
      {/* ── DESKTOP: sticky-first-column scrollable table (sm+) ── */}
      <div className="hidden sm:block w-full overflow-x-auto rounded-xl border border-color-card-border bg-color-card-bg">
        <Table className="w-full text-left text-sm text-color-text-body">
          <TableHeader>
            {headerGroups.map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-color-bg-secondary border-b border-color-card-border hover:bg-color-bg-secondary"
              >
                {headerGroup.headers.map((header, index) => {
                  const meta = header.column.columnDef.meta as
                    | { widthClass?: string }
                    | undefined;

                  return (
                    <TableHead
                      key={header.id}
                      className={[
                        "px-6 py-4 font-medium text-color-text-subtext h-auto",
                        meta?.widthClass ?? "",
                        index === 0
                          ? "sticky left-0 z-20 bg-color-bg-secondary shadow-[2px_0_8px_-2px_rgba(0,0,0,0.08)]"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="divide-y divide-color-card-border border-b-0">
            {rows.length ? (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="group bg-white hover:bg-color-bg-secondary/40 transition-colors border-b-0"
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className={[
                        "px-6 py-4 whitespace-nowrap h-auto",
                        index === 0
                          ? "sticky left-0 z-10 bg-white group-hover:bg-color-bg-secondary/40 shadow-[2px_0_8px_-2px_rgba(0,0,0,0.08)] transition-colors"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-32 text-center text-color-text-secondary"
                >
                  No candidates found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ── MOBILE: collapsible card layout (< sm) ── */}
      <div className="sm:hidden space-y-2">
        {rows.length ? (
          rows.map((row) => {
            const cells = row.getVisibleCells();
            const [heroCell, ...restCells] = cells;
            const isExpanded = expandedRows.has(row.id);

            return (
              <div
                key={row.id}
                className="rounded-xl border border-color-card-border bg-white overflow-hidden"
              >
                {/* Tappable hero row */}
                <button
                  type="button"
                  onClick={() => toggleRow(row.id)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-color-bg-secondary text-left"
                >
                  <div className="font-medium text-color-text-body text-sm truncate">
                    {flexRender(
                      heroCell.column.columnDef.cell,
                      heroCell.getContext(),
                    )}
                  </div>
                  <ChevronDown
                    className={[
                      "shrink-0 w-4 h-4 text-color-text-subtext transition-transform duration-200",
                      isExpanded ? "rotate-180" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  />
                </button>

                {/* Collapsible detail rows */}
                <div
                  className={[
                    "grid transition-all duration-200 ease-in-out",
                    isExpanded
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className="overflow-hidden">
                    <div className="divide-y divide-color-card-border">
                      {restCells.map((cell) => {
                        const meta = cell.column.columnDef.meta as
                          | { hideOnMobile?: boolean }
                          | undefined;

                        if (meta?.hideOnMobile) return null;

                        const headerDef = cell.column.columnDef.header;
                        const label =
                          typeof headerDef === "string"
                            ? headerDef
                            : cell.column.id;

                        return (
                          <div
                            key={cell.id}
                            className="flex items-start justify-between gap-4 px-4 py-2.5 text-sm"
                          >
                            <span className="shrink-0 text-color-text-subtext font-medium capitalize">
                              {label}
                            </span>
                            <span className="text-color-text-body text-right">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-xl border border-color-card-border bg-white h-32 flex items-center justify-center text-sm text-color-text-secondary">
            No candidates found.
          </div>
        )}
      </div>
    </>
  );
};

export default CandidatesTableView;
