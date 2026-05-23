export const stats = [
  { value: "12,847", label: "Interviews analyzed" },
  { value: "94%", label: "Avg. scorecard and coverage" },
  { value: "6.2 hrs", label: "Saved per hire" },
] as const;

export const beliefs = [
  "AI should support people, not replace them",
  "Meetings should generate usable outputs automatically",
  "Developers need programmable collaboration infrastructure",
  "Voice interfaces will become core product surfaces",
] as const;

export const teamMembers = [
  {
    name: "Avi the PO",
    role: "HEAD OF PRODUCT OWNER",
    bio: "Building infrastructure for AI-native collaboration systems.",
    image: "/images/about-us/avi.jpg",
  },
  {
    name: "Peace Egbule",
    role: "HEAD OF AI Project Management",
    bio: "Leading platform architecture and real-time AI systems.",
    image: "/images/about-us/peace.jpg",
  },
  {
    name: "Omodasola Omoo",
    role: "LEAD PRODUCT DESIGNER",
    bio: "Crafting intuitive experiences for AI-powered conversations.",
    image: "/images/about-us/omo.jpg",
  },
  {
    name: "Sarah Kim",
    role: "DEVELOPER LEAD",
    bio: "Driving technical vision and scalable collaboration products.",
    image: "/images/about-us/sarah.jpg",
  },
] as const;

export type TimelineEvent = {
  year: string;
  description: string;
  highlight?: string;
};

export const timelineEvents: TimelineEvent[] = [
  {
    year: "2026",
    description: "Started building real-time AI participation infrastructure",
  },
  {
    year: "2026",
    description: "Open MeetMind early access program and community platform",
  },
  {
    year: "2026",
    description: "Launching of our Product",
    highlight: "Coming Soon",
  },
];
