import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="px-6 py-5 overflow-hidden">
      <div
        className=" relative max-w-6xl mx-auto bg-[#006673] rounded-[40px]
       py-20 px-10 text-center text-white overflow-hidden"
      >
        <h2 className="text-3xl md:text-5xl font-serif mb-6">
          Ready to Transform Your Meetings?
        </h2>

        <p className="text-teal-50 mb-10 max-w-lg mx-auto opacity-90">
          Join thousands of teams using AI to improve their meeting experiences
        </p>

        <Button
          className="md:w-[50%] lg:w-[35%] bg-[#d2e9ec] text-[#004d57] px-8 py-4 hover:cursor-pointer 
        rounded-xl font-semibold hover:bg-white transition-colors"
          type="button"
        >
          <Link href="/WatchDemo" className="flex text-center justify-center">
            Watch Demo
          </Link>
        </Button>

        <Image
          src="/icons/meetmind-logo-cta.svg"
          alt="MeetMind logo"
          width={88}
          height={88}
          className="hidden md:block md:absolute md:bottom-0 
            md:-right-4 md:w-60 lg:bottom-0 lg:-right-6 lg:w-72
            md:opacity-50 md:pointer-events-none"
        />
      </div>
    </section>
  );
};

export default CTASection;
