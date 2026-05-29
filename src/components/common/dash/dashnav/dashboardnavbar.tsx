"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Dashnavlist from "./dashnavlist";
import SignOutModal from "./SignOutModal";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  LuUser,
  LuSettings,
  LuCreditCard,
  LuCircleHelp,
  LuLogOut,
  LuMenu,
  LuX,
} from "react-icons/lu";

const Dashboardnavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Unread notification count — wire to real API when backend is ready
  const unreadNotificationCount = 3;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="border-b border-[#E5E7EB] bg-white sticky top-0 z-50">
      <div className="flex flex-row justify-between py-4 md:py-6 px-4 md:px-8 lg:px-16 items-center">
        {/* Mobile Menu Button + Logo */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <button
            type="button"
            className="md:hidden p-1.5 -ml-1.5 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
          </button>

          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/icons/meetmind-logo.svg"
              alt="MeetMind Logo"
              width={32}
              height={32}
              className="h-7 w-auto md:h-8"
            />
            <p className="font-bold text-[20px] md:text-[24px]">
              Meet<span className="text-[#4F46E5]">Mind</span>
            </p>
          </Link>
        </div>

        <div className="flex items-center justify-end h-10 flex-1 gap-4 md:gap-8">
          {/* Desktop navlist */}
          <div className="hidden md:flex h-10 bg-card rounded-lg items-center justify-center">
            <Dashnavlist />
          </div>

          {/* icons & profile dropdown */}
          <div className="flex flex-row items-center justify-end gap-3 md:gap-6 shrink-0">
            <button
              type="button"
              className="p-1 hover:bg-gray-50 rounded-full transition-colors cursor-pointer"
            >
              <Image
                src="/icons/magnifying-lens.svg"
                alt="search-icon"
                width={20}
                height={20}
              />
            </button>

            {/* Bell icon → Notifications page */}
            <Link
              href="/notifications"
              className="relative p-1 hover:bg-gray-50 rounded-full transition-colors cursor-pointer"
              aria-label={`Notifications, ${unreadNotificationCount} unread`}
            >
              <Image
                src="/icons/bell-notification.svg"
                alt="bell-notification"
                width={20}
                height={20}
              />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#EF4444] text-white text-[9px] font-bold flex items-center justify-center leading-none">
                  {unreadNotificationCount > 9 ? "9+" : unreadNotificationCount}
                </span>
              )}
            </Link>

            {/* Profile Dropdown Container */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity p-1 rounded-lg"
              >
                <div className="w-[35px] h-[35px] rounded-full overflow-hidden border border-gray-100">
                  <Image
                    src="/images/profile-icon.png"
                    alt="profile-icon"
                    width={35}
                    height={35}
                    className="object-cover"
                  />
                </div>
                <MdKeyboardArrowDown
                  className={`text-xl transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2.5 border-b border-gray-50">
                    <p className="text-sm font-semibold text-[#0F172A]">
                      John Micheal
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      johnmicheal@gmail.com
                    </p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <LuUser className="text-lg text-gray-400" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <LuSettings className="text-lg text-gray-400" />
                      <span>Setting</span>
                    </Link>
                    <Link
                      href="#"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <LuCreditCard className="text-lg text-gray-400" />
                      <span>Billing</span>
                    </Link>
                    <Link
                      href="/help"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <LuCircleHelp className="text-lg text-gray-400" />
                      <span>Help Center</span>
                    </Link>
                  </div>

                  <div className="border-t border-gray-50 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setIsSignOutModalOpen(true);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#EF4444] hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <LuLogOut className="text-lg" />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 absolute w-full left-0 top-full shadow-md animate-in slide-in-from-top-2 duration-150">
          <Dashnavlist mobile onLinkClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}

      <SignOutModal
        isOpen={isSignOutModalOpen}
        onClose={() => setIsSignOutModalOpen(false)}
        onSignOut={() => {
          setIsSignOutModalOpen(false);
          router.push("/sign-in");
        }}
      />
    </section>
  );
};

export default Dashboardnavbar;
