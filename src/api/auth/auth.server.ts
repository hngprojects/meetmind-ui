import "server-only";
import { callApiServer } from "@/api/base/base.server";
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
  return callApiServer<AuthTokenResponse>({
    url: "/auth/signup",
    method: "POST",
    data,
  });
}

export function verifyEmail(data: VerifyEmailData) {
  return callApiServer<VerifyEmailResponse>({
    url: "/auth/verify-email",
    method: "POST",
    data,
  });
}

export function resendVerification(data: ResendVerificationData) {
  return callApiServer<MessageResponse>({
    url: "/auth/resend-verification",
    method: "POST",
    data,
  });
}

export function loginApi(data: LoginData) {
  return callApiServer<AuthTokenResponse>({
    url: "/auth/login",
    method: "POST",
    data,
  });
}

export function forgotPassword(data: ForgotPasswordData) {
  return callApiServer<ForgotPasswordResponse>({
    url: "/auth/forgot-password",
    method: "POST",
    data,
  });
}

export function resetPassword(data: ResetPasswordData) {
  return callApiServer<ResetPasswordResponse>({
    url: "/auth/reset-password",
    method: "POST",
    data,
  });
}

export function refreshTokenApi(data: RefreshTokenData) {
  return callApiServer<RefreshTokenResponse>({
    url: "/auth/refresh",
    method: "POST",
    data,
  });
}

export function logoutApi(data: LogoutData) {
  return callApiServer<MessageResponse>({
    url: "/auth/logout",
    method: "POST",
    data,
  });
}

export function getMeApi() {
  return callApiServer<AuthUser>({
    url: "/users/me",
    method: "GET",
  });
}
