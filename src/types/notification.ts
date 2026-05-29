export type NotificationCategory =
  | "Report"
  | "Meeting"
  | "Integration"
  | "System";

export type NotificationStatus = "read" | "unread";

export interface AppNotification {
  id: string;
  category: NotificationCategory;
  title: string;
  description: string;
  timestamp: string;
  status: NotificationStatus;
  actionLabel?: string;
  actionHref?: string;
}
