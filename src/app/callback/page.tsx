"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const GoogleCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) {
      router.replace("/login?error=google_auth_failed");
      return;
    }

    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      router.replace("/login?error=google_auth_failed");
      return;
    }

    if (token) {
      localStorage.setItem("auth_token", token);
      router.replace("/Dashboard");
      return;
    }

    router.replace("/login?error=google_auth_failed");
  }, [router, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500 text-sm">Signing you in...</p>
    </div>
  );
};

export default GoogleCallback;
