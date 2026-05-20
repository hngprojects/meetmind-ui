export interface FeatureItem {
  id: number;
  icon: string;
  title: string;
  desc: string;
}

export interface StepItem {
  id: number;
  title: string;
  subject: string;
  desc: string;
}

export interface QuickStartItem {
  id: number;
  num: string;
  icon: string;
  title: string;
  desc: string;
}

export interface CardData {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
}

export const featuresList: FeatureItem[] = [
  {
    id: 1,
    icon: "/icons/plugicon.png",
    title: "Platform adapters",
    desc: "Plug-and-play connectors for Zoom and Google Meet. No custom connector needed.",
  },
  {
    id: 2,
    icon: "/icons/brainicon.png",
    title: "Context injection",
    desc: "Feed the agent documents, scorecards, and agendas before the call. It arrives informed.",
  },
  {
    id: 3,
    icon: "/icons/foldericon.png",
    title: "Live voice participation",
    desc: "The agent joins as a named participant, interacting with audio in real-time.",
  },
  {
    id: 4,
    icon: "/icons/foldericon.png",
    title: "Relevance engine",
    desc: "Decides when to speak passive, standard, or proactive modes with config thresholds.",
  },
  {
    id: 5,
    icon: "/icons/foldericon.png",
    title: "Structured note capture",
    desc: "Auto-saves decisions, action items, and open questions every 30 seconds.",
  },
  {
    id: 6,
    icon: "/icons/foldericon.png",
    title: "Post-session query",
    desc: "Natural language search over the session record. Ask anything, get a direct answer.",
  },
];

export const steps: StepItem[] = [
  {
    id: 1,
    title: "Step 01",
    subject: "Inject context before the call.",
    desc: "Upload documents, agendas, scorecards, and role descriptions. The agent arrives at the meeting fully briefed not cold.",
  },
  {
    id: 2,
    title: "Step 02",
    subject: "Agent joins the call",
    desc: "MeetMind connects to Zoom or Google Meet as an active, named participant, not a bot in the corner. It introduces itself and begins listening immediately.",
  },
  {
    id: 3,
    title: "Step 03",
    subject: "Listens, decides, speaks",
    desc: "The relevance engine scores every speaker turn. When the threshold is met it speaks, asking follow-ups, flagging gaps, holding the conversation naturally.",
  },
  {
    id: 4,
    title: "Step 04",
    subject: "Structured output, immediately",
    desc: "Session ends and a complete scorecard, AI summary, and queryable transcript are available instantly. No manual notes. No memory-dependent write-ups.",
  },
];

export const quickStartSteps: QuickStartItem[] = [
  {
    id: 1,
    num: "01",
    icon: "/icons/foldericon.png",
    title: "Inject Context",
    desc: "Provide agenda, documents, or candidate data before the session starts.",
  },
  {
    id: 2,
    num: "02",
    icon: "/icons/plugicon.png",
    title: "Connect to a meeting",
    desc: "Point the adapter at a Zoom or Google Meet link and run.",
  },
  {
    id: 3,
    num: "03",
    icon: "/icons/chipicon.png",
    title: "Get structured output",
    desc: "Scorecard, summary, and queryable transcript ready instantly.",
  },
];

export const cardData: CardData[] = [
  {
    id: 1,
    title: "<500ms",
    subtitle: "Response latency",
    desc: "Relevance engine per turn",
  },
  {
    id: 2,
    title: "<10%",
    subtitle: "Word error rate",
    desc: "Transcription accuracy",
  },
  {
    id: 3,
    title: "99.9%",
    subtitle: "Uptime SLA",
    desc: "During business hours",
  },
  {
    id: 4,
    title: "<5min",
    subtitle: "SDK setup time",
    desc: "Install to first agent",
  },
  {
    id: 5,
    title: "30s",
    subtitle: "Auto-save interval",
    desc: "Notes synced continuously",
  },
];
