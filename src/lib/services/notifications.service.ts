import api from "@/lib/api";
import { unwrapData } from "@/lib/api-response";
import { MOCK_NOTIFICATIONS } from "@/lib/mocks/notifications.mock";
import type {
  ApiNotification,
  AppNotification,
  NotificationCategory,
  NotificationFilter,
  NotificationsResponse,
} from "@/types/notification";

const MOCKS_ENABLED = process.env.NEXT_PUBLIC_USE_MOCKS === "true";

let mockNotifications = [...MOCK_NOTIFICATIONS];

type NotificationsRequest = {
  page?: number;
  pageSize?: number;
  filter?: NotificationFilter;
};

type ApiNotificationsResponse = {
  notifications?: ApiNotification[];
  unread_count?: number;
};

export async function getNotifications({
  page = 1,
  pageSize = 20,
  filter = "all",
}: NotificationsRequest = {}): Promise<NotificationsResponse> {
  if (MOCKS_ENABLED) {
    return getMockNotifications({ page, pageSize, filter });
  }

  const res = await api.get("/api/v1/notifications", {
    params: {
      page,
      page_size: pageSize,
      ...(filter === "unread" ? { filter: "unread" } : {}),
    },
  });
  const data = unwrapData<ApiNotificationsResponse>(res.data);

  return {
    notifications: (data.notifications ?? []).map(mapApiNotification),
    unread_count: data.unread_count ?? 0,
  };
}

export async function markNotificationRead(
  notificationId: string,
): Promise<AppNotification> {
  if (MOCKS_ENABLED) {
    mockNotifications = mockNotifications.map((notification) =>
      notification.id === notificationId
        ? { ...notification, status: "read" }
        : notification,
    );

    const notification = mockNotifications.find(
      ({ id }) => id === notificationId,
    );
    if (!notification) throw new Error("Notification not found");
    return notification;
  }

  const res = await api.patch(`/api/v1/notifications/${notificationId}/read`);
  const data = unwrapData<ApiNotification>(res.data);
  return mapApiNotification(data);
}

export async function markAllNotificationsRead(): Promise<void> {
  if (MOCKS_ENABLED) {
    mockNotifications = mockNotifications.map((notification) => ({
      ...notification,
      status: "read",
    }));
    return;
  }

  await api.patch("/api/v1/notifications/mark-all-read");
}

export async function clearNotifications(): Promise<void> {
  if (MOCKS_ENABLED) {
    mockNotifications = [];
    return;
  }

  await api.delete("/api/v1/notifications");
}

function getMockNotifications({
  page = 1,
  pageSize = 20,
  filter = "all",
}: NotificationsRequest): NotificationsResponse {
  const filtered =
    filter === "unread"
      ? mockNotifications.filter(({ status }) => status === "unread")
      : mockNotifications;
  const start = Math.max(0, (page - 1) * pageSize);

  return {
    notifications: filtered.slice(start, start + pageSize),
    unread_count: mockNotifications.filter(({ status }) => status === "unread")
      .length,
  };
}

function mapApiNotification(raw: ApiNotification): AppNotification {
  return {
    id: raw.id,
    category: mapNotificationCategory(raw.type),
    title: raw.title,
    description: raw.description ?? "",
    timestamp: raw.time_display ?? formatCreatedAt(raw.created_at),
    status: raw.is_read ? "read" : "unread",
    actionLabel: raw.action_label ?? undefined,
    actionHref: normalizeActionHref(raw.action_url),
  };
}

function mapNotificationCategory(type: string): NotificationCategory {
  switch (type.toLowerCase()) {
    case "report":
      return "Report";
    case "meeting":
      return "Meeting";
    case "integration":
      return "Integration";
    case "system":
    default:
      return "System";
  }
}

function normalizeActionHref(actionUrl?: string | null): string | undefined {
  if (!actionUrl) return undefined;
  if (actionUrl.startsWith("/interviews")) {
    return "/Interviews";
  }
  return actionUrl;
}

function formatCreatedAt(createdAt?: string): string {
  if (!createdAt) return "";

  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
