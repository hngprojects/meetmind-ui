"use client";

import React from "react";
import SubscribeEmail from "@/components/reuseable-component/email/subscribeEmail";

export default function TermsCTA() {
  return (
    <div className="w-full bg-[#02505E] rounded-2xl py-12 px-6 md:px-12 flex flex-col items-center text-center mt-12 md:mt-20">
      <h2 className="text-white text-2xl md:text-3xl font-serif font-medium mb-3">
        Never miss an update
      </h2>
      <p className="text-white/80 text-sm md:text-base mb-8 max-w-md">
        Get notified when we ship new features and improvements.
      </p>

      <div className="w-full max-w-sm">
        <SubscribeEmail
          style="flex flex-col md:flex-row gap-3 w-full"
          buttonText="Subscribe"
          loadingText="Subscribing..."
          buttonStyle="bg-[#E8F2F5] text-[#02505E] hover:bg-[#d6e5ea] font-medium h-12"
        />
      </div>
    </div>
  );
}
