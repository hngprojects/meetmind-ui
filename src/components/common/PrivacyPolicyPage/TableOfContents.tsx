"use client"

import { useState, type MouseEvent } from 'react';

interface ToCItem {
  id: string;
  label: string;
}

const items: ToCItem[] = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'information-collection', label: 'Information Collection' },
  { id: 'use-of-information', label: 'Use of Information' },
  { id: 'information-disclosure', label: 'Information Disclosure' },
  { id: 'data-security', label: 'Data Security' },
  { id: 'changes-to-policy', label: 'Changes to This Policy' },
];

export default function TableOfContents() {
  const [activeId, setActiveId] = useState<string>(items[0].id);
  const handleClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveId(id);
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-2xl">
      <h3 className="font-bold text-[#3F4555] mb-6 text-xl">Contents</h3>
      <ul className="space-y-5">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} className="relative">
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-sm bg-[#0A4C57]" />
              )}
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`text-sm transition-colors pl-4 ${
                  isActive
                    ? 'text-[#0A4C57] font-medium'
                    : 'text-[#3F4555] hover:text-gray-900'
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
