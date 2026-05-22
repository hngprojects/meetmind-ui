"use client";

import Error from "@/components/password-reset/Error";
import InvalidLink from "@/components/password-reset/InvalidLink";
import LeftSide from "@/components/password-reset/LeftSideLayout";
import ResetPasswordForm from "@/components/password-reset/ResetPasswordForm";
import ResetSuccess from "@/components/password-reset/ResetSuccess";
import RightSideLayout from "@/components/password-reset/RightSideLayout";
import { useState } from "react";

// ==================== 🧩Main Component ====================
export default function ResetPasswordPage() {
  const [step, setStep] = useState("new-password");
  // const [step, setStep] = useState("invalid-link");
  // const [step, setStep] = useState("success");
  // const [step, setStep] = useState("error");

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
            {step === "new-password" && <ResetPasswordForm setStep={setStep} />}

            {step === "invalid-link" && <InvalidLink />}

            {step === "success" && <ResetSuccess />}

            {step === "error" && <Error />}
          </RightSideLayout>
        </div>
      </div>
    </div>
  );
}
