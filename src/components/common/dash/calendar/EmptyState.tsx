import Image from "next/image";

const EmptyState = () => {
  return (
    <div
      className="
        flex max-h-[121px] mt-16 flex-col items-center justify-center text-center"
    >
      <Image
        src="/icons/empty-calendar.svg"
        alt="Empty calendar"
        width={57}
        height={57}
      />

      <h3 className="mt-6 text-lg font-semibold text-calendar-primary">
        No appointments scheduled
      </h3>

      <p className=" mt-2 max-w-[320px] text-sm leading-6 text-calendar-secondary">
        You don&apos;t have any interviews scheduled for this day.
      </p>
    </div>
  );
};

export default EmptyState;
