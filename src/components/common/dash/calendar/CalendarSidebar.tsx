import AvailabilityForm from "./AvailabilityForm";
import CalendarCard from "./CalendarCard";

const CalendarSidebar = () => {
  return (
    <aside className="space-y-4">
      <CalendarCard />

      <AvailabilityForm />
    </aside>
  );
};

export default CalendarSidebar;
