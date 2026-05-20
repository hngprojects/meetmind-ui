import Link from 'next/link';

// Feature data with plan availability
const FEATURE_COMPARISON = [
  { feature: 'Python SDK access', starter: true, pro: true, enterprise: true },
  {
    feature: 'REST API endpoints',
    starter: false,
    pro: true,
    enterprise: true,
  },
  {
    feature: 'Pre-session document upload',
    starter: true,
    pro: true,
    enterprise: true,
  },
  {
    feature: 'Resume & candidate profile ingestion',
    starter: true,
    pro: true,
    enterprise: true,
  },
  {
    feature: 'Real-time audio ingestion',
    starter: true,
    pro: true,
    enterprise: true,
  },
  {
    feature: 'Live speech-to-text transcription',
    starter: true,
    pro: true,
    enterprise: true,
  },
  {
    feature: 'Raised hand event detection',
    starter: false,
    pro: false,
    enterprise: true,
  },
];

export function FeaturesSection() {
  return (
    <div className="max-w-7xl mx-auto pt-10 border-t border-[#edf2f7]">
      {/* Features Table */}
      <div className="mb-12">
        <h3 className="text-xl font-bold mb-6 text-black">Features</h3>

        {/* Table - Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#eaeef2]">
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#5c6b7a]">
                  Features
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-[#5c6b7a]">
                  Starter
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-[#5c6b7a]">
                  Pro
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-[#5c6b7a]">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {FEATURE_COMPARISON.map((item, index) => (
                <tr
                  key={item.feature}
                  className={`border-b border-[#eaeef2] ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className="py-3 px-4 text-sm font-medium text-[#1f2a3e]">
                    {item.feature}
                  </td>
                  <td className="text-center py-3 px-4">
                    {item.starter ? (
                      <span className="text-green-600 text-xl" aria-label="Available">✓</span>
                    ) : (
                      <span className="text-gray-400 text-xl" aria-label="Not available">—</span>
                    )}
                  </td>
                  <td className="text-center py-3 px-4">
                    {item.pro ? (
                      <span className="text-green-600 text-xl" aria-label="Available">✓</span>
                    ) : (
                      <span className="text-gray-400 text-xl" aria-label="Not available">—</span>
                    )}
                  </td>
                  <td className="text-center py-3 px-4">
                    {item.enterprise ? (
                      <span className="text-green-600 text-xl" aria-label="Available">✓</span>
                    ) : (
                      <span className="text-gray-400 text-xl" aria-label="Not available">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View - Cards */}
        <div className="block md:hidden space-y-6">
          {FEATURE_COMPARISON.map((item) => (
            <div
              key={item.feature}
              className="bg-white border border-[#eaeef2] rounded-xl p-4"
            >
              <div className="font-medium text-[#1f2a3e] mb-3">
                {item.feature}
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="text-center">
                  <div className="text-xs text-[#5c6b7a] mb-1">Starter</div>
                  {item.starter ? (
                    <span className="text-green-600 text-lg" aria-label="Available">✓</span>
                  ) : (
                    <span className="text-gray-400 text-lg" aria-label="Not available">—</span>
                  )}
                </div>
                <div className="text-center">
                  <div className="text-xs text-[#5c6b7a] mb-1">Pro</div>
                  {item.pro ? (
                    <span className="text-green-600 text-lg" aria-label="Available">✓</span>
                  ) : (
                    <span className="text-gray-400 text-lg" aria-label="Not available">—</span>
                  )}
                </div>
                <div className="text-center">
                  <div className="text-xs text-[#5c6b7a] mb-1">Enterprise</div>
                  {item.enterprise ? (
                    <span className="text-green-600 text-lg" aria-label="Available">✓</span>
                  ) : (
                    <span className="text-gray-400 text-lg" aria-label="Not available">—</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Documentation Section */}
      <div className="flex flex-wrap justify-between items-start pt-6 border-t border-[#edf2f7]">
        <div className="flex-[2] min-w-[260px]">
          <h3 className="text-xl font-bold mb-4 text-black">Documentation</h3>
          <p className="text-sm text-[#5c6b7a] max-w-[400px]">
            Explore our comprehensive documentation to get started with MeetMind
            SDK and API.
          </p>
        </div>
        <div className="flex-1 min-w-[180px] mt-6 md:mt-0 md:text-right">
          <div className="flex flex-col gap-3 items-start md:items-end">
            <a
              href="https://github.com/meetmind"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-black hover:text-[#4F46E5] transition-colors"
            >
              GitHub →
            </a>
            <Link
              href="/changelog"
              className="text-sm font-medium text-black hover:text-[#4F46E5] transition-colors"
            >
              Changelog →
            </Link>
            <Link
              href="/docs"
              className="text-sm font-medium text-black hover:text-[#4F46E5] transition-colors"
            >
              API Reference →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}