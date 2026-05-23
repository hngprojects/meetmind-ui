"use client";

import Buttons from "@/components/reuseable-component/buttons";
import { FcGoogle } from "react-icons/fc";

const GoogleAuthButton = () => {
  const handleGoogleSignIn = () => {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://api.staging.meetmind.hng14.com";

    window.location.href = `${baseUrl}/api/v1/auth/google`;
  };

  return (
    <Buttons
      text="Sign in with Google"
      type="button"
      icon={<FcGoogle size={24} />}
      onClick={handleGoogleSignIn}
      style="
        bg-white
        hover:bg-gray-50
        border
        text-[18px] font-medium
        border-[#E1E3E4]
        text-[#0F172A]
      "
      wrapperClassname="w-full h-[56px]"
    />
  );
};

export default GoogleAuthButton;
