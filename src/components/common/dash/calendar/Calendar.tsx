"use client";

import { useState } from "react";
import CalendarLayout from "./CalendarLayout";
import CalendarPanel from "./CalendarPanel";
import CalendarSidebar from "./CalendarSidebar";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <CalendarLayout
      sidebar={
        <CalendarSidebar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
      }
      panel={
        <CalendarPanel selectedDate={selectedDate} currentDate={currentDate} />
      }
    />
  );
};

export default Calendar;
