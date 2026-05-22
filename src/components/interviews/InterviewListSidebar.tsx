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

export default function InterviewListSidebar({
  items,
  selectedId,
  onSelect,
}: Props) {
  return (
    <aside className="flex w-full max-w-[380px] flex-col rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-[#e5e7eb] px-5 py-4">
        <h2 className="text-base font-bold text-[#0f172a]">
          Interviews ({items.length})
        </h2>
        <button
          type="button"
          className="text-[#6b7280] hover:text-[#0f172a]"
          aria-label="More options"
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
                  "flex w-full gap-3 px-5 py-4 text-left transition-colors hover:bg-[#f7f9fb]",
                  selected && "bg-[#f7f9fb]",
                )}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#B5B7BD] text-sm font-medium text-[#FEFEFF]">
                  {item.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-[#0f172a]">
                      {item.roleTitle}
                    </p>
                    <StatusBadge status={item.listStatus} />
                  </div>
                  <p className="truncate text-sm text-[#6b7280]">
                    {item.candidateName}
                  </p>
                  <p className="mt-0.5 text-xs text-[#9ca3af]">
                    {item.scheduledLabel}
                  </p>
                </div>
              </button>
              {index < items.length - 1 && (
                <div className="mx-5 border-b border-[#f3f4f6]" />
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
