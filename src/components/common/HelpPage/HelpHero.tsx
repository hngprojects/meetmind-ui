"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { BsFileEarmarkText } from "react-icons/bs";

interface HelpHeroProps {
  onSearch?: (query: string) => void;
}

export function HelpHero({ onSearch }: HelpHeroProps) {
  return (
    <>
      <section className="w-full bg-[#F1F4F6] pt-28 pb-8">
        <div className="max-w-[930px] mx-auto px-6 relative overflow-hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-[#0F172A] mb-4 hover:text-[#02505E]"
          >
            &larr; Back
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
                Help & Support
              </h1>
              <p className="mt-2 text-sm text-[#5E6470] max-w-xs">
                Find answers, resources, and get in touch with our team
              </p>
            </div>
            <div className="shrink-0 w-[110px] h-[110px] flex items-center justify-center rounded-2xl bg-[#DBEAFE]">
              <BsFileEarmarkText size={52} className="text-[#93C5FD]" />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-white py-6">
        <div className="max-w-[930px] mx-auto px-6">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none"
              size={16}
            />
            <input
              type="text"
              placeholder="Search for help articles, guides, and FAQs..."
              onChange={(e) => onSearch?.(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-[#E1E3E4] bg-white text-[#0F172A] placeholder:text-[#94a3b8] text-sm focus:outline-none focus:ring-1 focus:ring-[#02505E] transition-colors"
            />
          </div>
        </div>
      </section>
    </>
  );
}