"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CandidatesViewToggle from "./CandidatesViewToggle";
import { FiSearch, FiFilter, FiUpload, FiCheck } from "react-icons/fi";
import { LuArrowDownAZ } from "react-icons/lu";
import { useCandidatesStore } from "@/store/candidatesStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { CandidateFilters } from "@/store/candidatesStore";

type StatusValue = CandidateFilters["status"];

const STATUS_OPTIONS: { label: string; value: StatusValue }[] = [
  { label: "All", value: "all" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Needs review", value: "needs_review" },
  { label: "Completed", value: "completed" },
];

const CandidatesToolbar = () => {
  const search = useCandidatesStore((s) => s.search);
  const setSearch = useCandidatesStore((s) => s.setSearch);
  const filters = useCandidatesStore((s) => s.filters);
  const setFilters = useCandidatesStore((s) => s.setFilters);

  const activeStatusLabel =
    STATUS_OPTIONS.find((opt) => opt.value === filters?.status)?.label || "All";
  return (
    <div className="flex w-full justify-between items-center bg-bg-primary py-4">
      <div className="relative flex items-center max-w-sm w-full">
        <FiSearch className="absolute left-3 h-4 w-4 text-color-text-placeholder" />
        <Input
          type="text"
          placeholder="Search candidates by name, role, or email"
          className="pl-10 pr-4 h-10 border-button-outline-border text-color-text-color-primary focus-visible:ring-1 focus-visible:ring-input-border-focus rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-10 px-4 gap-2 border border-button-outline-border text-color-text-subtext font-medium rounded-lg hover:bg-bg-secondary select-none"
            >
              <span>{activeStatusLabel}</span>
              <FiFilter className="h-4 w-4 text-color-text-secondary" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-48 bg-popover border border-card-border rounded-xl shadow-md text-text-color-primary"
          >
            <DropdownMenuLabel className="text-xs text-text-secondary font-medium px-2.5 py-1.5">
              Filter by Status
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-card-border" />

            {STATUS_OPTIONS.map((option) => {
              const isSelected = (filters?.status || "all") === option.value;

              return (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setFilters({ status: option.value })}
                  className={cn(
                    "flex items-center justify-between px-2.5 py-2 text-sm rounded-md cursor-pointer transition-colors hover:bg-bg-secondary",
                    isSelected && "font-medium text-text-primary",
                  )}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <FiCheck className="h-4 w-4 text-text-primary shrink-0" />
                  )}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          className="h-10 px-4 gap-2 border-button-outline-border text-color-text-subtext font-medium rounded-lg"
          onClick={() =>
            setFilters({
              ...filters,
              sortBy: "date",
              sortDirection: filters.sortDirection === "asc" ? "desc" : "asc",
            })
          }
        >
          <span>Sort by Date</span>
          <LuArrowDownAZ className="h-4 w-4 text-color-text-secondary" />
        </Button>

        <Button
          variant="ghost"
          className="h-10 px-4 gap-2 border-button-outline-border text-color-text-subtext font-medium rounded-lg"
        >
          <FiUpload className="h-4 w-4 text-color-text-secondary" />
          <span>Export list</span>
        </Button>
        <CandidatesViewToggle />
      </div>
    </div>
  );
};

export default CandidatesToolbar;
