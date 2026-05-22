"use client";

import { FiArrowLeft } from "react-icons/fi";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Image from "next/image";

interface Props {
  setStep: React.Dispatch<React.SetStateAction<string>>;
  email: string;
}

// ==================== 🧩Main Component ====================
export default function EmailSent({ setStep, email }: Props) {
  const [timeLeft, setTimeLeft] = useState(30);

  // countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const isCooldownActive = timeLeft > 0;

  async function handleResendEmail() {
    if (isCooldownActive) return;

    try {
      await api.post("/api/v1/auth/forgot-password", {
        email: email,
      });
    } catch {
      setStep("enter-email");
    }

    // restart countdown
    setTimeLeft(30);
  }

  return (
    <div className="flex items-center justify-center md:bg-[#F7F9FB] h-full">
      <div className="p-4 max-w-[420px] flex flex-col justify-center">
        <div className="flex justify-center">
          <Image
            src="/icons/meetmind-logo.svg"
            alt="logo"
            width={43}
            height={43}
          />
        </div>

        <div className="mt-8 p-6 bg-[#FEFEFF] rounded-2xl shadow-sm">
          <div>
            <div className="text-center">
              <h3 className="font-bold text-xl">Check your inbox</h3>
              <p className="text-[#5E6470] mt-2 mb-3">
                We&apos;ve sent a password reset link to your email address
              </p>
            </div>

            <div className="mb-1 flex text-sm text-[#25B788] items-center gap-2 p-3 px-4 bg-[#E9F8F3] rounded-xl">
              <HiOutlineCheckCircle size={15} />
              <p>Email sent successfully</p>
            </div>

            <button
              disabled={isCooldownActive}
              className={`text-sm font-medium bg-[#E1E3E4] rounded-md w-full p-2 mt-4 ${
                isCooldownActive
                  ? "text-white cursor-not-allowed font-extrabold"
                  : "text-[#060A12] cursor-pointer"
              }`}
              onClick={handleResendEmail}
            >
              {isCooldownActive
                ? `Resend email (${timeLeft}s)`
                : "Resend email"}
            </button>

            <button
              className="text-[#060A12] text-sm bg-[#E1E3E4] rounded-md w-full p-2 mt-4 cursor-pointer font-medium"
              onClick={() => setStep("enter-email")}
            >
              Change email
            </button>

            <a
              href="/sign-in"
              className="flex text-[#5E6470] gap-2 mt-5 justify-center text-sm"
            >
              <FiArrowLeft className="text-[#91949D]" size={18} />
              <span className="pt-[2px]">Back to login</span>
            </a>
          </div>
        </div>
        <p className="text-center p-4 mt-2 md:p-0 md:mt-5 text-[#5E6470] text-sm bg-[#F7F9FB] rounded-2xl">
          Check spam or promotion if you don&apos;t see it
        </p>
      </div>
    </div>
  );
}
