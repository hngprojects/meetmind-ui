import Link from "next/link";
import {
  BsFileText,
  BsBoxArrowUpRight,
  BsChatSquare,
  BsGlobe,
} from "react-icons/bs";

const resources = [
  {
    icon: <BsFileText size={22} className="text-[#3B82F6]" />,
    title: "Getting Started Guide",
    description: "Learn the basics of MeetMind",
    href: "/help#getting-started", 
  },
  {
    icon: <BsGlobe size={22} className="text-[#3B82F6]" />,
    title: "API Documentation",
    description: "Developer reference and SDK docs",
    href: "/help#api", 
  },
  {
    icon: <BsBoxArrowUpRight size={22} className="text-[#3B82F6]" />,
    title: "Video Tutorials",
    description: "Watch step-by-step tutorials",
    href: "/help#tutorials", 
  },
  {
    icon: <BsChatSquare size={22} className="text-[#3B82F6]" />,
    title: "Community Forum",
    description: "Connect with other users",
    href: "/help#community", 
  },
];

export function QuickResources() {
  return (
    <section className="w-full bg-white pb-14">
      <div className="max-w-[930px] mx-auto px-6">
        <h2 className="text-base font-bold text-[#0F172A] mb-4">
          Quick Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((r) => (
            <Link
              key={r.title}
              href={r.href}
              className="flex flex-col items-start gap-3 p-5 rounded-2xl bg-[#F1F5FF] hover:bg-[#E8EFFE] transition-colors text-left w-full group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#DBEAFE] flex items-center justify-center shrink-0">
                {r.icon}
              </div>
              <p className="text-sm font-semibold text-[#0F172A] group-hover:text-[#02505E] transition-colors">
                {r.title}
              </p>
              <p className="text-xs text-[#64748b] -mt-2">{r.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
