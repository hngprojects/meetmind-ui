import Image from "next/image";
import { HiOutlineCheck } from "react-icons/hi2";
import { beliefs } from "./data";

export default function AboutWhyChoose() {
  return (
    <section className="bg-bg-primary py-[3rem] md:py-[4rem] lg:py-[5rem]">
      <div className="max-w-[80rem] mx-auto px-[1.5rem] md:px-[2.5rem] lg:px-[5rem]">
        <div className="max-w-[35rem]">
          <h2 className="text-[1.5rem] md:text-[1.75rem] font-bold text-text-color-primary">
            Why choose MeetMind
          </h2>
          <p className="mt-[0.75rem] text-[0.9375rem] md:text-[1rem] text-text-body leading-[1.6]">
            Our goal is to make AI collaboration feel native inside every
            digital conversation.
          </p>
        </div>

        {/* Mobile: image then beliefs stacked */}
        <div className="mt-[2rem] lg:hidden">
          <div className="relative w-full aspect-[16/10] rounded-[1rem] overflow-hidden">
            <Image
              src="/images/about-us/hero.jpg"
              alt="Team member on a video call"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>

        <div className="mt-[2rem] lg:mt-[3rem] flex flex-col lg:flex-row lg:items-start lg:gap-[2rem]">
          <div className="hidden lg:block lg:w-[45%] shrink-0">
            <div className="relative w-full aspect-[4/3] md:aspect-[16/11] rounded-[1rem] overflow-hidden">
              <Image
                src="/images/about-us/hero.jpg"
                alt="Team member on a video call"
                fill
                className="object-cover"
                sizes="42vw"
                priority
              />
            </div>
          </div>

          <div className="w-full lg:flex-1">
            <h3 className="text-[1rem] font-bold text-text-color-primary lg:mt-0 mt-[1rem]">
              What We Believe
            </h3>
            <ul className="mt-[1rem] flex flex-col gap-[0.75rem]">
              {beliefs.map((belief) => (
                <li
                  key={belief}
                  className="flex items-start gap-[0.75rem] rounded-[0.75rem] bg-soft-white px-[1rem] py-[0.6rem]"
                >
                  <HiOutlineCheck
                    className="mt-[0.125rem] shrink-0"
                    size={16}
                    aria-hidden
                  />
                  <span className="text-[0.8rem] md:text-[0.85rem] text-text-color-secondary leading-[1.5]">
                    {belief}
                  </span>
                </li>
              ))}
            </ul>
            <Image
              src="/icons/clipboard-star.svg"
              alt="Clipboard star"
              height={130}
              width={130}
              className="hidden lg:block mt-6 -ml-6"
            />
          </div>
        </div>

        <div className="mt-[2.5rem] md:mt-[3rem] lg:mt-0 rounded-[1rem] px-[1.5rem] md:px-[3rem]">
          <p className="text-center text-[1.125rem] md:text-[1.375rem] leading-[1.5] text-text-subtext max-w-[52rem] mx-auto">
            Most meetings lose context, decisions, and follow-through. We built
            MeetMind to make conversations searchable, structured, and
            operational in real time.
          </p>
        </div>
      </div>
    </section>
  );
}
