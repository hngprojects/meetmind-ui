"use client";

import {
  clearNotifications,
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/lib/services/notifications.service";
import type { NotificationFilter } from "@/types/notification";
import type { QueryClient } from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type NotificationsQueryParams = {
  page?: number;
  pageSize?: number;
  filter?: NotificationFilter;
};

const notificationsKeys = {
  all: ["notifications"] as const,
  list: ({
    page = 1,
    pageSize = 20,
    filter = "all",
  }: NotificationsQueryParams) =>
    ["notifications", "list", page, pageSize, filter] as const,
  unreadCount: ["notifications", "unread-count"] as const,
};

export function useNotifications(params: NotificationsQueryParams = {}) {
  const { page = 1, pageSize = 20, filter = "all" } = params;

  return useQuery({
    queryKey: notificationsKeys.list({ page, pageSize, filter }),
    queryFn: () => getNotifications({ page, pageSize, filter }),
    placeholderData: (previousData) => previousData,
  });
}

export function useUnreadNotificationsCount() {
  return useQuery({
    queryKey: notificationsKeys.unreadCount,
    queryFn: async () => {
      const data = await getNotifications({ page: 1, pageSize: 1 });
      return data.unread_count;
    },
    staleTime: 30_000,
    refetchInterval: 60_000,
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationRead,
    onSuccess: () => invalidateNotifications(queryClient),
  });
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: () => invalidateNotifications(queryClient),
  });
}

export function useClearNotifications() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearNotifications,
    onSuccess: () => invalidateNotifications(queryClient),
  });
}

function invalidateNotifications(queryClient: QueryClient) {
  return queryClient.invalidateQueries({ queryKey: notificationsKeys.all });
}
