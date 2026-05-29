import { MOCK_NOTIFICATIONS } from "@/lib/mocks/notifications.mock";
import type { Notification } from "@/types/notification";
import { create } from "zustand";

type NotificationsState = {
  notifications: Notification[];
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
  notifications: Notification[],
): number =>
  notifications.filter((notification) => notification.status === "unread")
    .length;
