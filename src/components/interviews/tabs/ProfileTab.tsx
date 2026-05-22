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
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#B5B7BD] text-xl font-medium text-[#FEFEFF]">
          {interview.initials}
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#0f172a]">
            {interview.roleTitle}
          </h3>
          <p className="text-sm text-[#6b7280]">{interview.candidateName}</p>
        </div>
      </div>

      <section className="mt-8">
        <h4 className="text-sm font-semibold text-[#0f172a]">Contact</h4>
        <div className="mt-3 space-y-3">
          <div className="flex items-center gap-3 rounded-lg border border-[#e5e7eb] px-4 py-3">
            <HiOutlineEnvelope className="h-5 w-5 text-[#9ca3af]" />
            <span className="text-sm text-[#0f172a]">
              {interview.candidateEmail}
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-[#e5e7eb] px-4 py-3">
            <HiOutlinePhone className="h-5 w-5 text-[#9ca3af]" />
            <span className="text-sm text-[#0f172a]">{interview.phone}</span>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h4 className="text-sm font-semibold text-[#0f172a]">Links</h4>
        <div className="mt-3 flex flex-col gap-2">
          {/*When link is available uncomment a and delete span - coderabbits flag*/}
          {/* <a
            href="#"
            className="flex items-center gap-2 text-sm font-medium  hover:underline"
          > */}
          <span className="flex items-center gap-2 text-sm font-medium  hover:underline">
            <HiOutlineDocumentText className="h-4 w-4" />
            <span className="text-[#0e797e]"> View Resume</span>
          </span>
          {/* </a> */}
          {/* <a
            href="#"
            className="flex items-center gap-2 text-sm font-medium hover:underline"
          > */}
          <span className="flex items-center gap-2 text-sm font-medium  hover:underline">
            <HiOutlineGlobeAlt className="h-4 w-4" />
            <span className="text-[#0e797e]"> Portfolio</span>
          </span>
          {/* </a> */}
        </div>
      </section>

      <section className="mt-8">
        <h4 className="text-sm font-semibold text-[#0f172a]">
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
            <dt className="text-[#6b7280]">Status</dt>
            <dd>
              <StatusBadge status="live" label="Live" />
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
      <dt className="text-[#6b7280]">{label}</dt>
      <dd className="flex items-center gap-2 font-medium text-[#0f172a]">
        {icon}
        {value}
      </dd>
    </div>
  );
}
