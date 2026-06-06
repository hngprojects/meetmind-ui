"use client";

import { useState } from "react";
import CalendarLayout from "./CalendarLayout";
import CalendarPanel from "./CalendarPanel";
import CalendarSidebar from "./CalendarSidebar";
import type { Appointment, TimeOption } from "@/lib/appointmentTypes";
import AppointmentDetails from "./AppointmentDetails";
import SuccessModal from "./SuccessModal";
import { useCancelAppointment } from "@/lib/hooks/useCalendar";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [cancelError, setCancelError] = useState("");

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const [selectedStartTime, setSelectedStartTime] = useState<TimeOption | null>(
    null,
  );

  const [selectedEndTime, setSelectedEndTime] = useState<TimeOption | null>(
    null,
  );

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const cancelMutation = useCancelAppointment();

  const handleCancelAppointment = () => {
    if (!selectedAppointment) {
      return;
    }

    cancelMutation.mutate(selectedAppointment.id, {
      onSuccess: () => {
        setCancelError("");

        setSelectedAppointment(null);

        setSelectedStartTime(null);

        setSelectedEndTime(null);
      },

      onError: (error: Error) => {
        setCancelError(
          error.message || "Failed to cancel interview. Please try again.",
        );
      },
    });
  };

  return (
    <>
      {cancelError && <p className="mb-4 text-sm text-error">{cancelError}</p>}
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
              onCancel={handleCancelAppointment}
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
          selectedStartTime={selectedStartTime}
          selectedEndTime={selectedEndTime}
          onClose={() => setIsSuccessModalOpen(false)}
        />
      )}
    </>
  );
};

export default Calendar;
