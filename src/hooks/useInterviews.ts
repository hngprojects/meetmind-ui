"use client";

import { useState } from "react";
import {
  askQuestion,
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

export function useTranscript(id: string | null, status?: InterviewStatus) {
  const isLive = status ? LIVE_STATUSES.includes(status) : false;
  return useQuery({
    queryKey: ["interviews", id, "transcript"],
    queryFn: () => getTranscript(id!),
    enabled: !!id,
    // Poll more frequently for live transcript, not at all for completed
    refetchInterval: isLive ? 3000 : false,
    refetchOnWindowFocus: isLive,
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
