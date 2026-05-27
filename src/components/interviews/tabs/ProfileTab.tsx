"use client";

import { cn } from "@/lib/utils";
import type { InterviewDetail } from "@/types/interview";
import { HiOutlineMail, HiOutlinePhone, HiOutlineDocumentText, HiOutlineGlobeAlt } from "react-icons/hi2";

type Props = {
  interview: InterviewDetail;
};

export default function ProfileTab({ interview }: Props) {
  return (
    <div className="flex h-full min-h-[32.5rem] flex-col overflow-y-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-bg-secondary)] text-lg font-semibold text-[var(--color-text-secondary)]">
          {interview.initials}
        </div>
        <div>
          <h3 className="font-semibold text-[var(--color-text-color-primary)]">
            {interview.candidateName}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {interview.roleTitle}
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
          Contact
        </h4>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs text-[var(--color-text-secondary)] mb-1">Email</p>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-color-primary)]">
              <HiOutlineMail className="h-4 w-4 text-[var(--color-text-secondary)]" />
              {interview.candidateEmail}
            </div>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-secondary)] mb-1">Phone number</p>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-color-primary)]">
              <HiOutlinePhone className="h-4 w-4 text-[var(--color-text-secondary)]" />
              {interview.phone || "Not provided"}
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
          Links
        </h4>
        <div className="space-y-3">
          <a
            href="#"
            className="flex items-center gap-2 text-sm font-medium text-[var(--color-brand-accent)] hover:underline"
          >
            <HiOutlineDocumentText className="h-4 w-4" />
            View Resume
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-sm font-medium text-[var(--color-brand-accent)] hover:underline"
          >
            <HiOutlineGlobeAlt className="h-4 w-4" />
            Portfolio
          </a>
        </div>
      </div>

      {/* Interview Metadata */}
      <div className="space-y-4 border-t border-[var(--color-scrollbar-track)] pt-6">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
          Interview
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--color-text-secondary)]">Date</span>
            <span className="font-medium text-[var(--color-text-color-primary)]">
              {interview.date || "Not set"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--color-text-secondary)]">Time</span>
            <span className="font-medium text-[var(--color-text-color-primary)]">
              {interview.time || "Not set"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--color-text-secondary)]">Duration</span>
            <span className="font-medium text-[var(--color-text-color-primary)]">
              {interview.duration || "Not set"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--color-text-secondary)]">Platform</span>
            <span className="font-medium text-[var(--color-text-color-primary)] capitalize">
              {interview.platform?.replace("_", " ") || "Not set"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--color-text-secondary)]">Question</span>
            <span className="font-medium text-[var(--color-text-color-primary)]">
              {interview.questionProgress || "0/0"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--color-text-secondary)]">AI Tone</span>
            <span className="font-medium text-[var(--color-text-color-primary)] capitalize">
              {interview.aiTone || "Friendly"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--color-text-secondary)]">Status</span>
            <div className="flex items-center gap-2">
              {interview.status === "in_progress" && (
                <span className="h-2 w-2 rounded-full bg-[var(--color-error)] animate-pulse" />
              )}
              <span className="font-medium text-[var(--color-text-color-primary)] uppercase">
                {interview.status === "in_progress" ? "Live" : interview.status}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--color-text-secondary)]">Rating</span>
            <span className="font-medium text-[var(--color-text-color-primary)]">
              {interview.rating || "—"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
