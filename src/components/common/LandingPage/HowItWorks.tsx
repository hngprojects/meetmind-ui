import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Before the interview",
    description:
      "Set up your session in minutes. Upload your scorecard, write a briefing, queue tasks, and dial in Meet Mind's behavior.",
    image: "/icons/before-the-interview-frame.svg",
  },
  {
    number: "02",
    title: "During the interview",
    description:
      "Meet Mind joins as a silent participant. It listens, tracks, and only speaks when you need it, never disrupting the flow.",
    image: "/icons/during-the-interview-frame.svg",
  },
  {
    number: "03",
    title: "After the interview",
    description:
      "The moment the call ends, a structured summary is ready, organized by scorecard section, with all gaps flagged.",
    image: "/icons/after-the-interview-frame.svg",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#FFFFFF] py-16">
      <div className="max-w-7xl flex flex-col mx-auto px-6 md:px-10 lg:px-20 w-full">
        {/* Section label */}
        <h2 className="text-[#0F172A] text-[30px] md:text-[40px] font-semibold text-center">
          How it works
        </h2>

        {/* Section heading */}
        <p className="mt-2 text-[16px] max-w-sm md:max-w-109 md:mt-2 text-[#5E6470] text-center mx-auto">
          From setup to summary, handled by a single intelligent participant.
        </p>

        {/* Step Cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex h-full w-full flex-col items-start rounded-3xl bg-[#F7F9FB] p-4"
            >
              {/* Frame Image */}
              <Image
                src={step.image}
                alt={`${step.title} illustration`}
                width={240}
                height={180}
                className="w-60 h-auto rounded-lg mb-6"
              />

              {/* Step Number */}
              <span className="text-[#035A69] text-[14px] md:text-[14px] font-medium">
                Step {step.number}
              </span>

              {/* Step Title */}
              <h3 className="mt-1 text-[20px] md:text-[20px] font-medium text-[#0F172A]">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="mt-4 text-[16px] md:text-[16px] text-[#3F4555] max-w-[20rem]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Interview Smarter Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center mt-20 w-full gap-12">
          <div className="max-w-full h-92.25 lg:h-120.5 overflow-hidden rounded-xl">
            <Image
              src="/images/interview-image.jpg"
              alt="Professional conducting a video interview"
              width={80}
              height={80}
              className="w-full h-full object-cover scale-110"
            />
          </div>
          <div className="row-start-1 gap-4 md:col-start-2 flex flex-col items-start">
            <div>
              {/* Heading */}
              <h2 className="text-[#0F172A] text-[30px] font-bold lg:text-[48px] leading-tight">
                Interview smarter.
                <br />
                <span className="text-[#035A69]">Hire with confidence</span>
              </h2>

              {/* Subtext */}
              <p className="mt-12 md:mt-2 text-[14px] lg:text-[16px] text-[#5E6470]">
                An AI participant that joins your interview, listens
                intelligently, and surfaces the right information at the right
                moment - without even interrupting the flow.
              </p>
            </div>

            <div>
              <p className="mb-4 font-semibold mt-4 md:mt-2 text-[18px] text-[#035A69]">
                Key features
              </p>
              <ul className="space-y-3 text-[14px] md:mt-2 md:text-[16px] text-[#5E6470]">
                <li className="flex items-start gap-2">
                  <Image
                    src="/icons/checkmark.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="w-3.25 h-3.25 mt-1"
                  />
                  Arrives briefed on the candidate and role
                </li>
                <li className="flex items-start gap-2">
                  <Image
                    src="/icons/checkmark.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="w-3.25 h-3.25 mt-1"
                  />
                  Asks follow-ups when gaps are detected
                </li>
                <li className="flex items-start gap-2">
                  <Image
                    src="/icons/checkmark.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="w-3.25 h-3.25 mt-1"
                  />
                  Structured notes ready the second you hang up
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
