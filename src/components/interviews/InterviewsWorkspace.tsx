"use client";

import InterviewListSidebar from "@/components/interviews/InterviewListSidebar";
import InterviewTabs from "@/components/interviews/InterviewTabs";
import ChatTab from "@/components/interviews/tabs/ChatTab";
import ProfileTab from "@/components/interviews/tabs/ProfileTab";
import ScorecardTab from "@/components/interviews/tabs/ScorecardTab";
import SummaryTab from "@/components/interviews/tabs/SummaryTab";
import TranscriptTab from "@/components/interviews/tabs/TranscriptTab";
import {
  useChatHistory,
  useInterview,
  useInterviewsList,
  useScorecard,
  useTranscript,
} from "@/hooks/useInterviews";
import type { InterviewTab, SessionPhase } from "@/types/interview";
import { useState } from "react";

export default function InterviewsWorkspace() {
  const { data: list = [], isLoading: listLoading } = useInterviewsList();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<InterviewTab>("transcript");
  const [sessionPhase, setSessionPhase] =
    useState<SessionPhase>("live_transcript");
  // const [sessionPhase, setSessionPhase] = useState<SessionPhase>("connecting");
  const [summaryVariant, setSummaryVariant] =
    useState<SessionPhase>("summary_ready");

  // useEffect(() => {
  //   if (list.length && !selectedId) {
  //     setSelectedId(list[0].id);
  //   }
  // }, [list, selectedId]);

  const currentSelectedId = selectedId ?? list[0]?.id;

  const { data: interview } = useInterview(currentSelectedId);
  const { data: chat = [] } = useChatHistory(currentSelectedId);
  const { data: transcript = [] } = useTranscript(currentSelectedId);
  const { data: scorecard = [] } = useScorecard(currentSelectedId);

  if (listLoading) {
    return (
      <div className="flex gap-6">
        <div className="h-[600px] w-[380px] animate-pulse rounded-2xl bg-[#e5e7eb]" />
        <div className="h-[600px] flex-1 animate-pulse rounded-2xl bg-[#e5e7eb]" />
      </div>
    );
  }

  return (
    <div className="flex gap-6">
      <InterviewListSidebar
        items={list}
        selectedId={currentSelectedId ?? null}
        onSelect={setSelectedId}
      />

      <section className="flex min-h-[640px] flex-1 flex-col overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
        <InterviewTabs active={activeTab} onChange={setActiveTab} />

        <div className="flex-1 overflow-hidden">
          {!interview ? (
            <div className="flex h-full items-center justify-center text-[#6b7280]">
              Select an interview
            </div>
          ) : (
            <>
              {activeTab === "chat" && <ChatTab messages={chat} />}
              {activeTab === "transcript" && (
                <TranscriptTab
                  interview={interview}
                  messages={transcript}
                  sessionPhase={sessionPhase}
                  onPhaseChange={setSessionPhase}
                />
              )}
              {activeTab === "summary" && (
                <SummaryTab
                  interview={interview}
                  variant={summaryVariant}
                  onRetry={() => setSummaryVariant("summary_ready")}
                />
              )}
              {activeTab === "scorecard" && (
                <ScorecardTab categories={scorecard} />
              )}
              {activeTab === "profile" && <ProfileTab interview={interview} />}
            </>
          )}
        </div>

        {process.env.NODE_ENV === "development" && activeTab === "summary" && (
          <div className="border-t border-[#f3f4f6] px-4 py-2">
            <p className="mb-1 text-xs text-[#9ca3af]">
              Summary state preview:
            </p>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  "summary_pending",
                  "summary_ready",
                  "summary_error",
                ] as SessionPhase[]
              ).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setSummaryVariant(v)}
                  className="rounded border px-2 py-0.5 text-xs"
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
