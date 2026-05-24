"use client";

import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";

const AvailabilityForm = () => {
  const [showAvailability, setShowAvailability] = useState(true);

  return (
    <section className="rounded-lg border border-calendar-border bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <h3 className="text-[14px] font-normal text-text-subtext">
            Time Available
          </h3>
        </div>

        <button
          onClick={() => setShowAvailability(!showAvailability)}
          className="text-[14px] font-normal text-text-primary"
        >
          {showAvailability ? "Hide" : "Show"}
        </button>
      </div>

      {showAvailability && (
        <div className="border-t border-calendar-border px-5 py-5">
          <div className="space-y-5">
            {/* Time Inputs */}
            <div className="flex items-center gap-3">
              {/* Start Time */}
              <div
                className="flex h-12 w-[150px] items-center justify-between
                  rounded-lg border border-calendar-border px-4"
              >
                <span className="text-sm text-text-subtext">00:00</span>

                <div className="h-6 w-px bg-calendar-border" />

                <span className="text-sm text-text-subtext">AM</span>
              </div>

              {/* Divider */}
              <div className="h-px w-6 bg-text-divider" />

              {/* End Time */}
              <div
                className=" flex h-12 w-[150px] items-center justify-between
                  rounded-lg border border-calendar-border px-4"
              >
                <span className="text-sm text-text-subtext">00:00</span>

                <div className="h-6 w-px bg-calendar-border" />

                <span className="text-sm text-text-subtext">PM</span>
              </div>
            </div>

            {/* User Name */}
            <div className="space-y-2">
              <label className="text-sm text-text-subtext">User name</label>

              <select
                className=" h-12 w-full rounded-lg border border-calendar-border
                        px-4 text-sm outline-none"
              >
                <option>Precious Joe</option>
              </select>
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label className="text-sm text-text-subtext">Email address</label>

              <div
                className=" flex h-12 items-center gap-3 rounded-lg border 
                  border-calendar-border px-4"
              >
                <span className="text-text-placeholder">
                  <HiOutlineMail className="text-lg text-text-placeholder" />
                </span>

                <input
                  type="email"
                  placeholder="you@company.com"
                  className=" w-full bg-transparent text-sm outline-none"
                />
              </div>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <label className="text-sm text-text-subtext">Role</label>

              <input
                type="text"
                placeholder="-"
                className=" h-12 w-full rounded-lg border border-calendar-border
                  px-4 text-sm outline-none"
              />
            </div>

            {/* Button */}
            <button
              className="flex h-12 w-full md:w-[190px] items-center justify-center rounded-lg 
                cursor-pointer bg-text-primary text-sm font-medium text-white transition-opacity 
                hover:opacity-90"
            >
              Schedule Meeting
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AvailabilityForm;
