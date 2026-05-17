"use client";

import Image from "next/image";
import Link from "next/link";

export default function CTASection() {
  return (
    <section
      id="request-early-access"
      className="py-10 px-4 md:px-0 md:py-15 lg:py-20 bg-[#FEFEFF]"
    >
      <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-20">
        <div
          className="relative overflow-hidden max-w-85.25 
              md:max-w-3xl lg:max-w-6xl rounded-2xl mx-auto px-6 
              md:px-24 py-8 md:py-16 bg-[#036475] text-center flex 
              flex-col justify-center items-center"
        >
          <Image
            src="/icons/meetmind-logo-cta.svg"
            alt="MeetMind logo"
            width={88}
            height={88}
            className="hidden md:block md:absolute md:bottom-0 
            md:-right-4 md:w-60 lg:bottom-0 lg:-right-6 lg:w-70 
            md:opacity-50 md:pointer-events-none"
          />

          <div className="max-w-73.5 md:max-w-135.5">
            <h2
              className="text-[#FEFEFF] text-3xl font-serif 
                  md:text-[42px] font-normal"
            >
              Ready to Transform Your Meetings?
            </h2>

            <p
              className="mt-6 mb-13 text-sm md:text-[20px] 
                text-[#E1E3E4] max-w-135.5 mx-auto"
            >
              Join thousands of teams using AI to improve their meeting
              experiences
            </p>

            <Link
              href="/watch-demo"
              className="flex justify-center items-center w-66.5 h-14 
                px-4 py-2.5 mx-auto bg-[#F7F9FB] text-[#035A69] 
                hover:bg-[#02505E] hover:text-[#F7F9FB] font-semibold 
                rounded-lg text-base cursor-pointer"
            >
              Watch Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
