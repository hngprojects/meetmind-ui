import { create } from "zustand";
import { onboardingStore } from "./onboardingStore";
import { clearAuthCookie, setAuthCookie } from "@/lib/auth-cookie";

const ONBOARDING_STORAGE_KEY = "onboarding-storage";

const clearOnboardingProgress = () => {
  onboardingStore.getState().reset();
  localStorage.removeItem(ONBOARDING_STORAGE_KEY);
};

interface AuthUser {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  refreshToken: string | null;
  accessTokenExpiresAt: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  setAuth: (
    user: AuthUser,
    token: string,
    refreshToken: string,
    accessTokenExpiresAt: string,
  ) => void;
  logout: () => void;
  hydrateAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  refreshToken: null,
  accessTokenExpiresAt: null,
  isAuthenticated: false,
  isHydrated: false,

  // Global login function, updates when user logs in
  setAuth: (user, token, refreshToken, accessTokenExpiresAt) => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const previousUser = JSON.parse(storedUser) as AuthUser;

        if (previousUser.id !== user.id) {
          clearOnboardingProgress();
        }
      } catch {
        clearOnboardingProgress();
      }
    }

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuthCookie(token);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("access_token_expires_at", accessTokenExpiresAt);

    set({
      user,
      token,
      refreshToken,
      accessTokenExpiresAt,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token_expires_at");
    clearAuthCookie();
    clearOnboardingProgress();

    set({
      user: null,
      token: null,
      refreshToken: null,
      accessTokenExpiresAt: null,
      isAuthenticated: false,
    });
  },

  hydrateAuth: () => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const refreshToken = localStorage.getItem("refresh_token");
    const accessTokenExpiresAt = localStorage.getItem(
      "access_token_expires_at",
    );

    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser) as AuthUser;
        set({
          token,
          user,
          refreshToken,
          accessTokenExpiresAt,
          isAuthenticated: true,
          isHydrated: true,
        });
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("access_token_expires_at");
        clearAuthCookie();
        clearOnboardingProgress();

        set({
          user: null,
          token: null,
          refreshToken: null,
          accessTokenExpiresAt: null,
          isAuthenticated: false,
          isHydrated: true,
        });
      }
    } else {
      clearAuthCookie();
      clearOnboardingProgress();

      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isHydrated: true,
      });
    }
  },
}));
