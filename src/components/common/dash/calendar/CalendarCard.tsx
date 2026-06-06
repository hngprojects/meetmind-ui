import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type CalendarCardProps = {
  selectedDate: number;
  setSelectedDate: React.Dispatch<React.SetStateAction<number>>;
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
};

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CalendarCard = ({
  selectedDate,
  setSelectedDate,
  currentDate,
  setCurrentDate,
}: CalendarCardProps) => {
  const currentMonth = months[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();
  const today = new Date();

  const firstDayOfMonth = new Date(
    currentYear,
    currentDate.getMonth(),
    1,
  ).getDay();

  const daysInMonth = new Date(
    currentYear,
    currentDate.getMonth() + 1,
    0,
  ).getDate();
  const daysInPreviousMonth = new Date(
    currentYear,
    currentDate.getMonth(),
    0,
  ).getDate();

  const calendarDays = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1,
  );
  const isCurrentMonth =
    today.getMonth() === currentDate.getMonth() &&
    today.getFullYear() === currentYear;
  const todayDate = today.getDate();
  const previousMonthDays = Array.from(
    { length: firstDayOfMonth },
    (_, index) => daysInPreviousMonth - firstDayOfMonth + index + 1,
  );
  const currentCalendarDays = [
    ...previousMonthDays.map((day) => ({
      day,
      isCurrentMonth: false,
    })),

    ...calendarDays.map((day) => ({
      day,
      isCurrentMonth: true,
    })),
  ];
  const remainingDays =
    currentCalendarDays.length % 7 === 0
      ? 0
      : 7 - (currentCalendarDays.length % 7);
  const nextMonthDays = Array.from({ length: remainingDays }, (_, index) => ({
    day: index + 1,
    isCurrentMonth: false,
  }));
  const allCalendarDays = [...currentCalendarDays, ...nextMonthDays];

  const getDayCellClassName = (calendarDay: {
    day: number;
    isCurrentMonth: boolean;
  }) => {
    const baseClasses =
      "mx-auto flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer";

    if (!calendarDay.isCurrentMonth) {
      return `${baseClasses} text-text-placeholder`;
    }

    if (selectedDate === calendarDay.day) {
      return `${baseClasses} bg-calendar-bg-primary text-text-primary-foreground`;
    }

    if (isCurrentMonth && todayDate === calendarDay.day) {
      return `${baseClasses} bg-soft-white text-calendar-primary`;
    }

    return `${baseClasses} text-calendar-primary hover:bg-soft-white`;
  };

  // Navigation functions
  const handleMonthChange = (offset: number) => {
    const nextDate = new Date(currentYear, currentDate.getMonth() + offset, 1);
    const maxDayInNextMonth = new Date(
      nextDate.getFullYear(),
      nextDate.getMonth() + 1,
      0,
    ).getDate();

    setCurrentDate(nextDate);
    setSelectedDate((prev) => Math.min(prev, maxDayInNextMonth));
  };

  const handlePreviousMonth = () => handleMonthChange(-1);
  const handleNextMonth = () => handleMonthChange(1);

  return (
    <section
      className="
        mx-auto w-full overflow-hidden rounded-lg border border-calendar-border bg-white
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 pt-4 sm:px-5 sm:pt-5">
        <button
          aria-label="Previous month"
          onClick={handlePreviousMonth}
          className=" flex h-8 w-8 items-center justify-center rounded-md border 
            border-calendar-border cursor-pointer"
        >
          <FiChevronLeft className="text-sm text-calendar-primary" />
        </button>

        <h2 className="text-base font-semibold text-calendar-primary">
          {currentMonth} {currentYear}
        </h2>

        <button
          aria-label="Next month"
          onClick={handleNextMonth}
          className=" flex h-8 w-8 items-center justify-center rounded-md border 
            border-calendar-border cursor-pointer"
        >
          <FiChevronRight className="text-sm text-calendar-primary" />
        </button>
      </div>

      {/* Week Days */}
      <div
        className="
          mt-6 grid grid-cols-7 px-3 text-center sm:px-5
        "
      >
        {weekDays.map((day) => (
          <p
            key={day}
            className="
              text-xs font-medium text-calendar-secondary
            "
          >
            {day}
          </p>
        ))}
      </div>

      {/* Dates */}
      <div className=" mt-5 grid grid-cols-7 gap-y-4 px-3 pb-5 sm:px-5 sm:pb-6">
        {allCalendarDays.map((calendarDay, index) => {
          return (
            <button
              key={`${calendarDay.day}-${index}`}
              disabled={!calendarDay.isCurrentMonth}
              onClick={() => {
                if (calendarDay.isCurrentMonth) {
                  setSelectedDate(calendarDay.day);
                }
              }}
              className={getDayCellClassName(calendarDay)}
            >
              {calendarDay.day}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CalendarCard;
