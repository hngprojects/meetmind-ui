"use client";

import Image from "next/image";
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";

export default function HeaderSection() {
  return (
    <section className="px-4 md:px-6 max-w-7xl mx-auto w-full">
      <div className="relative w-full bg-white rounded-3xl overflow-hidden mt-16 md:mt-20 lg:mt-24 mb-8 md:mb-12 h-48 md:h-64 px-6 md:px-12 flex flex-col justify-center">
        {/* Back Button */}
        <Link
          href="/"
          className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium z-20"
        >
          <GoArrowLeft className="w-5 h-5" />
          Back
        </Link>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-4 z-10 w-full mt-8 md:mt-0 md:pr-20 lg:pr-48">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm md:text-base text-gray-400 font-medium md:mt-3">
            Last updated: May 2026
          </p>
        </div>

        {/* Background Icon */}
        <div className="absolute -right-4 -bottom-8 md:-right-12 md:-bottom-12  lg:-right-4 lg:-bottom-9 w-36 h-36 md:w-48 md:h-48 select-none pointer-events-none opacity-20 z-0">
          <Image
            src="/icons/task-list-star.svg"
            alt=""
            aria-hidden="true"
            width={200}
            height={200}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
