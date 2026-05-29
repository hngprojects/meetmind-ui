"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type dashLinks = {
  title: string;
  link: string;
  id: number;
};

type DashnavProps = {
  mobile?: boolean;
  onLinkClick?: () => void;
};

const Dashnavlist = ({ mobile, onLinkClick }: DashnavProps) => {
  const dashnav: dashLinks[] = [
    { title: "Dashboard", link: "/Dashboard", id: 0 },
    { title: "Candidates", link: "/Candidates", id: 1 },
    { title: "Interviews", link: "/Interviews", id: 2 },
    { title: "Calendar", link: "/Calendar", id: 3 },
  ];
  // track page
  const pathname = usePathname();
  return (
    <section
      className={`flex ${mobile ? "flex-col gap-1" : "flex-row justify-around"} w-full`}
    >
      {dashnav.map((nav) => (
        <div
          className={`${
            pathname === nav.link
              ? mobile
                ? "bg-gray-100 font-medium text-[#0F172A]"
                : "bg-surface text-[#0F172A] font-medium"
              : mobile
                ? "text-gray-600 hover:bg-gray-50"
                : "text-gray-600 hover:text-[#0F172A]"
          } ${mobile ? "h-11 justify-start px-4" : "h-9 justify-center px-2"} flex items-center rounded-lg transition-colors`}
          key={nav.id}
        >
          <Link
            href={nav.link}
            className={mobile ? "w-full h-full flex items-center" : ""}
            onClick={onLinkClick}
          >
            {nav.title}
          </Link>
        </div>
      ))}
    </section>
  );
};

export default Dashnavlist;
