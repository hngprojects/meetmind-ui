import AvailabilityForm from "./AvailabilityForm";
import CalendarCard from "./CalendarCard";

type CalendarSidebarProps = {
  selectedDate: number;
  setSelectedDate: React.Dispatch<React.SetStateAction<number>>;
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
};

const CalendarSidebar = ({
  selectedDate,
  setSelectedDate,
  currentDate,
  setCurrentDate,
}: CalendarSidebarProps) => {
  return (
    <aside className="space-y-4">
      <CalendarCard
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />

      <AvailabilityForm />
    </aside>
  );
};

export default CalendarSidebar;
