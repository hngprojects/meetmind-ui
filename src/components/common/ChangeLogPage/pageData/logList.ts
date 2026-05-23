// data/logList.ts

export type LogCategory = "All" | "Features" | "Improvements" | "Fixes";

export interface LogItem {
  id: string;
  date: string;
  version: string;
  category: Exclude<LogCategory, "All">;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const logList: LogItem[] = [
  {
    id: "1",
    date: "May 24, 2026",
    version: "v1.2.0",
    category: "Features",
    title: "Introducing the MeetMind API",
    description:
      "MeetMind is now available as a programmable API. Developers can inject context, control agent behavior, and retrieve structured output programmatically.",
    image: "/images/robot-desktop.png",
    imageAlt: "MeetMind API Robot representation",
  },
  {
    id: "2",
    date: "June 15, 2026",
    version: "v1.2.1",
    category: "Improvements",
    title: "Enhanced Natural Language Processing",
    description:
      "MeetMind's NLP capabilities have been upgraded, allowing for more accurate context understanding and response generation.",
    image: "/images/green-codes.png",
    imageAlt: "Matrix code theme",
  },
  {
    id: "3",
    date: "July 30, 2026",
    version: "v1.3.0",
    category: "Features",
    title: "Introducing Multi-Language Support",
    description:
      "MeetMind now supports multiple languages, enabling broader accessibility and usability across global markets.",
    image: "/images/multi-lang.png",
    imageAlt: "Scattered language blocks",
  },
  {
    id: "4",
    date: "August 20, 2026",
    version: "v1.3.1",
    category: "Fixes",
    title: "Resolved API Rate Limiting Issues",
    description:
      "Addressed issues causing unexpected rate limiting for API users, ensuring smoother access and improved user experience.",
    image: "/images/rate-limit-img.png",
    imageAlt: "Code interface background",
  },
];
