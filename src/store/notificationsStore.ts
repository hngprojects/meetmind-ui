import { MOCK_NOTIFICATIONS } from "@/lib/mocks/notifications.mock";
import type { AppNotification } from "@/types/notification";
import { create } from "zustand";

type NotificationsState = {
  notifications: AppNotification[];
  markAllAsRead: () => void;
  clearAll: () => void;
};

export const useNotificationsStore = create<NotificationsState>((set) => ({
  notifications: MOCK_NOTIFICATIONS,
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        status: "read",
      })),
    })),
  clearAll: () => set({ notifications: [] }),
}));

export const getUnreadNotificationsCount = (
  notifications: AppNotification[],
): number =>
  notifications.filter((notification) => notification.status === "unread")
    .length;
