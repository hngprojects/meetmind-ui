import React from "react";
import { TERMS_SECTIONS } from "./termsData";

export default function TermsContent() {
  return (
    <div className="flex-1 w-full max-w-3xl">
      <div className="mb-8 md:mb-10 px-5 md:px-0">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1f2a3e] mb-4">
          Welcome to MeetMind.
        </h2>
        <p className="text-sm md:text-base text-[#5c6b7a] leading-relaxed">
          Welcome to MeetMind. These Terms of Service govern your access to and
          use of the MeetMind platform, SDK, APIs, website, and related
          services. By accessing or using MeetMind, you agree to these Terms.
        </p>
      </div>

      <div className="flex flex-col">
        {TERMS_SECTIONS.map((section) => (
          <div
            key={section.id}
            id={section.id}
            className="bg-white md:bg-transparent rounded-xl md:rounded-none p-5 md:p-0 shadow-sm md:shadow-none mb-4 md:mb-10"
          >
            <div className="mb-3">
              {/* Mobile Number Badge */}
              <div className="md:hidden w-6 h-6 rounded flex items-center justify-center bg-[#F1F5F9] text-[#5c6b7a] text-xs font-semibold mb-3">
                {section.number}
              </div>

              {/* Section Title */}
              <h3 className="text-base md:text-lg font-bold text-[#02505E]">
                <span className="hidden md:inline">{section.number}. </span>
                {section.title}
              </h3>
            </div>

            {/* Section Content */}
            <div className="text-sm md:text-[15px] text-[#5c6b7a] leading-relaxed">
              {section.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
