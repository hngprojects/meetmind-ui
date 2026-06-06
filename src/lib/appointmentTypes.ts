export type Appointment = {
  id: string;
  candidate: string;
  email: string;
  role: string;
  startTime: TimeOption;
  endTime: TimeOption;
  date: string;
};

export type TimeOption = {
  hour: string;
  minute: string;
  period: "AM" | "PM";
};
