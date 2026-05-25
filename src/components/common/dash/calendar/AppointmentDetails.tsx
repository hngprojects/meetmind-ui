import type { Appointment } from "@/lib/appointmentTypes";
import { FiCalendar, FiClock } from "react-icons/fi";

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
      rounded-2xl border border-calendar-border
      bg-white p-6
    "
    >
      {/* Top Profile Section */}
      <div className="flex flex-col items-center">
        {/* Avatar */}
        <div
          className="
          flex h-20 w-20 items-center justify-center
          rounded-full bg-calendar-avatar
          text-2xl font-semibold text-white
        "
        >
          {initials}
        </div>

        {/* Role */}
        <h2
          className="
          mt-4 text-center text-[20px]
          font-bold text-calendar-primary
        "
        >
          {appointment.role}
        </h2>

        {/* Email */}
        <p
          className="
          mt-2 text-center text-sm
          text-calendar-secondary
        "
        >
          {appointment.email}
        </p>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-calendar-border" />

      {/* Details */}
      <div className="space-y-4">
        {/* Date Row */}
        <div className="flex items-center gap-3">
          <div
            className="
            flex h-10 w-10 items-center justify-center
            rounded-full bg-soft-white
          "
          >
            <FiCalendar className="text-calendar-secondary" />
          </div>

          <p className="text-sm text-calendar-primary">{appointment.date}</p>
        </div>

        {/* Time Row */}
        <div className="flex items-center gap-3">
          <div
            className="
            flex h-10 w-10 items-center justify-center
            rounded-full bg-soft-white
          "
          >
            <FiClock className="text-calendar-secondary" />
          </div>

          <p className="text-sm text-calendar-primary">{appointment.time}</p>
        </div>
      </div>

      {/* Button */}
      <button
        type="button"
        className="
        mt-8 flex h-12 w-full items-center
        justify-center rounded-xl
        bg-text-primary text-sm
        font-medium text-white
        transition-opacity hover:opacity-90
      "
      >
        Schedule Interview
      </button>
    </section>
  );
};

export default AppointmentDetails;
