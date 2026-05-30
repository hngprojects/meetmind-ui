import { createColumnHelper } from "@tanstack/react-table";
import { FiChevronRight, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { Candidate } from "@/lib/types/candidates";
import ScoreBar from "./ScoreBar";
import StatusBadge from "./StatusBadge";
import ActionBadge from "./ActionBadge";
import { CandidateFilters } from "@/store/candidatesStore";
import { formatRelativeDate, formatDate } from "../helpers/date";
import SortableHeader from "./SortableHeader";
import { Button } from "@/components/ui/button";

export const getInitials = (name?: string | null) => {
  const n = typeof name === "string" ? name.trim() : "";
  if (!n) return "";

  return n
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

const columnHelper = createColumnHelper<Candidate>();

type ColumnsProps = {
  filters: CandidateFilters;
  setFilters: (filters: Partial<CandidateFilters>) => void;
};

const getSortIcon = (active: boolean, direction: "asc" | "desc") => {
  if (!active) return <FiArrowDown className="opacity-40" />;

  return direction === "asc" ? <FiArrowUp /> : <FiArrowDown />;
};

const handleSort = (
  field: "name" | "score" | "date",
  filters: CandidateFilters,
  setFilters: (filters: Partial<CandidateFilters>) => void,
) => {
  const isSameField = filters.sortBy === field;

  setFilters({
    sortBy: field,
    sortDirection:
      isSameField && filters.sortDirection === "asc" ? "desc" : "asc",
    page: 1,
  });
};

export const getCandidateColumns = ({ filters, setFilters }: ColumnsProps) => [
  columnHelper.accessor("name", {
    header: () => (
      <SortableHeader
        title="Name"
        onfunction={getSortIcon(
          filters.sortBy === "name",
          filters.sortDirection,
        )}
        onClick={() => handleSort("name", filters, setFilters)}
      />
    ),
    meta: { widthClass: "w-[28%]" },
    cell: ({ row: { original } }) => (
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#B5B7BD] text-xs font-bold text-white">
          {getInitials(original.name)}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-color-text-color-primary text-base">
            {original.name}
          </span>
          <span className="text-xs text-color-text-secondary truncate">
            {original.email}
          </span>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("role", {
    header: "Role",
    meta: { widthClass: "w-[20%]" },
    cell: (info) => (
      <span className="text-color-text-subtext font-medium">
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    meta: { widthClass: "w-[15%]" },
    cell: (info) => <StatusBadge status={info.getValue()} />,
  }),
  columnHelper.accessor("createdAt", {
    header: () => (
      <SortableHeader
        title="Date"
        onfunction={getSortIcon(
          filters.sortBy === "date",
          filters.sortDirection,
        )}
        onClick={() => handleSort("date", filters, setFilters)}
      />
    ),
    meta: { widthClass: "w-[15%]" },
    cell: (info) => {
      const date = info.getValue();

      return (
        <span className="text-color-text-subtext" title={formatDate(date)}>
          {formatRelativeDate(date)}
        </span>
      );
    },
  }),
  columnHelper.accessor("score", {
    header: () => (
      <SortableHeader
        title="Scores"
        onfunction={getSortIcon(
          filters.sortBy === "score",
          filters.sortDirection,
        )}
        onClick={() => handleSort("score", filters, setFilters)}
      />
    ),
    meta: { widthClass: "w-[12%]" },
    cell: (info) => <ScoreBar score={info.getValue()} />,
  }),
  columnHelper.accessor("action", {
    header: "Action",
    meta: { widthClass: "w-[10%]" },
    cell: (info) => <ActionBadge action={info.getValue()} />,
  }),
  columnHelper.display({
    id: "actions-chevron",
    meta: { widthClass: "w-[5%]" },
    cell: () => (
      <div className="text-right text-color-text-divider">
        <Button
          type="button"
          variant="ghost"
          className="p-1 hover:text-color-text-color-primary transition-colors"
        >
          <FiChevronRight className="h-5 w-5" />
        </Button>
      </div>
    ),
  }),
];
