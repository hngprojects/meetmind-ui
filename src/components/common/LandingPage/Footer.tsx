import Image from "next/image";
import Link from "next/link";

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Use Cases", href: "#" },
      { label: "Pricing", href: "/pricing" },
      { label: "ChangeLog", href: "#" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "SDK", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blogpost" },
      { label: "Help Center", href: "#" },
      { label: "Case Studies", href: "#" },
      { label: "Tutorials", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

const socialLinks = [
  { name: "LinkedIn", icon: "/icons/linkedin-outline.svg", href: "#" },
  { name: "Facebook", icon: "/icons/facebook-outline.svg", href: "#" },
  { name: "GitHub", icon: "/icons/github-outline.svg", href: "#" },
  { name: "Instagram", icon: "/icons/instagram-outline.svg", href: "#" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white pt-16 pb-8 border-t border-[#E1E3E4]">
      <div className="max-w-7xl mx-auto px-8 md:px-10 lg:px-22.5">
        <div
          className="flex flex-col lg:flex-row items-start md:items-center 
                lg:items-start lg:justify-between gap-12"
        >
          <div
            className="max-w-xs md:max-w-lg lg:max-w-xs md:flex flex-col 
                  md:items-center lg:items-start"
          >
            <div className="flex gap-3">
              <Link href="/" className="flex items-center">
                <Image
                  src="/icons/meetmind-logo.svg"
                  alt="MeetMind logo"
                  width={42}
                  height={42}
                  className="h-10 w-auto"
                />
              </Link>
              <p className="font-bold text-[24px]">
                Meet<span className="text-[#4F46E5]">Mind</span>
              </p>
            </div>
            <p
              className="mt-4 text-sm text-[#3F4555] md:text-center lg:text-start 
                leading-relaxed"
            >
              MeetMind joins your call, tracks coverage, and delivers a
              structured summary instantly.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                >
                  <Image
                    src={social.icon}
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-20 lg:gap-20">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h4 className="text-[#0F172A] text-sm font-semibold mb-4">
                  {column.title}
                </h4>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[#3F4555] text-sm hover:text-[#3F4555]/40 
                          transition-colors text-left cursor-pointer block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="mt-12 border border-[#E1E3E4]" />

        {/* Copyright */}
        <p className="mt-8 text-center text-[#64748B] text-xs">
          ©{currentYear} MeetMind LTD. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
