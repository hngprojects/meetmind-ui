import Link from "next/link";

export function ContactHero() {
  return (
    <div className="relative w-full mb-8">
      {/* Back + heading row */}
      <div className="flex items-start justify-between">
        <div>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-[#64748b] hover:text-[#0F172A] transition-colors mb-3"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
            Contact Support
          </h1>
          <p className="text-sm text-[#64748b] mt-1">
            Can&apos;t find what you&apos;re looking for?
          </p>
        </div>

        {/* Decorative icon */}
        <div className="hidden md:block opacity-30 mt-1 shrink-0">
          <svg width="80" height="80" viewBox="0 0 90 90" fill="none">
            <rect
              x="8"
              y="18"
              width="48"
              height="58"
              rx="5"
              stroke="#64748b"
              strokeWidth="1.5"
              fill="none"
            />
            <rect
              x="16"
              y="12"
              width="48"
              height="58"
              rx="5"
              stroke="#64748b"
              strokeWidth="1.5"
              fill="none"
            />
            <line
              x1="24"
              y1="32"
              x2="52"
              y2="32"
              stroke="#64748b"
              strokeWidth="1.2"
            />
            <line
              x1="24"
              y1="40"
              x2="52"
              y2="40"
              stroke="#64748b"
              strokeWidth="1.2"
            />
            <line
              x1="24"
              y1="48"
              x2="42"
              y2="48"
              stroke="#64748b"
              strokeWidth="1.2"
            />
            <path
              d="M72 24 L74 20 L76 24 L80 26 L76 28 L74 32 L72 28 L68 26 Z"
              stroke="#64748b"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}