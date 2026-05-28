import type { AppNotification } from "@/types/notification";

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: "1",
    category: "Report",
    title: "Meeting report ready",
    description:
      "AI-generated insights for Senior Frontend Developer Screening are now available",
    timestamp: "2 min ago",
    status: "unread",
    actionLabel: "View Report",
    actionHref: "/interviews/1",
  },
  {
    id: "2",
    category: "Meeting",
    title: "Meeting starting soon",
    description:
      "Senior Frontend Developer Interview with James Okafor starts in 15 minutes",
    timestamp: "15 min ago",
    status: "unread",
    actionLabel: "Join Meeting",
    actionHref: "/interviews/2",
  },
  {
    id: "3",
    category: "Integration",
    title: "Zoom integration active",
    description:
      "Your Zoom account has been successfully connected to MeetMind",
    timestamp: "30 min ago",
    status: "read",
    actionLabel: "Manage",
    actionHref: "/settings",
  },
  {
    id: "4",
    category: "Meeting",
    title: "Meeting reminder",
    description:
      "Senior Frontend Developer Meeting scheduled for today at 4:30 PM",
    timestamp: "45 min ago",
    status: "unread",
    actionLabel: "View Details",
    actionHref: "/interviews/4",
  },
  {
    id: "5",
    category: "System",
    title: "New feature available",
    description:
      "Try our enhanced AI assistant with real-time sentiment analysis",
    timestamp: "3 hours ago",
    status: "read",
    actionLabel: "Learn More",
    actionHref: "/help",
  },
];
