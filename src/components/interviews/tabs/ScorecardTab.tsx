"use client";

import { cn } from "@/lib/utils";
import type {
  InterviewDetail,
  ScorecardEvidence,
  ScorecardResponse,
  ScorecardSection,
  ScorecardSubRubric,
  TranscriptMessage,
} from "@/types/interview";
import { useMemo, useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi2";

type Props = {
  interview: InterviewDetail;
  scorecard?: ScorecardResponse;
  transcript: TranscriptMessage[];
  isLoading: boolean;
  error: Error | null;
};

type EvidenceTurn = {
  question?: TranscriptMessage;
  response?: TranscriptMessage;
};

export default function ScorecardTab({
  interview,
  scorecard,
  transcript,
  isLoading,
  error,
}: Props) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const transcriptById = useMemo(() => {
    return new Map(transcript.map((message) => [message.id, message]));
  }, [transcript]);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[32.5rem] flex-col gap-4 overflow-y-auto p-6">
        <div className="h-24 animate-pulse rounded-xl bg-[var(--color-bg-divider)]" />
        <div className="h-40 animate-pulse rounded-xl bg-[var(--color-bg-divider)]" />
        <div className="h-32 animate-pulse rounded-xl bg-[var(--color-bg-divider)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full min-h-[32.5rem] items-center justify-center p-6 text-center">
        <div>
          <p className="font-medium text-[var(--color-error)]">
            Scorecard failed to load
          </p>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {error.message || "Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  if (!scorecard || scorecard.sections.length === 0) {
    return (
      <div className="flex h-full min-h-[32.5rem] items-center justify-center p-6 text-center">
        <div>
          <p className="font-medium text-[var(--color-text-color-primary)]">
            No scorecard available yet
          </p>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            AI-generated rubric scores will appear after the interview is
            assessed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex h-full min-h-[32.5rem] flex-col gap-5 overflow-y-auto p-6"
      aria-label={`${interview.roleTitle} scorecard`}
    >
      <ScorecardSummary scorecard={scorecard} />

      <div className="space-y-4">
        {scorecard.sections.map((section) => {
          const isExpanded = expanded[section.id] ?? section.expanded ?? false;
          const bodyId = `scorecard-body-${section.id}`;

          return (
            <ScorecardSectionCard
              key={section.id}
              section={section}
              isExpanded={isExpanded}
              bodyId={bodyId}
              transcriptById={transcriptById}
              expanded={expanded}
              onToggle={toggleExpand}
            />
          );
        })}
      </div>
    </div>
  );
}

function ScorecardSummary({ scorecard }: { scorecard: ScorecardResponse }) {
  return (
    <div className="grid gap-3 rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-5 sm:grid-cols-2">
      <ScoreMetric
        label="Overall score"
        value={scorecard.totalScore}
        helper="Average candidate performance"
      />
      <ScoreMetric
        label="Generation confidence"
        value={scorecard.overallConfidence}
        helper="Confidence in AI scorecard quality"
      />
    </div>
  );
}

function ScoreMetric({
  label,
  value,
  helper,
}: {
  label: string;
  value: number;
  helper: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-[var(--color-text-secondary)]">
            {label}
          </p>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {helper}
          </p>
        </div>
        <p className="text-2xl font-semibold text-[var(--color-text-color-primary)]">
          {value}%
        </p>
      </div>
      <ScoreBar value={value} className="mt-3" />
    </div>
  );
}

function ScorecardSectionCard({
  section,
  isExpanded,
  bodyId,
  transcriptById,
  expanded,
  onToggle,
}: {
  section: ScorecardSection;
  isExpanded: boolean;
  bodyId: string;
  transcriptById: Map<string, TranscriptMessage>;
  expanded: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)]">
      <button
        type="button"
        onClick={() => onToggle(section.id)}
        aria-expanded={isExpanded}
        aria-controls={bodyId}
        className="flex w-full items-start justify-between gap-4 p-5 text-left transition-colors hover:bg-[var(--color-bg-secondary)]"
      >
        <div className="flex min-w-0 flex-1 gap-3">
          <HiOutlineChevronRight
            className={cn(
              "mt-1 h-4 w-4 shrink-0 text-[var(--color-text-secondary)] transition-transform duration-200",
              isExpanded ? "rotate-90" : "",
            )}
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium text-[var(--color-text-color-primary)]">
                {section.title}
              </p>
              <span className="rounded-full bg-[var(--color-bg-secondary)] px-2.5 py-1 text-xs font-medium text-[var(--color-text-secondary)]">
                Confidence {section.confidence}%
              </span>
            </div>
            <ScoreBar value={section.scoreBarPercent} className="mt-3" />
          </div>
        </div>
        <span className="shrink-0 text-sm font-semibold text-[var(--color-text-color-primary)]">
          {section.score}%
        </span>
      </button>

      {isExpanded && (
        <div
          id={bodyId}
          className="space-y-5 border-t border-[var(--color-card-border)] bg-[var(--color-bg-primary)] p-5"
        >
          <RubricDetails rubric={section} />

          {section.subRubrics.length > 0 && (
            <div>
              <p className="mb-3 text-xs font-medium text-[var(--color-text-secondary)]">
                Sub-rubrics
              </p>
              <div className="space-y-3">
                {section.subRubrics.map((subRubric) => {
                  const nestedId = `${section.id}-${subRubric.id}`;
                  const nestedBodyId = `scorecard-body-${nestedId}`;
                  const isNestedExpanded =
                    expanded[nestedId] ?? subRubric.expanded ?? false;

                  return (
                    <SubRubricCard
                      key={subRubric.id}
                      rubric={subRubric}
                      id={nestedId}
                      bodyId={nestedBodyId}
                      isExpanded={isNestedExpanded}
                      transcriptById={transcriptById}
                      onToggle={onToggle}
                    />
                  );
                })}
              </div>
            </div>
          )}

          <EvidenceList
            evidence={section.evidence}
            transcriptById={transcriptById}
          />
        </div>
      )}
    </div>
  );
}

