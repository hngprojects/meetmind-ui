import React from "react";
import {
  LuSearch,
  LuBookOpen,
  LuPlug,
  LuCpu,
  LuClipboardList,
  LuMessageSquare,
  LuMail,
  LuFileText,
  LuCode,
  LuCirclePlay,
  LuChevronRight,
} from "react-icons/lu";

export default function HelpSupport() {
  return (
    <div className="max-w-4xl space-y-10 pb-16">
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A]">Help & Support</h2>
          <p className="text-sm text-[#5E6470] mt-1">
            Find answers, reach the team, or explore what MeetMind can do.
          </p>
        </div>

        <div className="relative">
          <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search help articles..."
            aria-label="Search help articles"
            className={`
              w-full pl-11 pr-4 py-3 bg-white border border-[#DADADA]
              rounded-xl text-gray-800 text-sm focus:outline-none
              focus:border-[#02505e] transition-colors shadow-sm
            `}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer text-left w-full"
          >
            <div className="mb-4 text-[#02505E]">
              <LuBookOpen className="text-xl" />
            </div>
            <h3 className="text-sm font-bold text-[#0F172A] mb-1">
              Getting started
            </h3>
            <p className="text-xs text-[#5E6470]">
              Set up your first AI interview in minutes.
            </p>
          </button>

          <button
            type="button"
            className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer text-left w-full"
          >
            <div className="mb-4 text-[#02505E]">
              <LuPlug className="text-xl" />
            </div>
            <h3 className="text-sm font-bold text-[#0F172A] mb-1">
              Integrations
            </h3>
            <p className="text-xs text-[#5E6470]">
              Connect Zoom, Google Meet and more.
            </p>
          </button>

          <button
            type="button"
            className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer text-left w-full"
          >
            <div className="mb-4 text-[#02505E]">
              <LuCpu className="text-xl" />
            </div>
            <h3 className="text-sm font-bold text-[#0F172A] mb-1">
              AI agent behaviour
            </h3>
            <p className="text-xs text-[#5E6470]">
              Understand how MeetMind speaks and listens.
            </p>
          </button>

          <button
            type="button"
            className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer text-left w-full"
          >
            <div className="mb-4 text-[#02505E]">
              <LuClipboardList className="text-xl" />
            </div>
            <h3 className="text-sm font-bold text-[#0F172A] mb-1">
              Export reports
            </h3>
            <p className="text-xs text-[#5E6470]">
              Share interview details, notes & metrics with your team.
            </p>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            className={`
            flex-1 flex items-center justify-center gap-2 px-4 py-3.5
            bg-[#02505E] hover:bg-[#02505E]/95 text-white font-semibold text-sm
            rounded-xl transition-all shadow-sm cursor-pointer
          `}
          >
            <LuMessageSquare className="text-lg" />
            Chat with us
          </button>
          <button
            type="button"
            className={`
            flex-1 flex items-center justify-center gap-2 px-4 py-3.5 bg-white
            border border-[#DADADA] hover:bg-gray-50 text-[#0F172A] font-semibold
            text-sm rounded-xl transition-all cursor-pointer
          `}
          >
            <LuMail className="text-lg" />
            Send an email
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <button
          type="button"
          className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="text-gray-500">
              <LuFileText className="text-xl" />
            </div>
            <span className="text-sm font-bold text-[#0F172A]">
              Documentation
            </span>
          </div>
          <LuChevronRight className="text-gray-400 text-xl" />
        </button>

        <button
          type="button"
          className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="text-gray-500">
              <LuCode className="text-xl" />
            </div>
            <span className="text-sm font-bold text-[#0F172A]">
              API reference
            </span>
          </div>
          <LuChevronRight className="text-gray-400 text-xl" />
        </button>

        <button
          type="button"
          className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="text-gray-500">
              <LuCirclePlay className="text-xl" />
            </div>
            <span className="text-sm font-bold text-[#0F172A]">
              Video tutorials
            </span>
          </div>
          <LuChevronRight className="text-gray-400 text-xl" />
        </button>
      </section>
    </div>
  );
}
