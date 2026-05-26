"use client";

import { useState } from "react";
import AppointmentCard from "./AppointmentCard";
import EmptyState from "./EmptyState";
import type { Appointment, TimeOption } from "@/lib/appointmentTypes";
import { appointmentGroups } from "@/lib/calendar/mockAppointments";

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

  const selectedDateKey = new Date(
    currentYear,
    currentDate.getMonth(),
    selectedDate,
  )
    .toISOString()
    .slice(0, 10);

  const todayAppointments = appointmentGroups.filter(
    (group) => group.dateISO === selectedDateKey,
  );

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
            {todayAppointments.map((group) => (
              <section key={group.id}>
                {/* Date Heading */}
                <h3 className="mb-4 text-sm font-medium text-calendar-secondary">
                  {group.date}
                </h3>

                {/* Appointment Cards */}
                <div className="space-y-4">
                  {group.appointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      candidate={appointment.candidate}
                      email={appointment.email}
                      role={appointment.role}
                      startTime={appointment.startTime}
                      endTime={appointment.endTime}
                      onClick={() => {
                        const isSameAppointment =
                          selectedAppointment?.id === appointment.id;

                        if (isSameAppointment) {
                          setSelectedAppointment(null);

                          setSelectedStartTime(null);
                          setSelectedEndTime(null);

                          return;
                        }

                        setSelectedAppointment(appointment);

                        setSelectedStartTime(appointment.startTime);

                        setSelectedEndTime(appointment.endTime);
                      }}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <EmptyState />
        )
      ) : (
        <div className="mt-6 space-y-8">
          {appointmentGroups.map((group) => (
            <section key={group.id}>
              {/* Date Heading */}
              <h3 className="mb-4 text-sm font-medium text-calendar-secondary">
                {group.date}
              </h3>

              {/* Appointment Cards */}
              <div className="space-y-4">
                {group.appointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    candidate={appointment.candidate}
                    email={appointment.email}
                    role={appointment.role}
                    startTime={appointment.startTime}
                    endTime={appointment.endTime}
                    onClick={() => {
                      const isSameAppointment =
                        selectedAppointment?.id === appointment.id;

                      if (isSameAppointment) {
                        setSelectedAppointment(null);

                        setSelectedStartTime(null);
                        setSelectedEndTime(null);

                        return;
                      }

                      setSelectedAppointment(appointment);

                      setSelectedStartTime(appointment.startTime);

                      setSelectedEndTime(appointment.endTime);
                    }}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </section>
  );
};

export default CalendarPanel;
