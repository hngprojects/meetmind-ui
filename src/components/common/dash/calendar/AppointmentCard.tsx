import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

type AppointmentCardProps = {
  candidate: string;
  email: string;
  role: string;
  time: string;
};

const AppointmentCard = ({
  candidate,
  email,
  role,
  time,
}: AppointmentCardProps) => {
  // Generate user's initials
  const initials = candidate
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <article
      className=" flex items-start justify-between rounded-2xl border 
                border-calendar-border bg-bg-secondary px-6 py-5 transition-colors 
                hover:bg-text-primary-foreground"
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
      <Link
        href="/coming-soon"
        className="flex h-10 w-10 items-center justify-center rounded-full
          transition-colors hover:bg-soft-white cursor-pointer"
      >
        <FiChevronRight className="text-lg text-calendar-secondary" />
      </Link>
    </article>
  );
};

export default AppointmentCard;
