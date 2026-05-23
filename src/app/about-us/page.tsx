import type { Metadata } from "next";
import AboutUsPage from "@/components/common/AboutUs/aboutUsPage";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about MeetMind — building AI teammates for real-time conversations.",
};

export default function AboutUsRoute() {
  return <AboutUsPage />;
}
