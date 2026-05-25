"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type dashLinks = {
  title: string;
  link: string;
  id: number;
};

const Dashnavlist = () => {
  const dashnav: dashLinks[] = [
    { title: "dashboard", link: "/dashboard", id: 0 },
    { title: "candidates", link: "/candidates", id: 1 },
    { title: "interviews", link: "/interviews", id: 2 },
    { title: "calendar", link: "/calendar", id: 3 },
  ];
  // track page
  const pathname = usePathname();
  return (
    <section className="flex flex-row justify-around w-full">
      {dashnav.map((nav) => (
        <div
          className={`${pathname === nav.link && "bg-surface"}
             h-9  flex items-center justify-center rounded-lg px-2`}
          key={nav.id}
        >
          <Link href={nav.link}>{nav.title}</Link>
        </div>
      ))}
    </section>
  );
};

export default Dashnavlist;
