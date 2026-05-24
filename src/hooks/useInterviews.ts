"use client";

import {
  getChatHistory,
  getInterview,
  getTranscript,
  listInterviews,
} from "@/lib/services/interviews.service";
import { useQuery } from "@tanstack/react-query";

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

export function useChatHistory(id: string | null) {
  return useQuery({
    queryKey: ["interviews", id, "chat"],
    queryFn: () => getChatHistory(id!),
    enabled: !!id,
    refetchInterval: 5000, // Poll every 5s for live updates
    refetchOnWindowFocus: true, // or false, based on requirements
  });
}

export function useTranscript(id: string | null) {
  return useQuery({
    queryKey: ["interviews", id, "transcript"],
    queryFn: () => getTranscript(id!),
    enabled: !!id,
    refetchInterval: 3000, // More frequent for live transcript
    refetchOnWindowFocus: true,
  });
}
