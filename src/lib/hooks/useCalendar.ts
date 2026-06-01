import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCalendarUsers,
  getCalendarAppointments,
  getCalendarAvailability,
  rescheduleAppointment,
  RescheduleAppointmentPayload,
  cancelAppointment,
} from "@/lib/services/calendar.service";

export function useCalendarUsers() {
  return useQuery({
    queryKey: ["calendar-users"],
    queryFn: getCalendarUsers,
  });
}

export function useCalendarAppointments(filter: "today" | "all_upcoming") {
  return useQuery({
    queryKey: ["calendar-appointments", filter],
    queryFn: () => getCalendarAppointments(filter),
  });
}

export function useCalendarAvailability(date: string, interviewerId?: string) {
  return useQuery({
    queryKey: ["calendar-availability", date, interviewerId],
    queryFn: () => getCalendarAvailability(date, interviewerId),
    enabled: !!date, // waits until a valid date exists before fetching
  });
}

export function useRescheduleAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      interviewId,
      payload,
    }: {
      interviewId: string;
      payload: RescheduleAppointmentPayload;
    }) => rescheduleAppointment(interviewId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["calendar-appointments"],
      });
      queryClient.invalidateQueries({
        queryKey: ["calendar-availability"],
      });
    },
  });
}

export function useCancelAppointment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (interviewId: string) => cancelAppointment(interviewId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["calendar-appointments"],
      });
      queryClient.invalidateQueries({
        queryKey: ["calendar-availability"],
      });
    },
  });
}
