"use client";

import { useState } from "react";
import AppointmentCard from "./AppointmentCard";
import EmptyState from "./EmptyState";
import type { Appointment, TimeOption } from "@/lib/appointmentTypes";
import { useCalendarAppointments } from "@/lib/hooks/useCalendar";

type CalendarPanelProps = {
  selectedDate: number;
  currentDate: Date;
  selectedAppointment: Appointment | null;
  setSelectedAppointment: React.Dispatch<
    React.SetStateAction<Appointment | null>
  >;
  setSelectedStartTime: React.Dispatch<React.SetStateAction<TimeOption | null>>;
  setSelectedEndTime: React.Dispatch<React.SetStateAction<TimeOption | null>>;
};

const CalendarPanel = ({
  selectedDate,
  currentDate,
  selectedAppointment,
  setSelectedAppointment,
  setSelectedStartTime,
  setSelectedEndTime,
}: CalendarPanelProps) => {
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });

  const currentYear = currentDate.getFullYear();
  const [selectedView, setSelectedView] = useState("today");

  const { data: todayAppointments = [] } = useCalendarAppointments("today");

  const { data: upcomingAppointments = [] } =
    useCalendarAppointments("all_upcoming");

  const handleSelect = (appointment: Appointment) => {
    const isSameAppointment = selectedAppointment?.id === appointment.id;

    if (isSameAppointment) {
      setSelectedAppointment(null);

      setSelectedStartTime(null);

      setSelectedEndTime(null);

      return;
    }

    setSelectedAppointment(appointment);

    setSelectedStartTime(appointment.startTime);

    setSelectedEndTime(appointment.endTime);
  };

  return (
    <section>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[16px] font-semibold text-calendar-primary">
            Appointments for {currentMonth} {selectedDate}, {currentYear} <br />
            {selectedView === "today"
              ? "Today's Appointments"
              : "Upcoming Appointments"}
          </h2>

          <p className="mt-1 text-sm text-calendar-secondary">
            Select the dates
          </p>
        </div>

        <select
          aria-label="Filter appointments"
          value={selectedView}
          onChange={(event) => setSelectedView(event.target.value)}
          className="rounded-lg border border-calendar-border bg-white px-2 py-2
            text-xs text-calendar-primary outline-none"
        >
          <option value="today">Today</option>

          <option value="upcoming">All Upcoming</option>
        </select>
      </div>

      <div className="mt-1 border-t border-calendar-border" />

      {selectedView === "today" ? (
        todayAppointments.length > 0 ? (
          <div className="mt-6 space-y-8">
            {todayAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                candidate={appointment.candidate}
                email={appointment.email}
                role={appointment.role}
                startTime={appointment.startTime}
                endTime={appointment.endTime}
                onClick={() => handleSelect(appointment)}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )
      ) : upcomingAppointments.length > 0 ? (
        <div className="mt-6 space-y-8">
          {upcomingAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              candidate={appointment.candidate}
              email={appointment.email}
              role={appointment.role}
              startTime={appointment.startTime}
              endTime={appointment.endTime}
              onClick={() => handleSelect(appointment)}
            />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </section>
  );
};

export default CalendarPanel;
