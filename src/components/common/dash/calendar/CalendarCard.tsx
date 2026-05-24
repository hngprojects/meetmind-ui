"use client";

// import { useState } from "react";
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

  const calendarDays = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1,
  );
  const leadingEmptyDays = Array.from({ length: firstDayOfMonth }, () => null);
  const allCalendarDays = [...leadingEmptyDays, ...calendarDays];

  // Navigation functions
  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentDate.getMonth() + 1, 1));
  };

  return (
    <section
      className="
        overflow-hidden rounded-lg border border-[#E4E4E7] bg-white
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5">
        <button
          onClick={handlePreviousMonth}
          className=" flex h-8 w-8 items-center justify-center rounded-md border 
            border-[#E4E4E7] cursor-pointer"
        >
          <FiChevronLeft className="text-sm text-[#71717A]" />
        </button>

        <h2 className="text-base font-semibold text-[#18181B]">
          {currentMonth} {currentYear}
        </h2>

        <button
          onClick={handleNextMonth}
          className=" flex h-8 w-8 items-center justify-center rounded-md border 
            border-[#E4E4E7] cursor-pointer"
        >
          <FiChevronRight className="text-sm text-[#71717A]" />
        </button>
      </div>

      {/* Week Days */}
      <div
        className="
          mt-6 grid grid-cols-7 px-5 text-center
        "
      >
        {weekDays.map((day) => (
          <p
            key={day}
            className="
              text-xs font-medium text-[#71717A]
            "
          >
            {day}
          </p>
        ))}
      </div>

      {/* Dates */}
      <div className=" mt-5 grid grid-cols-7 gap-y-4 px-5 pb-6">
        {allCalendarDays.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} />;
          }

          return (
            <button
              onClick={() => setSelectedDate(day)}
              key={`${day}-${index}`}
              className={`
                mx-auto flex h-9 w-9 items-center justify-center rounded-md
                text-sm font-medium transition-colors cursor-pointer
                ${
                  selectedDate === day
                    ? "bg-[#171717] text-[#FAFAFA]"
                    : "text-[#09090B] hover:bg-[#F4F4F5]"
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CalendarCard;
