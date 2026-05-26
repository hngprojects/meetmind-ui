import type { Appointment } from "@/lib/appointmentTypes";

type SuccessModalProps = {
  appointment: Appointment | null;
  onClose: () => void;
};

const SuccessModal = ({ appointment, onClose }: SuccessModalProps) => {
  if (!appointment) return null;

  const initials = appointment.candidate
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const dateObject = new Date(appointment.date);

  const formattedDate = isNaN(dateObject.getTime())
    ? "Invalid date"
    : dateObject.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
        bg-black/20 backdrop-blur-sm px-4"
    >
      <section
        className="w-full max-w-[580px] rounded-[32px] max-h-[356px]
          bg-white p-6 md:p-8
        "
      >
        {/* Title */}
        <div className="text-center">
          <h2 className="text-[20px] font-bold text-calendar-primary">
            Schedule Created Successfully!
          </h2>

          <p className="mt-1 max-w-[531px] text-base leading-7 text-calendar-secondary px-4 md:px-6">
            Success! Candidate and interviewer have been notified. View details
            in your dashboard.
          </p>
        </div>

        {/* Appointment Card */}
        <div
          className="mt-8 flex items-center justify-between rounded-2xl bg-bg-secondary
                px-5 py-5"
        >
          <div className="flex items-center gap-4 max-w-[531px]">
            {/* Avatar */}
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full bg-calendar-avatar
                text-sm font-semibold text-white"
            >
              {initials}
            </div>

            {/* Details */}
            <div>
              <h3 className="text-[20px] font-bold text-calendar-primary">
                {appointment.role}
              </h3>

              <p className="mt-1 text-base text-calendar-secondary">
                {appointment.email}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-calendar-secondary">{formattedDate}</p>

            <p className="mt-1 text-base text-calendar-secondary">
              {appointment.startTime.hour}:{appointment.startTime.minute}{" "}
              {appointment.startTime.period}
              {" - "}
              {appointment.endTime.hour}:{appointment.endTime.minute}{" "}
              {appointment.endTime.period}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className=" mt-8 flex h-14 w-full items-center justify-center
            rounded-2xl bg-text-primary text-lg font-semibold text-white
            transition-opacity hover:opacity-90 cursor-pointer"
        >
          Close
        </button>
      </section>
    </div>
  );
};

export default SuccessModal;
