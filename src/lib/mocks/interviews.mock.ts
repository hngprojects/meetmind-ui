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
  resumeUrl: "https://drive.google.com/resume/temibalogun.pdf",
  portfolioUrl: "https://temibalogun.design",
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
    id: "019e976f-4baf-76c1-9440-352220ddd789",
    speaker: "meet_mind",
    speakerLabel: "Meet Mind",
    timestamp: "00:00:00",
    content:
      "Can you tell me a little bit about your background as a backend developer?",
    sequenceNo: 1,
  },
  {
    id: "019e9770-428f-70e3-b90e-c76fefdc7574",
    speaker: "candidate",
    speakerLabel: "Temitope Balogun",
    timestamp: "00:01:03",
    content:
      "I built a retry engine with background worker processing requests asynchronously.",
    sequenceNo: 2,
  },
  {
    id: "019e9770-b5eb-71f9-b223-8bd9c8c39f15",
    speaker: "meet_mind",
    speakerLabel: "Meet Mind",
    timestamp: "00:01:32",
    content:
      "Can you tell me what programming languages and frameworks you used to build this retry engine, and how you ensured scalability and reliability?",
    sequenceNo: 3,
  },
  {
    id: "019e9770-e832-71df-bfa4-b9c4d1540852",
    speaker: "candidate",
    speakerLabel: "Temitope Balogun",
    timestamp: "00:01:45",
    content:
      "In my retry engine, the request is stored in SQLite3, and the background worker pulls pending requests and retries retryable responses.",
    sequenceNo: 4,
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
    id: "technical_depth",
    title: "Technical Depth",
    score: 60,
    confidence: 80,
    scoreBarPercent: 60,
    expanded: true,
    questionsAsked: [
      "Can you tell me a little bit about your background as a backend developer?",
      "Can you tell me what programming languages and frameworks you used to build this retry engine?",
    ],
    signalsDetected: [
      "built a retry engine",
      "used SQLite3 and background workers",
      "struggled with edge cases",
    ],
    strengths: ["built a retry engine", "used SQLite3 and background workers"],
    weaknesses: ["lacked concrete examples", "struggled with edge cases"],
    justification:
      "The candidate demonstrated some knowledge of software engineering concepts, but struggled to provide detailed explanations.",
    evidence: [
      {
        questionTurnId: "019e976f-4baf-76c1-9440-352220ddd789",
        responseTurnId: "019e9770-428f-70e3-b90e-c76fefdc7574",
        reason:
          "Candidate mentioned building a retry engine, but did not provide details.",
      },
      {
        questionTurnId: "019e9770-b5eb-71f9-b223-8bd9c8c39f15",
        responseTurnId: "019e9770-e832-71df-bfa4-b9c4d1540852",
        reason: "Candidate mentioned SQLite3 and background workers.",
      },
    ],
    subRubrics: [
      {
        id: "programming_languages_and_frameworks",
        title: "Programming Languages and Frameworks",
        score: 70,
        confidence: 90,
        scoreBarPercent: 70,
        strengths: [],
        weaknesses: [],
        justification:
          "The candidate mentioned using SQLite3 and background workers, but did not provide details on other frameworks.",
        evidence: [
          {
            questionTurnId: "019e9770-b5eb-71f9-b223-8bd9c8c39f15",
            responseTurnId: "019e9770-e832-71df-bfa4-b9c4d1540852",
            reason: "Candidate mentioned using SQLite3.",
          },
        ],
        expanded: false,
      },
    ],
  },
  {
    id: "communication",
    title: "Communication",
    score: 40,
    confidence: 80,
    scoreBarPercent: 40,
    expanded: false,
    questionsAsked: [
      "Can you tell me a little bit about your background as a backend developer?",
    ],
    signalsDetected: [
      "enthusiastic and willing to learn",
      "struggled to provide clear explanations",
    ],
    strengths: ["enthusiastic and willing to learn"],
    weaknesses: ["struggled to provide clear explanations"],
    justification:
      "The candidate showed enthusiasm but struggled to provide a clear, structured explanation.",
    evidence: [
      {
        questionTurnId: "019e976f-4baf-76c1-9440-352220ddd789",
        responseTurnId: "019e9770-428f-70e3-b90e-c76fefdc7574",
        reason:
          "Candidate struggled to provide a clear explanation of their background.",
      },
    ],
    subRubrics: [],
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
