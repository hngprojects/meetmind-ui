"use client";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const demoVideoUrl =
    "https://drive.google.com/file/d/13ZfVH1ZoDJ88CkV9DX-GhylkTwf_4HAs/view";

  return (
    <section id="hero" className="bg-[#F7F9FB] pt-24 pb-14 lg:pb-8">
      <div className="max-w-7xl mx-auto px-6 md:p-10 lg:p-20 text-center">
        <div className="relative flex justify-center items-start md:gap-16 lg:gap-24 text-center">
          <Image
            src="/icons/task-list-star.svg"
            alt="Task List Star"
            width={64}
            height={64}
            className="h-auto w-9 left-10 -top-3 md:w-20 absolute lg:left-34 lg:-top-12"
          />
          <h1 className="font-serif text-4xl md:text-[60px] text-[#0F172A] md:max-w-196 tracking-[-0.15rem] leading-[1.4] md:tracking-[-0.1rem] md:leading-none">
            Interview better. <br />{" "}
            <span className="text-[#035A69]">Remember everything.</span>
          </h1>
          <Image
            src="/icons/zoom.svg"
            alt="Zoom"
            width={88}
            height={88}
            className="w-12.5 -top-3 right-4 md:w-[137.8px] md:h-[96.93px] md:block absolute lg:right-24 lg:-top-12"
          />
        </div>
        <p className="mt-2 text-[16px] max-w-xs md:mt-4 md:text-[20px] text-[#5E6470] md:max-w-145 mx-auto">
          MeetMind joins your call, tracks coverage, and delivers a structured
          summary instantly.
        </p>

        {/* Buttons */}
        <div className="relative flex justify-start gap-16 mt-4 items-start md:justify-center md:items-end md:mt-0 md:gap-42">
          <Image
            src="/icons/google-chat.svg"
            alt="Google Chat"
            width={88}
            height={88}
            className="hidden md:block md:w-[101.18px] md:absolute md:left-10"
          />

          {/* Desktop & Tablet View */}
          <div className="hidden mt-10 md:flex md:flex-row items-center justify-center gap-6">
            <Link
              href="/waitlist"
              className="flex justify-center items-center w-47.5 h-14 px-4 py-2.5 bg-[#02505E]
              text-[#FEFEFF] font-semibold rounded-lg text-base hover:bg-[#F7F9FB] 
              hover:text-[#013A44] hover:border hover:border-[#DADADA] 
              transition-colors cursor-pointer"
            >
              Get early access
            </Link>

            <Link
              href={demoVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center w-47.5 h-14 px-4 py-2.5 mx-auto 
              bg-[#F7F9FB] border border-[#DADADA] text-[#0F172A] font-semibold 
              rounded-lg text-[16px] hover:bg-[#02505E] hover:text-[#F7F9FB] 
              transition-colors gap-2 cursor-pointer"
            >
              Watch Demo
            </Link>
          </div>

          {/* Mobile view */}
          <div className="mt-10 mx-auto flex md:hidden items-start justify-center relative w-full px-16">
            <Image
              src="/icons/google-chat.svg"
              alt="Google Chat Icon"
              width={48}
              height={48}
              className="w-11.25 absolute left-2 -top-12 md:hidden"
            />
            <div className="flex flex-col items-center gap-6">
              <Link
                href="/sign-up"
                className="flex justify-center items-center w-86.25 h-14 px-4 py-2.5 
                  bg-[#02505E] text-[#FEFEFF] font-semibold rounded-lg text-base 
                  hover:bg-[#F7F9FB] hover:text-[#013A44] hover:border 
                  hover:border-[#DADADA] transition-colors cursor-pointer"
              >
                Get early access
              </Link>

              <Link
                href={demoVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center w-86.25 h-14 px-4 py-2.5 
                  mx-auto bg-[#F7F9FB] border border-[#DADADA] text-[#0F172A] 
                  font-semibold rounded-lg text-[16px] hover:bg-[#02505E] 
                hover:text-[#F7F9FB] transition-colors gap-2 cursor-pointer"
              >
                Watch Demo
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-10 text-sm max-w-sm md:mt-10 md:text-md text-[#5E6470] md:max-w-lg mx-auto">
          Trusted by <span className="text-[#0F172A]">40+ HR teams</span>. Works
          with Zoom, Google Meet & Teams.
        </p>
      </div>
    </section>
  );
}
