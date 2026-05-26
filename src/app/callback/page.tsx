"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

const GoogleCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    let isMounted = true;

    const completeGoogleSignIn = async () => {
      if (!searchParams) {
        router.replace("/sign-in?error=google_auth_failed");
        return;
      }

      const token = searchParams.get("token");
      const error = searchParams.get("error");

      if (error || !token) {
        router.replace("/sign-in?error=google_auth_failed");
        return;
      }

      try {
        localStorage.setItem("token", token);

        const meRes = await api.get("/api/v1/users/me");
        const user = meRes.data.data;

        const authUser = {
          id: user.id,
          email: user.email,
          name: user.name,
        };

        if (!isMounted) {
          localStorage.removeItem("token");
          return;
        }
        setAuth(authUser, token);

        if (!user.onboarding_completed) {
          router.replace("/onboarding");
        } else {
          router.replace("/dashboard");
        }
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        if (isMounted) {
          router.replace("/sign-in?error=google_auth_failed");
        }
      }
    };

    completeGoogleSignIn();

    return () => {
      isMounted = false;
    };
  }, [router, searchParams, setAuth]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500 text-sm">Signing you in...</p>
    </div>
  );
};

export default GoogleCallback;
