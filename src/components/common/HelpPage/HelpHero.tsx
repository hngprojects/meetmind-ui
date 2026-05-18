"use client";

import { Search } from "lucide-react";
import Link from "next/link";

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
            <div className="shrink-0">
              <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
                <rect x="20" y="25" width="55" height="68" rx="6" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1.5" />
                <rect x="28" y="18" width="55" height="68" rx="6" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5" />
                <line x1="36" y1="38" x2="66" y2="38" stroke="#93C5FD" strokeWidth="1.5" />
                <line x1="36" y1="46" x2="66" y2="46" stroke="#93C5FD" strokeWidth="1.5" />
                <line x1="36" y1="54" x2="56" y2="54" stroke="#93C5FD" strokeWidth="1.5" />
                <circle cx="78" cy="78" r="14" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1.5" />
                <line x1="88" y1="88" x2="98" y2="98" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M92 20 L94 14 L96 20 L102 22 L96 24 L94 30 L92 24 L86 22 Z" fill="#BFDBFE" stroke="#93C5FD" strokeWidth="1" />
                <path d="M10 40 L11.5 36 L13 40 L17 41.5 L13 43 L11.5 47 L10 43 L6 41.5 Z" fill="#BFDBFE" stroke="#93C5FD" strokeWidth="1" />
              </svg>
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
              className="w-full pl-10 pr-4 py-3 rounded-full border border-[#E1E3E4] bg-white text-[#0F172A] placeholder:text-[#94a3b8] text-sm focus:outline-none focus:ring-1 focus:ring-[#02505E] tra
            />
          </div>
        </div>
      </section>
    </>
  );
}
