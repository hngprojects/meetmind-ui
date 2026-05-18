"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqGroup {
  group: string;
  items: FaqItem[];
}

const faqs: FaqGroup[] = [
  {
    group: "Getting Started",
    items: [
      {
        question: "How do I create my first AI-powered interview?",
        answer: "Navigate to your dashboard and click New Interview. Choose a template or build from scratch, set your questions, and MeetMind will handle the rest - joining your call and conducting t
      },
      {
        question: "Which meeting platforms are supported?",
        answer: "MeetMind currently supports Zoom, Google Meet, and Microsoft Teams. More platforms are on our roadmap. You can connect your accounts from the Integrations tab in Settings.",
      },
      {
        question: "How does the AI agent join my meetings?",
        answer: "Once you connect your calendar or paste a meeting link, MeetMind's AI agent joins as a participant a few minutes before the meeting starts. It introduces itself and begins the session
      },
    ],
  },
  {
    group: "Billing & Plans",
    items: [
      {
        question: "What's included in the Free plan?",
        answer: "The Free plan includes up to 3 meetings per month, basic transcription, and standard AI summaries. Upgrade to Pro or Team for unlimited meetings, advanced analytics, and priority supp
      },
      {
        question: "Can I upgrade or downgrade my plan anytime?",
        answer: "Yes. You can change your plan at any time from the Billing section in your account settings. Upgrades take effect immediately; downgrades apply at the end of your current billing cycl
      },
      {
        question: "What happens if I exceed my meeting limit?",
        answer: "You will receive an email notification when you approach your limit. Once reached, new meetings won't be processed until the next billing cycle or until you upgrade your plan.",
      },
    ],
  },
  {
    group: "AI Features",
    items: [
      {
        question: "How does the AI determine when to speak?",
        answer: "MeetMind uses natural language understanding to detect pauses, question prompts, and context cues. You can also configure the AI speaking sensitivity in your interview settings under 
      },
      {
        question: "Can I customize the AI's behavior?",
        answer: "Absolutely. From your interview configuration, you can set the tone, adjust follow-up question logic, define off-limit topics, and upload a custom persona or script for the AI to foll
      },
      {
        question: "What happens to my meeting data?",
        answer: "All meeting data is encrypted at rest and in transit. Transcripts and summaries are stored securely and are only accessible to you and your team. You can delete any meeting data at an
      },
    ],
  },
  {
    group: "Integrations",
    items: [
      {
        question: "How do I connect my Zoom account?",
        answer: "Go to Settings, then Integrations, then Zoom and click Connect. You will be redirected to Zoom's OAuth page to authorize MeetMind. Once connected, your upcoming Zoom meetings will be 
      },
      {
        question: "Can I disconnect an integration?",
        answer: "Yes. Visit Settings, then Integrations, find the connected platform, and click Disconnect. This will revoke MeetMind's access without affecting your existing meeting data.",
      },
    ],
  },
  {
    group: "Troubleshooting",
    items: [
      {
        question: "The AI didn't join my meeting. What should I do?",
        answer: "First, check that the meeting link was correctly added and your integration is still connected. Ensure the meeting was not rescheduled. If the issue persists, contact support with you
      },
      {
        question: "The transcript quality is poor. How can I improve it?",
        answer: "Transcript accuracy depends on audio quality. Ensure participants use headsets or quiet environments. You can also enable speaker labeling in your settings to help the AI differentiat
      },
      {
        question: "Can I edit the AI-generated summary?",
        answer: "Yes. After a meeting, open the summary from your dashboard and click Edit. You can revise any section, add notes, and re-export the updated summary to your connected tools like Notion
      },
    ],
  },
];

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#E1E3E4] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-4 text-sm text-[#0F172A] hover:text-[#02505E] transition-colors text-left gap-4"
        aria-expanded={open}
      >
        <span>{question}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-[#64748b] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-4 text-sm text-[#64748b] leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

interface FaqAccordionProps {
  searchQuery?: string;
}

export function FaqAccordion({ searchQuery = "" }: FaqAccordionProps) {
  const query = searchQuery.toLowerCase().trim();

  const filteredFaqs = faqs
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query)
      ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <section className="w-full bg-white pb-14">
      <div className="max-w-[930px] mx-auto px-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-[#64748b] shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            <h3 className="text-sm font-bold text-[#0F172A]">
              Frequently Asked Questions
            </h3>
          </div>
          <p className="text-xs text-[#64748b]">
            Find quick answers to common questions
          </p>
        </div>

        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 text-sm text-[#64748b]">
            No results found for &quot;{searchQuery}&quot;. Try a different keyword or{" "}
            <a href="/contact" className="text-[#02505E] hover:underline">
              contact support
            </a>.
          </div>
        ) : (
          filteredFaqs.map((group, i) => (
            <div key={i} className="mb-6">
              <h4 className="text-xs font-semibold text-[#02505E] uppercase tracking-wide mb-3">
                {group.group}
              </h4>
              <div className="border border-[#E1E3E4] rounded-xl px-5 overflow-hidden">
                {group.items.map((item, j) => (
                  <AccordionItem key={j} question={item.question} answer={item.answer} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
