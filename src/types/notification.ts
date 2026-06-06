export type NotificationCategory =
  | "Report"
  | "Meeting"
  | "Integration"
  | "System";

export type NotificationStatus = "read" | "unread";

export type NotificationFilter = "all" | "unread";

export type ApiNotificationType =
  | "report"
  | "meeting"
  | "integration"
  | "system"
  | string;

export type ApiNotification = {
  id: string;
  user_id?: string;
  type: ApiNotificationType;
  title: string;
  description?: string | null;
  is_read: boolean;
  action_label?: string | null;
  action_url?: string | null;
  created_at?: string;
  time_display?: string;
};

export type AppNotification = {
  id: string;
  category: NotificationCategory;
  title: string;
  description: string;
  timestamp: string;
  status: NotificationStatus;
  actionLabel?: string;
  actionHref?: string;
};

export type NotificationsResponse = {
  notifications: AppNotification[];
  unread_count: number;
};
