"use client";

import Signform from "./form";
import Authwith from "./authwith";
import { useSignupStore } from "@/store/signupStore";
import TermText from "./termText";
import UploadSuccess from "./successstate";
import Image from "next/image";

const SignUp = () => {
  const { isSuccess } = useSignupStore();

  return (
    <section className="relative w-full h-screen flex overflow-hidden">
      {/* LEFT — fixed background image */}
      <div className="hidden lg:block lg:w-[45%] h-full flex-shrink-0 relative">
        <div className="w-full h-full">
          <Image
            src="/images/signupBg.png"
            alt="Signup"
            fill
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-[#0000008f] flex items-center justify-center">
          <div className="flex flex-col gap-4 px-10">
            <h1 className="text-4xl font-bold text-white">
              Welcome to Meet <span className="text-[#06B6D4]">Mind</span>
            </h1>
            <p className="text-xl text-white w-[80%]">
              Designing intelligence that knows how to speak
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT — scrollable form panel */}
      <div
        className="w-full lg:w-[55%] h-full bg-[#F7F9FB]
          overflow-y-auto flex-shrink-0"
      >
        {isSuccess ? (
          <div className="min-h-full flex flex-col items-center justify-center gap-3 text-center p-6">
            <UploadSuccess />
          </div>
        ) : (
          <div className="min-h-full flex flex-col items-center justify-center px-6 py-5 sm:px-10">
            {/* mobile-only welcome text */}
            <div className="lg:hidden text-center mb-6 w-full max-w-md">
              <h1 className="text-2xl font-bold text-[#0F172A]">
                Welcome to Meet <span className="text-[#06B6D4]">Mind</span>
              </h1>
              <p className="text-sm text-[#737373] mt-1">
                Designing intelligence that knows how to speak
              </p>
            </div>

            {/* form card */}
            <div className="w-full max-w-md flex flex-col gap-3">
              <Signform />

              {/* OR divider */}
              <div className="flex items-center gap-2">
                <span className="h-px w-full bg-[#D1D5DB]"></span>
                <span className="text-sm font-semibold text-[#91949D] whitespace-nowrap">
                  OR
                </span>
                <span className="h-px w-full bg-[#D1D5DB]"></span>
              </div>

              {/* Google auth */}
              <Authwith />

              {/* terms */}
              <TermText />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SignUp;
