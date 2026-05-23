"use client";

import { useState } from "react";
import api from "@/lib/api";
import axios from "axios";
import Input from "@/components/common/Onboarding/onboarding/Input";
import Buttons from "@/components/reuseable-component/buttons";

export default function NewsletterSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  // States to track the API status
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      setStatusMessage({
        type: "error",
        text: "You must agree to the terms to subscribe.",
      });
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);

    try {
      const response = await api.post("/api/v1/subscriptions/email", {
        name: name,
        email: email,
      });

      setStatusMessage({
        type: "success",
        text:
          response.data?.message ||
          "Successfully subscribed to our newsletter!",
      });

      setName("");
      setEmail("");
      setAgreed(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;
        const message =
          responseData?.error?.details?.[0]?.msg ||
          responseData?.message ||
          "Failed to connect to the server. Please try again.";

        setStatusMessage({
          type: "error",
          text: message,
        });
      } else {
        setStatusMessage({
          type: "error",
          text: "Unexpected error. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 px-4 bg-[#F7F9FB]">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
        <div className="text-left md:text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
            Sign Up for Our Newsletters
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Get notified of the best deals on our Meetmind post
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          {/* Status Alert Box */}
          {statusMessage && (
            <div
              className={`mb-6 p-4 rounded-xl text-sm font-medium border ${
                statusMessage.type === "success"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-700 border-red-200"
              }`}
            >
              {statusMessage.text}
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4 mb-6 items-end md:items-center">
            {/* Name Input Wrapper (Fully hidden on desktop) */}
            <div className="md:hidden flex-1 w-full">
              <Input
                type="text"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-4 bg-[#F8FAFC] border border-gray-200 rounded-xl
                  focus:outline-none focus:ring-2 focus:ring-[#036475]/20 focus:border-[#036475]
                  transition-all disabled:opacity-50"
              />
            </div>

            {/* Email Input Wrapper (Expands to fill remaining space on desktop) */}
            <div className="flex-1 w-full">
              <Input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-4 bg-[#F8FAFC] border border-gray-200 rounded-xl
                  focus:outline-none focus:ring-2 focus:ring-[#036475]/20 focus:border-[#036475]
                  transition-all disabled:opacity-50"
              />
            </div>

            {/* Reusable Subscribe Button */}
            <Buttons
              type="submit"
              disabled={isLoading}
              text={isLoading ? "Subscribing..." : "Subscribe"}
              wrapperClassname="w-full md:w-fit"
              style="
                px-8 py-4 !h-auto bg-[#024E5B] text-white font-bold !rounded-xl
                hover:bg-[#023a44] transition-colors text-sm tracking-wider
                disabled:bg-[#024E5B]/50 disabled:cursor-not-allowed min-w-[130px]
              "
            />
          </div>

          <div className="flex items-start gap-3">
            <div className="relative flex items-center h-5 mt-1">
              <input
                id="newsletter-terms"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
                disabled={isLoading}
                className="w-5 h-5 text-[#036475] border-gray-300 rounded 
                focus:ring-[#036475] cursor-pointer disabled:opacity-50"
              />
            </div>
            <label
              htmlFor="newsletter-terms"
              className="text-xs md:text-sm text-gray-500 leading-relaxed"
            >
              By checking this box, you confirm that you have read and are
              agreeing to our terms of use regarding the storage of the data
              submitted through this form.
            </label>
          </div>
        </form>
      </div>
    </section>
  );
}
