"use client";

import { cn } from "@/lib/utils";
import type { ScorecardCategory } from "@/types/interview";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";

type Props = {
  categories: ScorecardCategory[];
};

const BAR_COLORS = {
  green: "bg-[#166534]",
  orange: "bg-[#b45309]",
  gray: "bg-[#d1d5db]",
};

export default function ScorecardTab({ categories }: Props) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(categories.map((c) => [c.id, c.expanded ?? false])),
  );

  useEffect(() => {
    function run() {
      setExpanded(
        Object.fromEntries(categories.map((c) => [c.id, c.expanded ?? false])),
      );
    }
    run();
  }, [categories]);

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-0 overflow-y-auto px-6 py-2">
      {categories.map((cat, index) => {
        const isOpen = expanded[cat.id];
        return (
          <div
            key={cat.id}
            className={cn(
              "border-b border-[#f3f4f6] py-5",
              index === categories.length - 1 && "border-0",
            )}
          >
            <button
              type="button"
              onClick={() => toggle(cat.id)}
              className="flex w-full items-center gap-3 text-left"
            >
              {isOpen ? (
                <FaChevronDown className="h-5 w-5 shrink-0 text-[#6b7280]" />
              ) : (
                <FaChevronRight className="h-5 w-5 shrink-0 text-[#6b7280]" />
              )}
              <span className="flex-1 font-semibold text-[#0f172a]">
                {cat.title}
              </span>
            </button>

            <div className="mt-3 pl-8">
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#f3f4f6]">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    BAR_COLORS[cat.color],
                  )}
                  style={{ width: `${cat.score}%` }}
                />
              </div>

              {isOpen && (
                <div className="mt-5 space-y-4">
                  {cat.questions && (
                    <div>
                      <p className="text-sm font-medium text-[#0f172a]">
                        Questions asked
                      </p>
                      <ul className="mt-2 space-y-2 text-sm text-[#6b7280]">
                        {cat.questions.map((q) => (
                          <li key={q}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {cat.signals && (
                    <div>
                      <p className="text-sm font-medium text-[#0f172a]">
                        Signals detected
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {cat.signals.map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-[#e5e7eb] bg-[#f9fafb] px-3 py-1 text-xs text-[#4b5563]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
