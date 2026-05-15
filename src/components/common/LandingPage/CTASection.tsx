"use client";
export default function CTASection() {
  return (
    <section
      id="request-early-access"
      className="py-10 px-4 md:px-0 md:py-15 lg:py-20 bg-[#FEFEFF]"
    >
      <div className="relative overflow-hidden max-w-sm md:max-w-2xl lg:max-w-5xl rounded-2xl mx-auto px-16 md:px-24 py-8 md:py-16 bg-[#036475] text-center">
        <img
          src="/icons/meetmind-logo.svg"
          alt="MeetMind logo"
          className="absolute -bottom-16 -right-45 md:-bottom-16 md:-right-16 w-75 opacity-40 pointer-events-none"
        />

        <div className="relative z-10">
          <h2 className="text-[#FEFEFF] text-3xl font-serif md:text-4xl font-normal">
            Ready to Transform Your Meetings?
          </h2>

          <p className="mt-6 mb-8 text-sm md:text-md text-[#E1E3E4] max-w-xl mx-auto">
            Join thousands of teams using AI to improve their meeting
            experiences
          </p>

          <button
            type="button"
            onClick={() => console.log("Watch demo clicked")}
            className="inline-block px-6 py-3 bg-[#F7F9FB] text-[#035A69] hover:bg-[#02505E] hover:text-[#F7F9FB] font-semibold rounded-lg text-base cursor-pointer"
          >
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
}
