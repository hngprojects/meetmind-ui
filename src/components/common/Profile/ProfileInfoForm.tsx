"use client";
import React, { useState } from "react";
import { ToggleSwitch } from "@/components/common/ToggleSwitch";

export default function ProfileInfoForm() {
  // State for form fields
  const [profile, setProfile] = useState({
    fullName: "John Micheal",
    role: "Hiring Manager",
    company: "Emmy LLC",
    email: "johnmicheal@gmail.com",
  });

  // State for toggles
  const [requireApproval, setRequireApproval] = useState(true);
  const [hideNotes, setHideNotes] = useState(true);

  // State for passwords
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirmPass: "",
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl space-y-10 pb-16">
      {/* 1. Profile Information Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A]">
            Profile Information
          </h2>
          <p className="text-sm text-[#5E6470] mt-1">
            This information appears on interview sessions, candidate reports,
            and team review rates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#0F172A]">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleProfileChange}
              className="w-full px-4 py-3 bg-white border border-[#DADADA] rounded-xl text-gray-800 text-sm focus:outline-none focus:border-[#02505e] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#0F172A]">Role</label>
            <input
              type="text"
              name="role"
              value={profile.role}
              onChange={handleProfileChange}
              className="w-full px-4 py-3 bg-white border border-[#DADADA] rounded-xl text-gray-800 text-sm focus:outline-none focus:border-[#02505e] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#0F172A]">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={profile.company}
              onChange={handleProfileChange}
              className="w-full px-4 py-3 bg-white border border-[#DADADA] rounded-xl text-gray-800 text-sm focus:outline-none focus:border-[#02505e] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#0F172A]">
              Work Email
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="w-full px-4 py-3 bg-white border border-[#DADADA] rounded-xl text-gray-800 text-sm focus:outline-none focus:border-[#02505e] transition-colors"
            />
          </div>
        </div>

        <button
          type="button"
          className="px-6 py-3 bg-[#E5E7EB] text-gray-500 hover:bg-gray-200/80 font-medium text-sm rounded-xl transition-all cursor-pointer"
        >
          Save changes
        </button>
      </section>

      <hr className="border-gray-100" />

      {/* 2. Password Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A]">Password</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#0F172A]">
              Current password
            </label>
            <input
              type="password"
              name="current"
              value={passwords.current}
              onChange={handlePasswordChange}
              className="w-full px-4 py-3 bg-white border border-[#DADADA] rounded-xl text-gray-800 text-sm focus:outline-none focus:border-[#02505e] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#0F172A]">
              New password
            </label>
            <input
              type="password"
              name="newPass"
              value={passwords.newPass}
              onChange={handlePasswordChange}
              className="w-full px-4 py-3 bg-white border border-[#DADADA] rounded-xl text-gray-800 text-sm focus:outline-none focus:border-[#02505e] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#0F172A]">
              Confirm password
            </label>
            <input
              type="password"
              name="confirmPass"
              value={passwords.confirmPass}
              onChange={handlePasswordChange}
              className="w-full px-4 py-3 bg-white border border-[#DADADA] rounded-xl text-gray-800 text-sm focus:outline-none focus:border-[#02505e] transition-colors"
            />
          </div>
        </div>

        <button
          type="button"
          className="px-6 py-3 bg-[#E5E7EB] text-gray-500 hover:bg-gray-200/80 font-medium text-sm rounded-xl transition-all cursor-pointer"
        >
          Update password
        </button>
      </section>

      <hr className="border-gray-100" />

      {/* 3. Meeting Platforms Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A]">
            Meeting Platforms
          </h2>
          <p className="text-sm text-[#5E6470] mt-1">
            Connect at least one platform so MeetMind AI can join your calls.
          </p>
        </div>

        <div className="space-y-4">
          {/* Google Meet Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 rounded-xl">
                {/* Fallback Meet Icon */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 10V4C16 2.89543 15.1046 2 14 2H3C1.89543 2 1 2.89543 1 4V20C1 21.1046 1.89543 22 3 22H14C15.1046 22 16 21.1046 16 20V14L22 19V5L16 10Z"
                    fill="#34A853"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0F172A]">
                  Google Meet
                </h3>
                <p className="text-xs text-[#5E6470]">
                  Used for live interview calls and transcripts.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="px-5 py-2.5 border border-[#DADADA] hover:bg-gray-50 text-gray-700 font-semibold text-sm rounded-xl transition-colors cursor-pointer w-full sm:w-auto text-center"
            >
              Disconnect
            </button>
          </div>

          {/* Zoom Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 rounded-xl">
                {/* Fallback Zoom Icon */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 10L21 6V18L15 14V17C15 18.1 14.1 19 13 19H3C1.9 19 1 18.1 1 17V7C1 5.9 1.9 5 3 5H13C14.1 5 15 5.9 15 7V10Z"
                    fill="#2D8CFF"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0F172A]">Zoom</h3>
                <p className="text-xs text-[#5E6470]">
                  Used to share candidate summaries with the hiring team.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="px-5 py-2.5 bg-[#02505E] hover:bg-[#02505E]/95 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer w-full sm:w-auto text-center"
            >
              Connect
            </button>
          </div>
        </div>
      </section>

      <hr className="border-gray-100" />

      {/* 4. Privacy and Access Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A]">
            Privacy and Access
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <span className="text-sm font-semibold text-[#0F172A]">
              Require approval before sharing summaries
            </span>
            <ToggleSwitch
              checked={requireApproval}
              onChange={() => setRequireApproval(!requireApproval)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <span className="text-sm font-semibold text-[#0F172A]">
              Hide private manager notes
            </span>
            <ToggleSwitch
              checked={hideNotes}
              onChange={() => setHideNotes(!hideNotes)}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
