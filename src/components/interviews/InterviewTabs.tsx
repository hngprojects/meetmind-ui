"use client";

import { cn } from "@/lib/utils";
import type { InterviewTab } from "@/types/interview";

const TABS: { id: InterviewTab; label: string }[] = [
  { id: "chat", label: "Chat" },
  { id: "transcript", label: "Transcript" },
  { id: "summary", label: "Summary" },
  { id: "scorecard", label: "Scorecard" },
  { id: "profile", label: "Profile" },
];

type Props = {
  active: InterviewTab;
  onChange: (tab: InterviewTab) => void;
};

export default function InterviewTabs({ active, onChange }: Props) {
  return (
    <div className="flex gap-8 border-b border-[#e5e7eb] px-6 pt-6">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            "relative pb-3 text-sm font-medium transition-colors",
            active === tab.id
              ? "text-[#0e797e] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#0e797e]"
              : "text-[#6b7280] hover:text-[#0f172a]",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
