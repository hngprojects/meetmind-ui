export type Appointment = {
  id: number;
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
  period: string;
};
