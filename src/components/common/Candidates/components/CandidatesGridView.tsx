import React from "react";
import { Table as TanstackTable } from "@tanstack/react-table";
import { Candidate } from "../types";
import { Card, CardContent } from "@/components/ui/card";
import ScoreBar from "./ScoreBar";
import StatusBadge from "./StatusBadge";
import { getInitials } from "./columns";
import { FiArrowUpRight } from "react-icons/fi";
import { cn } from "@/lib/utils";

const CandidatesGridView = ({ table }: { table: TanstackTable<Candidate> }) => {
  const rows = table.getRowModel().rows;

  if (!rows.length) {
    return (
      <div className="w-full rounded-xl border border-color-card-border bg-color-card-bg h-32 flex items-center justify-center text-color-text-secondary text-sm">
        No candidates found.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {rows.map((row) => {
        const candidate = row.original;
        const initials = getInitials(candidate.name);
        return (
          <Card
            key={row.id}
            className="bg-color-card-bg border-color-card-border rounded-2xl shadow-sm transition-all hover:shadow-md flex flex-col justify-between"
          >
            <CardContent className="p-6 flex flex-col h-full justify-between gap-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#B5B7BD] text-xs font-bold text-white">
                    {initials}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h3 className="font-semibold text-color-text-color-primary text-base truncate">
                      {candidate.name}
                    </h3>
                    <span className="text-xs text-color-text-secondary truncate">
                      {candidate.role}
                    </span>
                  </div>
                </div>

                <StatusBadge status={candidate.status} />
              </div>

              <div className="text-sm text-color-text-body min-h-11 line-clamp-2 grow">
                {"notes" in candidate && candidate.notes ? (
                  (candidate as Candidate).notes
                ) : (
                  <div className="flex items-center gap-1.5 pt-2">
                    <span className="h-2 w-2 rounded-full bg-color-bg-divider" />
                    <span className="h-2 w-2 rounded-full bg-color-bg-divider" />
                    <span className="h-2 w-2 rounded-full bg-color-bg-divider" />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-2 pt-2">
                <ScoreBar score={candidate.score} />

                <ScoreBar score={candidate.score} />
                <button
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full",
                    "bg-color-bg-secondary text-color-text-color-primary",
                    "border border-color-card-border transition-colors",
                    "hover:bg-color-button-primary-bg-hover hover:text-color-button-primary-text-hover",
                    "group/btn",
                  )}
                  aria-label={`View profiles for ${candidate.name}`}
                >
                  <FiArrowUpRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CandidatesGridView;
