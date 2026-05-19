"use client";

import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { BsQuestionCircle } from "react-icons/bs";

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
        answer: "Navigate to your dashboard and click New Interview. Choose a template or build from scratch and MeetMind will handle the rest.",
      },
      {
        question: "Which meeting platforms are supported?",
        answer: "MeetMind supports Zoom, Google Meet, and Microsoft Teams. Connect accounts from the Integrations tab in Settings.",
      },
      {
        question: "How does the AI agent join my meetings?",
        answer: "Once you paste a meeting link, MeetMind AI agent joins as a participant a few minutes before the meeting starts.",
      },
    ],
  },
  {
    group: "Billing & Plans",
    items: [
      {
        question: "What is included in the Free plan?",
        answer: "The Free plan includes up to 3 meetings per month, basic transcription, and standard AI summaries.",
      },
      {
        question: "Can I upgrade or downgrade my plan anytime?",
        answer: "Yes. You can change your plan from the Billing section in your account settings at any time.",
      },
      {
        question: "What happens if I exceed my meeting limit?",
        answer: "You will receive an email notification. New meetings will not be processed until the next billing cycle or until you upgrade.",
      },
    ],
  },
  {
    group: "AI Features",
    items: [
      {
        question: "How does the AI determine when to speak?",
        answer: "MeetMind uses natural language understanding to detect pauses and context cues. Configure sensitivity in your interview settings.",
      },
      {
        question: "Can I customize the AI behavior?",
        answer: "Yes. From your interview configuration, set the tone, adjust follow-up logic, and upload a custom persona or script.",
      },
      {
        question: "What happens to my meeting data?",
        answer: "All data is encrypted at rest and in transit. Transcripts are only accessible to you and your team.",
      },
    ],
  },
  {
    group: "Integrations",
    items: [
      {
        question: "How do I connect my Zoom account?",
        answer: "Go to Settings then Integrations then Zoom and click Connect. You will be redirected to the Zoom OAuth page.",
      },
      {
        question: "Can I disconnect an integration?",
        answer: "Yes. Visit Settings then Integrations, find the platform, and click Disconnect.",
      },
    ],
  },
  {
    group: "Troubleshooting",
    items: [
      {
        question: "The AI did not join my meeting. What should I do?",
        answer: "Check the meeting link and integration status. If the issue persists, contact support with your meeting ID.",
      },
      {
        question: "The transcript quality is poor. How can I improve it?",
        answer: "Ensure participants use headsets or quiet environments. Enable speaker labeling in your settings.",
      },
      {
        question: "Can I edit the AI-generated summary?",
        answer: "Yes. Open the summary from your dashboard, click Edit, revise any section, and re-export to Notion or Slack.",
      },
    ],
  },
];

function AccordionItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E1E3E4] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-4 text-sm text-[#0F172A] hover:text-[#02505E] transition-colors text-left gap-4"
        aria-expanded={open}
      >
        <span>{question}</span>
        <BsChevronDown
          size={18}
          className={`shrink-0 text-[#64748b] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
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
            <BsQuestionCircle size={15} className="text-[#64748b] shrink-0" />
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
            No results found for &quot;{searchQuery}&quot;. Try a different
            keyword or{" "}
            <a href="/contact" className="text-[#02505E] hover:underline">
              contact support
            </a>
            .
          </div>
        ) : (
          filteredFaqs.map((group, i) => (
            <div key={i} className="mb-6">
              <h4 className="text-xs font-semibold text-[#02505E] uppercase tracking-wide mb-3">
                {group.group}
              </h4>
              <div className="border border-[#E1E3E4] rounded-xl px-5 overflow-hidden">
                {group.items.map((item, j) => (
                  <AccordionItem
                    key={j}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}