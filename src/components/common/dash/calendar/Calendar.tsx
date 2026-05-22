import CalendarLayout from "./CalendarLayout";
import CalendarPanel from "./CalendarPanel";
import CalendarSidebar from "./CalendarSidebar";

const Calendar = () => {
  return (
    <CalendarLayout sidebar={<CalendarSidebar />} panel={<CalendarPanel />} />
  );
};

export default Calendar;
