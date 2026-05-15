"use client";

import { useState } from "react";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="w-full bg-white px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <div
          className="rounded-2xl px-8 py-14 text-center"
          style={{ backgroundColor: "#1a6b6b" }}
        >
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-3 leading-tight">
            Never miss an update
          </h2>
          <p className="text-white/75 text-sm mb-8 max-w-xs mx-auto leading-relaxed">
            Get notified when we ship new features and improvements.
          </p>
          {submitted ? (
            <p className="text-white font-medium text-sm">
              ✓ You are subscribed!
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-white/50 transition"
              />
              <button
                type="submit"
                className="px-7 py-3 rounded-lg bg-[#e8f0ef] text-[#1a6b6b] font-semibold text-sm hover:bg-white transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}