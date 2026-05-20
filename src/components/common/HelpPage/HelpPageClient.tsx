"use client";

import { useState } from "react";
import { HelpHero } from "@/components/common/HelpPage/HelpHero";
import { QuickResources } from "@/components/common/HelpPage/QuickResources";
import { FaqAccordion } from "@/components/common/HelpPage/FaqAccordion";
import { NewsletterCTA } from "@/components/common/HelpPage/NewsletterCTA";
import Navbar from "@/components/common/LandingPage/navbar";
import Footer from "@/components/common/LandingPage/footer";

export function HelpPageClient() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="w-full">
          <HelpHero onSearch={setSearchQuery} />
          <QuickResources />
          <FaqAccordion searchQuery={searchQuery} />
          <NewsletterCTA />
        </div>
      </main>
      <Footer />
    </>
  );
}