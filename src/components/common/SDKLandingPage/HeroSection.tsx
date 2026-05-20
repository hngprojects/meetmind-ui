import Link from "next/link";
import SDKImportSnippet from "./SDKImportSnippet";
import { cardData } from "./pageData/SDKPageData";

export default function HeroSection() {
  return (
    <section id="sdkhero" className="bg-[#F7F9FB] pt-18 pb-16 px-4">
      <div className="flex flex-col mx-auto mt-0 md:text-center md:max-w-213 gap-6">
        <h1 className="font-bold text-[40px] md:text-7xl">
          Ship AI Agents That Speak In Meetings
        </h1>
        <p className="font-medium text-2xl text-[#3F4555] md:max-w-166 md:text-center mx-auto">
          MeetMind is the developer SDK for building voice-enabled AI
          participants that join Zoom and Google Meet. Not to record, but to
          actually participate
        </p>
      </div>

      <div className="relative mx-auto my-12 block max-w-fit">
        <SDKImportSnippet />
      </div>

      <div className="flex flex-col justify-between md:max-w-183 mx-auto gap-4 md:mb-12">
        <div className="flex bg-white md:max-w-81 mx-auto justify-center p-2 rounded">
          $ pip install meetmind-sdk
        </div>

        <div className="flex flex-col items-center md:flex-row gap-6 md:justify-between">
          <Link
            href="/signup"
            className="inline-block min-w-56 text-center py-2 bg-[#02505E] hover:bg-[#F7F9FB] text-[#FEFEFF] hover:text-[#02505E] hover:border
             hover:border-[#02505E] text-base font-bold rounded-lg cursor-pointer"
          >
            Try Demo
          </Link>
          <Link
            href="/api"
            className="inline-block min-w-56 text-center py-2 border border-[#035A69] text-[#02505E] hover:text-[#FEFEFF] hover:bg-[#02505E]
             font-bold rounded-lg text-base cursor-pointer"
          >
            Get API Keys
          </Link>
          <Link
            href="/docs"
            className="inline-block min-w-56 text-center py-2 border border-[#035A69] text-[#02505E] hover:text-[#FEFEFF] hover:bg-[#02505E]
             font-bold rounded-lg text-base cursor-pointer"
          >
            View Docs
          </Link>
        </div>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-272
       mx-auto mt-16 justify-stretch items-stretch "
      >
        {cardData.map((card) => (
          <div
            key={card.id}
            className="flex flex-col bg-white p-4 h-auto rounded-xl border border-gray-100 shadow-sm aspect-square
             justify-around text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-md"
          >
            <h1 className="text-[40px] font-bold text-[#0F172A]">
              {card.title}
            </h1>
            <h3 className="text-lg font-medium text-[#3F4555] ">
              {card.subtitle}
            </h3>
            <p className="text-base font-normal text-[#1A8261] leading-relaxed">
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
