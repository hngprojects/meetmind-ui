"use client";
import Footer from "@/components/common/LandingPage/Footer";
import Navbar from "@/components/common/LandingPage/Navbar";
import CTASection from "@/components/common/waitlistPage/CTASection";
import Features from "@/components/common/waitlistPage/Features";
import HeroSection from "@/components/common/waitlistPage/HeroSection";

export default function WaitlistPage() {
  return (
    <div className="flex flex-col gap-7">
      {/* Temporary Navbar */}

      <Navbar />

      {/* Main Content */}
      <div className="bg-[#F7F9FB] flex flex-col gap-7">
        <HeroSection />
        <Features />
        <CTASection />
      </div>

      {/* Temporary Footer */}

      <Footer />
    </div>
  );
}
