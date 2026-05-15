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
      <div className="max-w-7xl flex flex-col mx-auto px-6">
        {/* Section label */}
        <h2 className="text-[#0F172A] text-3xl font-semibold text-center">
          How it works
        </h2>

        {/* Section heading */}
        <p className="mt-2 text-sm max-w-sm md:mt-2 md:text-md text-[#5E6470] text-center mx-auto">
          From setup to summary, handled by a single intelligent participant.
        </p>

        {/* Step Cards */}
        <div className="mt-6 flex flex-col items-center gap-4 md:flex-row md:justify-center">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-start p-4 bg-[#F7F9FB] rounded-3xl max-w-[16rem]"
            >
              {/* Frame Image */}
              <img
                src={step.image}
                alt={`${step.title} illustration`}
                className="w-60 h-auto rounded-lg mb-6"
              />

              {/* Step Number */}
              <span className="text-[#035A69] text-[0.65rem] md:text-xs font-medium">
                Step {step.number}
              </span>

              {/* Step Title */}
              <h3 className="mt-1 text-xs md:text-md font-medium text-[#0F172A]">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="mt-4 text-[0.54rem] md:text-[0.65rem] text-[#3F4555] max-w-[20rem]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Interview Smarter Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center mt-20 mx-auto gap-8">
          <div className="max-w-full h-100 md:w-97.5 md:h-72.5 overflow-hidden rounded-xl">
            <img
              src="/images/interview-image.jpg"
              alt="Professional conducting a video interview"
              className="w-full h-full object-cover scale-110"
            />
          </div>
          <div className="row-start-1 gap-4 md:col-start-2 flex flex-col items-start">
            <div>
              {/* Heading */}
              <h2 className="text-[#0F172A] text-xl font-bold md:text-2xl leading-tight">
                Interview smarter.
                <br />
                <span className="text-[#035A69]">Hire with confidence</span>
              </h2>

              {/* Subtext */}
              <p className="mt-2 text-[0.65rem] max-w-sm md:max-w-sm md:text-md text-[#5E6470] mx-auto">
                An AI participant that joins your interview, listens
                intelligently, and surfaces the right information at the right
                moment - without even interrupting the flow.
              </p>
            </div>

            <div>
              <p className="mb-4 font-semibold text-[0.65rem] max-w-sm md:mt-2 md:text-md text-[#5E6470]">
                Key features
              </p>
              <ul className="space-y-3 text-[0.65rem] max-w-sm md:mt-2 md:text-md text-[#5E6470]">
                <li className="flex items-start gap-2">
                  <img
                    src="/icons/checkmark.svg"
                    alt="check mark icon"
                    className="w-2 h-2 mt-1"
                  />
                  Arrives briefed on the candidate and role
                </li>
                <li className="flex items-start gap-2">
                  <img
                    src="/icons/checkmark.svg"
                    alt="check mark icon"
                    className="w-2 h-2 mt-1"
                  />
                  Asks follow-ups when gaps are detected
                </li>
                <li className="flex items-start gap-2">
                  <img
                    src="/icons/checkmark.svg"
                    alt="check mark icon"
                    className="w-2 h-2 mt-1"
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
