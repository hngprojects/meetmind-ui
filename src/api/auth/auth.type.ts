import type { ApiResponse } from "../base/base.type";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponseData {
  access_token: string;
  refresh_token: string;
  access_token_expires_at: string;
}

export type LoginResponse = ApiResponse<LoginResponseData>;

export interface SignupPayload {
  name: string;
  email: string;
  password?: string;
  role?: string;
  company_name?: string;
}

export interface SignupResponseData {
  access_token?: string;
  refresh_token?: string;
  access_token_expires_at?: string;
  next_step?: "verify_email" | string;
}

export type SignupResponse = ApiResponse<SignupResponseData>;

export interface VerifyEmailPayload {
  token: string;
}

export interface VerifyEmailResponseData {
  success: boolean;
  message?: string;
}

export type VerifyEmailResponse = ApiResponse<VerifyEmailResponseData>;

export interface ResendVerificationPayload {
  email: string;
}

export type ResendVerificationResponse = ApiResponse<unknown>;

export interface ForgotPasswordPayload {
  email: string;
}

export type ForgotPasswordResponse = ApiResponse<unknown>;

export interface ResetPasswordPayload {
  token: string;
  password: string;
}

export type ResetPasswordResponse = ApiResponse<unknown>;
