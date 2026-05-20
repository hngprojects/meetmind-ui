import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { label: "Documentation", href: "/docs" },
  { label: "Github", href: "#" },
  { label: "Changelog", href: "/changelog" },
  { label: "Privacy", href: "/privacy" },
  { label: "SDK2026", href: "#" },
  { label: "V0.10", href: "#" },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="w-full bg-[#0F172A] text-[#FEFEFF] py-4 md:py-24 px-4 md:px-20 flex flex-col  items-center"
    >
      <div className="w-full  flex flex-col gap-4">
        {/* Top Section: Link Menu */}
        <nav
          aria-label="footer nav links"
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 font-normal text-base"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-gray-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="w-full flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
          {/* Logo Brand Frame */}
          <Link
            href="#sdkhero"
            aria-label="Go to SDK hero section"
            className="flex items-center gap-4  shrink-0"
          >
            <Image
              src="/icons/meetmind-logo.svg"
              alt="MeetMind Symbol"
              width={32}
              height={32}
              className="h-8 w-auto object-contain"
            />

            <Image
              src="/icons/MeetMindText.svg"
              alt="MeetMind Text"
              width={100}
              height={20}
              className="h-5 w-auto object-contain"
            />
          </Link>

          {/* Copyright Tag */}
          <p className="text-sm md:text-base font-normal text-[#FEFEFF] md:text-right">
            &copy; {new Date().getFullYear()} MeetMind LTD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
