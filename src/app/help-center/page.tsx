import type { Metadata } from "next";
import { HelpPageClient } from "@/components/common/HelpPage/HelpPageClient";

export const metadata: Metadata = {
  title: "Help & Support",
  description: "Find answers to common questions about MeetMind.",
};

export default function HelpPage() {
  return <HelpPageClient />;
}
