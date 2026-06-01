export type AppointmentStatus =
  | "scheduled"
  | "cancelled"
  | "completed"
  | "rescheduled";

export type CalendarAppointment = {
  id: string;
  role_title: string;
  status: AppointmentStatus;
  scheduled_start: string;
  scheduled_end: string;
  candidate_name: string;
  candidate_email: string;
  interviewer_name: string;
  interviewer_email: string;
};

export type CalendarAppointmentsResponse = {
  success: boolean;
  message: string;
  data: {
    filter: string;
    appointments: CalendarAppointment[];
    message: string | null;
  };
};