function SubRubricCard({
  rubric,
  id,
  bodyId,
  isExpanded,
  transcriptById,
  onToggle,
}: {
  rubric: ScorecardSubRubric;
  id: string;
  bodyId: string;
  isExpanded: boolean;
  transcriptById: Map<string, TranscriptMessage>;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-[var(--color-card-border)] bg-[var(--color-card-bg)]">
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-expanded={isExpanded}
        aria-controls={bodyId}
        className="flex w-full items-center justify-between gap-4 p-4 text-left transition-colors hover:bg-[var(--color-bg-secondary)]"
      >
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <HiOutlineChevronRight
            className={cn(
              "h-4 w-4 shrink-0 text-[var(--color-text-secondary)] transition-transform duration-200",
              isExpanded ? "rotate-90" : "",
            )}
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-[var(--color-text-color-primary)]">
              {rubric.title}
            </p>
            <ScoreBar value={rubric.scoreBarPercent} className="mt-2" />
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-semibold text-[var(--color-text-color-primary)]">
            {rubric.score}%
          </p>
          <p className="text-xs text-[var(--color-text-secondary)]">
            {rubric.confidence}% confidence
          </p>
        </div>
      </button>

      {isExpanded && (
        <div
          id={bodyId}
          className="space-y-4 border-t border-[var(--color-card-border)] bg-[var(--color-bg-primary)] p-4"
        >
          <RubricDetails rubric={rubric} />
          <EvidenceList
            evidence={rubric.evidence}
            transcriptById={transcriptById}
          />
        </div>
      )}
    </div>
  );
}

