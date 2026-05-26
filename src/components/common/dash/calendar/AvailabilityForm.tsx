"use client";

import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import type { Appointment, TimeOption } from "@/lib/appointmentTypes";

type AvailabilityFormProps = {
  selectedAppointment: Appointment | null;
  selectedStartTime: TimeOption | null;
  setSelectedStartTime: React.Dispatch<React.SetStateAction<TimeOption | null>>;
  selectedEndTime: TimeOption | null;
  setSelectedEndTime: React.Dispatch<React.SetStateAction<TimeOption | null>>;
  setIsSuccessModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const availableStartTimes = [
  {
    hour: "10",
    minute: "00",
    period: "AM",
  },

  {
    hour: "11",
    minute: "00",
    period: "AM",
  },

  {
    hour: "10",
    minute: "30",
    period: "AM",
  },

  {
    hour: "11",
    minute: "00",
    period: "PM",
  },
];

const availableEndTimes = [
  {
    hour: "10",
    minute: "30",
    period: "AM",
  },

  {
    hour: "11",
    minute: "30",
    period: "PM",
  },

  {
    hour: "11",
    minute: "15",
    period: "PM",
  },

  {
    hour: "12",
    minute: "00",
    period: "PM",
  },
];

const AvailabilityForm = ({
  selectedAppointment,
  selectedStartTime,
  setSelectedStartTime,
  selectedEndTime,
  setSelectedEndTime,
  setIsSuccessModalOpen,
}: AvailabilityFormProps) => {
  const [showAvailability, setShowAvailability] = useState(true);

  const [showStartDropdown, setShowStartDropdown] = useState(false);

  const [showEndDropdown, setShowEndDropdown] = useState(false);

  const isFormComplete =
    selectedAppointment && selectedStartTime && selectedEndTime;

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
        <div className="px-5">
          <div className="space-y-5">
            {/* Time Inputs */}
            <div className="flex items-center gap-3">
              {/* Start Time */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowStartDropdown(!showStartDropdown)}
                  className="
                    flex h-12 w-[150px] items-center justify-between
                    rounded-lg border border-calendar-border
                    px-4
                  "
                >
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-text-subtext">
                      {selectedStartTime?.hour || "00"}
                    </span>

                    <span className="text-sm text-text-subtext">:</span>

                    <span className="text-sm text-text-subtext">
                      {selectedStartTime?.minute || "00"}
                    </span>
                  </div>

                  <div className="h-6 w-px bg-calendar-border" />

                  <span className="text-sm text-text-subtext">
                    {selectedStartTime?.period || "AM"}
                  </span>
                </button>

                {showStartDropdown && (
                  <div
                    className="absolute left-0 top-14 z-20 w-[150px] rounded-xl 
                      border border-calendar-border bg-white p-2 shadow-md"
                  >
                    {availableStartTimes.map((time, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setSelectedStartTime(time);
                          setShowStartDropdown(false);
                        }}
                        className="flex w-full items-center justify-between
                        rounded-lg px-3 py-2 text-sm hover:bg-soft-white"
                      >
                        <span>
                          {time.hour}:{time.minute}
                        </span>

                        <span>{time.period}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="h-px w-6 bg-text-divider" />

              {/* End Time */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowEndDropdown(!showEndDropdown)}
                  className="
                    flex h-12 w-[150px] items-center justify-between
                    rounded-lg border border-calendar-border
                    px-4
                  "
                >
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-text-subtext">
                      {selectedEndTime?.hour || "00"}
                    </span>

                    <span className="text-sm text-text-subtext">:</span>

                    <span className="text-sm text-text-subtext">
                      {selectedEndTime?.minute || "00"}
                    </span>
                  </div>

                  <div className="h-6 w-px bg-calendar-border" />

                  <span className="text-sm text-text-subtext">
                    {selectedEndTime?.period || "PM"}
                  </span>
                </button>

                {showEndDropdown && (
                  <div
                    className="absolute left-0 top-14 z-20 w-[150px] rounded-xl 
                      border border-calendar-border bg-white p-2 shadow-md"
                  >
                    {availableEndTimes.map((time, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setSelectedEndTime(time);
                          setShowEndDropdown(false);
                        }}
                        className="flex w-full items-center justify-between
                        rounded-lg px-3 py-2 text-sm hover:bg-soft-white"
                      >
                        <span>
                          {time.hour}:{time.minute}
                        </span>

                        <span>{time.period}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* User Name */}
            <div className="space-y-2">
              <label className="text-sm text-text-subtext">User name</label>

              <select
                className=" h-12 w-full rounded-lg border border-calendar-border
                        px-4 text-sm outline-none cursor-pointer"
              >
                <option value={selectedAppointment?.candidate || ""}>
                  {selectedAppointment?.candidate || "Select Candidate"}
                </option>
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
                  value={selectedAppointment?.email || ""}
                  readOnly
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
                value={selectedAppointment?.role || ""}
                readOnly
                placeholder="-"
                className=" h-12 w-full rounded-lg border border-calendar-border
                  px-4 text-sm outline-none"
              />
            </div>

            {/* Button */}
            <button
              type="button"
              disabled={!isFormComplete}
              onClick={() => setIsSuccessModalOpen(true)}
              className={`
                mb-6 flex h-12 w-full md:w-[190px] items-center justify-center rounded-lg
                text-sm font-medium transition-opacity
                ${
                  isFormComplete
                    ? "cursor-pointer bg-text-primary text-white hover:opacity-90"
                    : "cursor-not-allowed bg-gray-300 text-gray-500"
                }
              `}
            >
              Schedule Interview
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AvailabilityForm;
