"use client";

import { useState } from "react";
import {
  askQuestion,
  askQuestionWithDocument,
  askQuestionWithVoice,
  exportInterviewSummary,
  getChatHistory,
  getInterview,
  getInterviewSession,
  getScorecard,
  getTranscript,
  listInterviews,
  rejoinInterviewSession,
} from "@/lib/services/interviews.service";
import type {
  ChatMessage,
  InterviewSession,
  InterviewSessionStatus,
  InterviewSummaryExportFormat,
  InterviewStatus,
  TranscriptMessage,
  TranscriptResponse,
  TranscriptStatus,
} from "@/types/interview";
import {
  REJOIN_SESSION_MESSAGE,
  SESSION_STATUS_LABELS,
} from "@/types/interview";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Statuses that mean the interview is actively running
const LIVE_STATUSES: InterviewStatus[] = ["in_progress"];
const ACTIVE_SESSION_STATUSES: InterviewSessionStatus[] = [
  "connecting",
  "listening",
  "thinking",
  "speaking",
  "connection_lost",
  "reconnecting",
  "processing",
];
const ACTIVE_TRANSCRIPT_STATUSES: TranscriptStatus[] = [
  "connecting",
  "transcribing",
  "interrupted",
];

export function useInterviewsList(page = 1, pageSize = 20) {
  return useQuery({
    queryKey: ["interviews", "list", page, pageSize],
    queryFn: () => listInterviews(page, pageSize),
  });
}

