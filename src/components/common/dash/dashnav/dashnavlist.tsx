"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type DashLinks = {
  title: string;
  link: string;
  id: number;
};

const dashnav: DashLinks[] = [
  { title: "Dashboard", link: "/dashboard", id: 0 },
  { title: "Candidates", link: "/candidates", id: 1 },
  { title: "Interviews", link: "/interviews", id: 2 },
  { title: "Calendar", link: "/calendar", id: 3 },
];

type DashnavProps = {
  mobile?: boolean;
  onLinkClick?: () => void;
};

const Dashnavlist = ({ mobile, onLinkClick }: DashnavProps) => {
  // track page
  const pathname = usePathname();
  return (
    <section
      className={`flex ${mobile ? "flex-col gap-1" : "flex-row justify-around"} w-full`}
    >
      {dashnav.map((nav) => {
        const isActive =
          pathname === nav.link ||
          (nav.link !== "/" && pathname.startsWith(`${nav.link}/`));
        const itemClassName = [
          "flex items-center rounded-lg transition-colors",
          mobile ? "h-11 justify-start px-4" : "h-9 justify-center px-2",
          isActive
            ? mobile
              ? "bg-gray-100 font-medium text-[#0F172A]"
              : "bg-surface font-medium text-[#0F172A]"
            : mobile
              ? "text-gray-600 hover:bg-gray-50"
              : "text-gray-600 hover:bg-surface",
        ].join(" ");

        return (
          <div className={itemClassName} key={nav.id}>
            <Link
              href={nav.link}
              className={mobile ? "flex h-full w-full items-center" : ""}
              onClick={onLinkClick}
              aria-current={isActive ? "page" : undefined}
            >
              {nav.title}
            </Link>
          </div>
        );
      })}
    </section>
  );
};

export default Dashnavlist;
