import axios from "axios";

// Per-request timeout for long-running multi-step operations (interview
// scheduling involves workspace creation, scorecard setup, email dispatch, etc.)
export const LONG_REQUEST_TIMEOUT = 60_000;

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "https://api.staging.meetmind.hng14.com",
  headers: {
    "Content-Type": "application/json",
  },
  // 15s default — fast enough to surface real backend errors promptly.
  // For slow operations (e.g. interview scheduling) pass { timeout: LONG_REQUEST_TIMEOUT }
  // at the individual call site instead of raising this blanket limit.
  timeout: 15_000,
});

// ── Request interceptor ───────────────────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    // localStorage only exists in the browser
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response interceptor ──────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");

        if (window.location.pathname !== "/sign-in") {
          window.location.href = "/sign-in";
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
