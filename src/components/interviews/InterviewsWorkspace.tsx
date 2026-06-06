"use client";

import InterviewListSidebar from "@/components/interviews/InterviewListSidebar";
import InterviewTabs from "@/components/interviews/InterviewTabs";
import ChatTab from "@/components/interviews/tabs/ChatTab";
import TranscriptTab from "@/components/interviews/tabs/TranscriptTab";
import SummaryTab from "@/components/interviews/tabs/SummaryTab";
import ScorecardTab from "@/components/interviews/tabs/ScorecardTab";
import ProfileTab from "@/components/interviews/tabs/ProfileTab";
import {
  useChatHistory,
  useInterview,
  useInterviewSession,
  useInterviewsList,
  useSendChatMessage,
  useRejoinInterviewSession,
  useScorecard,
  useTranscript,
} from "@/hooks/useInterviews";
import type { InterviewTab, TranscriptMessage } from "@/types/interview";
import { useState } from "react";
import { HiOutlineArrowLeft, HiOutlineBars3 } from "react-icons/hi2";

// ==================== 🧩Main Component ====================
export default function InterviewsWorkspace() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<InterviewTab>("transcript");
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

  // Pass interview status so hooks only poll when live
  const { data: chat = [] } = useChatHistory(
    currentSelectedId,
    interview?.status,
  );
  const { data: transcript } = useTranscript(
    currentSelectedId,
    interview?.status,
  );
  const transcriptTurns = transcript?.turns ?? [];
  const {
    data: scorecard,
    isLoading: scorecardLoading,
    error: scorecardError,
  } = useScorecard(currentSelectedId);
  const { data: session } = useInterviewSession(
    currentSelectedId,
    interview?.status,
  );
  const rejoinSession = useRejoinInterviewSession(currentSelectedId);
  const sendChatMessage = useSendChatMessage(currentSelectedId);

  const handleRejoinSession = async () => {
    await rejoinSession.mutateAsync();
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setSidebarOpen(false);
  };

  if (listLoading) {
    return (
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        <div className="h-48 w-full animate-pulse rounded-2xl bg-[var(--color-bg-divider)] sm:h-[37.5rem] sm:w-[23.75rem]" />
        <div className="h-[37.5rem] flex-1 animate-pulse rounded-2xl bg-[var(--color-bg-divider)]" />
      </div>
    );
  }

  if (listError) {
    return (
      <div className="flex h-[37.5rem] items-center justify-center text-center">
        <div>
          <p className="font-medium text-[var(--color-text-color-secondary)]">
            Failed to load interviews
          </p>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Something went wrong. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const renderEmptyState = () => {
    if (list.length === 0) {
      return (
        <div className="mt-4 flex h-full flex-col items-center justify-center gap-2 text-center md:mt-0">
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

  const detailPanelProps = {
    activeTab,
    setActiveTab,
    interview,
    interviewLoading,
    renderEmptyState,
    chat,
    transcript,
    transcriptTurns,
    scorecard,
    scorecardLoading,
    scorecardError,
    session,
    onRejoinSession: handleRejoinSession,
    isRejoiningSession: rejoinSession.isPending,
    onSendChatMessage: async (content: string) => {
      await sendChatMessage.mutateAsync(content);
    },
    isSendingChatMessage: sendChatMessage.isPending,
  };

  return (
    <div className="mx-auto w-full lg:max-w-[85%]">
      {/* ── Mobile: top bar ── */}
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
        {interview && (
          <p className="truncate text-sm font-semibold text-[var(--color-text-color-primary)]">
            {interview.candidateName} — {interview.roleTitle}
          </p>
        )}
      </div>

      {/* ── Mobile: sidebar drawer ── */}
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

      {/* ── Desktop ── */}
      <div className="hidden gap-6 sm:flex">
        <InterviewListSidebar
          items={list}
          selectedId={currentSelectedId}
          onSelect={setSelectedId}
        />
        <DetailsPanel {...detailPanelProps} />
      </div>

      {/* ── Mobile ── */}
      <div className="sm:hidden">
        <DetailsPanel {...detailPanelProps} />
      </div>
    </div>
  );
}

// ── Types ──────────────────────────────────────────────────────────────────────

type DetailsPanelProps = {
  activeTab: InterviewTab;
  setActiveTab: (tab: InterviewTab) => void;
  interview: ReturnType<typeof useInterview>["data"];
  interviewLoading: boolean;
  renderEmptyState: () => React.ReactNode;
  chat: ReturnType<typeof useChatHistory>["data"];
  transcript: ReturnType<typeof useTranscript>["data"];
  transcriptTurns: TranscriptMessage[];
  scorecard: ReturnType<typeof useScorecard>["data"];
  scorecardLoading: boolean;
  scorecardError: Error | null;
  session: ReturnType<typeof useInterviewSession>["data"];
  onRejoinSession: () => Promise<void>;
  isRejoiningSession: boolean;
  onSendChatMessage: (content: string) => Promise<void>;
  isSendingChatMessage: boolean;
};

function DetailsPanel({
  activeTab,
  setActiveTab,
  interview,
  interviewLoading,
  renderEmptyState,
  chat,
  transcript,
  transcriptTurns,
  scorecard,
  scorecardLoading,
  scorecardError,
  session,
  onRejoinSession,
  isRejoiningSession,
  onSendChatMessage,
  isSendingChatMessage,
}: DetailsPanelProps) {
  return (
    <section className="flex min-h-[40rem] flex-1 flex-col overflow-hidden rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] shadow-sm">
      <InterviewTabs active={activeTab} onChange={setActiveTab} />
      <div className="flex-1 overflow-hidden">
        {!interview || interviewLoading ? (
          renderEmptyState()
        ) : (
          <>
            {activeTab === "chat" && (
              <ChatTab
                messages={chat ?? []}
                onSendMessage={onSendChatMessage}
                isSendingMessage={isSendingChatMessage}
              />
            )}
            {activeTab === "transcript" && (
              <TranscriptTab
                interview={interview}
                transcript={transcript}
                messages={transcriptTurns}
                session={session}
                onRejoin={onRejoinSession}
                isRejoining={isRejoiningSession}
              />
            )}
            {activeTab === "summary" && <SummaryTab interview={interview} />}
            {activeTab === "scorecard" && (
              <ScorecardTab
                interview={interview}
                scorecard={scorecard}
                transcript={transcriptTurns}
                isLoading={scorecardLoading}
                error={scorecardError}
              />
            )}
            {activeTab === "profile" && <ProfileTab interview={interview} />}
          </>
        )}
      </div>
    </section>
  );
}
