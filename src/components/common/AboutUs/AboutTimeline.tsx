import { timelineEvents } from "./data";

export default function AboutTimeline() {
  return (
    <section className="bg-bg-primary py-[3rem] md:py-[4rem] pb-[4rem]">
      <div className="max-w-[80rem] mx-auto px-[1.5rem] md:px-[2.5rem] lg:px-[5rem]">
        <h2 className="text-[1.5rem] md:text-[1.75rem] font-bold text-text-color-primary">
          Our Product Timeline
        </h2>
        <div className="mt-[1.5rem] rounded-[1rem] bg-soft-white p-[1.25rem] md:p-[2rem]">
          <ul className="flex flex-col gap-[2rem] md:gap-[2.5rem]">
            {timelineEvents.map((event, index) => (
              <li
                key={`${event.year}-${index}`}
                className="flex flex-row items-center"
              >
                <span className="shrink-0 text-[1rem] font-bold text-text-primary w-[3rem]">
                  {event.year}
                </span>
                <p className="text-[0.875rem] md:text-[0.9375rem] text-text-body leading-[1.5] flex-1">
                  {event.description}
                  {event.highlight && (
                    <>
                      {" "}
                      <span className="font-semibold text-text-primary">
                        {event.highlight}
                      </span>
                    </>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
