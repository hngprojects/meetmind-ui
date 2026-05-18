"use client";

import { useState } from "react";
import axios from "axios";
import api from "@/lib/api";

interface NewsletterFormProps {
  variant?: "dark" | "light";
}

export function NewsletterForm({ variant = "dark" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputClass =
    variant === "dark"
      ? "w-full md:flex-1 px-4 py-3 rounded-lg bg-white text-[#0F172A] placeholder:text-[#94a3b8] text-sm focus:outline-none transition border border-transparent"
      : "w-full md:flex-1 px-4 py-3 rounded-lg border border-[#E1E3E4] text-[#0F172A] placeholder:text-[#94a3b8] text-sm focus:outline-none focus:ring-1 focus:ring-[#02505E] transition";

  const buttonClass =
    variant === "dark"
      ? "w-full md:w-auto px-7 py-3 rounded-lg bg-[#e8f0ef] text-[#1a6b6b] font-bold text-sm hover:bg-white transition-colors disabled:opacity-50 whitespace-nowrap"
      : "w-full md:w-auto px-7 py-3 rounded-lg bg-[#02505E] text-white font-bold text-sm hover:bg-[#02505E]/80 transition-colors disabled:opacity-50 whitespace-nowrap";

  const errorClass =
    variant === "dark"
      ? "text-red-300 text-xs mt-2 text-center"
      : "text-red-500 text-xs mt-2 text-center";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      await api.post("/api/v1/newsletter/subscribe", { email });
      setIsSuccess(true);
      setEmail("");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message ||
          err.response?.data?.error?.details?.[0]?.msg ||
          "Something went wrong. Please try again.";
        setError(message);
      } else {
        setError("Unexpected error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (isSuccess) {
    return (
      <p className={variant === "dark" ? "text-white font-medium text-sm text-center" : "text-[#02505E] font-medium text-sm text-center"}>
        ✓ You are subscribed! We&apos;ll keep you updated.
      </p>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 items-center w-full">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={isLoading}
          className={inputClass}
        />
        <button
          type="submit"
          disabled={isLoading || !email.trim()}
          className={buttonClass}
        >
          {isLoading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {error && <p className={errorClass}>{error}</p>}
    </div>
  );
}