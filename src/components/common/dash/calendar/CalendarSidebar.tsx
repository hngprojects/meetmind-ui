import AvailabilityForm from "./AvailabilityForm";
import CalendarCard from "./CalendarCard";
import type { Appointment, TimeOption } from "@/lib/appointmentTypes";

type CalendarSidebarProps = {
  selectedDate: number;
  setSelectedDate: React.Dispatch<React.SetStateAction<number>>;
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  selectedAppointment: Appointment | null;
  selectedStartTime: TimeOption | null;
  setSelectedStartTime: React.Dispatch<React.SetStateAction<TimeOption | null>>;
  selectedEndTime: TimeOption | null;
  setSelectedEndTime: React.Dispatch<React.SetStateAction<TimeOption | null>>;
  setIsSuccessModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CalendarSidebar = ({
  selectedDate,
  setSelectedDate,
  currentDate,
  setCurrentDate,
  selectedAppointment,
  selectedStartTime,
  setSelectedStartTime,
  selectedEndTime,
  setSelectedEndTime,
  setIsSuccessModalOpen,
}: CalendarSidebarProps) => {
  return (
    <aside className="space-y-0">
      <CalendarCard
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />

      <AvailabilityForm
        selectedAppointment={selectedAppointment}
        selectedStartTime={selectedStartTime}
        setSelectedStartTime={setSelectedStartTime}
        selectedEndTime={selectedEndTime}
        setSelectedEndTime={setSelectedEndTime}
        setIsSuccessModalOpen={setIsSuccessModalOpen}
      />
    </aside>
  );
};

export default CalendarSidebar;
