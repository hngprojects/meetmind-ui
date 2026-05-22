export const QueryStaleTime = {
  thirtySeconds: 30000,
  oneMin: 60000,
  twoMins: 120000,
  fiveMins: 5 * 60000,
  tenMins: 10 * 60000,
  fifteenMins: 15 * 60000,
  thirtyMins: 30 * 60000,
  infinity: Infinity,
};

export const ApiVersion = {
  v1: "/api/v1",
} as const;

export const ApiErrorCode = {
  invalidCredentials: "invalid_credentials",
  validationError: "validation_error",
  invalidRefreshToken: "invalid_refresh_token",
  tokenRevoked: "token_revoked",
  tokenExpired: "token_expired",
  networkError: "network_error",
  unknown: "unknown",
  clientError: "client_error",
} as const;

export const AuthTokenKey = {
  accessToken: "access_token",
  refreshToken: "refresh_token",
  accessTokenExpiresAt: "access_token_expires_at",
  refreshTokenExpiresAt: "refresh_token_expires_at",
} as const;

export const QueryKey = {
  auth: {
    me: ["auth", "me"],
  },
  interviews: {
    all: ["interviews"],
    byId: (id: string) => ["interviews", id],
    history: (id: string) => ["interviews", id, "history"],
  },
  candidates: {
    all: ["candidates"],
    byId: (id: string) => ["candidates", id],
    search: (query: string) => ["candidates", "search", query],
  },
  dashboard: {
    live: ["dashboard", "live"],
    stats: ["dashboard", "stats"],
  },
} as const;
