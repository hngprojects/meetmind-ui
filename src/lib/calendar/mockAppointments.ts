import type { Appointment } from "@/lib/appointmentTypes";

type AppointmentGroup = {
  id: number;
  date: string;
  dateISO: string;
  appointments: Appointment[];
};

export const appointmentGroups: AppointmentGroup[] = [
  {
    id: 1,
    date: "Friday, June 13, 2025",
    dateISO: "2025-06-13",

    appointments: [
      {
        id: 1,
        candidate: "Precious Joe",
        email: "preciousjoe@gmail.com",
        role: "Frontend Developer",
        startTime: {
          hour: "10",
          minute: "00",
          period: "AM",
        },

        endTime: {
          hour: "10",
          minute: "30",
          period: "AM",
        },
        date: "Friday, June 13, 2025",
      },

      {
        id: 2,
        candidate: "Sarah Wilson",
        email: "sarahwilson@gmail.com",
        role: "UI Designer",

        startTime: {
          hour: "11",
          minute: "00",
          period: "AM",
        },

        endTime: {
          hour: "11",
          minute: "30",
          period: "AM",
        },

        date: "Friday, June 13, 2025",
      },
    ],
  },

  {
    id: 2,
    date: "Wednesday, June 25, 2025",
    dateISO: "2025-06-25",

    appointments: [
      {
        id: 3,
        candidate: "Michael Brown",
        email: "michaelbrown@gmail.com",
        role: "Backend Engineer",

        startTime: {
          hour: "10",
          minute: "30",
          period: "AM",
        },

        endTime: {
          hour: "11",
          minute: "15",
          period: "AM",
        },

        date: "Wednesday, June 25, 2025",
      },

      {
        id: 4,
        candidate: "Emily Davis",
        email: "emilydavis@gmail.com",
        role: "Product Designer",

        startTime: {
          hour: "11",
          minute: "00",
          period: "AM",
        },

        endTime: {
          hour: "12",
          minute: "00",
          period: "PM",
        },

        date: "Wednesday, June 25, 2025",
      },
    ],
  },
];
