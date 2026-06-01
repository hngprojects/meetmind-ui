import api from "@/lib/api";
import { CalendarAppointmentsResponse } from "@/lib/types/calendar";

export type CalendarUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar_initials: string;
  avatar_color: string;
};

export type CalendarUsersResponse = {
  success: boolean;
  message: string;
  data: CalendarUser[];
};

export type AvailabilitySlot = {
  start_time: string;
  end_time: string;
  period_start: string;
  period_end: string;
};

export type CalendarAvailabilityResponse = {
  success: boolean;
  message: string;
  data: AvailabilitySlot[];
};

export type RescheduleAppointmentPayload = {
  scheduled_start: string;
  scheduled_end: string;
};

export type RescheduledAppointment = {
  id: string;
  role_title: string;
  status: string;
  scheduled_start: string;
  scheduled_end: string;
  time_display: string;
  candidate_name: string;
  candidate_email: string;
  interviewer_name: string;
  interviewer_email: string;
};

export type RescheduleAppointmentResponse = {
  success: boolean;
  message: string;
  data: RescheduledAppointment;
};

export type CancelAppointmentResponse = {
  success: boolean;
  message: string;
};

export async function getCalendarUsers() {
  const response = await api.get<CalendarUsersResponse>(
    "/api/v1/calendar/users",
  );

  return response.data;
}

export const getCalendarAppointments = async (
  filter: "today" | "all_upcoming",
) => {
  const response = await api.get<CalendarAppointmentsResponse>(
    "/api/v1/calendar/appointments",
    {
      params: {
        filter,
      },
    },
  );

  return response.data.data.appointments;
};

export async function getCalendarAvailability(
  date: string,
  interviewerId?: string,
) {
  const response = await api.get<CalendarAvailabilityResponse>(
    "/api/v1/calendar/availability",
    {
      params: {
        date,
        interviewer_id: interviewerId,
      },
    },
  );

  return response.data;
}

export async function rescheduleAppointment(
  interviewId: string,
  payload: RescheduleAppointmentPayload,
) {
  const response = await api.patch<RescheduleAppointmentResponse>(
    `/api/v1/calendar/appointments/${interviewId}/reschedule`,
    payload,
  );

  return response.data;
}

export async function cancelAppointment(interviewId: string) {
  const response = await api.delete<CancelAppointmentResponse>(
    `/api/v1/calendar/appointments/${interviewId}`,
  );

  return response.data;
}
