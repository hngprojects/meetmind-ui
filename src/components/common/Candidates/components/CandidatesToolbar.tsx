"use client";

import React, { useState } from "react";
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
import Buttons from "@/components/reuseable-component/buttons";

type StatusValue = CandidateFilters["status"];

const STATUS_OPTIONS: { label: string; value: StatusValue }[] = [
  { label: "All", value: "all" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Needs review", value: "needs_review" },
  { label: "Completed", value: "completed" },
];

const SORT_FIELDS: CandidateFilters["sortBy"][] = ["date", "name", "score"];

const CandidatesToolbar = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const filters = useCandidatesStore((s) => s.filters);
  const setFilters = useCandidatesStore((s) => s.setFilters);
  const setExportOpen = useCandidatesStore((s) => s.setExportOpen);

  const handleToolbarSortClick = () => {
    const currentIndex = SORT_FIELDS.indexOf(filters.sortBy);
    const nextSortBy = SORT_FIELDS[(currentIndex + 1) % SORT_FIELDS.length];

    setFilters({
      sortBy: nextSortBy,
      page: 1,
    });
  };

  const activeStatusLabel =
    STATUS_OPTIONS.find((opt) => opt.value === filters?.status)?.label || "All";
  return (
    <div
      className="flex flex-col md:flex-row w-full justify-between 
      gap-6 items-center bg-bg-primary py-4"
    >
      <div className="relative flex items-center w-full md:w-[50%]">
        <FiSearch className="absolute left-3 h-4 w-4 text-color-text-placeholder" />
        <Input
          type="text"
          placeholder="Search candidates by name, role, or email"
          className="pl-10 pr-4 h-10 border-button-outline-border text-color-text-color-primary focus-visible:ring-1 focus-visible:ring-input-border-focus rounded-lg"
          value={filters.search}
          onChange={(e) => {
            setFilters({
              search: e.target.value,
              page: 1,
            });
          }}
        />
      </div>
      <div className=" md:hidden w-full">
        <Buttons
          text="Filter"
          type="button"
          onClick={() => setFilterOpen((prev) => !prev)}
        />
      </div>

      <div className="hidden md:flex flex-col md:flex-row items-center gap-3">
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
          onClick={handleToolbarSortClick}
        >
          <span>Sort by {filters.sortBy}</span>
          <LuArrowDownAZ className="h-4 w-4 text-color-text-secondary" />
        </Button>

        <Button
          variant="ghost"
          className="h-10 px-4 gap-2 border-button-outline-border text-color-text-subtext font-medium rounded-lg"
          onClick={() => setExportOpen(true)}
        >
          <FiUpload className="h-4 w-4 text-color-text-secondary" />
          <span>Export list</span>
        </Button>
        <CandidatesViewToggle />
      </div>
      {filterOpen && (
        <div className="md:hidden flex flex-col md:flex-row items-center gap-3 w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="w-full md:w-[20%]">
              <Button
                variant="ghost"
                className="h-10 px-4 gap-2 border
               border-button-outline-border text-color-text-subtext
                font-medium rounded-lg hover:bg-bg-secondary select-none"
              >
                <span>{activeStatusLabel}</span>
                <FiFilter className="h-4 w-4 text-color-text-secondary" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-full md:w-[20%] bg-popover border
             border-card-border rounded-xl shadow-md text-text-color-primary"
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
            className="h-10 px-4 gap-2 border-button-outline-border 
          text-color-text-subtext font-medium rounded-lg w-full md:w-[20%]"
            onClick={handleToolbarSortClick}
          >
            <span>Sort by {filters.sortBy}</span>
            <LuArrowDownAZ className="h-4 w-4 text-color-text-secondary" />
          </Button>

          <Button
            variant="ghost"
            className="h-10 px-4 gap-2 border-button-outline-border
          text-color-text-subtext font-medium rounded-lg w-full md:w-[20%]"
            onClick={() => setExportOpen(true)}
          >
            <FiUpload className="h-4 w-4 text-color-text-secondary" />
            <span>Export list</span>
          </Button>

          <CandidatesViewToggle />
        </div>
      )}
    </div>
  );
};

export default CandidatesToolbar;
