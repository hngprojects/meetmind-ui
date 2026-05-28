"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuClock, LuBell, LuArrowLeft } from "react-icons/lu";
import type {
  AppNotification,
  NotificationCategory,
} from "@/types/notification";
import { cn } from "@/lib/utils";
import {
  getUnreadNotificationsCount,
  useNotificationsStore,
} from "@/store/notificationsStore";

// ─── Category Badge ───────────────────────────────────────────────────────────

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
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${styles.bg} ${styles.text} ${styles.border}`}
    >
      {category}
    </span>
  );
}

// ─── Notification Card ────────────────────────────────────────────────────────

function NotificationCard({ notification }: { notification: AppNotification }) {
  const isUnread = notification.status === "unread";

  return (
    <div
      className={`w-full rounded-2xl border p-5 transition-shadow hover:shadow-sm ${
        isUnread ? "bg-[#F8FAFC] border-[#E5E7EB]" : "bg-white border-[#E5E7EB]"
      }`}
    >
      {/* Top row: badge + timestamp */}
      <div className="flex items-start justify-between gap-4 mb-2">
        <CategoryBadge category={notification.category} />
        <div className="flex items-center gap-1 text-[12px] text-[#9CA3AF] shrink-0 mt-0.5">
          <LuClock className="text-[13px]" />
          <span>{notification.timestamp}</span>
        </div>
      </div>

      {/* Title row: unread dot + title */}
      <div className="flex items-center gap-2 mb-1">
        {isUnread && (
          <span className="w-2 h-2 rounded-full bg-[#3B82F6] shrink-0" />
        )}
        <h3
          className={`text-[15px] font-semibold leading-snug ${
            isUnread ? "text-[#0F172A]" : "text-[#374151]"
          }`}
        >
          {notification.title}
        </h3>
      </div>

      {/* Description */}
      <p
        className={`text-[13px] leading-relaxed mb-4 ${
          isUnread ? "ml-4" : ""
        } text-[#5E6470]`}
      >
        {notification.description}
      </p>

      {/* Action button */}
      {notification.actionLabel && notification.actionHref && (
        <Link
          href={notification.actionHref}
          className="inline-flex items-center px-4 py-1.5 text-[13px] font-medium rounded-lg border border-[#02505E] text-[#02505E] hover:bg-[#02505E]/5 transition-colors cursor-pointer"
        >
          {notification.actionLabel}
        </Link>
      )}
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="text-[#9CA3AF]">
        <LuBell className="text-[52px] stroke-[1]" />
      </div>
      <div className="text-center">
        <p className="text-[16px] font-semibold text-[#374151] mb-1">
          No notification yet
        </p>
        <p className="text-[13px] text-[#9CA3AF] max-w-[220px] leading-relaxed">
          Your meeting updates and activity notifications will show up here
        </p>
      </div>
    </div>
  );
}

// ─── Main Notifications Page Component ───────────────────────────────────────

type Tab = "all" | "unread";

export default function NotificationsPage() {
  const router = useRouter();
  const notifications = useNotificationsStore((state) => state.notifications);
  const markAllAsRead = useNotificationsStore((state) => state.markAllAsRead);
  const clearAll = useNotificationsStore((state) => state.clearAll);
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const unreadCount = getUnreadNotificationsCount(notifications);
  const totalCount = notifications.length;

  const visibleNotifications =
    activeTab === "all"
      ? notifications
      : notifications.filter((n) => n.status === "unread");

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  const handleClearAll = () => {
    clearAll();
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  };

  return (
    <div className="max-w-[860px] mx-auto px-4 sm:px-6 py-8">
      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-[#374151] cursor-pointer"
            aria-label="Go back"
          >
            <LuArrowLeft className="text-[20px]" />
          </button>
          <div>
            <h1 className="text-[26px] font-bold text-[#0F172A] leading-tight">
              Notifications
            </h1>
            <p className="text-[13px] text-[#5E6470] mt-0.5">
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                : "You have no unread notifications"}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 shrink-0 mt-1">
          <button
            type="button"
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            className={cn(
              "px-4 py-2 text-[13px] font-semibold rounded-xl",
              "bg-[#02505E] text-white hover:bg-[#02505E]/90",
              "transition-colors cursor-pointer",
              "disabled:opacity-40 disabled:cursor-not-allowed",
            )}
          >
            Mark all as Read
          </button>
          <button
            type="button"
            onClick={handleClearAll}
            disabled={totalCount === 0}
            className={cn(
              "px-4 py-2 text-[13px] font-semibold rounded-xl",
              "border border-[#E5E7EB] text-[#374151]",
              "hover:bg-gray-50 transition-colors cursor-pointer",
              "disabled:opacity-40 disabled:cursor-not-allowed",
            )}
          >
            Clear All
          </button>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div
        role="tablist"
        aria-label="Notification filters"
        className="flex items-center border-b border-[#E5E7EB] mb-6"
      >
        <button
          id="tab-all"
          role="tab"
          aria-selected={activeTab === "all"}
          aria-controls="tabpanel-notifications"
          type="button"
          onClick={() => setActiveTab("all")}
          className={cn(
            "pb-3 px-1 mr-8 text-[14px] font-medium",
            "transition-colors cursor-pointer",
            activeTab === "all"
              ? "text-[#0F172A] border-b-2 border-[#0F172A] -mb-px"
              : "text-[#9CA3AF] hover:text-[#374151]",
          )}
        >
          All&nbsp;({totalCount})
        </button>
        <button
          id="tab-unread"
          role="tab"
          aria-selected={activeTab === "unread"}
          aria-controls="tabpanel-notifications"
          type="button"
          onClick={() => setActiveTab("unread")}
          className={cn(
            "pb-3 px-1 text-[14px] font-medium",
            "transition-colors cursor-pointer",
            activeTab === "unread"
              ? "text-[#0F172A] border-b-2 border-[#0F172A] -mb-px"
              : "text-[#9CA3AF] hover:text-[#374151]",
          )}
        >
          Unread&nbsp;({unreadCount})
        </button>
      </div>

      {/* ── Notification list / empty state ── */}
      <div
        id="tabpanel-notifications"
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
      >
        {visibleNotifications.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-4">
            {visibleNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
