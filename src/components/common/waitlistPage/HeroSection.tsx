import SubscribeEmail from "@/components/reuseable-component/email/subscribeEmail";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="flex items-start justify-center pt-8 px-4">
      <div className="py-12 px-4 flex flex-col items-center w-full">
        {/* --- HEADING GROUP --- */}
        <div className="flex flex-row items-center w-full justify-between">
          {/* Clipboard icon — top-left, aligned with heading */}
          <div className="flex justify-center items-center mt-2 w-[15%]">
            <Image
              src="/icons/task-list-star.svg"
              width={80}
              height={80}
              alt="star list"
            />
          </div>

          {/* Heading — centered */}
          <h1
            className="text-4xl md:text-[56px] font-semibold  w-[70%]
                 font-serif leading-tight text-center flex-1 
                 text-[#0F172A] tracking-[-0.02em]"
          >
            AI agents that join calls and participate
            <br />
            <span className="font-serif italic text-[#006673]">
              like real teammates.
            </span>
          </h1>

          {/* Zoom logo — top-right, aligned with heading */}
          <div
            className="flex w-[15%] mt-2 
          items-center justify-center rounded-xl  h-[80px]
           bg-white border border-[#e2e8ea]"
          >
            <Image
              src="/icons/zoom.svg"
              width={80}
              height={40}
              alt="Zoom"
              className="object-contain"
            />
          </div>
        </div>

        {/* --- SUBHEADING --- */}
        <p className="mt-6 text-center text-lg leading-relaxed max-w-xl text-[#6b7280]">
          MeetMind joins your call, tracks coverage, and delivers a structured
          summary instantly.
        </p>

        {/* --- EMAIL + CTA SECTION --- */}
        <div className="w-full mt-8">
          <div
            className="flex flex-col md:flex-row
            items-center justify-center gap-4 w-full"
          >
            {/* Google Chat icon */}

            <Image
              src="/icons/google-chat.svg"
              width={60}
              height={60}
              alt="Google Chat"
            />

            {/* Email input */}

            <div className=" w-full md:w-[70%] lg:w-[50%]">
              <SubscribeEmail
                style="flex flex-col md:flex-row gap-5 w-full"
                label="email"
                labelStyle="text-[#6b7280]"
              />
            </div>
          </div>
        </div>

        {/* --- AVATARS + SOCIAL PROOF --- */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <Image
            src="/images/group.png"
            width={140}
            height={45}
            alt="Early users"
          />
          <p className="text-[10px] font-bold tracking-widest uppercase text-[#9ca3af]">
            Join 1k+ early users
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
