"use client";

import Link from "next/link";
import { IoCheckmark } from "react-icons/io5";

const PasswordResetSuccess = () => {
  return (
    <div className="text-center">
      <div className="rounded-[32px] bg-white px-6 py-8 lg:px-8 lg:py-10">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div
            className="
              flex h-[56px] w-[56px] items-center justify-center
              rounded-full bg-bg-success
            "
          >
            <IoCheckmark size={24} className="text-text-success" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-[32px] font-bold text-text-color-primary">
          Password reset successful
        </h2>

        {/* Description */}
        <p className="mt-4 text-[16px] leading-[150%] text-text-subtext">
          Your password has been updated. You can now log in with your new
          password.
        </p>

        {/* Button */}
        <Link
          href="/sign-in"
          className="
            mt-8 flex h-[48px] w-full items-center justify-center
            rounded-[12px] bg-button-primary-bg
            text-[16px] font-semibold text-white
            transition-all hover:opacity-80
          "
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
