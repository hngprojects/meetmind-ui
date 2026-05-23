import { FiSearch, FiCopy } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

interface HelpHeroProps {
  onSearch: (value: string) => void;
}

export function HelpHero({ onSearch }: HelpHeroProps) {
  return (
    <section className="w-full bg-white pt-16 pb-8">
      <div className="max-w-[930px] mx-auto px-6 md:px-8">
        <div className="relative flex items-center justify-center min-h-[70px] max-w-md mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] text-center">
            Help & Support
          </h1>

          {/* Decorative elements using strictly React Icons */}
          <div className="absolute top-[-12px] right-[-40px] md:right-[-50px] pointer-events-none select-none text-[#94a3b8] flex items-start gap-1">
            <FiCopy size={28} strokeWidth={1.5} className="opacity-80" />
            <div className="flex flex-col gap-1 -ml-2 -mt-2">
              <HiSparkles size={16} strokeWidth={1.5} className="text-[#94a3b8]" />
              <HiSparkles size={10} strokeWidth={1.5} className="text-[#94a3b8] ml-2" />
            </div>
          </div>
        </div>

        <div className="relative mt-8 max-w-full">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none" size={16} />
          <input
            type="text"
            aria-label="Search help articles"
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search for help articles, guides, and FAQs..."
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-[#E1E3E4] bg-[#F8FAFC]/50 text-[#0F172A] placeholder:text-[#94a3b8] text-sm focus:outline-none focus:border-[#1a6b6b] transition-colors"
          />
        </div>
      </div>
    </section>
  );
}