export function useInterview(id: string | null) {
  return useQuery({
    queryKey: ["interviews", id],
    queryFn: () => getInterview(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useChatHistory(id: string | null, status?: InterviewStatus) {
  const isLive = status ? LIVE_STATUSES.includes(status) : false;
  return useQuery({
    queryKey: ["interviews", id, "chat"],
    queryFn: () => getChatHistory(id!),
    enabled: !!id,
    placeholderData: (previousData) => previousData,
    structuralSharing: (oldData, newData) =>
      mergeChatMessages(
        Array.isArray(newData) ? newData : [],
        Array.isArray(oldData) ? oldData : [],
      ),
    // Only poll when interview is live — no point hammering the API for completed interviews
    refetchInterval: isLive ? 5000 : false,
    refetchOnWindowFocus: isLive,
  });
}

export function useSendChatMessage(id: string | null) {
  const queryClient = useQueryClient();
  const chatQueryKey = ["interviews", id, "chat"] as const;

  return useMutation({
    mutationFn: (content: string) => {
      if (!id) throw new Error("Interview id is required to send a message.");

      const query = content.trim();
      if (!query) throw new Error("Enter a message before sending.");

      return askQuestion(id, query);
    },
    onMutate: async (content) => {
      if (!id) return { previousMessages: undefined };

      await queryClient.cancelQueries({ queryKey: chatQueryKey });

      const previousMessages =
        queryClient.getQueryData<ChatMessage[]>(chatQueryKey);

      const optimisticMessage: ChatMessage = {
        id: `optimistic-${Date.now()}`,
        role: "user",
        content: content.trim(),
      };

      queryClient.setQueryData<ChatMessage[]>(chatQueryKey, (current = []) =>
        mergeChatMessages(current, [optimisticMessage]),
      );

      return { previousMessages };
    },
    onSuccess: (assistantMessage) => {
      queryClient.setQueryData<ChatMessage[]>(chatQueryKey, (current = []) =>
        mergeChatMessages(current, [assistantMessage]),
      );
    },
    onError: (_error, _variables, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(chatQueryKey, context.previousMessages);
      }
    },
    onSettled: () => {
      if (id) {
        return queryClient.invalidateQueries({ queryKey: chatQueryKey });
      }
    },
  });
}

export function useSendChatDocument(id: string | null) {
  const queryClient = useQueryClient();
  const chatQueryKey = ["interviews", id, "chat"] as const;

  return useMutation({
    mutationFn: (file: File) => {
      if (!id)
        throw new Error("Interview id is required to upload a document.");
      return askQuestionWithDocument(id, file);
    },
    onSuccess: (assistantMessage) => {
      queryClient.setQueryData<ChatMessage[]>(chatQueryKey, (current = []) =>
        mergeChatMessages(current, [assistantMessage]),
      );
    },
    onSettled: () => {
      if (id) {
        return queryClient.invalidateQueries({ queryKey: chatQueryKey });
      }
    },
  });
}

export function useSendChatVoice(id: string | null) {
  const queryClient = useQueryClient();
  const chatQueryKey = ["interviews", id, "chat"] as const;

  return useMutation({
    mutationFn: (audioBlob: Blob) => {
      if (!id) throw new Error("Interview id is required to send voice query.");
      return askQuestionWithVoice(id, audioBlob);
    },
    onSuccess: (assistantMessage) => {
      queryClient.setQueryData<ChatMessage[]>(chatQueryKey, (current = []) =>
        mergeChatMessages(current, [assistantMessage]),
      );
    },
    onSettled: () => {
      if (id) {
        return queryClient.invalidateQueries({ queryKey: chatQueryKey });
      }
    },
  });
}

export function useTranscript(id: string | null, status?: InterviewStatus) {
  const queryClient = useQueryClient();
  const queryKey = ["interviews", id, "transcript"] as const;
  const isLiveInterview = status ? LIVE_STATUSES.includes(status) : false;

  return useQuery({
    queryKey,
    queryFn: async () => {
      const previous = queryClient.getQueryData<TranscriptResponse>(queryKey);
      const shouldUseLivePolling =
        !isTerminalTranscriptStatus(previous?.status) &&
        (isLiveInterview || isActiveTranscriptStatus(previous?.status));
      const afterSequenceNo = shouldUseLivePolling
        ? getHighestTranscriptSequenceNo(previous?.turns ?? [])
        : undefined;
      const next = await getTranscript(id!, {
        live: shouldUseLivePolling,
        afterSequenceNo,
      });

      return previous && shouldUseLivePolling
        ? mergeTranscriptResponses(previous, next)
        : next;
    },
    enabled: !!id,
    placeholderData: (previousData) => previousData,
    refetchInterval: (query) => {
      const transcript = query.state.data as TranscriptResponse | undefined;
      if (isTerminalTranscriptStatus(transcript?.status)) return false;

      return isLiveInterview || isActiveTranscriptStatus(transcript?.status)
        ? 3000
        : false;
    },
    refetchOnWindowFocus: isLiveInterview,
  });
}

export function useScorecard(id: string | null) {
  return useQuery({
    queryKey: ["interviews", id, "scorecard"],
    queryFn: () => getScorecard(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useInterviewSession(
  id: string | null,
  status?: InterviewStatus,
) {
  const isLive = status ? LIVE_STATUSES.includes(status) : false;

  return useQuery({
    queryKey: ["interviews", id, "session"],
    queryFn: () => getInterviewSession(id!),
    enabled: !!id,
    placeholderData: (previousData) => previousData,
    refetchInterval: (query) => {
      const session = query.state.data as InterviewSession | undefined;
      return isLive || isActiveSessionStatus(session?.session_status)
        ? 3000
        : false;
    },
    refetchOnWindowFocus: isLive,
  });
}

export function useRejoinInterviewSession(id: string | null) {
  const queryClient = useQueryClient();
  const sessionQueryKey = ["interviews", id, "session"] as const;

  return useMutation({
    mutationFn: () => {
      if (!id) throw new Error("Interview id is required to rejoin a session.");
      return rejoinInterviewSession(id);
    },
    onMutate: async () => {
      if (!id) return { previous: undefined };

      await queryClient.cancelQueries({ queryKey: sessionQueryKey });
      const previous =
        queryClient.getQueryData<InterviewSession>(sessionQueryKey);

      queryClient.setQueryData<InterviewSession>(sessionQueryKey, {
        interview_id: id,
        session_status: "reconnecting",
        meeting_status: previous?.meeting_status ?? "Live",
        agent_status_display: SESSION_STATUS_LABELS.reconnecting,
        elapsed_display: previous?.elapsed_display ?? "00:00:00",
        participants_count: previous?.participants_count ?? 0,
        platform: previous?.platform ?? null,
        dropped_at_display: previous?.dropped_at_display,
        partial_data_saved: previous?.partial_data_saved,
        message: REJOIN_SESSION_MESSAGE,
      });

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(sessionQueryKey, context.previous);
      }
    },
    onSettled: () => {
      if (id) {
        return queryClient.invalidateQueries({ queryKey: sessionQueryKey });
      }
    },
  });
}

export function useExportInterviewSummary(id: string | null) {
  const [exportingFormat, setExportingFormat] =
    useState<InterviewSummaryExportFormat | null>(null);

  const mutation = useMutation({
    mutationFn: (format: InterviewSummaryExportFormat) => {
      if (!id) throw new Error("Interview id is required to export a summary.");
      return exportInterviewSummary(id, format);
    },
    onMutate: (format) => {
      setExportingFormat(format);
    },
    onSettled: () => {
      setExportingFormat(null);
    },
  });

  return { ...mutation, exportingFormat };
}

function isActiveSessionStatus(status?: InterviewSessionStatus): boolean {
  return status ? ACTIVE_SESSION_STATUSES.includes(status) : false;
}

function isActiveTranscriptStatus(status?: TranscriptStatus): boolean {
  return status ? ACTIVE_TRANSCRIPT_STATUSES.includes(status) : false;
}

function isTerminalTranscriptStatus(status?: TranscriptStatus): boolean {
  return status === "completed" || status === "failed" || status === "idle";
}

function getHighestTranscriptSequenceNo(messages: TranscriptMessage[]) {
  const sequenceNumbers = messages
    .map((message) => message.sequenceNo)
    .filter(
      (sequenceNo): sequenceNo is number =>
        typeof sequenceNo === "number" &&
        Number.isFinite(sequenceNo) &&
        sequenceNo >= 0,
    );

  return sequenceNumbers.length > 0 ? Math.max(...sequenceNumbers) : undefined;
}

function mergeTranscriptResponses(
  previous: TranscriptResponse,
  next: TranscriptResponse,
): TranscriptResponse {
  const mergedTurns = new Map<string, TranscriptMessage>();

  [...previous.turns, ...next.turns].forEach((turn) => {
    mergedTurns.set(getTranscriptTurnKey(turn), turn);
  });

  return {
    ...next,
    turns: [...mergedTurns.values()].sort(compareTranscriptTurns),
  };
}

function getTranscriptTurnKey(turn: TranscriptMessage) {
  return typeof turn.sequenceNo === "number"
    ? `sequence:${turn.sequenceNo}`
    : `id:${turn.id}`;
}

function compareTranscriptTurns(
  first: TranscriptMessage,
  second: TranscriptMessage,
) {
  if (first.sequenceNo !== undefined && second.sequenceNo !== undefined) {
    return first.sequenceNo - second.sequenceNo;
  }

  if (first.sequenceNo !== undefined) return -1;
  if (second.sequenceNo !== undefined) return 1;

  return 0;
}

function mergeChatMessages(
  baseMessages: ChatMessage[],
  extraMessages: ChatMessage[],
): ChatMessage[] {
  const merged = [...baseMessages];
  const seenIds = new Set(merged.map((message) => message.id));
  const seenContent = new Set(merged.map(createChatMessageSignature));

  extraMessages.forEach((message) => {
    const signature = createChatMessageSignature(message);

    if (!seenIds.has(message.id) && !seenContent.has(signature)) {
      merged.push(message);
      seenIds.add(message.id);
      seenContent.add(signature);
    }
  });

  return merged;
}

function createChatMessageSignature(message: ChatMessage): string {
  return [
    message.role,
    (message.content ?? "").trim(),
    message.title?.trim() ?? "",
    message.bullets?.join("|") ?? "",
  ].join("::");
}
