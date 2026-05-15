"use client";

import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Temperature", href: "#temperature" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (!target.closest("nav")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff] border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo + Brand Name */}
        <div className="flex gap-6">
          <a href="#hero" className="flex items-center">
            <img
              src="/icons/meetmind-logo.svg"
              alt="MeetMind Logo"
              className="h-8 w-auto"
            />
          </a>
          <p className="font-bold text-[24px]">
            Meet<span className="text-[#4F46E5]">Mind</span>
          </p>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#0F172A] text-sm"
            >
              {link.label}
            </a>
          ))}

          {/* SDK */}
          <div className="relative flex items-center">
            <button
              type="button"
              className="flex items-center gap-1 text-[#0F172A] text-sm font-medium cursor-pointer"
              onClick={() => console.log("SDK menu clicked")}
            >
              <span>SDK</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Desktop CTA Button */}
        <Link
          href="/sign-up"
          className="hidden md:inline-block px-4 py-2 bg-[#02505E] text-[#FEFEFF] font-semibold rounded-lg text-sm cursor-pointer"
        >
          Request early access
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-[#0F172A]"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="bg-[#ffffff] border-t border-gray-200 md:hidden">
          <div className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#0F172A] text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/signup"
              className="inline-block text-center px-4 py-2 bg-[#02505E] text-[#FEFEFF] font-semibold rounded-lg text-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Request early access
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
