import type {
  ChatMessage,
  InterviewDetail,
  InterviewListItem,
  InterviewSession,
  InterviewSessionStatus,
  ScorecardCategory,
  TranscriptMessage,
} from "@/types/interview";

export const MOCK_INTERVIEW_LIST: InterviewListItem[] = [
  {
    id: "1",
    initials: "TB",
    roleTitle: "Product Designer",
    candidateName: "Temi Balogun",
    scheduledLabel: "Now 2:30PM - 3:30PM",
    listStatus: "live",
  },
  {
    id: "2",
    initials: "FU",
    roleTitle: "Video Editor",
    candidateName: "Frank Udoho",
    scheduledLabel: "Now 2:30PM - 3:30PM",
    listStatus: "upcoming",
  },
  {
    id: "3",
    initials: "TL",
    roleTitle: "Data Analyst",
    candidateName: "Theoleonard@gmail.com",
    scheduledLabel: "Tomorrow 10:00AM - 10:30AM",
    listStatus: "none",
  },
  {
    id: "4",
    initials: "PJ",
    roleTitle: "Product Designer",
    candidateName: "preciousjoe@gmail.com",
    scheduledLabel: "Tomorrow 10:00AM - 10:30AM",
    listStatus: "none",
  },
  {
    id: "5",
    initials: "RD",
    roleTitle: "Virtual Assistant",
    candidateName: "Reekadobanks@gmail.com",
    scheduledLabel: "Tomorrow 10:00AM - 10:30AM",
    listStatus: "none",
  },
];

export const MOCK_INTERVIEW_DETAIL: InterviewDetail = {
  id: "1",
  roleTitle: "Product Designer",
  candidateName: "Temi Balogun",
  candidateEmail: "Temibalogun@gmail.com",
  phone: "+234 803 123 4567",
  initials: "TB",
  date: "May 2, 2025",
  time: "11:00 AM WAT",
  duration: "1hr",
  platform: "zoom",
  questionProgress: "9/10",
  aiTone: "Friendly",
  participationMode: "standard",
  status: "in_progress",
  listStatus: "live",
  rating: null,
  customQuestion:
    "Validate product judgement, visual hierarchy, and how Temitope handles tradeoffs with engineering.",
  keySkills: ["Communication", "technical depth", "Collaboration", "ownership"],
  jobDescription:
    "Design intuitive product experiences across web and mobile, working closely with engineering and product teams.",
  scoringRubric:
    "Evaluate on systems thinking, communication clarity, portfolio outcomes, and cross-functional collaboration.",
  scheduledStart: "2025-05-02T11:00:00.000Z",
  scheduledEnd: "2025-05-02T12:00:00.000Z",
  callLink: null,
  observation:
    "Temitope demonstrated strong systems thinking and proactively asked about engineering constraints before proposing solutions. Portfolio presentation was outcome-focused.",
  highlights: [
    "I like to design systems, not just screens - everything needs to connect",
    "Proactively asked about engineering constraints before jumping to solutions",
    "Strong portfolio framing - led with outcomes, not just deliverables",
  ],
  redFlags: [
    "Limited experience working with large cross-functional teams (10+ people)",
    "Vague on metrics and success measurements frameworks",
  ],
  elapsed: "00:05:47",
  participants: 2,
};

const createMockSession = (
  session_status: InterviewSessionStatus,
  overrides: Partial<InterviewSession> = {},
): InterviewSession => ({
  interview_id: "1",
  session_status,
  meeting_status: "Live",
  agent_status_display: {
    connecting: "Connecting...",
    listening: "Listening",
    thinking: "Thinking...",
    speaking: "Speaking",
    connection_lost: "Connection lost",
    reconnecting: "Reconnecting...",
    processing: "Processing",
  }[session_status],
  elapsed_display: "00:05:47",
  participants_count: 2,
  platform: "Zoom",
  partial_data_saved: false,
  ...overrides,
});

export const MOCK_INTERVIEW_SESSION_STATES: Record<
  InterviewSessionStatus,
  InterviewSession
> = {
  connecting: createMockSession("connecting", {
    elapsed_display: "00:00:00",
  }),
  listening: createMockSession("listening"),
  thinking: createMockSession("thinking"),
  speaking: createMockSession("speaking"),
  connection_lost: createMockSession("connection_lost", {
    dropped_at_display: "00:31:14",
    partial_data_saved: true,
    message: "The agent was dropped from the meeting at 00:31:14.",
  }),
  reconnecting: createMockSession("reconnecting"),
  processing: createMockSession("processing"),
};

export const MOCK_INTERVIEW_SESSION = MOCK_INTERVIEW_SESSION_STATES.listening;

export const MOCK_TRANSCRIPT: TranscriptMessage[] = [
  {
    id: "1",
    speaker: "meet_mind",
    speakerLabel: "Meet Mind",
    timestamp: "05:46",
    content:
      "Walk me through one product design decision in your portfolio where the first solution did not work.",
  },
  {
    id: "2",
    speaker: "candidate",
    speakerLabel: "Temitope Balogun",
    timestamp: "05:47",
    content:
      "The onboarding flow looked clean, but users still skipped setup. We found that the first screen asked for too much information before showing value.",
  },
  {
    id: "3",
    speaker: "meet_mind",
    speakerLabel: "Meet Mind",
    timestamp: "05:48",
    content: "What changed after you revised that flow?",
    isTyping: true,
    isActive: true,
  },
];

export const MOCK_CHAT: ChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "What did Temi mention about his educational background?",
  },
  {
    id: "2",
    role: "assistant",
    content: "",
    title: "Temi Balogun educational background",
    bullets: [
      "Covenant University — Bachelor's degree in Computer Science",
      "Harvard University — Executive program in Product Management",
    ],
  },
];

export const MOCK_SCORECARD: ScorecardCategory[] = [
  {
    id: "1",
    title: "Problem Solving",
    score: 85,
    color: "green",
    expanded: true,
    questions: [
      "Walk me through a complex technical challenge you've faced.",
      "How did you break down the problem?",
    ],
    signals: [
      "Structured thinking",
      "Root cause analysis",
      "Clear articulation",
    ],
  },
  {
    id: "2",
    title: "Communication",
    score: 60,
    color: "orange",
    expanded: false,
  },
  {
    id: "3",
    title: "Technical depth",
    score: 0,
    color: "gray",
    expanded: false,
  },
];

export function getMockInterviewById(id: string): InterviewDetail {
  const item = MOCK_INTERVIEW_LIST.find((i) => i.id === id);
  if (!item) return { ...MOCK_INTERVIEW_DETAIL, id };
  return {
    ...MOCK_INTERVIEW_DETAIL,
    id,
    roleTitle: item.roleTitle,
    candidateName: item.candidateName,
    initials: item.initials,
    listStatus: item.listStatus,
  };
}
