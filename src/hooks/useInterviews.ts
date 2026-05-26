"use client";

import {
  getChatHistory,
  getInterview,
  getTranscript,
  listInterviews,
} from "@/lib/services/interviews.service";
import type { InterviewStatus } from "@/types/interview";
import { useQuery } from "@tanstack/react-query";

// Statuses that mean the interview is actively running
const LIVE_STATUSES: InterviewStatus[] = ["in_progress"];

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
    // Only poll when interview is live — no point hammering the API for completed interviews
    refetchInterval: isLive ? 5000 : false,
    refetchOnWindowFocus: isLive,
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
