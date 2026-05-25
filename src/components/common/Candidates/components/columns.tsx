import { createColumnHelper } from "@tanstack/react-table";
import { FiChevronRight } from "react-icons/fi";
import { Candidate } from "@/lib/types/candidates";
import ScoreBar from "./ScoreBar";
import StatusBadge from "./StatusBadge";
import ActionBadge from "./ActionBadge";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const columnHelper = createColumnHelper<Candidate>();

export const candidateColumns = [
  columnHelper.accessor("name", {
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1"
        >
          Name
          {column.getIsSorted() === "asc" ? <FiArrowUp /> : <FiArrowDown />}
        </button>
      );
    },
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
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1"
        >
          Date
          {column.getIsSorted() === "asc" ? <FiArrowUp /> : <FiArrowDown />}
        </button>
      );
    },
    meta: { widthClass: "w-[15%]" },
    cell: (info) => (
      <span className="text-color-text-subtext">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("score", {
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1"
        >
          Scores
          {column.getIsSorted() === "asc" ? <FiArrowUp /> : <FiArrowDown />}
        </button>
      );
    },
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
        <button className="p-1 hover:text-color-text-color-primary transition-colors">
          <FiChevronRight className="h-5 w-5" />
        </button>
      </div>
    ),
  }),
];
