import type { TimeOption } from "../appointmentTypes";

export function formatTime(time: TimeOption): string {
  return `${time.hour}:${time.minute} ${time.period}`;
}

export function formatTimeRange(
  startTime: TimeOption,
  endTime: TimeOption,
): string {
  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
}
