export function OtherWaysToReach() {
  return (
    <div className="mt-8 w-full">
      <h3 className="text-sm font-semibold text-[#0F172A] mb-3">
        Other ways to reach us
      </h3>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#3F4555]">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <span className="text-sm text-[#3F4555]">support@meetmind.ai</span>
        </div>

        <div className="flex items-center gap-2.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#3F4555] shrink-0">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="text-sm text-[#3F4555]">Live Chat</span>
          <span className="ml-auto text-xs font-medium text-[#16a34a] bg-[#dcfce7] px-2 py-0.5 rounded-full">
            Online
          </span>
        </div>
      </div>
    </div>
  );
}