"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type SubscribeFormData = z.infer<typeof subscribeSchema>;

export default function SubscribeCTA() {
  // UPDATED: Added "loading" to the status type definition
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SubscribeFormData>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(subscribeSchema),
  });

  const onSubmit = async (data: SubscribeFormData) => {
    // UPDATED: Set status to "loading" at the start and log data to prevent unused variable warnings
    setStatus("loading");
    try {
      console.log("Subscribing email:", data.email);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      reset();
    } catch (error) {
      // UPDATED: Capture and log the error for diagnostics
      console.error("Subscription submission failed:", error);
      setStatus("error");
    }
  };

  return (
    <section
      id="subscribe-email"
      className="w-full py-10 md:py-15 lg:py-20 bg-[#FEFEFF]"
    >
      <div className="px-4 md:px-6 max-w-7xl mx-auto w-full">
        <div className="relative overflow-hidden w-full max-w-sm md:max-w-7xl lg:max-w-7xl rounded-2xl mx-auto px-6 sm:px-16 md:px-24 py-8 md:py-16 bg-[#036475] text-center">
          <Image
            src="/icons/meetmind-logo.svg"
            alt="MeetMind logo"
            width={300}
            height={300}
            className="absolute -bottom-20 -right-50 md:-bottom-50 md:-right-30 w-75 opacity-40 pointer-events-none"
          />

          <div className="relative z-10">
            <h2 className="text-[#FEFEFF] text-3xl font-serif md:text-4xl font-normal">
              Never miss an update
            </h2>

            <p className="mt-6 mb-8 text-sm md:text-base text-[#E1E3E4] max-w-xl mx-auto">
              Get notified when we ship new features and improvements.
            </p>

            {status === "success" ? (
              <p className="text-[#D9E8EA] font-medium text-sm md:text-base animate-pulse">
                Thank you for subscribing!
              </p>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col items-center gap-3"
              >
                <div className="flex flex-col md:flex-row gap-2 justify-center w-full max-w-xs md:max-w-xl mx-auto">
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email"
                    disabled={isSubmitting}
                    className="w-full md:text-left md:flex-1 p-3 text-center bg-white rounded-md 
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9E8EA] 
                    focus-visible:ring-offset-2 focus-visible:ring-offset-[#036475] disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto inline-block px-6 py-3
                     bg-[#D9E8EA] text-[#035A69] hover:bg-[#F7F9F8] hover:text-[#02505E] 
                     font-bold rounded-lg text-base cursor-pointer 
                     focus-visible:outline-none focus-visible:ring-2 
                     focus-visible:ring-[#D9E8EA] focus-visible:ring-offset-2 
                     focus-visible:ring-offset-[#036475] disabled:opacity-60"
                  >
                    {isSubmitting || status === "loading"
                      ? "Subscribing..."
                      : "Subscribe"}
                  </button>
                </div>
                {errors.email && (
                  <p className="text-red-200 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
                {status === "error" && (
                  <p className="text-red-200 text-sm mt-1">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
