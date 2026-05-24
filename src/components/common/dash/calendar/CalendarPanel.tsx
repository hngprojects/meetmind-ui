import EmptyState from "./EmptyState";

type CalendarPanelProps = {
  selectedDate: number;
  currentDate: Date;
};

const CalendarPanel = ({ selectedDate, currentDate }: CalendarPanelProps) => {
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });

  const currentYear = currentDate.getFullYear();

  return (
    <section>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[16px] font-semibold text-[#09090B]">
            Appointments for {currentMonth} {selectedDate}, {currentYear}
          </h2>

          <p className="mt-1 text-sm text-[#71717A]">Select the dates</p>
        </div>

        <button
          className="
            rounded-lg border border-[#E4E4E7] bg-white px-4 py-2 text-xs text-[#09090B]"
        >
          Today
        </button>
      </div>

      <div className="mt-1 border-t border-[#E4E4E7]" />

      <EmptyState />
    </section>
  );
};

export default CalendarPanel;
