"use client";

import StatusBadge from "@/components/interviews/StatusBadge";
import { cn } from "@/lib/utils";
import type { InterviewListItem } from "@/types/interview";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";

type Props = {
  items: InterviewListItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

// ==================== 🧩Main Component ====================
export default function InterviewListSidebar({
  items,
  selectedId,
  onSelect,
}: Props) {
  return (
    <aside className="flex w-full max-w-[18rem] lg:max-w-[23.75rem] flex-col rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] shadow-sm">
      <div className="flex items-center justify-between border-b border-[var(--color-card-border)] px-5 py-4">
        <h2 className="text-base font-bold text-[var(--color-text-color-primary)]">
          Interviews ({items.length})
        </h2>
        <button
          type="button"
          disabled
          className="cursor-not-allowed text-[var(--color-text-secondary)] opacity-50"
          aria-label="More options (coming soon)"
        >
          <HiOutlineEllipsisVertical className="h-5 w-5" />
        </button>
      </div>

      <ul className="flex-1 overflow-y-auto">
        {items.map((item, index) => {
          const selected = item.id === selectedId;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                className={cn(
                  "flex w-full gap-3 px-5 py-4 text-left transition-colors hover:bg-[var(--color-bg-secondary)]",
                  selected && "bg-[var(--color-bg-secondary)]",
                )}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-text-placeholder)] text-sm font-medium text-[var(--color-text-white-primary)]">
                  {item.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-[var(--color-text-color-primary)]">
                      {item.roleTitle}
                    </p>
                    <StatusBadge status={item.listStatus} />
                  </div>
                  <p className="truncate text-sm text-[var(--color-text-secondary)]">
                    {item.candidateName}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--color-card-text)]">
                    {item.scheduledLabel}
                  </p>
                </div>
              </button>
              {index < items.length - 1 && (
                <div className="mx-5 border-b border-[var(--color-scrollbar-track)]" />
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
