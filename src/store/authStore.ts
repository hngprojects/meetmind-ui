import { create } from "zustand";
import { onboardingStore } from "./onboardingStore";
import { clearAuthCookie, setAuthCookie } from "@/lib/auth-cookie";

const ONBOARDING_STORAGE_KEY = "onboarding-storage";

const clearOnboardingProgress = () => {
  onboardingStore.getState().reset();
  localStorage.removeItem(ONBOARDING_STORAGE_KEY);
};

// User type
interface AuthUser {
  id: string;
  email: string;
  name: string;
}

// Store type
interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;

  setAuth: (user: AuthUser, token: string) => void;

  logout: () => void;
  hydrateAuth: () => void;
  isHydrated: boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Initial state
  user: null,
  token: null,
  isAuthenticated: false,
  isHydrated: false,

  // Global login function, updates when user logs in
  setAuth: (user, token) => {
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

    set({
      user,
      token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    clearAuthCookie();
    clearOnboardingProgress();

    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  hydrateAuth: () => {
    const token = localStorage.getItem("token");

    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser) as AuthUser;

        set({
          token,
          user,
          isAuthenticated: true,
          isHydrated: true,
        });
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        clearAuthCookie();
        clearOnboardingProgress();

        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isHydrated: true,
        });
      }
    } else {
      clearAuthCookie();
      clearOnboardingProgress();

      set({
        isHydrated: true,
      });
    }
  },
}));
