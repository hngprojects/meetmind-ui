import Image from "next/image";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section id="changeloghero" className=" pt-16 pb-4 px-4 sm:px-6 lg:px-22.5">
      {/* Main Container */}
      <div className="bg-[#FFFFFF] border border-neutral-100 rounded-2xl p-6 md:p-12 relative overflow-hidden flex flex-col gap-6">
        <div>
          <Link
            href="/"
            className="flex items-center text-sm text-neutral-500 hover:text-neutral-800 font-medium gap-2 transition-colors cursor-pointer"
          >
            <span>←</span> Back
          </Link>
        </div>

        {/* Lower Content Wrapper */}
        <div
          className="flex flex-col md:flex-row items-center md:items-center justify-between text-left  gap-4 md:gap-12 lg:gap-24 
        md:mx-auto z-10 max-w-3xl"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight md:whitespace-nowrap">
            See what&apos;s <br className="hidden md:block" />
            shipping.
          </h1>

          <p className="text-neutral-500 text-sm md:text-base leading-relaxed font-normal">
            Follow along as we build MeetMind. We ship new features and
            improvements every week.
          </p>
        </div>
        <div className="absolute  -right-5 -bottom-6 pointer-events-none w-20 h-20 md:w-30 md:h-30">
          <Image
            src="/icons/streamline-freehand_task-list-clipboard-favorite-star.svg"
            alt="Changelog Decoration Icon"
            width={120}
            height={120}
            className="w-full h-full object-contain opacity-40 md:opacity-100"
          />
        </div>
      </div>
    </section>
  );
}
