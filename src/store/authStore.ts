import { create } from "zustand";

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

  setAuth: (user, token, refreshToken, accessTokenExpiresAt) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
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
      set({ isHydrated: true });
    }
  },
}));
