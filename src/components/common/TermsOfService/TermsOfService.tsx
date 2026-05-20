"use client";

import React, { useState, useEffect } from "react";
import TermsSidebar from "./TermsSidebar";
import TermsContent from "./TermsContent";
import TermsCTA from "./TermsCTA";
import Image from "next/image";

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState("definitions");

  const handleSelect = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120; // Offset for fixed navbar
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[id]");
      let currentActive = activeSection;

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        // If the section is near the top of the viewport
        if (sectionTop <= 150 && sectionTop > -500) {
          if (section.id) {
            currentActive = section.id;
          }
        }
      });

      if (currentActive !== activeSection) {
        setActiveSection(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  return (
    <div className="w-full bg-[#F8FAFC]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px] pt-32 pb-16">
        {/* Header Section */}
        <div className="relative w-full flex flex-col md:flex-row items-center justify-center mb-12 md:mb-20">
          <h1 className="text-3xl md:text-5xl font-bold text-[#1f2a3e] text-center w-full z-10">
            Terms of Service
          </h1>
          {/* Document Graphic */}
          <div className="md:absolute right-0 top-1/2 md:-translate-y-1/2 mt-6 md:mt-0 opacity-80">
            <Image
              src="/icons/streamline-freehand_task-list-clipboard-favorite-star.svg"
              alt="Terms of Service Star Icon"
              width={100}
              height={100}
              className="w-[100px] h-[100px]"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row items-start gap-8 lg:gap-16">
          <TermsSidebar activeId={activeSection} onSelect={handleSelect} />

          <div className="flex-1 w-full">
            <TermsContent />
          </div>
        </div>

        {/* CTA Banner */}
        <TermsCTA />
      </div>
    </div>
  );
}
