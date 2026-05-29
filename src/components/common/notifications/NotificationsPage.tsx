"use client";

import { getErrorMessage } from "@/lib/api-response";
import { cn } from "@/lib/utils";
import {
  useClearNotifications,
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useNotifications,
} from "@/hooks/useNotifications";
import type {
  AppNotification,
  NotificationCategory,
  NotificationFilter,
} from "@/types/notification";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuArrowLeft, LuBell, LuClock } from "react-icons/lu";

const PAGE_SIZE = 20;

const CATEGORY_STYLES: Record<
  NotificationCategory,
  { bg: string; text: string; border: string }
> = {
  Report: {
    bg: "bg-[#FFF1F2]",
    text: "text-[#E11D48]",
    border: "border-[#FECDD3]",
  },
  Meeting: {
    bg: "bg-[#FFF7ED]",
    text: "text-[#C2410C]",
    border: "border-[#FED7AA]",
  },
  Integration: {
    bg: "bg-[#F0FDF4]",
    text: "text-[#15803D]",
    border: "border-[#BBF7D0]",
  },
  System: {
    bg: "bg-[#F5F3FF]",
    text: "text-[#7C3AED]",
    border: "border-[#DDD6FE]",
  },
};

function CategoryBadge({ category }: { category: NotificationCategory }) {
  const styles = CATEGORY_STYLES[category];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5",
        "text-[11px] font-medium",
        styles.bg,
        styles.text,
        styles.border,
      )}
    >
      {category}
    </span>
  );
}

type NotificationCardProps = {
  notification: AppNotification;
  onMarkRead: (notificationId: string) => void;
  isMarkingRead: boolean;
};

function NotificationCard({
  notification,
  onMarkRead,
  isMarkingRead,
}: NotificationCardProps) {
  const isUnread = notification.status === "unread";

  const handleActionClick = () => {
    if (isUnread && !isMarkingRead) {
      onMarkRead(notification.id);
    }
  };

  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-[#E5E7EB] p-5",
        "transition-shadow hover:shadow-sm",
        isUnread ? "bg-[#F8FAFC]" : "bg-white",
      )}
    >
      <div className="mb-2 flex items-start justify-between gap-4">
        <CategoryBadge category={notification.category} />
        <div
          className={cn(
            "mt-0.5 flex shrink-0 items-center gap-1",
            "text-[12px] text-[#9CA3AF]",
          )}
        >
          <LuClock className="text-[13px]" />
          <span>{notification.timestamp}</span>
        </div>
      </div>

      <div className="mb-1 flex items-center gap-2">
        {isUnread && (
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#3B82F6]" />
        )}
        <h3
          className={cn(
            "text-[15px] font-semibold leading-snug",
            isUnread ? "text-[#0F172A]" : "text-[#374151]",
          )}
        >
          {notification.title}
        </h3>
      </div>

      {notification.description && (
        <p
          className={cn(
            "mb-4 text-[13px] leading-relaxed text-[#5E6470]",
            isUnread ? "ml-4" : "",
          )}
        >
          {notification.description}
        </p>
      )}

      {notification.actionLabel && notification.actionHref && (
        <Link
          href={notification.actionHref}
          onClick={handleActionClick}
          className={cn(
            "inline-flex items-center rounded-lg border border-[#02505E]",
            "px-4 py-1.5 text-[13px] font-medium text-[#02505E]",
            "transition-colors hover:bg-[#02505E]/5",
          )}
        >
          {notification.actionLabel}
        </Link>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <div className="text-[#9CA3AF]">
        <LuBell className="text-[52px] stroke-[1]" />
      </div>
      <div className="text-center">
        <p className="mb-1 text-[16px] font-semibold text-[#374151]">
          No notification yet
        </p>
        <p className="max-w-[220px] text-[13px] leading-relaxed text-[#9CA3AF]">
          Your meeting updates and activity notifications will show up here
        </p>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col gap-4" aria-label="Loading notifications">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-32 animate-pulse rounded-2xl bg-[#F3F4F6]"
        />
      ))}
    </div>
  );
}

