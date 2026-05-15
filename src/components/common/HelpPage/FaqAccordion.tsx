"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
}

interface FaqGroup {
  group: string;
  subtitle?: string;
  items: FaqItem[];
}

const faqs: FaqGroup[] = [
  {
    group: "Frequently Asked Questions",
    subtitle: "Find quick answers to common questions",
    items: [
      { question: "How do I create my first AI-powered interview?" },
      { question: "Which meeting platforms are supported?" },
      { question: "How does the AI agent join my meetings?" },
    ],
  },
  {
    group: "Billing & Plans",
    items: [
      { question: "What's included in the Free plan?" },
      { question: "Can I upgrade or downgrade my plan anytime?" },
      { question: "What happens if I exceed my meeting limit?" },
    ],
  },
  {
    group: "AI Features",
    items: [
      { question: "How does the AI determine when to speak?" },
      { question: "Can I customize the AI's behavior?" },
      { question: "What happens to my meeting data?" },
    ],
  },
  {
    group: "Integrations",
    items: [
      { question: "How do I connect my Zoom account?" },
      { question: "Can I disconnect an integration?" },
    ],
  },
  {
    group: "Troubleshooting",
    items: [
      { question: "The AI didn't join my meeting. What should I do?" },
      { question: "The transcript quality is poor. How can I improve it?" },
      { question: "Can I edit the AI-generated summary?" },
    ],
  },
];

function AccordionItem({ question }: { question: string }) {
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
          className={`shrink-0 text-[#64748b] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="pb-4 text-sm text-[#64748b] leading-relaxed">
          For more information about this topic, please contact our support team
          or visit our documentation.
        </div>
      )}
    </div>
  );
}

export function FaqAccordion() {
  return (
    <section className="w-full bg-white px-6 pb-14">
      <div className="max-w-4xl mx-auto">
        {faqs.map((group, i) => (
          <div key={i} className="mb-6">
            {/* Group heading */}
            <div className="flex items-center gap-2 mb-1">
              {i === 0 && (
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
              )}
              <h3 className="text-sm font-bold text-[#0F172A]">
                {group.group}
              </h3>
            </div>
            {group.subtitle && (
              <p className="text-xs text-[#64748b] mb-3">{group.subtitle}</p>
            )}
            {/* Accordion items in bordered container */}
            <div className="border border-[#E1E3E4] rounded-xl px-5 overflow-hidden">
              {group.items.map((item, j) => (
                <AccordionItem key={j} question={item.question} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}