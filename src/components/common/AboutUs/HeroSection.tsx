import Image from "next/image";

interface StatItemProps {
  value: string;
  label: string;
  hasBorder?: boolean;
}

export default function HeroSection() {
  return (
    <section
      id="aboutushero"
      className="bg-[#F7F9FB] px-6 py-16 md:px-9 lg:px-16 lg:pt-18"
    >
      <div className="flex flex-col gap-12 max-w-7xl mx-auto">
        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-8 md:max-w-xl">
            <h1 className="text-[#035A69] text-4xl lg:text-5xl font-normal leading-tight">
              We are building AI teammates for real-time conversations.
            </h1>
            <p className="text-[#035A69] text-xl font-normal opacity-90">
              MeetMind helps teams run meetings, interviews, and collaborative
              workflows with AI participants that listen, respond, and generate
              structured outputs in real time.
            </p>
          </div>

          <Image
            src="/images/interview-image.jpg"
            alt="Interview analysis preview"
            width={687}
            height={495}
            priority
            className="w-full md:w-[45%] lg:w-137.5 h-auto rounded-xl shadow-sm"
          />
        </div>

        {/* Stats Section */}
        <div className=" pt-12">
          <ul className="grid grid-cols-3 max-w-full">
            <StatItem value="12,847" label="Interviews analyzed" hasBorder />
            <StatItem value="94%" label="Avg. scorecard coverage" hasBorder />
            <StatItem value="6.2 hrs" label="Saved per hire" />
          </ul>
        </div>
      </div>
    </section>
  );
}

function StatItem({ value, label, hasBorder = false }: StatItemProps) {
  return (
    <li
      className={`flex flex-col items-center gap-2 ${hasBorder ? "border-r border-gray-300" : ""}`}
    >
      <h4 className=" text-2xl md:text-3xl font-normal text-[#0F172A]">
        {value}
      </h4>
      <p className="text-sm  text-center md:text-xl font-medium text-[#6B7280]">
        {label}
      </p>
    </li>
  );
}
