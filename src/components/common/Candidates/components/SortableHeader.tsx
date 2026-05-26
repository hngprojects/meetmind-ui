import { Button } from "@/components/ui/button";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { Column } from "@tanstack/react-table";
import { Candidate } from "../types";

type SortableHeaderProps = {
  title: string;
  column: Column<Candidate, unknown>;
};

const SortableHeader = ({ title, column }: SortableHeaderProps) => {
  const sorted = column.getIsSorted();

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => column.toggleSorting(sorted === "asc")}
      className="flex items-center gap-1 p-0 hover:bg-transparent"
    >
      {title}

      {sorted === "asc" && <FiArrowUp />}
      {sorted === "desc" && <FiArrowDown />}
    </Button>
  );
};

export default SortableHeader;
