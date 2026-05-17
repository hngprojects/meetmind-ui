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
    <section id="temperature" className="pt-4 pb-10 lg:pt-16 lg:pb-20">
      <div
        className="max-w-7xl flex flex-col lg:flex-row md:gap-16 lg:gap-16 lg:items-start mx-auto 
            px-6 md:px-10 lg:px-20"
      >
        <div className="flex flex-col items-center lg:items-start lg:max-w-118.5 gap-2">
          {/* Section heading */}
          <h2 className="text-[#0F172A] text-[30px] md:text-[40px] font-semibold">
            Temperature
          </h2>

          {/* Subheading */}
          <p className="text-[#0F172A] text-[18px] font-semibold mt-1">
            You set how present it is
          </p>

          {/* Description */}
          <p className="mt-3 text-sm text-[#3F4555] text-center lg:text-start md:max-w-118.5 max-w-86 lg:mx-auto">
            Not every interview needs the same level of involvement. Temperature
            lets you dial Meet Mind from completely silent to actively engaged,
            for every role, round, and interviewee style.
          </p>
        </div>

        {/* Four level cards */}
        <div className="mt-24 md:mt-0 grid grid-cols-1 md:grid-cols-2 lg:max-w-176.5 gap-6">
          {temperatureLevels.map((level) => (
            <div
              key={level.number}
              className="bg-[#FFFFFF] rounded-2xl p-6 flex flex-col"
            >
              <span className="text-[#0F172A] text-[24px] font-bold">
                {level.number}
              </span>
              <h3 className="mt-4 text-[#3F4555] font-semibold text-[18px]">
                {level.title}
              </h3>
              <p className="mt-2 text-[16px] text-[#3F4555]">
                {level.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
