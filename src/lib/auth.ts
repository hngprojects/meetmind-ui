import api from "./api";

interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (payload: LoginPayload) => {
  const response = await api.post("/api/v1/auth/login", payload);

  return response.data;
};

export const revokeAllSessions = async () => {
  const response = await api.post("/api/v1/auth/signout/all");
  return response.data;
};

export const resendVerificationEmail = async (email: string) => {
  const response = await api.post("/api/v1/auth/resend-verification", {
    email,
  });

  return response.data;
};
