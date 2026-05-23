import { stats } from "./data";

export default function AboutStats() {
  return (
    <section className="bg-bg-primary border-y border-bg-divider">
      <div className="max-w-[80rem] mx-auto px-[1.5rem] md:px-[2.5rem] lg:px-[5rem] py-[2rem] md:py-[2.5rem]">
        <div className="grid grid-cols-3 divide-x divide-bg-divider">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center px-[0.5rem] md:px-[1.5rem]"
            >
              <p className="text-[1.375rem] sm:text-[1.75rem] md:text-[2rem] font-bold text-text-color-primary leading-none">
                {stat.value}
              </p>
              <p className="mt-[0.5rem] text-[0.6875rem] sm:text-[0.8125rem] md:text-[0.875rem] text-text-body leading-[1.3]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