function RubricDetails({
  rubric,
}: {
  rubric: ScorecardSection | ScorecardSubRubric;
}) {
  const questions =
    "questionsAsked" in rubric ? rubric.questionsAsked : undefined;
  const signals =
    "signalsDetected" in rubric ? rubric.signalsDetected : undefined;

  return (
    <div className="space-y-4">
      {rubric.justification && (
        <div>
          <p className="mb-2 text-xs font-medium text-[var(--color-text-secondary)]">
            Justification
          </p>
          <p className="text-sm leading-relaxed text-[var(--color-text-color-primary)]">
            {rubric.justification}
          </p>
        </div>
      )}

      {questions && questions.length > 0 && (
        <TextList title="Questions asked" items={questions} />
      )}

      {signals && signals.length > 0 && (
        <PillList title="Signals detected" items={signals} />
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <TextList title="Strengths" items={rubric.strengths} empty="None yet" />
        <TextList
          title="Weaknesses"
          items={rubric.weaknesses}
          empty="None yet"
        />
      </div>
    </div>
  );
}

function EvidenceList({
  evidence,
  transcriptById,
}: {
  evidence: ScorecardEvidence[];
  transcriptById: Map<string, TranscriptMessage>;
}) {
  if (evidence.length === 0) {
    return (
      <p className="text-sm text-[var(--color-text-secondary)]">
        No transcript evidence linked yet.
      </p>
    );
  }

  return (
    <div>
      <p className="mb-3 text-xs font-medium text-[var(--color-text-secondary)]">
        Transcript evidence
      </p>
      <div className="space-y-3">
        {evidence.map((item, index) => {
          const turn: EvidenceTurn = {
            question: transcriptById.get(item.questionTurnId),
            response: transcriptById.get(item.responseTurnId),
          };

          return (
            <div
              key={`${item.questionTurnId}-${item.responseTurnId}-${index}`}
              className="rounded-lg border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-4"
            >
              {item.reason && (
                <p className="mb-3 text-sm font-medium text-[var(--color-text-color-primary)]">
                  {item.reason}
                </p>
              )}
              <EvidenceTurnRow label="Question" turn={turn.question} />
              <EvidenceTurnRow label="Response" turn={turn.response} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EvidenceTurnRow({
  label,
  turn,
}: {
  label: string;
  turn?: TranscriptMessage;
}) {
  return (
    <div className="mt-3 first:mt-0">
      <div className="mb-1 flex flex-wrap items-center gap-2 text-xs text-[var(--color-text-secondary)]">
        <span className="font-medium">{label}</span>
        {turn ? (
          <>
            <span>{turn.speakerLabel}</span>
            <span>{turn.timestamp}</span>
          </>
        ) : (
          <span>Transcript turn unavailable</span>
        )}
      </div>
      <p className="text-sm leading-relaxed text-[var(--color-text-color-primary)]">
        {turn?.content ?? "Evidence could not be matched to the transcript."}
      </p>
    </div>
  );
}

function TextList({
  title,
  items,
  empty,
}: {
  title: string;
  items: string[];
  empty?: string;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium text-[var(--color-text-secondary)]">
        {title}
      </p>
      {items.length > 0 ? (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item}
              className="text-sm leading-relaxed text-[var(--color-text-color-primary)]"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-[var(--color-text-secondary)]">
          {empty ?? "No items recorded."}
        </p>
      )}
    </div>
  );
}

function PillList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium text-[var(--color-text-secondary)]">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded bg-[var(--color-bg-secondary)] px-2.5 py-1 text-xs font-medium text-[var(--color-text-secondary)]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ScoreBar({ value, className }: { value: number; className?: string }) {
  return (
    <div
      className={cn(
        "h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-bg-divider)]",
        className,
      )}
    >
      <div
        className={cn("h-full rounded-full transition-all duration-500", {
          "bg-[var(--color-text-success)]": value >= 70,
          "bg-[var(--color-badge-upcoming-text)]": value >= 40 && value < 70,
          "bg-[var(--color-bg-divider)]": value < 40,
        })}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
