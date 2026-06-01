"use client";
import React, { useState } from "react";
import { ToggleSwitch } from "@/components/common/ToggleSwitch";
import Link from "next/link";

export default function SettingsForm() {
  // State for selectors
  const [preferences, setPreferences] = useState({
    interviewType: "Product Designer",
    duration: "1 hr",
    evaluationFocus:
      "Problem understanding, portfolio clarity, sharp product thinking, collaboration style, visual judgment, and keen ability to explain tradeoffs.",
  });

  // State for notifications toggles
  const [notifications, setNotifications] = useState({
    goesLive: true,
    completed: true,
    weeklyDigest: true,
    updates: true,
  });

  const handlePreferenceChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-4xl space-y-10 pb-16">
      {/* 1. Interview Preferences Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A]">
            Interview Preferences
          </h2>
          <p className="text-sm text-[#5E6470] mt-1">
            Set the default structure MeetMind uses when helping you interview
            candidates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#0F172A]">
              Default interview type
            </label>
            <div className="relative">
              <select
                name="interviewType"
                value={preferences.interviewType}
                onChange={handlePreferenceChange}
                className={`
                  w-full px-4 py-3 bg-white border border-[#DADADA] rounded-xl
                  text-gray-800 text-sm focus:outline-none focus:border-[#02505e]
                  transition-colors appearance-none cursor-pointer
                `}
              >
                <option value="Product Designer">Product Designer</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Data Analyst">Data Analyst</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#0F172A]">
              Default duration
            </label>
            <div className="relative">
              <select
                name="duration"
                value={preferences.duration}
                onChange={handlePreferenceChange}
                className={`
                  w-full px-4 py-3 bg-white border border-[#DADADA] rounded-xl
                  text-gray-800 text-sm focus:outline-none focus:border-[#02505e]
                  transition-colors appearance-none cursor-pointer
                `}
              >
                <option value="30 mins">30 mins</option>
                <option value="45 mins">45 mins</option>
                <option value="1 hr">1 hr</option>
                <option value="1.5 hrs">1.5 hrs</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#0F172A]">
            Evaluation Focus
          </label>
          <textarea
            name="evaluationFocus"
            value={preferences.evaluationFocus}
            onChange={handlePreferenceChange}
            rows={4}
            className={`
              w-full px-4 py-3 bg-white border border-[#DADADA] rounded-xl
              text-gray-800 text-sm focus:outline-none focus:border-[#02505e]
              transition-colors resize-none leading-relaxed
            `}
          />
        </div>
      </section>

      <hr className="border-gray-100" />

      {/* 2. Notifications Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A]">Notifications</h2>
          <p className="text-sm text-[#5E6470] mt-1">
            Choose what we email you about.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <span className="text-sm font-semibold text-[#0F172A]">
              Interview goes live
            </span>
            <ToggleSwitch
              checked={notifications.goesLive}
              onChange={() => handleToggle("goesLive")}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <span className="text-sm font-semibold text-[#0F172A]">
              Interview completed
            </span>
            <ToggleSwitch
              checked={notifications.completed}
              onChange={() => handleToggle("completed")}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <span className="text-sm font-semibold text-[#0F172A]">
              Weekly digest
            </span>
            <ToggleSwitch
              checked={notifications.weeklyDigest}
              onChange={() => handleToggle("weeklyDigest")}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <span className="text-sm font-semibold text-[#0F172A]">
              Product updates
            </span>
            <ToggleSwitch
              checked={notifications.updates}
              onChange={() => handleToggle("updates")}
            />
          </div>
        </div>
      </section>

      <hr className="border-gray-100" />

      {/* 3. Security Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A]">Security</h2>
          <p className="text-sm text-[#5E6470] mt-1">Protect your account.</p>
        </div>

        <div className="space-y-4">
          {/* 2FA Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl gap-4 shadow-sm">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">
                Two-factor authentication
              </h3>
              <p className="text-xs text-[#5E6470] mt-0.5">Not enabled</p>
            </div>
            <button
              type="button"
              className={`
                px-5 py-2.5 bg-[#02505E] hover:bg-[#02505E]/95 text-white
                font-semibold text-sm rounded-xl transition-colors cursor-pointer
                w-full sm:w-auto text-center shadow-sm
              `}
            >
              Enable
            </button>
          </div>

          {/* Active Sessions Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl gap-4 shadow-sm">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">
                Active sessions
              </h3>
              <p className="text-xs text-[#5E6470] mt-0.5">2 active sessions</p>
            </div>
            <button
              type="button"
              className={`
                px-5 py-2.5 bg-[#02505E] hover:bg-[#02505E]/95 text-white
                font-semibold text-sm rounded-xl transition-colors cursor-pointer
                w-full sm:w-auto text-center shadow-sm
              `}
            >
              <Link href="/calendar">Manage</Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
