"use client";

import StatusBadge from "@/components/interviews/StatusBadge";
import type { InterviewDetail } from "@/types/interview";
import {
  HiOutlineEnvelope,
  HiOutlineGlobeAlt,
  HiOutlinePhone,
} from "react-icons/hi2";
import { HiOutlineDocumentText } from "react-icons/hi";

type Props = {
  interview: InterviewDetail;
};

export default function ProfileTab({ interview }: Props) {
  return (
    <div className="overflow-y-auto px-6 py-6">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-text-placeholder)] text-xl font-medium text-[var(--color-text-white-primary)]">
          {interview.initials}
        </div>
        <div>
          <h3 className="text-lg font-bold text-[var(--color-text-color-primary)]">
            {interview.roleTitle}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {interview.candidateName}
          </p>
        </div>
      </div>

      <section className="mt-8">
        <h4 className="text-sm font-semibold text-[var(--color-text-color-primary)]">
          Contact
        </h4>
        <div className="mt-3 space-y-3">
          <div className="flex items-center gap-3 rounded-lg border border-[var(--color-card-border)] px-4 py-3">
            <HiOutlineEnvelope className="h-5 w-5 text-[var(--color-card-text)]" />
            <span className="text-sm text-[var(--color-text-color-primary)]">
              {interview.candidateEmail}
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-[var(--color-card-border)] px-4 py-3">
            <HiOutlinePhone className="h-5 w-5 text-[var(--color-card-text)]" />
            <span className="text-sm text-[var(--color-text-color-primary)]">
              {interview.phone}
            </span>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h4 className="text-sm font-semibold text-[var(--color-text-color-primary)]">
          Links
        </h4>
        <div className="mt-3 flex flex-col gap-2">
          {/*When link is available uncomment a and delete span - coderabbits flag*/}
          {/* 
            href="#"
            className="flex items-center gap-2 text-sm font-medium hover:underline"
          > */}
          <span className="flex items-center gap-2 text-sm font-medium">
            <HiOutlineDocumentText className="h-4 w-4" />
            <span className="text-[var(--color-text-primary)]">
              {" "}
              View Resume
            </span>
          </span>
          {/* </a> */}
          {/* 
            href="#"
            className="flex items-center gap-2 text-sm font-medium hover:underline"
          > */}
          <span className="flex items-center gap-2 text-sm font-medium">
            <HiOutlineGlobeAlt className="h-4 w-4" />
            <span className="text-[var(--color-text-primary)]"> Portfolio</span>
          </span>
          {/* </a> */}
        </div>
      </section>

      <section className="mt-8">
        <h4 className="text-sm font-semibold text-[var(--color-text-color-primary)]">
          Interview details
        </h4>
        <dl className="mt-4 space-y-3">
          <DetailRow label="Date" value={interview.date} />
          <DetailRow label="Time" value={interview.time} />
          <DetailRow label="Duration" value={interview.duration} />
          <DetailRow
            label="Platform"
            value={interview.platform}
            icon={
              <span className="rounded bg-[#5865f2] px-1.5 py-0.5 text-[10px] font-bold text-white">
                D
              </span>
            }
          />
          <DetailRow label="Question" value={interview.questionProgress} />
          <DetailRow label="AI Tone" value={interview.aiTone} />
          <div className="flex justify-between text-sm">
            <dt className="text-[var(--color-text-secondary)]">Status</dt>
            <dd>
              <StatusBadge
                status={interview.listStatus}
                label={
                  interview.status.charAt(0).toUpperCase() +
                  interview.status.slice(1)
                }
              />
            </dd>
          </div>
          <DetailRow label="Rating" value={interview.rating ?? "----"} />
        </dl>
      </section>
    </div>
  );
}

function DetailRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between text-sm">
      <dt className="text-[var(--color-text-secondary)]">{label}</dt>
      <dd className="flex items-center gap-2 font-medium text-[var(--color-text-color-primary)]">
        {icon}
        {value}
      </dd>
    </div>
  );
}
