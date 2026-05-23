"use client";

import { cn } from "@/lib/utils";
import type { ScorecardCategory } from "@/types/interview";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";

type Props = {
  categories: ScorecardCategory[];
};

const BAR_COLORS = {
  green: "bg-[var(--color-success)]",
  orange: "bg-[var(--color-warning)]",
  gray: "bg-[var(--color-bg-divider)]",
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
              "border-b border-[var(--color-scrollbar-track)] py-5",
              index === categories.length - 1 && "border-0",
            )}
          >
            <button
              type="button"
              onClick={() => toggle(cat.id)}
              className="flex w-full items-center gap-3 text-left"
            >
              {isOpen ? (
                <FaChevronDown className="h-5 w-5 shrink-0 text-[var(--color-text-secondary)]" />
              ) : (
                <FaChevronRight className="h-5 w-5 shrink-0 text-[var(--color-text-secondary)]" />
              )}
              <span className="flex-1 font-semibold text-[var(--color-text-color-primary)]">
                {cat.title}
              </span>
            </button>

            <div className="mt-3 pl-8">
              <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-scrollbar-track)]">
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
                      <p className="text-sm font-medium text-[var(--color-text-color-primary)]">
                        Questions asked
                      </p>
                      <ul className="mt-2 space-y-2 text-sm text-[var(--color-text-secondary)]">
                        {cat.questions.map((q) => (
                          <li key={q}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {cat.signals && (
                    <div>
                      <p className="text-sm font-medium text-[var(--color-text-color-primary)]">
                        Signals detected
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {cat.signals.map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-[var(--color-card-border)] bg-[var(--color-bg-secondary)] px-3 py-1 text-xs text-[var(--color-text-body)]"
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
