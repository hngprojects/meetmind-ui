"use client";

import React from "react";
import { flexRender, Table as TanstackTable } from "@tanstack/react-table";
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
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-color-card-border bg-color-card-bg">
      <Table className="w-full text-left text-sm text-color-text-body">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-color-bg-secondary border-b border-color-card-border hover:bg-color-bg-secondary"
            >
              {headerGroup.headers.map((header) => {
                const meta = header.column.columnDef.meta as
                  | { widthClass?: string }
                  | undefined;
                return (
                  <TableHead
                    key={header.id}
                    className={`px-6 py-4 font-medium text-color-text-subtext h-auto ${meta?.widthClass ?? ""}`}
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
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="bg-white hover:bg-color-bg-secondary/40 transition-colors border-b-0"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap h-auto"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
  );
};

export default CandidatesTableView;
