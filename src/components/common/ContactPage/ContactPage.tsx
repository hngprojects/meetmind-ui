import Navbar from "@/components/common/LandingPage/navbar";
import Footer from "@/components/common/LandingPage/footer";
import { ContactForm } from "@/components/common/ContactPage/ContactForm";
import { NewsletterForm } from "@/components/common/HelpPage/NewsletterForm";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Mail, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FB] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-16 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#0F172A] mb-6 hover:underline"
          >
            <ArrowLeft size={16} />
            Back
          </Link>

          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-[#0F172A] mb-2">
                Contact Support
              </h1>
              <p className="text-sm text-[#5E6470]">
                Can&apos;t find what you&apos;re looking for?
              </p>
            </div>
            <Image
              src="/icons/task-list-star.svg"
              alt="Contact Support Icon"
              width={64}
              height={64}
              className="w-14 h-14 opacity-30"
            />
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-[#E1E3E4] p-8">
            <ContactForm />

            {/* Other ways to reach us */}
            <div className="mt-8 pt-6 border-t border-[#E1E3E4]">
              <p className="text-sm font-semibold text-[#0F172A] mb-4">
                Other ways to reach us
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm text-[#5E6470]">
                  <Mail size={16} />
                  <a
                    href="mailto:support@meetmind.ai"
                    className="hover:underline hover:text-[#02505E] transition-colors"
                  >
                    support@meetmind.ai
                  </a>
                </div>
                <div className="flex items-center justify-between text-sm text-[#5E6470]">
                  <div className="flex items-center gap-3">
                    <MessageCircle size={16} />
                    Live Chat
                  </div>
                  <span className="text-xs text-[#16a34a] bg-[#dcfce7] px-3 py-1 rounded-full font-medium">
                    Online
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Never miss an update */}
          <div className="mt-8 bg-[#02505E] rounded-2xl px-8 py-10 text-center">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Never miss an update
            </h2>
            <p className="text-sm text-[#a8d5dc] mb-6">
              Get notified when we ship new features and improvements.
            </p>
            <NewsletterForm variant="dark" />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}