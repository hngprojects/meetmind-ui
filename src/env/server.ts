if (typeof window !== "undefined") {
  throw new Error("Server env file imported on the client");
}

export const serverEnv = {
  API_BASE_URL: process.env.API_BASE_URL!,
  NODE_ENV: process.env.NODE_ENV!,
} as const;
