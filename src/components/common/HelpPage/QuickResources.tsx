import { FileText, Globe, Video, Users } from "lucide-react";

const resources = [
  {
    icon: <FileText size={20} className="text-slate-500" />,
    title: "Getting Started Guide",
    description: "Learn the basics of MeetMind",
  },
  {
    icon: <Globe size={20} className="text-slate-500" />,
    title: "API Documentation",
    description: "Developer reference and SDK docs",
  },
  {
    icon: <Video size={20} className="text-slate-500" />,
    title: "Video Tutorials",
    description: "Watch step-by-step tutorials",
  },
  {
    icon: <Users size={20} className="text-slate-500" />,
    title: "Community Forum",
    description: "Connect with other users",
  },
];

export function QuickResources() {
  return (
    <section className="w-full bg-white px-6 pb-14">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-sm font-semibold text-[#0F172A] mb-4">
          Quick Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {resources.map((r) => (
            <button
              key={r.title}
              className="flex flex-col items-start gap-3 p-5 rounded-xl border border-[#E1E3E4] bg-white hover:bg-slate-50 transition-colors text-left w-full group"
            >
              {/* Icon box */}
              <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                {r.icon}
              </div>
              {/* Title */}
              <p className="text-sm font-semibold text-[#0F172A] group-hover:text-[#02505E] transition-colors">
                {r.title}
              </p>
              {/* Description */}
              <p className="text-xs text-[#64748b] -mt-2">{r.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}