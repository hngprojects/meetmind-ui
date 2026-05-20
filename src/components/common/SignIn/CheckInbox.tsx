"use client";

import Link from "next/link";
import { IoArrowBackOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

interface CheckInboxProps {
  email?: string;
  showSuccess?: boolean;
}

const CheckInbox = ({ email, showSuccess = false }: CheckInboxProps) => {
  return (
    <div className="text-center">
      {/* Card */}
      <div className="rounded-[32px] bg-white px-6 py-8 lg:px-8 lg:py-10">
        {/* Heading */}
        <h2 className="text-[32px] font-bold text-text-color-primary">
          Check your inbox
        </h2>

        {/* Description */}
        <p className="mt-4 text-[16px] leading-[150%] text-text-subtext">
          We’ve sent a password reset link to your email address
        </p>

        {/* Email on second state */}
        {showSuccess && email && (
          <p className="mt-6 text-[16px] font-medium text-text-color-primary">
            {email}
          </p>
        )}

        {/* Success alert on first state */}
        {!showSuccess && (
          <div
            className="
              mt-6 flex items-center gap-2 rounded-[16px]
              bg-bg-success px-4 py-4
            "
          >
            <IoCheckmarkCircleOutline size={20} className="text-text-success" />

            <span className="text-[14px] text-text-success">
              Email sent successfully!
            </span>
          </div>
        )}

        {/* Resend */}
        <button
          disabled={!showSuccess}
          className="
            mt-6 h-[48px] w-full rounded-[12px]
            bg-card-border
            text-[16px] font-semibold text-card-text
          "
        >
          {showSuccess ? "Resend email" : "Resend email (26s)"}
        </button>

        {/* Edit email */}
        <button
          disabled={!showSuccess}
          className="
            mt-4 h-[48px] w-full rounded-[12px]
            bg-card-border
            text-[16px] font-semibold text-card-text
          "
        >
          Edit email
        </button>

        {/* Back */}
        <Link
          href="/sign-in"
          className="
            mt-6 flex items-center justify-center gap-2
            text-[16px] text-text-subtext
          "
        >
          <IoArrowBackOutline size={18} />
          Back to login
        </Link>
      </div>

      {/* Footer */}
      <p className="mt-8 text-[16px] text-text-subtext">
        Check spam or promotion if you don’t see it
      </p>
    </div>
  );
};

export default CheckInbox;
