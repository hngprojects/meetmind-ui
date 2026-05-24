"use client";

import InterviewListSidebar from "@/components/interviews/InterviewListSidebar";
import InterviewTabs from "@/components/interviews/InterviewTabs";
import ChatTab from "@/components/interviews/tabs/ChatTab";
import {
  useChatHistory,
  useInterview,
  useInterviewsList,
} from "@/hooks/useInterviews";
import type { InterviewTab } from "@/types/interview";
import { useState } from "react";
import { HiOutlineArrowLeft, HiOutlineBars3 } from "react-icons/hi2";

// ==================== 🧩Main Component ====================
export default function InterviewsWorkspace() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<InterviewTab>("chat");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    data: list = [],
    isLoading: listLoading,
    error: listError,
  } = useInterviewsList();

  const currentSelectedId = selectedId ?? list[0]?.id ?? null;

  const {
    data: interview,
    isLoading: interviewLoading,
    error: interviewError,
  } = useInterview(currentSelectedId);

  const { data: chat = [] } = useChatHistory(currentSelectedId);

  // ── Handle interview selection on mobile (closes sidebar after pick) ──
  const handleSelect = (id: string) => {
    setSelectedId(id);
    setSidebarOpen(false);
  };

  // ── Skeletons ──
  if (listLoading) {
    return (
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        <div className="h-[12rem] w-full animate-pulse rounded-2xl bg-[var(--color-bg-divider)] sm:h-[37.5rem] sm:w-[23.75rem]" />
        <div className="h-[37.5rem] flex-1 animate-pulse rounded-2xl bg-[var(--color-bg-divider)]" />
      </div>
    );
  }

  // ── List-level error ──
  if (listError) {
    return (
      <div className="flex h-[37.5rem] items-center justify-center text-center">
        <div>
          <p className="font-medium text-[var(--color-text-color-secondary)]">
            Failed to load interviews
          </p>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {"Something went wrong. Please try again."}
          </p>
        </div>
      </div>
    );
  }

  // ── Interview-level empty / loading / error states ──
  const renderEmptyState = () => {
    if (list.length === 0) {
      return (
        <div className="flex h-full flex-col items-center justify-center gap-2 text-center mt-4 md:mt-0">
          <p className="font-medium text-[var(--color-text-color-secondary)]">
            No interviews yet
          </p>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Completed interviews will appear here.
          </p>
        </div>
      );
    }

    if (interviewLoading) {
      return (
        <div className="flex h-full items-center justify-center text-[var(--color-text-secondary)]">
          Loading interview…
        </div>
      );
    }

    if (interviewError) {
      return (
        <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
          <p className="font-medium text-[var(--color-text-color-secondary)]">
            Failed to load interview
          </p>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {interviewError.message ??
              "Something went wrong. Please try again."}
          </p>
        </div>
      );
    }

    return (
      <div className="flex h-full items-center justify-center text-[var(--color-text-secondary)]">
        Select an interview
      </div>
    );
  };

  return (
    <div className="mx-auto w-full lg:max-w-[85%]">
      {/* ── Mobile: top bar with menu toggle ── */}
      <div className="mb-3 flex items-center gap-3 sm:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] px-3 py-2 text-sm text-[var(--color-text-color-primary)] shadow-sm"
          aria-label="Toggle interview list"
        >
          <HiOutlineBars3 className="h-5 w-5" />
          <span>Interviews</span>
          {currentSelectedId && (
            <span className="ml-1 text-xs text-[var(--color-text-secondary)]">
              ({list.findIndex((i) => i.id === currentSelectedId) + 1}/
              {list.length})
            </span>
          )}
        </button>

        {/* Show selected interview name on mobile header */}
        {interview && (
          <p className="truncate text-sm font-semibold text-[var(--color-text-color-primary)]">
            {interview.candidateName} — {interview.roleTitle}
          </p>
        )}
      </div>

      {/* ── Mobile: slide-down sidebar drawer ── */}
      {sidebarOpen && (
        <div className="mb-4 sm:hidden">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium text-[var(--color-text-secondary)]">
              Select an interview
            </p>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)]"
            >
              <HiOutlineArrowLeft className="h-3.5 w-3.5" />
              Close
            </button>
          </div>
          <InterviewListSidebar
            items={list}
            selectedId={currentSelectedId}
            onSelect={handleSelect}
          />
        </div>
      )}

      {/* ── Desktop: side-by-side layout ── */}
      <div className="hidden gap-6 sm:flex">
        <InterviewListSidebar
          items={list}
          selectedId={currentSelectedId}
          onSelect={setSelectedId}
        />

        <DetailsPanel
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          interview={interview}
          interviewLoading={interviewLoading}
          renderEmptyState={renderEmptyState}
          chat={chat}
        />
      </div>

      {/* ── Mobile: full-width detail panel ── */}
      <div className="sm:hidden">
        <DetailsPanel
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          interview={interview}
          interviewLoading={interviewLoading}
          renderEmptyState={renderEmptyState}
          chat={chat}
        />
      </div>
    </div>
  );
}

// ── Extracted to avoid duplication between mobile/desktop ──
function DetailsPanel({
  activeTab,
  setActiveTab,
  interview,
  interviewLoading,
  renderEmptyState,
  chat,
}: {
  activeTab: InterviewTab;
  setActiveTab: (tab: InterviewTab) => void;
  interview: ReturnType<typeof useInterview>["data"];
  interviewLoading: boolean;
  renderEmptyState: () => React.ReactNode;
  chat: ReturnType<typeof useChatHistory>["data"];
}) {
  return (
    <section className="flex min-h-[40rem] flex-1 flex-col overflow-hidden rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] shadow-sm">
      <InterviewTabs active={activeTab} onChange={setActiveTab} />
      <div className="flex-1 overflow-hidden">
        {!interview || interviewLoading ? (
          renderEmptyState()
        ) : (
          <>{activeTab === "chat" && <ChatTab messages={chat ?? []} />}</>
        )}
      </div>
    </section>
  );
}
