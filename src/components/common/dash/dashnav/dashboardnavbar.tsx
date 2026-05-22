"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { MdKeyboardArrowDown } from "react-icons/md";

const NAV_LINKS = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Candidates", href: "/candidates" },
  { title: "Interviews", href: "/interviews" },
  { title: "Calendar", href: "/calendar" },
];

export default function DashboardNavbar() {
  const pathname = usePathname();

  return (
    <header className="px-10 py-5">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/icons/meetmind-full-logo.svg"
            alt="MeetMind Logo"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
        </Link>

        <nav className="flex h-10 items-center gap-1 rounded-lg bg-white px-1 shadow-sm ring-1 ring-[#e5e7eb]">
          {NAV_LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-[#e7f2f3] text-[#0e797e]"
                    : "text-[#6b7280] hover:text-[#0f172a]",
                )}
              >
                {link.title}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-6 text-[#6b7280]">
          <HiOutlineMagnifyingGlass className="h-5 w-5 cursor-pointer" />
          <div className="relative">
            {/* <HiOutlineBell className="h-5 w-5 cursor-pointer" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500" /> */}
            <Image
              src="/icons/bell-notification.svg"
              alt="bell-notification"
              width={20}
              height={20}
            />
          </div>
          <div className="flex cursor-pointer items-center gap-1">
            <div className="h-9 w-9 overflow-hidden rounded-full bg-[#d1d5db]">
              <Image
                src="/images/profile-pic.png"
                alt="profile-icon"
                width={35}
                height={35}
              />
            </div>
            <MdKeyboardArrowDown className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
