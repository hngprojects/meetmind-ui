import Navbar from "@/components/common/LandingPage/Navbar";
import Footer from "@/components/common/LandingPage/Footer";
import TermsOfService from "@/components/common/TermsOfService/TermsOfService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | MeetMind",
  description: "Terms of Service for MeetMind.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen flex flex-col w-full bg-[#F8FAFC] font-sans">
      <Navbar />
      <div className="flex-1 w-full">
        <TermsOfService />
      </div>
      <Footer />
    </main>
  );
}
