"use client";

import EmailSent from "@/components/password-reset/EmailSent";
import EnterEmailForm from "@/components/password-reset/EnterEmailForm";
import LeftSide from "@/components/password-reset/LeftSideLayout";
import RightSideLayout from "@/components/password-reset/RightSideLayout";
import { useState } from "react";

// ==================== 🧩Main Component ====================
export default function ForgotPasswordPage() {
  const [step, setStep] = useState("enter-email");
  // const [step, setStep] = useState("email-sent");
  const [email, setEmail] = useState("");

  return (
    <div className="bg-[#F7F9FB] overflow-auto">
      <div className="relative h-screen bg-[#F7F9FB]">
        {/* Background image layer */}
        <div
          className="
            absolute inset-0
            bg-[url('/images/bg-img.jpg')]
            bg-no-repeat
            bg-cover
            bg-position-[30%_0%]
            md:bg-position-[0%_30%]
            translate-y-[-50px] md:translate-y-0
          "
        >
          {/* Overlay ONLY on image */}
          <div className="absolute inset-0 bg-[#0F172A]/45 md:bg-[#0F172A]/75" />
        </div>

        {/* Actual content */}
        <div className="relative z-10 grid grid-cols-1 h-full md:grid-cols-2">
          <LeftSide />

          <RightSideLayout>
            {step === "enter-email" && (
              <EnterEmailForm setStep={setStep} setEmail={setEmail} />
            )}

            {step === "email-sent" && (
              <EmailSent setStep={setStep} email={email} />
            )}
          </RightSideLayout>
        </div>
      </div>
    </div>
  );
}
