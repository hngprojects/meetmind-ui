"use client";

import api from "@/lib/api";
import { FormEvent, useState } from "react";

export default function AboutNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setStatus("loading");
    setMessage("");

    try {
      await api.post(`/api/v1/subscriptions/email/`, {
        email: email.trim(),
      });

      setStatus("success");
      setMessage("🎉 Subscription successful!");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("❌ Something went wrong. Please try again.");
    }
  }

  return (
    <section className="bg-bg-primary px-[1.5rem] md:px-[2.5rem] lg:px-[5rem] pb-[4rem] md:pb-[5rem]">
      <div className="max-w-[80rem] mx-auto">
        <div className="rounded-[1rem] bg-newsletter-bg px-[1.5rem] py-[2.5rem] md:px-[3rem] md:py-[3.5rem] text-center">
          <h2 className="font-serif text-[1.75rem] md:text-[2.375rem] text-text-white-primary leading-[1.2]">
            Never miss an update
          </h2>
          <p className="mt-[0.75rem] text-[0.875rem] md:text-[1.125rem] text-newsletter-subtext max-w-[32rem] mx-auto">
            Get notified when we ship new features and improvements.
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-[1.75rem] flex flex-col md:flex-row items-stretch md:items-center justify-center gap-[0.75rem] max-w-[36rem] mx-auto w-full"
          >
            <label htmlFor="about-newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="about-newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full flex-1 rounded-[0.5rem] bg-input-bg px-[1rem] py-[0.875rem] text-[0.9375rem] text-text-color-primary placeholder:text-input-placeholder 
              border border-input-border focus:outline-none focus:border-input-border-focus"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full md:w-auto shrink-0 rounded-[0.5rem] bg-soft-green px-[2rem] py-[0.875rem] text-[0.9375rem] font-semibold hover:opacity-90 
              transition-opacity cursor-pointer disabled:opacity-50"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {/* status message */}
          {message && (
            <p
              role={status === "error" ? "alert" : "status"}
              aria-live={status === "error" ? "assertive" : "polite"}
              className={`mt-4 text-sm ${
                status === "success" ? "text-green-400" : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
