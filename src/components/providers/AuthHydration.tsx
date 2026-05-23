"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export default function AuthHydration({
  children,
}: {
  children: React.ReactNode;
}) {
  const hydrateAuth = useAuthStore((s) => s.hydrateAuth);

  useEffect(() => {
    hydrateAuth();
  }, [hydrateAuth]);

  return <>{children}</>;
}
