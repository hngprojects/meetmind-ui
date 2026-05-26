"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSignupStore } from "@/store/signupStore";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function VerifyEmail() {
  const router = useRouter();
  const { formData } = useSignupStore();

  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(299); // 4 minutes 59 seconds
  const [isVerifying, setIsVerifying] = useState(false);

  const emailToDisplay = formData?.email || "example@email.com";

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    setIsVerifying(true);
    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false);
      // Next step after verify
      router.push("/Dashboard");
    }, 1500);
  };

  const handleResend = () => {
    if (timeLeft > 0) return;
    // Simulate resend logic
    setTimeLeft(299);
  };

  return (
    <div className="w-full max-w-[600px] mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold text-[#0F172A] mb-4">
          Verify your email
        </h1>
        <p className="text-[14px] leading-relaxed text-[#5E6470] mb-8 max-w-[420px]">
          We sent you a six-digit confirmation code to{" "}
          <span className="font-semibold text-[#0F172A]">{emailToDisplay}</span>
          . Please enter it below to confirm your email address.
        </p>

        <form
          onSubmit={handleVerify}
          className="w-full flex flex-col items-center"
        >
          <div className="w-full max-w-[360px] text-left mb-6">
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Verification code
            </label>
            <div className="flex justify-center w-full">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
                containerClassName="w-full flex justify-between gap-2"
              >
                <InputOTPGroup className="w-full flex justify-between gap-2">
                  <InputOTPSlot
                    index={0}
                    className="w-12 h-14 text-lg border-[#DADADA] focus:border-[#02505E] focus:ring-[#02505E] rounded-md"
                  />
                  <InputOTPSlot
                    index={1}
                    className="w-12 h-14 text-lg border-[#DADADA] focus:border-[#02505E] focus:ring-[#02505E] rounded-md"
                  />
                  <InputOTPSlot
                    index={2}
                    className="w-12 h-14 text-lg border-[#DADADA] focus:border-[#02505E] focus:ring-[#02505E] rounded-md"
                  />
                  <InputOTPSlot
                    index={3}
                    className="w-12 h-14 text-lg border-[#DADADA] focus:border-[#02505E] focus:ring-[#02505E] rounded-md"
                  />
                  <InputOTPSlot
                    index={4}
                    className="w-12 h-14 text-lg border-[#DADADA] focus:border-[#02505E] focus:ring-[#02505E] rounded-md"
                  />
                  <InputOTPSlot
                    index={5}
                    className="w-12 h-14 text-lg border-[#DADADA] focus:border-[#02505E] focus:ring-[#02505E] rounded-md"
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-sm mb-8 w-full max-w-[360px]">
            <p className="text-[#5E6470] text-center">
              Resend code in{" "}
              <span className="text-[#EF4444] font-medium">
                {formatTime(timeLeft)}
              </span>
            </p>
            <p className="text-[#5E6470] text-center">
              Didn&apos;t receive a code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={timeLeft > 0}
                className={`underline font-medium ${
                  timeLeft > 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-[#02505E] hover:text-[#035A69] cursor-pointer"
                }`}
              >
                Send code again
              </button>
            </p>
          </div>

          <button
            type="submit"
            disabled={otp.length !== 6 || isVerifying}
            className="w-full max-w-[360px] py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-200 bg-[#02505E] text-white hover:bg-[#035A69] disabled:bg-[#02505E]/50 disabled:cursor-
          >
            {isVerifying ? "Verifying..." : "Verify Email"}
          </button>
        </form>
      </div>
    </div>
  );
}
