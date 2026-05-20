"use client";

import Link from "next/link";

const InvalidLink = () => {
  return (
    <div className="text-center">
      {/* Card */}
      <div className="rounded-[32px] bg-white px-6 py-8 lg:px-8 lg:py-10">
        {/* Error icon */}
        <div className="mb-6 flex justify-center">
          <div
            className="
              flex h-[56px] w-[56px] items-center justify-center
              rounded-full bg-icon-bg
            "
          >
            <span className="text-[24px] font-bold text-icon-text">!</span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-[32px] font-bold text-text-color-primary">
          Invalid link
        </h2>

        {/* Description */}
        <p className="mt-4 text-[16px] leading-[150%] text-text-subtext">
          The reset link is invalid, or already expired
        </p>

        {/* Button */}
        <Link
          href="/forgot-password"
          className="
            mt-8 flex h-[48px] w-full items-center justify-center
            rounded-[12px] bg-button-primary-bg
            text-[16px] font-semibold text-white
            transition-all hover:opacity-80
          "
        >
          Request a new link
        </Link>
      </div>

      {/* Footer */}
      <p className="mt-8 text-[16px] text-text-subtext">
        Check spam or promotion if you don’t see it
      </p>
    </div>
  );
};

export default InvalidLink;
