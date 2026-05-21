"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

// ==================== 🧩Main Component ====================
export default function Error() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-full md:bg-[#F7F9FB]">
      <div className="p-4 max-w-[420px] flex flex-col justify-center">
        <div className="flex justify-center">
          <Image
            src="/icons/meetmind-logo.svg"
            alt="logo"
            width={43}
            height={43}
          />
        </div>

        <div className="mt-8 p-6 bg-[#FEFEFF] rounded-2xl shadow-sm">
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <Image
                src="/icons/red-alert.svg"
                alt="error alert icon"
                width={40}
                height={40}
              />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-xl">Something went wrong</h3>
              <p className="text-[#5E6470] mt-2 mb-3">
                Please check your connection and try again.
              </p>
            </div>
            <button
              className={`text-sm text-white font-medium bg-[#02505E] rounded-md w-full p-3 mt-1`}
              onClick={() => router.push("/forgot-password")}
            >
              Request a new link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
