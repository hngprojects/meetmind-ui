import { TimeOption } from "../appointmentTypes";

export const availableStartTimes: TimeOption[] = [
  {
    hour: "10",
    minute: "00",
    period: "AM",
  },

  {
    hour: "11",
    minute: "00",
    period: "AM",
  },

  {
    hour: "10",
    minute: "30",
    period: "AM",
  },

  {
    hour: "11",
    minute: "00",
    period: "PM",
  },
];

export const availableEndTimes: TimeOption[] = [
  {
    hour: "10",
    minute: "30",
    period: "AM",
  },

  {
    hour: "11",
    minute: "30",
    period: "AM",
  },

  {
    hour: "11",
    minute: "15",
    period: "AM",
  },

  {
    hour: "12",
    minute: "00",
    period: "PM",
  },
];
