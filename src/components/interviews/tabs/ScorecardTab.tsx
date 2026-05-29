"use client";

import { cn } from "@/lib/utils";
import type { InterviewDetail, ScorecardCategory } from "@/types/interview";
import { useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi2";

type Props = {
  interview: InterviewDetail;
};

// Mock data as requested since there is no endpoint yet
const MOCK_SCORECARD: ScorecardCategory[] = [
  {
    id: "problem-solving",
    title: "Problem Solving",
    score: 83,
    color: "green",
    questions: [
      "Walk me through a complex technical challenge you've faced. How did you break down the problem?",
    ],
    signals: [
      "Structured thinking",
      "Root cause analysis",
      "Clear articulation",
    ],
  },
  {
    id: "communication",
    title: "Communication",
    score: 60,
    color: "orange",
    questions: [
      "Can you explain a difficult concept to a non-technical stakeholder?",
    ],
    signals: ["Clarity", "Empathy", "Conciseness"],
  },
  {
    id: "technical-depth",
    title: "Technical depth",
    score: 0,
    color: "gray",
    questions: [],
    signals: [],
  },
];

export default function ScorecardTab({ interview }: Props) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "problem-solving": true, // Default expanded state
  });

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getColorClass = (color: "green" | "orange" | "gray") => {
    switch (color) {
      case "green":
        return "bg-green-500";
      case "orange":
        return "bg-orange-500";
      case "gray":
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div
      className="flex h-full min-h-[32.5rem] flex-col overflow-y-auto p-6"
      aria-label={`${interview.roleTitle} scorecard`}
    >
      <div className="space-y-4">
        {MOCK_SCORECARD.map((category) => {
          const isExpanded = !!expanded[category.id];
          const bodyId = `scorecard-body-${category.id}`;

          return (
            <div
              key={category.id}
              className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] overflow-hidden"
            >
              {/* Accordion Header */}
              <button
                type="button"
                onClick={() => toggleExpand(category.id)}
                aria-expanded={isExpanded}
                aria-controls={bodyId}
                className="flex w-full items-center justify-between p-5 hover:bg-[var(--color-bg-secondary)] transition-colors"
              >
                <div className="flex items-center gap-3 w-full">
                  <HiOutlineChevronRight
                    className={cn(
                      "h-4 w-4 text-[var(--color-text-secondary)] transition-transform duration-200",
                      isExpanded ? "rotate-90" : "",
                    )}
                  />
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-[var(--color-text-color-primary)]">
                      {category.title}
                    </p>
                    {/* Progress Bar Container */}
                    <div className="mt-2 h-1.5 w-full rounded-full bg-[var(--color-bg-divider)] relative overflow-hidden">
                      <div
                        className={cn(
                          "absolute top-0 left-0 h-full rounded-full transition-all duration-500",
                          getColorClass(category.color),
                        )}
                        style={{ width: `${category.score}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-[var(--color-text-color-primary)] ml-4 w-8 text-right">
                    {category.score}%
                  </span>
                </div>
              </button>

              {/* Accordion Body */}
              {isExpanded && (
                <div
                  id={bodyId}
                  className="border-t border-[var(--color-card-border)] p-5 pl-12 bg-white"
                >
                  {category.questions && category.questions.length > 0 ? (
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-medium text-[var(--color-text-secondary)] mb-2">
                          Questions asked
                        </p>
                        <ul className="space-y-2">
                          {category.questions.map((q, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-[var(--color-text-color-primary)]"
                            >
                              {q}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {category.signals && category.signals.length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-[var(--color-text-secondary)] mb-2">
                            Signals assessed
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {category.signals.map((sig, idx) => (
                              <span
                                key={idx}
                                className="rounded bg-[var(--color-bg-secondary)] px-2.5 py-1 text-xs font-medium text-[var(--color-text-secondary)]"
                              >
                                {sig}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      No questions asked for this category.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
