"use client"; // Required for useState and useEffect in Next.js App Router

import { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosMenu } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F7F9FB] border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo + Brand Name */}
        <div className="flex gap-6">
          <Link href="/#hero" className="flex items-center">
            <Image
              src="/icons/meetmind-logo.svg"
              alt="MeetMind Logo"
              className="h-8 w-auto"
              width={32}
              height={32}
              priority
            />
          </Link>
          <p className="font-bold text-[24px]">
            Meet<span className="text-[#4F46E5]">Mind</span>
          </p>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[#0F172A] text-sm"
            >
              {link.label}
            </Link>
          ))}

          {/* DOCS */}
          <div className="relative flex items-center">
            <Link
              href="/coming-soon"
              className="flex items-center gap-1 text-[#0F172A] text-sm font-medium cursor-pointer"
            >
              <span>Docs</span>
              <RiArrowDropDownLine className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Desktop CTA Button */}
        <Link
          href="/sign-up"
          className="hidden md:inline-block px-8 py-2 bg-[#02505E] hover:bg-[#02505ece] text-[#FEFEFF] font-semibold rounded-lg text-sm cursor-pointer"
        >
          Try Demo
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-[#0F172A]"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-controls="mobile-menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <MdOutlineCancel size={24} />
          ) : (
            <IoIosMenu size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="bg-[#ffffff] border-t border-gray-200 md:hidden">
          <div className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[#0F172A] text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/docs"
              className="flex items-center gap-1 text-[#0F172A] text-sm font-medium cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Docs</span>
            </Link>
            <Link
              href="/sign-up"
              className="inline-block text-center px-4 py-2 bg-[#02505E] hover:bg-[#02505ece] text-[#FEFEFF] font-semibold rounded-lg text-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Try Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
