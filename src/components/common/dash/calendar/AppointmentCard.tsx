import { FiChevronRight } from "react-icons/fi";

type AppointmentCardProps = {
  candidate: string;
  email: string;
  role: string;
  time: string;
  onClick: () => void;
};

const AppointmentCard = ({
  candidate,
  email,
  role,
  time,
  onClick,
}: AppointmentCardProps) => {
  // Generate user's initials
  const initials = candidate
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <button
      type="button"
      onClick={onClick}
      className=" flex items-start justify-between rounded-2xl border 
                border-calendar-border bg-background px-6 py-5 transition-colors 
                text-full w-full hover:bg-bg-secondary cursor-pointer"
    >
      {/* Left Content */}
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full
            bg-calendar-avatar text-sm font-semibold text-text-white-primary"
        >
          {initials}
        </div>

        {/* Text Content */}
        <div>
          <h3 className="text-[20px] font-bold leading-[28px] text-calendar-primary">
            {role}
          </h3>

          <p className="mt-1 text-base font-medium text-calendar-secondary">
            {email}
          </p>

          <p className=" mt-3 text-sm text-calendar-secondary">{time}</p>
        </div>
      </div>

      {/* Right Arrow */}
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full
          transition-colors"
      >
        <FiChevronRight className="text-lg text-calendar-secondary" />
      </div>
    </button>
  );
};

export default AppointmentCard;
