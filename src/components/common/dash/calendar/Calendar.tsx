"use client";

import { useState } from "react";
import CalendarLayout from "./CalendarLayout";
import CalendarPanel from "./CalendarPanel";
import CalendarSidebar from "./CalendarSidebar";
import type { Appointment, TimeOption } from "@/lib/appointmentTypes";
import AppointmentDetails from "./AppointmentDetails";
import SuccessModal from "./SuccessModal";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [currentDate, setCurrentDate] = useState(new Date());

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const [selectedStartTime, setSelectedStartTime] = useState<TimeOption | null>(
    null,
  );

  const [selectedEndTime, setSelectedEndTime] = useState<TimeOption | null>(
    null,
  );

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  return (
    <>
      <CalendarLayout
        sidebar={
          <CalendarSidebar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            selectedAppointment={selectedAppointment}
            selectedStartTime={selectedStartTime}
            setSelectedStartTime={setSelectedStartTime}
            selectedEndTime={selectedEndTime}
            setSelectedEndTime={setSelectedEndTime}
            setIsSuccessModalOpen={setIsSuccessModalOpen}
          />
        }
        panel={
          <CalendarPanel
            selectedDate={selectedDate}
            currentDate={currentDate}
            selectedAppointment={selectedAppointment}
            setSelectedAppointment={setSelectedAppointment}
            setSelectedStartTime={setSelectedStartTime}
            setSelectedEndTime={setSelectedEndTime}
          />
        }
        detailsPanel={
          selectedAppointment ? (
            <AppointmentDetails
              appointment={selectedAppointment}
              selectedStartTime={selectedStartTime}
              selectedEndTime={selectedEndTime}
              onCancel={() => {
                setSelectedAppointment(null);

                setSelectedStartTime(null);

                setSelectedEndTime(null);
              }}
              onReschedule={() => {
                setSelectedStartTime(null);

                setSelectedEndTime(null);
              }}
            />
          ) : null
        }
      />

      {isSuccessModalOpen && (
        <SuccessModal
          appointment={selectedAppointment}
          onClose={() => setIsSuccessModalOpen(false)}
        />
      )}
    </>
  );
};

export default Calendar;
