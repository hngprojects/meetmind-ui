"use client";

import { useState } from "react";
import CalendarLayout from "./CalendarLayout";
import CalendarPanel from "./CalendarPanel";
import CalendarSidebar from "./CalendarSidebar";
import type { Appointment } from "@/lib/appointmentTypes";
import AppointmentDetails from "./AppointmentDetails";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [currentDate, setCurrentDate] = useState(new Date());

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

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
        <CalendarPanel
          selectedDate={selectedDate}
          currentDate={currentDate}
          selectedAppointment={selectedAppointment}
          setSelectedAppointment={setSelectedAppointment}
        />
      }
      detailsPanel={
        selectedAppointment ? (
          <AppointmentDetails appointment={selectedAppointment} />
        ) : null
      }
    />
  );
};

export default Calendar;
