"use client";

import React, { useState } from "react";
import { TERMS_SECTIONS } from "./termsData";
import { RiArrowDropDownLine } from "react-icons/ri";

interface Props {
  activeId: string;
  onSelect: (id: string) => void;
}

export default function TermsSidebar({ activeId, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 shrink-0 bg-white rounded-2xl p-6 shadow-sm self-start sticky top-24">
        <h3 className="text-lg font-bold text-[#1f2a3e] mb-6">Contents</h3>
        <ul className="flex flex-col gap-4">
          {TERMS_SECTIONS.map((section) => {
            const isActive = activeId === section.id;
            return (
              <li key={section.id}>
                <button
                  onClick={() => onSelect(section.id)}
                  className={`flex items-center gap-2 text-sm text-left w-full transition-colors ${
                    isActive
                      ? "text-[#02505E] font-medium"
                      : "text-[#5c6b7a] hover:text-[#1f2a3e]"
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#02505E] shrink-0" />
                  )}
                  <span className={isActive ? "" : "pl-3"}>
                    {section.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile Dropdown */}
      <div className="md:hidden mb-6 relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-32 bg-white border border-[#eaeef2] rounded-lg px-4 py-2 text-sm font-medium text-[#1f2a3e] shadow-sm"
        >
          Contents
          <RiArrowDropDownLine
            className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-[#eaeef2] py-2 z-10 max-h-[60vh] overflow-y-auto">
            <ul className="flex flex-col">
              {TERMS_SECTIONS.map((section) => {
                const isActive = activeId === section.id;
                return (
                  <li key={section.id}>
                    <button
                      onClick={() => {
                        onSelect(section.id);
                        setIsOpen(false);
                      }}
                      className={`block w-full text-left px-5 py-3 text-sm transition-colors ${
                        isActive
                          ? "bg-[#F7F9FB] text-[#02505E] font-medium"
                          : "text-[#5c6b7a] hover:bg-gray-50 hover:text-[#1f2a3e]"
                      }`}
                    >
                      {section.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
