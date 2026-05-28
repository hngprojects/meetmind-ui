import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

type SortableHeaderProps = {
  title: string;
  onfunction: ReactNode;
  onClick: () => void;
};

const SortableHeader = ({
  title,
  onClick,
  onfunction,
}: SortableHeaderProps) => {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onClick}
      className="flex items-center gap-1 p-0 hover:bg-transparent"
    >
      {title}

      {onfunction}
    </Button>
  );
};

export default SortableHeader;