export default function NotificationsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<NotificationFilter>("all");
  const { data, error, isError, isFetching, isLoading, refetch } =
    useNotifications({
      page: 1,
      pageSize: PAGE_SIZE,
      filter: activeTab,
    });
  const markReadMutation = useMarkNotificationRead();
  const markAllMutation = useMarkAllNotificationsRead();
  const clearMutation = useClearNotifications();

  const notifications = data?.notifications ?? [];
  const unreadCount = data?.unread_count ?? 0;
  const isMutating = markAllMutation.isPending || clearMutation.isPending;
  const hasVisibleNotifications = notifications.length > 0;
  const disableClearAll =
    clearMutation.isPending ||
    (activeTab === "all" && !hasVisibleNotifications);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  };

  const handleMarkAllAsRead = () => {
    markAllMutation.mutate();
  };

  const handleClearAll = () => {
    clearMutation.mutate();
  };

  return (
    <div className="mx-auto max-w-[860px] px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            className={cn(
              "cursor-pointer rounded-lg p-1.5 text-[#374151]",
              "transition-colors hover:bg-gray-100",
            )}
            aria-label="Go back"
          >
            <LuArrowLeft className="text-[20px]" />
          </button>
          <div>
            <h1 className="text-[26px] font-bold leading-tight text-[#0F172A]">
              Notifications
            </h1>
            <p className="mt-0.5 text-[13px] text-[#5E6470]">
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${
                    unreadCount > 1 ? "s" : ""
                  }`
                : "You have no unread notifications"}
            </p>
          </div>
        </div>

        <div className="mt-1 flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0 || markAllMutation.isPending}
            className={cn(
              "cursor-pointer rounded-xl bg-[#02505E] px-4 py-2",
              "text-[13px] font-semibold text-white transition-colors",
              "hover:bg-[#02505E]/90 disabled:cursor-not-allowed",
              "disabled:opacity-40",
            )}
          >
            {markAllMutation.isPending ? "Marking..." : "Mark all as Read"}
          </button>
          <button
            type="button"
            onClick={handleClearAll}
            disabled={disableClearAll}
            className={cn(
              "cursor-pointer rounded-xl border border-[#E5E7EB]",
              "px-4 py-2 text-[13px] font-semibold text-[#374151]",
              "transition-colors hover:bg-gray-50",
              "disabled:cursor-not-allowed disabled:opacity-40",
            )}
          >
            {clearMutation.isPending ? "Clearing..." : "Clear All"}
          </button>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Notification filters"
        className="mb-6 flex items-center border-b border-[#E5E7EB]"
      >
        <button
          id="tab-all"
          role="tab"
          aria-selected={activeTab === "all"}
          aria-controls="tabpanel-notifications"
          type="button"
          onClick={() => setActiveTab("all")}
          className={cn(
            "mr-8 cursor-pointer px-1 pb-3 text-[14px] font-medium",
            "transition-colors",
            activeTab === "all"
              ? "text-[#0F172A] border-b-2 border-[#0F172A] -mb-px"
              : "text-[#9CA3AF] hover:text-[#374151]",
          )}
        >
          All{activeTab === "all" ? ` (${notifications.length})` : ""}
        </button>
        <button
          id="tab-unread"
          role="tab"
          aria-selected={activeTab === "unread"}
          aria-controls="tabpanel-notifications"
          type="button"
          onClick={() => setActiveTab("unread")}
          className={cn(
            "cursor-pointer px-1 pb-3 text-[14px] font-medium",
            "transition-colors",
            activeTab === "unread"
              ? "text-[#0F172A] border-b-2 border-[#0F172A] -mb-px"
              : "text-[#9CA3AF] hover:text-[#374151]",
          )}
        >
          Unread&nbsp;({unreadCount})
        </button>
      </div>

      <div
        id="tabpanel-notifications"
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        aria-busy={isFetching || isMutating}
      >
        {isLoading ? (
          <LoadingState />
        ) : isError ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24">
            <p className="text-[15px] font-semibold text-[#374151]">
              Notifications failed to load
            </p>
            <p className="max-w-sm text-center text-[13px] text-[#9CA3AF]">
              {getErrorMessage(error)}
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className={cn(
                "rounded-lg border border-[#02505E] px-4 py-1.5",
                "text-[13px] font-medium text-[#02505E]",
                "transition-colors hover:bg-[#02505E]/5",
              )}
            >
              Try again
            </button>
          </div>
        ) : !hasVisibleNotifications ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-4">
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkRead={markReadMutation.mutate}
                isMarkingRead={markReadMutation.isPending}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
