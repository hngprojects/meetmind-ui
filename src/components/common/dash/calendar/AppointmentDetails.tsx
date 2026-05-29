import type { Appointment, TimeOption } from "@/lib/appointmentTypes";
import { getCandidateInitials } from "@/lib/calendar/appointmentUtils";
import { FiCalendar, FiX } from "react-icons/fi";

type AppointmentDetailsProps = {
  appointment: Appointment;
  selectedStartTime: TimeOption | null;
  selectedEndTime: TimeOption | null;
  onCancel: () => void;
  onReschedule: () => void;
};

const AppointmentDetails = ({
  appointment,
  selectedStartTime,
  selectedEndTime,
  onCancel,
  onReschedule,
}: AppointmentDetailsProps) => {
  const initials = getCandidateInitials(appointment.candidate);

  const displayStartTime = selectedStartTime
    ? `${selectedStartTime.hour}:${selectedStartTime.minute} ${selectedStartTime.period}`
    : `${appointment.startTime.hour}:${appointment.startTime.minute} ${appointment.startTime.period}`;

  const displayEndTime = selectedEndTime
    ? `${selectedEndTime.hour}:${selectedEndTime.minute} ${selectedEndTime.period}`
    : `${appointment.endTime.hour}:${appointment.endTime.minute} ${appointment.endTime.period}`;

  return (
    <section className="rounded-[32px] bg-calendar-appointment p-6">
      {/* Inner Profile Card */}
      <div
        className="rounded-[20px] border border-calendar-border
          bg-white px-6 py-8"
      >
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full 
              bg-calendar-avatar text-[40px] font-semibold text-text-white-primary"
          >
            {initials}
          </div>

          {/* Role */}
          <h2 className="mt-6 text-center text-[20px] font-bold text-text-color-primary">
            {appointment.role}
          </h2>

          {/* Email */}
          <p className="mt-2 text-center text-base font-medium text-text-subtext">
            {appointment.email}
          </p>

          {/* Time */}
          <p className="mt-3 text-center text-sm text-text-subtext">
            {displayStartTime} - {displayEndTime}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex items-center gap-3">
        {/* Reschedule */}
        <button
          type="button"
          onClick={onReschedule}
          className="flex px-2 py-2.5 h-12 flex-1 items-center justify-center gap-2 rounded-lg border
            border-accent-teal bg-white text-base font-medium text-text-primary
            transition-colors hover:bg-soft-white cursor-pointer"
        >
          <FiCalendar className="text-lg" />
          Reschedule
        </button>

        {/* Cancel */}
        <button
          type="button"
          onClick={onCancel}
          className="flex px-2 py-2.5 h-12 flex-1 items-center justify-center gap-2 rounded-lg border
            border-alert bg-white text-base font-medium text-alert transition-colors 
            hover:bg-red-50 cursor-pointer"
        >
          <FiX className="text-lg" />
          Cancel
        </button>
      </div>
    </section>
  );
};

export default AppointmentDetails;
