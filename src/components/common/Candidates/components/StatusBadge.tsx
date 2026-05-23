import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CandidateStatus } from "../types";
import { STATUS_LABELS } from "../helpers/status";

const StatusBadge = ({ status }: { status: CandidateStatus }) => {
  const statusConfig: Record<
    CandidateStatus,
    { container: string; dot: string; text: string }
  > = {
    Ongoing: {
      container: "bg-warning-bg border-warning/20",
      dot: "bg-warning",
      text: "text-warning-text",
    },
    needs_review: {
      container: "bg-error-bg border-error/20",
      dot: "bg-error",
      text: "text-error-text",
    },
    Completed: {
      container: "bg-bg-success border-success/20",
      dot: "bg-success",
      text: "text-text-success",
    },
  };

  const config = statusConfig[status] || statusConfig["Ongoing"];
  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border shadow-none select-none transition-colors",
        config.container,
        config.text,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", config.dot)} />

      {STATUS_LABELS[status] ?? status}
    </Badge>
  );
};

export default StatusBadge;
