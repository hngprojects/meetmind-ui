"use client";

import { useEffect, useRef, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import type { Appointment, TimeOption } from "@/lib/appointmentTypes";
import { useCalendarAvailability } from "@/lib/hooks/useCalendar";
import { Button } from "@/components/ui/button";
import { useRescheduleAppointment } from "@/lib/hooks/useCalendar";

type AvailabilityFormProps = {
  selectedAppointment: Appointment | null;
  selectedStartTime: TimeOption | null;
  setSelectedStartTime: React.Dispatch<React.SetStateAction<TimeOption | null>>;
  selectedEndTime: TimeOption | null;
  setSelectedEndTime: React.Dispatch<React.SetStateAction<TimeOption | null>>;
  setIsSuccessModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentDate: Date;
  selectedDate: number;
};

const isStartBeforeEnd = (start: TimeOption, end: TimeOption): boolean => {
  const convertTo24Hour = (time: TimeOption) => {
    let hour = Number(time.hour);
    if (time.period === "PM" && hour !== 12) {
      hour += 12;
    }
    if (time.period === "AM" && hour === 12) {
      hour = 0;
    }
    return hour * 60 + Number(time.minute);
  };
  return convertTo24Hour(start) < convertTo24Hour(end);
};

const AvailabilityForm = ({
  selectedAppointment,
  selectedStartTime,
  setSelectedStartTime,
  selectedEndTime,
  setSelectedEndTime,
  setIsSuccessModalOpen,
  currentDate,
  selectedDate,
}: AvailabilityFormProps) => {
  const [showAvailability, setShowAvailability] = useState(true);

  const rescheduleMutation = useRescheduleAppointment();

  const [showStartDropdown, setShowStartDropdown] = useState(false);

  const [showEndDropdown, setShowEndDropdown] = useState(false);
  const startDropdownRef = useRef<HTMLDivElement | null>(null);
  const endDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        startDropdownRef.current &&
        !startDropdownRef.current.contains(target)
      ) {
        setShowStartDropdown(false);
      }

      if (endDropdownRef.current && !endDropdownRef.current.contains(target)) {
        setShowEndDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedDateObject = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    selectedDate,
  );

  const formattedDate = [
    selectedDateObject.getFullYear(),
    String(selectedDateObject.getMonth() + 1).padStart(2, "0"),
    String(selectedDateObject.getDate()).padStart(2, "0"),
  ].join("-");

  const { data: availabilityResponse } = useCalendarAvailability(formattedDate);

  const availabilitySlots = availabilityResponse ?? [];

  const buildDateTime = (currentDate: Date, day: number, time: TimeOption) => {
    let hour = Number(time.hour);

    if (time.period === "PM" && hour !== 12) {
      hour += 12;
    }

    if (time.period === "AM" && hour === 12) {
      hour = 0;
    }

    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
      hour,
      Number(time.minute),
    ).toISOString();
  };

  const handleScheduleInterview = () => {
    if (!selectedAppointment || !selectedStartTime || !selectedEndTime) {
      return;
    }

    const scheduled_start = buildDateTime(
      currentDate,
      selectedDate,
      selectedStartTime,
    );

    const scheduled_end = buildDateTime(
      currentDate,
      selectedDate,
      selectedEndTime,
    );

    rescheduleMutation.mutate(
      {
        interviewId: selectedAppointment.id,
        payload: {
          scheduled_start,
          scheduled_end,
        },
      },
      {
        onSuccess: () => {
          setIsSuccessModalOpen(true);
        },
      },
    );
  };

  const isFormComplete =
    selectedAppointment &&
    selectedStartTime &&
    selectedEndTime &&
    isStartBeforeEnd(selectedStartTime, selectedEndTime);

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
          className="text-[14px] font-normal text-text-primary cursor-pointer"
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
              <div ref={startDropdownRef} className="relative">
                <Button
                  variant="outline"
                  type="button"
                  aria-expanded={showStartDropdown}
                  aria-controls="start-time-dropdown"
                  onClick={() => setShowStartDropdown(!showStartDropdown)}
                  className="
                    flex h-12 w-[150px] items-center justify-between
                    rounded-lg border border-calendar-border bg-white
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
                </Button>

                {showStartDropdown && (
                  <div
                    id="start-time-dropdown"
                    className="absolute left-0 top-14 z-20 w-[150px] rounded-xl 
                      border border-calendar-border bg-white p-2 shadow-md"
                  >
                    {availabilitySlots.map((slot, index) => (
                      <Button
                        variant="ghost"
                        key={index}
                        type="button"
                        onClick={() => {
                          setSelectedStartTime(slot.startTime);
                          setShowStartDropdown(false);
                        }}
                        className="flex w-full items-center justify-between
                        rounded-lg px-3 py-2 text-sm hover:bg-soft-white"
                      >
                        <span>
                          {slot.startTime.hour}:{slot.startTime.minute}
                        </span>

                        <span>{slot.startTime.period}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="h-px w-6 bg-text-divider" />

              {/* End Time */}
              <div ref={endDropdownRef} className="relative">
                <Button
                  variant="outline"
                  type="button"
                  aria-expanded={showEndDropdown}
                  aria-controls="end-time-dropdown"
                  onClick={() => setShowEndDropdown(!showEndDropdown)}
                  className="
                    flex h-12 w-[150px] items-center justify-between
                    rounded-lg border border-calendar-border bg-white
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
                </Button>

                {showEndDropdown && (
                  <div
                    id="end-time-dropdown"
                    className="absolute left-0 top-14 z-20 w-[150px] rounded-xl 
                      border border-calendar-border bg-white p-2 shadow-md"
                  >
                    {availabilitySlots.map((slot, index) => (
                      <Button
                        variant="ghost"
                        key={index}
                        type="button"
                        onClick={() => {
                          setSelectedEndTime(slot.endTime);
                          setShowEndDropdown(false);
                        }}
                        className="flex w-full items-center justify-between
                        rounded-lg px-3 py-2 text-sm hover:bg-soft-white"
                      >
                        <span>
                          {slot.endTime.hour}:{slot.endTime.minute}
                        </span>

                        <span>{slot.endTime.period}</span>
                      </Button>
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
            <Button
              type="button"
              disabled={!isFormComplete}
              onClick={handleScheduleInterview}
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
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AvailabilityForm;
