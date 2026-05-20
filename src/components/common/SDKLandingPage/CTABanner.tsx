import Link from 'next/link';

export default function CTABanner() {
  return (
    <section
      id="cta-banner"
      className="w-full bg-[#F7F9FB] py-16 px-4 md:px-8 flex flex-col items-center justify-center"
    >
      {/* Outer Banner Wrapper */}
      <div className="w-full lg:max-w-272 bg-[#036475] rounded-2xl
      p-6 md:p-12 flex flex-col gap-8 mx-auto items-start text-left md:items-center">
        {/* Text Container*/}
        <div className="w-full md:max-w-136 md:mx-auto flex flex-col gap-4 ">
          <h3 className="font-bold text-3xl md:text-4xl text-[#FEFEFF] leading-tight md:text-center">
            Your agent. A live call. This week
          </h3>
          <p className="font-normal text-lg md:text-xl text-[#FEFEFF]/90 md:text-center">
            MeetMind gives you the participation infrastructure. You bring the
            product idea. Ship in days, not months.
          </p>
        </div>

        {/* Buttons Wrapper */}
        <div className="w-full md:max-w-136 flex flex-col md:flex-row gap-4 md:justify-center">
          <Link
            href="/signup"
            className="w-full md:w-auto md:min-w-66.5 text-center py-3 bg-[#036475] hover:bg-[#F7F9FB]
             text-[#FEFEFF] hover:text-[#02505E] border border-[#AFB1B2] hover:border-[#02505E] text-base font-bold
              rounded-xl transition-colors"
          >
            Try Demo
          </Link>
          <Link
            href="/docs"
            className="w-full md:w-auto md:min-w-66.5 text-center py-3 bg-[#036475] hover:bg-[#F7F9FB]
             text-[#FEFEFF] hover:text-[#02505E] border border-[#AFB1B2] hover:border-[#02505E] text-base font-bold
              rounded-xl transition-colors"
          >
            View Docs
          </Link>
        </div>
      </div>
    </section>
  );
}
