export type SignUpData = {
  email: string;
  password: string;
  name: string;
};

export type VerifyEmailData = {
  token: string;
};

export type ResendVerificationData = {
  email: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type ForgotPasswordData = {
  email: string;
};

export type ResetPasswordData = {
  token: string;
  password: string;
};

export type RefreshTokenData = {
  refresh_token: string;
};

export type LogoutData = {
  access_token: string;
  refresh_token: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  is_verified: boolean;
  job_title: string | null;
  company: string | null;
  avatar_url: string | null;
  onboarding_completed: boolean;
};

export type AuthTokenResponse = {
  id: string;
  email: string;
  name: string;
  next_step: string;
  access_token: string;
  refresh_token: string;
  access_token_expires_at: string;
  refresh_token_expires_at: string;
};

export type VerifyEmailResponse = {
  id: string;
  email: string;
};

export type ForgotPasswordResponse = {
  next_step: string;
};

export type ResetPasswordResponse = {
  next_step: string;
};

export type RefreshTokenResponse = {
  access_token: string;
};

export type MessageResponse = {
  message: string;
};
