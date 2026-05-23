"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { logList, LogCategory, LogItem } from "./pageData/logList";

export default function Logs() {
  const [activeCategory, setActiveCategory] = useState<LogCategory>("All");

  const categories: LogCategory[] = [
    "All",
    "Features",
    "Improvements",
    "Fixes",
  ];

  const filteredLogs = logList.filter((log) => {
    if (activeCategory === "All") return true;
    return log.category === activeCategory;
  });

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10 ">
      {/* Filtering Pills */}
      <div className="flex flex-wrap items-center justify-start md:justify-center gap-2 pb-12 overflow-x-auto no-scrollbar">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-lg text-sm font-medium border transition-all duration-200 whitespace-nowrap ${
              activeCategory === category
                ? "bg-[#004e59] text-white border-[#004e59]"
                : "bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Main Logs List Timeline layout */}
      <div className="space-y-16 max-w-5xl mx-auto">
        {filteredLogs.length > 0 ? (
          filteredLogs.map((log: LogItem) => (
            <div
              key={log.id}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 items-start"
            >
              {/* Left Column: Date & Meta Info */}
              <div className="md:col-span-1 pt-2">
                <h3 className="text-lg font-bold text-neutral-900 tracking-tight">
                  {log.date}
                </h3>
                <span className="text-xs font-mono text-neutral-400 block mt-0.5">
                  {log.version}
                </span>
              </div>

              {/* Right Column: Card Detail */}
              <div
                className="md:col-span-3 bg-white border border-neutral-100 rounded-2xl p-4 md:p-6 shadow-sm
               hover:shadow-md transition-shadow"
              >
                {/* Visual Content Block */}
                <div className="relative w-full h-50 md:h-80 rounded-xl overflow-hidden mb-6 bg-neutral-100">
                  <Image
                    src={log.image}
                    alt={log.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 75vw"
                    className="object-cover"
                    priority={log.id === "1"}
                  />
                </div>

                {/* Tag pill */}
                <div className="mb-4">
                  <span
                    className="bg-neutral-50 text-neutral-500 text-xs font-medium px-2.5 py-1 rounded border
                   border-neutral-100"
                  >
                    {log.category}
                  </span>
                </div>

                {/* Context Text Content */}
                <h2 className="text-xl md:text-2xl font-bold text-[#004e59] mb-3 tracking-tight">
                  {log.title}
                </h2>
                <p className="text-neutral-500 text-sm md:text-base leading-relaxed mb-4">
                  {log.description}
                </p>

                {/* CTA Action */}
                <Link
                  href="#"
                  className="inline-flex items-center text-sm font-semibold text-[#004e59] hover:underline gap-1"
                >
                  Learn more <span className="text-xs">→</span>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-neutral-400 text-sm">
            No updates found under this filter option.
          </div>
        )}
      </div>
    </section>
  );
}
