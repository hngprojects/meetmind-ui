import { cn } from "@/lib/utils";
import type { InterviewListStatus } from "@/types/interview";

type StatusBadgeProps = {
  status: InterviewListStatus;
  label?: string;
  className?: string;
};

export default function StatusBadge({
  status,
  label,
  className,
}: StatusBadgeProps) {
  if (status === "none") return null;

  const isLive = status === "live";
  const text = label ?? (isLive ? "Live" : "Upcoming");

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        isLive
          ? "bg-[var(--color-badge-live-bg)] text-[var(--color-badge-live-text)]"
          : "bg-[var(--color-badge-upcoming-bg)] text-[var(--color-badge-upcoming-text)]",
        className,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          isLive
            ? "bg-[var(--color-badge-live-text)]"
            : "bg-[var(--color-badge-upcoming-dot)]",
        )}
      />
      {text}
    </span>
  );
}
