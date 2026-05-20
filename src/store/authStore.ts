import { create } from "zustand";

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
  setAuth: (user, token) =>
    set({
      user,
      token,
      isAuthenticated: true,
    }),

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

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

        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isHydrated: true,
        });
      }
    } else {
      set({
        isHydrated: true,
      });
    }
  },
}));
