"use client";

import {
  getChatHistory,
  getInterview,
  getScorecard,
  getTranscript,
  listInterviews,
} from "@/lib/services/interviews.service";
import { useQuery } from "@tanstack/react-query";

export function useInterviewsList() {
  return useQuery({
    queryKey: ["interviews", "list"],
    queryFn: listInterviews,
  });
}

export function useInterview(id: string | null) {
  return useQuery({
    queryKey: ["interviews", id],
    queryFn: () => getInterview(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // cache for 5 min — avoids refetch on tab switch
    // placeholderData: keepPreviousData, // keeps old interview visible while new one loads
  });
}

export function useChatHistory(id: string | null) {
  return useQuery({
    queryKey: ["interviews", id, "chat"],
    queryFn: () => getChatHistory(id!),
    enabled: !!id,
  });
}

export function useTranscript(id: string | null) {
  return useQuery({
    queryKey: ["interviews", id, "transcript"],
    queryFn: () => getTranscript(id!),
    enabled: !!id,
  });
}

export function useScorecard(id: string | null) {
  return useQuery({
    queryKey: ["interviews", id, "scorecard"],
    queryFn: () => Promise.resolve(getScorecard(id!)),
    enabled: !!id,
  });
}
