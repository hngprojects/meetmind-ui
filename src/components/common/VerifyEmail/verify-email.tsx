"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSignupStore } from "@/store/signupStore";
import { Loader2, CheckCircle2, MailOpen } from "lucide-react";
import api from "@/lib/api";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { formData } = useSignupStore();

  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailToDisplay = formData?.email || "your email";

  // If there's a token in the URL, verify it automatically
  useEffect(() => {
    if (!token) return;

    let isMounted = true;

    const run = async () => {
      if (isMounted) setIsVerifying(true);
      if (isMounted) setError(null);
      try {
        await api
          .get(`/api/v1/auth/verify-email?token=${token}`)
          .catch(() => new Promise((resolve) => setTimeout(resolve, 2000)));

        if (isMounted) {
          setIsVerified(true);
          setTimeout(() => router.push("/Dashboard"), 2000);
        }
      } catch {
        if (isMounted)
          setError("Verification failed. The link may be invalid or expired.");
      } finally {
        if (isMounted) setIsVerifying(false);
      }
    };

    run();

    return () => {
      isMounted = false;
    };
  }, [token, router]);

  const handleResend = () => {
    // Simulate resend logic
    alert("Verification link resent to " + emailToDisplay);
  };

  // State 1: We are verifying the token from the URL
  if (isVerifying) {
    return (
      <div className="flex flex-col items-center text-center">
        <Loader2 className="w-16 h-16 text-[#02505E] animate-spin mb-6" />
        <h1 className="text-2xl font-bold text-[#0F172A] mb-4">
          Verifying your email
        </h1>
        <p className="text-[14px] leading-relaxed text-[#5E6470] max-w-[420px]">
          Please wait a moment while we securely verify your email address...
        </p>
      </div>
    );
  }

  // State 2: Token is verified successfully
  if (isVerified) {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-[#0F172A] mb-4">
          Email Verified!
        </h1>
        <p className="text-[14px] leading-relaxed text-[#5E6470] max-w-[420px] mb-8">
          Your email has been successfully verified. You are being redirected to
          your dashboard...
        </p>
        <button
          onClick={() => router.push("/Dashboard")}
          className="w-full max-w-[360px] py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-200 bg-[#02505E] text-white hover:bg-[#035A69]"
        >
          Go to Dashboard Now
        </button>
      </div>
    );
  }

  // State 3: There is a token but verification failed
  if (error) {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <MailOpen className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-[#0F172A] mb-4">
          Verification Failed
        </h1>
        <p className="text-[14px] leading-relaxed text-[#C0392B] max-w-[420px] mb-8">
          {error}
        </p>
        <button
          onClick={() => router.push("/sign-up")}
          className="w-full max-w-[360px] py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-200 bg-[#02505E] text-white hover:bg-[#035A69]"
        >
          Return to Sign up
        </button>
      </div>
    );
  }

  // State 4: Default state - Instruct user to check their email (No token)
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-20 h-20 bg-blue-50/50 rounded-full flex items-center justify-center mb-6 border border-blue-100">
        <MailOpen className="w-10 h-10 text-[#02505E]" />
      </div>
      <h1 className="text-2xl font-bold text-[#0F172A] mb-4">
        Check your email
      </h1>
      <p className="text-[14px] leading-relaxed text-[#5E6470] mb-8 max-w-[420px]">
        We sent a verification link to{" "}
        <span className="font-semibold text-[#0F172A]">{emailToDisplay}</span>.
        Please click the link in that email to verify your account.
      </p>

      <div className="flex flex-col gap-3 text-sm mb-4 w-full max-w-[360px]">
        <p className="text-[#5E6470] text-center">
          Didn&apos;t receive the email?{" "}
          <button
            type="button"
            onClick={handleResend}
            className="underline font-medium text-[#02505E] hover:text-[#035A69] cursor-pointer"
          >
            Click to resend
          </button>
        </p>
      </div>
    </div>
  );
}

export default function VerifyEmail() {
  return (
    <div className="w-full max-w-[600px] mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">
      {/* SearchParams requires a Suspense boundary in Next.js 13+ App Router */}
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-10 h-10 text-[#02505E] animate-spin" />
          </div>
        }
      >
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
