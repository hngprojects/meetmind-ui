"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getCurrentUserProfile,
  normalizeCurrentUser,
} from "@/lib/api/currentUser";
import { useAuthStore } from "@/store/authStore";

export function useCurrentUserProfile() {
  const authUser = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const setUser = useAuthStore((state) => state.setUser);

  const query = useQuery({
    queryKey: ["current-user-profile", token],
    queryFn: getCurrentUserProfile,
    enabled: Boolean(token),
    staleTime: 60_000,
    retry: 1,
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }
  }, [query.data, setUser]);

  const fallbackProfile = authUser ? normalizeCurrentUser(authUser) : null;

  return {
    ...query,
    data: query.data ?? fallbackProfile,
    isLoading: query.isLoading && !fallbackProfile,
  };
}
