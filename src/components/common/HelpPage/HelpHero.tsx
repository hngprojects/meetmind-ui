import { Search } from "lucide-react";

export function HelpHero() {
  return (
    <section className="w-full bg-white pt-28 pb-10 px-6">
      <div className="max-w-4xl mx-auto relative">
        {/* Heading — centered */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] text-center">
          Help & Support
        </h1>

        {/* Decorative illustration — absolutely positioned top right */}
        <div className="absolute top-0 right-0 hidden md:block opacity-30">
          <svg width="100" height="90" viewBox="0 0 110 100" fill="none">
            <rect
              x="10"
              y="20"
              width="50"
              height="62"
              rx="5"
              stroke="#64748b"
              strokeWidth="1.8"
              fill="none"
            />
            <rect
              x="18"
              y="13"
              width="50"
              height="62"
              rx="5"
              stroke="#64748b"
              strokeWidth="1.8"
              fill="none"
            />
            <line
              x1="26"
              y1="34"
              x2="56"
              y2="34"
              stroke="#64748b"
              strokeWidth="1.4"
            />
            <line
              x1="26"
              y1="42"
              x2="56"
              y2="42"
              stroke="#64748b"
              strokeWidth="1.4"
            />
            <line
              x1="26"
              y1="50"
              x2="46"
              y2="50"
              stroke="#64748b"
              strokeWidth="1.4"
            />
            <circle
              cx="72"
              cy="68"
              r="12"
              stroke="#64748b"
              strokeWidth="1.8"
              fill="none"
            />
            <line
              x1="80"
              y1="76"
              x2="90"
              y2="86"
              stroke="#64748b"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M88 18 L90 12 L92 18 L98 20 L92 22 L90 28 L88 22 L82 20 Z"
              stroke="#64748b"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M76 8 L77 5 L78 8 L81 9 L78 10 L77 13 L76 10 L73 9 Z"
              stroke="#64748b"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>

        {/* Search bar */}
        <div className="relative mt-8">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]"
            size={16}
          />
          <input
            type="text"
            placeholder="Search for help articles, guides, and FAQs..."
            className="w-full pl-10 pr-4 py-3.5 rounded-lg border border-[#E1E3E4] bg-white text-[#0F172A] placeholder:text-[#94a3b8] text-sm focus:outline-none focus:ring-1 focus:ring-[#02505E] trans
          />
        </div>
      </div>
    </section>
  );
}
