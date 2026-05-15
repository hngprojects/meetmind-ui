const temperatureLevels = [
  {
    number: "01",
    title: "Completely silent",
    description:
      "Listens and logs. Never speaks, never flags. Delivers summary after.",
  },
  {
    number: "02",
    title: "Mostly silent",
    description:
      "Only flags pre-assigned tasks. Speaks when directly addressed. Default recommended setting.",
  },
  {
    number: "03",
    title: "Balanced",
    description:
      "Proactively surfaces scored gaps and occasionally suggests pivots when coverage is low.",
  },
  {
    number: "04",
    title: "Proactive",
    description:
      "Regular check-ins on coverage. Suggests follow-up questions. More conversational presence.",
  },
];

export default function TemperatureControl() {
  return (
    <section id="temperature" className="py-12">
      <div className="max-w-7xl flex flex-col lg:flex-row md:gap-16 lg:gap-24 lg:items-start mx-auto px-6 lg:px-16">
        <div className="flex flex-col items-center lg:items-start gap-2">
          {/* Section heading */}
          <h2 className="text-[#0F172A] text-3xl font-semibold">Temperature</h2>

          {/* Subheading */}
          <p className="text-[#0F172A] text-sm font-semibold mt-1">
            You set how present it is
          </p>

          {/* Description */}
          <p className="mt-3 text-sm md:text-md text-[#5E6470] text-center lg:text-start md:max-w-xl lg:max-w-2xl lg:mx-auto">
            Not every interview needs the same level of involvement. Temperature
            lets you dial Meet Mind from completely silent to actively engaged,
            for every role, round, and interviewee style.
          </p>
        </div>

        {/* Four level cards */}
        <div className="mt-24 md:mt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
          {temperatureLevels.map((level) => (
            <div
              key={level.number}
              className="bg-[#FFFFFF] rounded-2xl p-6 flex flex-col"
            >
              <span className="text-[#035A69] text-4xl font-bold">
                {level.number}
              </span>
              <h3 className="mt-4 text-[#0F172A] font-semibold text-lg">
                {level.title}
              </h3>
              <p className="mt-2 text-sm text-[#5E6470]">{level.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
