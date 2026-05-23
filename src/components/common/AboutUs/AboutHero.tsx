import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="bg-bg-secondary pt-[6rem] pb-[3rem] md:pt-[7rem] md:pb-[4rem]">
      <div className="max-w-[80rem] mx-auto px-[1.5rem] md:px-[2.5rem] lg:px-[5rem]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-[2rem] lg:gap-[4rem]">
          <div className="w-full lg:w-[48%] lg:shrink-0">
            <h1 className="font-serif text-[2rem] leading-[1.25] tracking-[-0.02em] text-text-primary md:text-[2.75rem] lg:text-[3.25rem] lg:leading-[1.15]">
              We are building AI teammates for real-time conversations.
            </h1>
            <p className="mt-[1rem] text-[0.9375rem] leading-[1.6] text-text-primary md:text-[1rem] md:mt-[1.25rem] max-w-[36rem]">
              MeetMind helps teams run meetings, interviews, and collaborative
              workflows with AI participants that listen, respond, and generate
              structured outputs in real time.
            </p>
          </div>
          <div className="w-full lg:w-[48%]">
            <div className="relative w-full aspect-[4/3] md:aspect-[16/11] rounded-[1rem] overflow-hidden">
              <Image
                src="/images/about-us/hero.jpg"
                alt="Person collaborating on a video call"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
