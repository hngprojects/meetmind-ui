import { callApi } from "@/api/base/base.service";
import type {
  AuthTokenResponse,
  AuthUser,
  ForgotPasswordData,
  ForgotPasswordResponse,
  LoginData,
  LogoutData,
  MessageResponse,
  RefreshTokenData,
  RefreshTokenResponse,
  ResendVerificationData,
  ResetPasswordData,
  ResetPasswordResponse,
  SignUpData,
  VerifyEmailData,
  VerifyEmailResponse,
} from "./auth.type";

export function signUp(data: SignUpData) {
  return callApi<AuthTokenResponse>({
    url: "/auth/signup",
    method: "POST",
    data,
  });
}

export function verifyEmail(data: VerifyEmailData) {
  return callApi<VerifyEmailResponse>({
    url: "/auth/verify-email",
    method: "POST",
    data,
  });
}

export function resendVerification(data: ResendVerificationData) {
  return callApi<MessageResponse>({
    url: "/auth/resend-verification",
    method: "POST",
    data,
  });
}

export function loginApi(data: LoginData) {
  return callApi<AuthTokenResponse>({
    url: "/auth/login",
    method: "POST",
    data,
  });
}

export function forgotPassword(data: ForgotPasswordData) {
  return callApi<ForgotPasswordResponse>({
    url: "/auth/forgot-password",
    method: "POST",
    data,
  });
}

export function resetPassword(data: ResetPasswordData) {
  return callApi<ResetPasswordResponse>({
    url: "/auth/reset-password",
    method: "POST",
    data,
  });
}

export function refreshTokenApi(data: RefreshTokenData) {
  return callApi<RefreshTokenResponse>({
    url: "/auth/refresh",
    method: "POST",
    data,
  });
}

export function logoutApi(data: LogoutData) {
  return callApi<MessageResponse>({
    url: "/auth/logout",
    method: "POST",
    data,
  });
}

export function getMeApi({ signal }: { signal?: AbortSignal } = {}) {
  return callApi<AuthUser>({
    url: "/users/me",
    method: "GET",
    signal,
  });
}
