import { FileText, ExternalLink, MessageCircle, Globe } from "lucide-react";

const resources = [
  { icon: <FileText size={22} className="text-[#3B82F6]" />, title: "Getting Started Guide", description: "Learn the basics of MeetMind" },
  { icon: <Globe size={22} className="text-[#3B82F6]" />, title: "API Documentation", description: "Developer reference and SDK docs" },
  { icon: <ExternalLink size={22} className="text-[#3B82F6]" />, title: "Video Tutorials", description: "Watch step-by-step tutorials" },
  { icon: <MessageCircle size={22} className="text-[#3B82F6]" />, title: "Community Forum", description: "Connect with other users" },
];

export function QuickResources() {
  return (
    <section className="w-full bg-white pb-14">
      <div className="max-w-[930px] mx-auto px-6">
        <h2 className="text-base font-bold text-[#0F172A] mb-4">Quick Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((r) => (
            <button
              key={r.title}
              className="flex flex-col items-start gap-3 p-5 rounded-2xl bg-[#F1F5FF] hover:bg-[#E8EFFE] transition-colors text-left w-full group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#DBEAFE] flex items-center justify-center shrink-0">
                {r.icon}
              </div>
              <p className="text-sm font-semibold text-[#0F172A] group-hover:text-[#02505E] transition-colors">{r.title}</p>
              <p className="text-xs text-[#64748b] -mt-2">{r.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}