import Link from "next/link";
import { LuCheck } from "react-icons/lu";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="flex flex-col items-center bg-[#F7F9FB] px-4 md:px-8 py-16 w-full"
    >
      <div className="flex flex-col lg:max-w-172 mx-auto">
        <h3 className="font-bold text-[40px] text-[#09090B] text-center">
          Start free. Scale when ready
        </h3>
        <p className="font-medium text-2xl text-center text-wrap max-w-2xl mx-auto">
          The core SDK is open source and free forever. Managed infrastructure
          when you need it.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full lg:max-w-272 mx-auto mt-20 px-4 md:px-0 items-stretch">
        {/* Starter Plan */}
        <div className="flex flex-col bg-white p-8 h-full rounded-2xl border border-gray-200 shadow-sm text-left items-start gap-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-md">
          <span className="px-3 py-1 bg-[#F7F9FB] border border-[#88898A] text-[#0F172A] text-xs font-bold rounded-full uppercase tracking-wider">
            Starter
          </span>
          <div>
            <h2 className="text-4xl font-bold text-[#0F172A]">$0</h2>
            <p className="text-base text-[#3F4555] mt-2">
              Open source self-hosted
            </p>
          </div>
          <Link
            href="/signup"
            className="w-full block text-center py-3 bg-gray-50 hover:bg-gray-100 text-[#0F172A] text-base font-bold rounded-xl border border-gray-200 transition-colors"
          >
            Get Started
          </Link>

          <ul className="flex flex-col gap-3 w-full">
            <li className="flex items-center gap-3 text-sm text-[#3F4555]">
              <LuCheck
                className="w-5 h-5 text-[#1A8261] shrink-0"
                strokeWidth={2.5}
              />
              Full SDK access
            </li>
            <li className="flex items-center gap-3 text-sm text-[#3F4555]">
              <LuCheck
                className="w-5 h-5 text-[#1A8261] shrink-0"
                strokeWidth={2.5}
              />
              Zoom & Google Meet adapters
            </li>
            <li className="flex items-center gap-3 text-sm text-[#3F4555]">
              <LuCheck
                className="w-5 h-5 text-[#1A8261] shrink-0"
                strokeWidth={2.5}
              />
              Unlimited local sessions
            </li>
            <li className="flex items-center gap-3 text-sm text-[#3F4555]">
              <LuCheck
                className="w-5 h-5 text-[#1A8261] shrink-0"
                strokeWidth={2.5}
              />
              Community Support
            </li>
          </ul>
        </div>

        {/* Pro Plan (Highlighted) */}
        <div
          className="relative flex flex-col bg-[#E6F0F1] p-8 h-full rounded-2xl border-2 border-[#B1CFD4] shadow-md 
        text-left items-start gap-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-md"
        >
          <span
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#B1CFD4] text-[#0F172A] text-xs 
          font-bold px-4 py-1 rounded-full tracking-wider whitespace-nowrap shadow-sm"
          >
            Most Popular
          </span>

          <span className="px-3 py-1 bg-[#02505E]/10 text-[#02505E] text-xs font-semibold rounded-full uppercase tracking-wider">
            Pro
          </span>
          <div>
            <h2 className="text-4xl font-extrabold text-[#0F172A]">$89</h2>
            <p className="text-sm text-[#525866] mt-2">
              Managed API. no infra needed
            </p>
          </div>
          <Link
            href="/signup"
            className="w-full block text-center py-3 bg-[#02505E] hover:bg-[#023e4a] text-[#FEFEFF] text-base font-bold rounded-xl transition-colors shadow-sm"
          >
            Start Free Trial
          </Link>

          <ul className="flex flex-col gap-3 w-full">
            <li className="flex items-center gap-3 text-sm text-[#0F172A]">
              <LuCheck
                className="w-5 h-5 text-[#1A8261] shrink-0"
                strokeWidth={2.5}
              />
              Everything in free
            </li>
            <li className="flex items-center gap-3 text-sm text-[#0F172A]">
              <LuCheck
                className="w-5 h-5 text-[#1A8261] shrink-0"
                strokeWidth={2.5}
              />
              Managed cloud API
            </li>
            <li className="flex items-center gap-3 text-sm text-[#0F172A]">
              <LuCheck
                className="w-5 h-5 text-[#1A8261] shrink-0"
                strokeWidth={2.5}
              />
              Higher rate limits
            </li>
            <li className="flex items-center gap-3 text-sm text-[#0F172A]">
              <LuCheck
                className="w-5 h-5 text-[#1A8261] shrink-0"
                strokeWidth={2.5}
              />
              Priority Support
            </li>
          </ul>
        </div>

        {/* Enterprise Plan */}
        <div
          className="flex flex-col bg-white p-8 h-full rounded-2xl border border-gray-200
         shadow-sm text-left items-start gap-6 transition-all
         duration-300 hover:-translate-y-2 hover:shadow-md"
        >
          <span
            className="px-3 py-1 bg-[#F7F9FB] border border-[#88898A] text-[#0F172A] 
          text-xs font-bold rounded-full uppercase tracking-wider"
          >
            Enterprise
          </span>
          <div>
            <h2 className="text-4xl font-bold text-[#0F172A]">Custom</h2>
            <p className="text-base text-[#3F4555] mt-2">
              For large organizations with advanced security and compliance
              needs.
            </p>
          </div>
          <Link
            href="/contact"
            className="w-full block text-center py-3 bg-gray-50 hover:bg-gray-100 text-[#0F172A]
             text-base font-bold rounded-xl border border-gray-200 transition-colors"
          >
            Talk to us
          </Link>

          <ul className="flex flex-col gap-3 w-full">
            <li className="flex items-center gap-3 text-sm text-[#3F4555]">
              <LuCheck
                className="w-5 h-5 text-[#1A8261] shrink-0"
                strokeWidth={2.5}
              />
              Everything in Pro
            </li>
            <li className="flex items-center gap-3 text-sm text-[#3F4555]">
              <LuCheck
                className="w-5 h-5 text-[#1A8261] shrink-0"
                strokeWidth={2.5}
              />
              Private deployment
            </li>
            <li className="flex items-center gap-3 text-sm text-[#3F4555]">
              <LuCheck
                className="w-5 h-5 text-[#1A8261] shrink-0"
                strokeWidth={2.5}
              />
              99.9 uptime SLA
            </li>
            <li className="flex items-center gap-3 text-sm text-[#3F4555]">
              <LuCheck
                className="w-5 h-5 text-[#1A8261] shrink-0"
                strokeWidth={2.5}
              />
              Dedicated onboarding
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
