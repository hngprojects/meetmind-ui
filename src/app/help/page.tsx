import { HelpHero } from "@/components/common/HelpPage/HelpHero";
import { QuickResources } from "@/components/common/HelpPage/QuickResources";
import { FaqAccordion } from "@/components/common/HelpPage/FaqAccordion";
import { NewsletterCTA } from "@/components/common/HelpPage/NewsletterCTA";
import Navbar from "@/components/common/LandingPage/Navbar";
import Footer from "@/components/common/LandingPage/Footer";

export const metadata = {
  title: "Help & Support",
  description: "Find answers to common questions about MeetMind.",
};

export default function HelpPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white flex flex-col items-center">
        <div className="w-full">
          <HelpHero />
          <QuickResources />
          <FaqAccordion />
          <NewsletterCTA />
        </div>
      </main>
      <Footer />
    </>
  );
}