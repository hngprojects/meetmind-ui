import { ContactHero } from "@/components/common/ContactPage/ContactHero";
import { ContactForm } from "@/components/common/ContactPage/ContactForm";
import { OtherWaysToReach } from "@/components/common/ContactPage/OtherWaysToReach";
import { NewsletterCTA } from "@/components/common/HelpPage/NewsletterCTA";
import Navbar from "@/components/common/LandingPage/Navbar";
import Footer from "@/components/common/LandingPage/Footer";

export const metadata = {
  title: "Contact Support",
  description: "Get in touch with the MeetMind support team.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7F9FB] flex flex-col">
        <div className="flex-1 w-full max-w-2xl mx-auto px-6 pt-28 pb-16">
          <ContactHero />
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E1E3E4]">
            <ContactForm />
            <OtherWaysToReach />
          </div>
        </div>
        <div className="w-full max-w-2xl mx-auto px-6 pb-4">
          <NewsletterCTA />
        </div>
      </main>
      <Footer />
    </>
  );
}