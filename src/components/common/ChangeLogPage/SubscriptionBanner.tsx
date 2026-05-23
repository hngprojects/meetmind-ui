// components/SubscriptionBanner.tsx
"use client";

import React, { useState } from "react";

export default function SubscriptionBanner() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed: ${email}`);
      setEmail("");
    }
  };

  return (
    <section className="px-4 sm:px-6 lg:px-22.5 py-12  bg-[#FEFEFF] mx-auto">
      <div className="bg-[#005f6b] rounded-2xl px-6 py-12 md:py-16 text-center text-white relative overflow-hidden shadow-sm">
        {/* Subtle background abstract design vectors */}
        <div className="absolute right-0 bottom-0 pointer-events-none opacity-10">
          <div className="w-64 h-64 rounded-full border-4 border-white transform translate-x-1/3 translate-y-1/3"></div>
        </div>

        {/* Text Headers */}
        <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-2 font-normal">
          Never miss an update
        </h2>
        <p className="text-neutral-200 text-sm md:text-base max-w-md mx-auto mb-8 font-light">
          Get notified when we ship new features and improvements.
        </p>

        {/* Input Interactive Fields */}
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto relative z-10"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2.5 rounded-lg text-neutral-900 bg-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#004e59] text-sm"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-white text-[#005f6b] hover:bg-neutral-50 px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200 shadow-sm whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
