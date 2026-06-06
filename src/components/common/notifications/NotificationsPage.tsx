"use client";

import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuArrowLeft, LuBell, LuClock } from "react-icons/lu";

const PAGE_SIZE = 20;

const CATEGORY_STYLES: Record<
  NotificationCategory,
  { bg: string; text: string; border: string }
> = {
  Report: {
    bg: "bg-[var(--color-error-bg)]",
    text: "text-[var(--color-error)]",
    border: "border-[var(--color-error-bg)]",
  },
  Meeting: {
    bg: "bg-[var(--color-warning-bg)]",
    text: "text-[var(--color-badge-upcoming-text)]",
    border: "border-[var(--color-warning-bg)]",
  },
  Integration: {
    bg: "bg-[var(--color-bg-success)]",
    text: "text-[var(--color-session-green-text)]",
    border: "border-[var(--color-bg-success)]",
  },
  System: {
    bg: "bg-[var(--color-badge-live-bg)]",
    text: "text-[var(--color-badge-live-text)]",
    border: "border-[var(--color-session-purple-border)]",
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
  isMarkingRead: boolean;
  onOpenAction: (notification: AppNotification) => void;
};

function NotificationCard({
  notification,
  isMarkingRead,
  onOpenAction,
}: NotificationCardProps) {
  const isUnread = notification.status === "unread";

  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-[var(--color-card-border)] p-5",
        "transition-shadow hover:shadow-sm",
        isUnread
          ? "bg-[var(--color-bg-secondary)]"
          : "bg-[var(--color-card-bg)]",
      )}
    >
      <div className="mb-2 flex items-start justify-between gap-4">
        <CategoryBadge category={notification.category} />
        <div
          className={cn(
            "mt-0.5 flex shrink-0 items-center gap-1",
            "text-[12px] text-[var(--color-card-text)]",
          )}
        >
          <LuClock className="text-[13px]" />
          <span>{notification.timestamp}</span>
        </div>
      </div>

      <div className="mb-1 flex items-center gap-2">
        {isUnread && (
          <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-info)]" />
        )}
        <h3
          className={cn(
            "text-[15px] font-semibold leading-snug",
            isUnread
              ? "text-[var(--color-text-color-primary)]"
              : "text-[var(--color-text-subtext)]",
          )}
        >
          {notification.title}
        </h3>
      </div>

      {notification.description && (
        <p
          className={cn(
            "mb-4 text-[13px] leading-relaxed text-[var(--color-text-body)]",
            isUnread ? "ml-4" : "",
          )}
        >
          {notification.description}
        </p>
      )}

      {notification.actionLabel && notification.actionHref && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isMarkingRead}
          onClick={() => onOpenAction(notification)}
          className={cn(
            "rounded-lg border-[var(--color-brand-primary)]",
            "text-[13px] font-medium text-[var(--color-brand-primary)]",
            "hover:bg-[var(--color-bg-secondary)]",
          )}
        >
          {notification.actionLabel}
        </Button>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <div className="text-[var(--color-card-text)]">
        <LuBell className="text-[52px] stroke-[1]" />
      </div>
      <div className="text-center">
        <p className="mb-1 text-[16px] font-semibold text-[var(--color-text-subtext)]">
          No notification yet
        </p>
        <p className="max-w-[220px] text-[13px] leading-relaxed text-[var(--color-card-text)]">
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
          className="h-32 animate-pulse rounded-2xl bg-[var(--color-bg-secondary)]"
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
  const { data: allData } = useNotifications({
    page: 1,
    pageSize: PAGE_SIZE,
    filter: "all",
  });
  const markReadMutation = useMarkNotificationRead();
  const markAllMutation = useMarkAllNotificationsRead();
  const clearMutation = useClearNotifications();

  const notifications = data?.notifications ?? [];
  const unreadCount = data?.unread_count ?? 0;
  const totalCount = allData?.notifications.length ?? notifications.length;
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

  const handleOpenAction = (notification: AppNotification) => {
    const navigate = () => {
      if (notification.actionHref) router.push(notification.actionHref);
    };

    if (notification.status === "unread") {
      markReadMutation.mutate(notification.id, { onSuccess: navigate });
      return;
    }

    navigate();
  };

  return (
    <div className="mx-auto max-w-[860px] px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={handleBack}
            className="rounded-lg text-[var(--color-text-subtext)]"
            aria-label="Go back"
          >
            <LuArrowLeft className="text-[20px]" />
          </Button>
          <div>
            <h1 className="text-[26px] font-bold leading-tight text-[var(--color-text-color-primary)]">
              Notifications
            </h1>
            <p className="mt-0.5 text-[13px] text-[var(--color-text-body)]">
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${
                    unreadCount > 1 ? "s" : ""
                  }`
                : "You have no unread notifications"}
            </p>
          </div>
        </div>

        <div className="mt-1 flex flex-col md:flex-row shrink-0 items-center gap-3">
          <Button
            type="button"
            onClick={() => markAllMutation.mutate()}
            disabled={unreadCount === 0 || markAllMutation.isPending}
            className="rounded-xl bg-[var(--color-brand-primary)] text-[var(--color-text-white-primary)]"
          >
            {markAllMutation.isPending ? "Marking..." : "Mark all as Read"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => clearMutation.mutate()}
            disabled={disableClearAll}
            className={cn(
              "rounded-xl border-[var(--color-card-border)]",
              "text-[var(--color-text-subtext)]",
              "hover:bg-[var(--color-bg-secondary)]",
            )}
          >
            {clearMutation.isPending ? "Clearing..." : "Clear All"}
          </Button>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Notification filters"
        className="mb-6 flex items-center border-b border-[var(--color-card-border)]"
      >
        <Button
          id="tab-all"
          role="tab"
          aria-selected={activeTab === "all"}
          aria-controls="tabpanel-notifications"
          type="button"
          variant="ghost"
          onClick={() => setActiveTab("all")}
          className={cn(
            "mr-8 rounded-none px-1 pb-3 text-[14px] font-medium",
            activeTab === "all"
              ? "text-[var(--color-text-color-primary)] border-b-2 border-[var(--color-text-color-primary)] -mb-px"
              : "text-[var(--color-card-text)] hover:text-[var(--color-text-subtext)]",
          )}
        >
          All&nbsp;({totalCount})
        </Button>
        <Button
          id="tab-unread"
          role="tab"
          aria-selected={activeTab === "unread"}
          aria-controls="tabpanel-notifications"
          type="button"
          variant="ghost"
          onClick={() => setActiveTab("unread")}
          className={cn(
            "rounded-none px-1 pb-3 text-[14px] font-medium",
            activeTab === "unread"
              ? "text-[var(--color-text-color-primary)] border-b-2 border-[var(--color-text-color-primary)] -mb-px"
              : "text-[var(--color-card-text)] hover:text-[var(--color-text-subtext)]",
          )}
        >
          Unread&nbsp;({unreadCount})
        </Button>
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
            <p className="text-[15px] font-semibold text-[var(--color-text-subtext)]">
              Notifications failed to load
            </p>
            <p className="max-w-sm text-center text-[13px] text-[var(--color-card-text)]">
              {getErrorMessage(error)}
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => refetch()}
              className="rounded-lg border-[var(--color-brand-primary)] text-[var(--color-brand-primary)]"
            >
              Try again
            </Button>
          </div>
        ) : !hasVisibleNotifications ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-4">
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onOpenAction={handleOpenAction}
                isMarkingRead={markReadMutation.isPending}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
