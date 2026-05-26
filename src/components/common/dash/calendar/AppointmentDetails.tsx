import type { Appointment } from "@/lib/appointmentTypes";
import { FiCalendar, FiX } from "react-icons/fi";

type AppointmentDetailsProps = {
  appointment: Appointment;
};

const AppointmentDetails = ({ appointment }: AppointmentDetailsProps) => {
  const initials = appointment.candidate
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <section
      className="
      rounded-[24px] bg-[#FAFAFA]
      p-5
    "
    >
      {/* Inner Profile Card */}
      <div
        className="
        rounded-[20px] border border-calendar-border
        bg-white px-6 py-8
      "
      >
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div
            className="
            flex h-20 w-20 items-center justify-center
            rounded-full bg-calendar-avatar
            text-[40px] font-semibold text-white
          "
          >
            {initials}
          </div>

          {/* Role */}
          <h2
            className="
            mt-6 text-center text-[20px]
            font-bold text-calendar-primary
          "
          >
            {appointment.role}
          </h2>

          {/* Email */}
          <p
            className="
            mt-2 text-center text-base
            font-medium text-calendar-secondary
          "
          >
            {appointment.email}
          </p>

          {/* Time */}
          <p
            className="
            mt-3 text-center text-sm
            text-calendar-secondary
          "
          >
            {appointment.startTime.hour}:{appointment.startTime.minute}
            {appointment.startTime.period}
            {" - "}
            {appointment.endTime.hour}:{appointment.endTime.minute}
            {appointment.endTime.period}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex items-center gap-3">
        {/* Reschedule */}
        <button
          type="button"
          className="
          flex h-12 flex-1 items-center justify-center
          gap-2 rounded-xl border
          border-[#035A69]
          bg-white text-sm font-medium
          text-[#035A69]
          transition-colors hover:bg-soft-white
        "
        >
          <FiCalendar className="text-lg" />
          Reschedule
        </button>

        {/* Cancel */}
        <button
          type="button"
          className="
          flex h-12 flex-1 items-center justify-center
          gap-2 rounded-xl border
          border-[#DC2626]
          bg-white text-sm font-medium
          text-[#DC2626]
          transition-colors hover:bg-red-50
        "
        >
          <FiX className="text-lg" />
          Cancel
        </button>
      </div>
    </section>
  );
};

export default AppointmentDetails;
