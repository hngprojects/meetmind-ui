import ContactPage from "@/components/common/ContactPage/ContactPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Support | MeetMind",
  description: "Can't find what you're looking for? Contact the MeetMind support team.",
};

export default function Page() {
  return <ContactPage />;
}