import type { Metadata } from "next";
import NotificationsPage from "@/components/common/notifications/NotificationsPage";

export const metadata: Metadata = {
  title: "Notifications | MeetMind",
  description: "View and manage your MeetMind notifications.",
};

export default function Page() {
  return <NotificationsPage />;
}
