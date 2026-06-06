"use client";

import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import { AuthService } from "./auth.service";
import type { ApiError } from "../base/base.error";
import type {
  LoginPayload,
  LoginResponse,
  SignupPayload,
  SignupResponse,
  VerifyEmailPayload,
  VerifyEmailResponse,
  ResendVerificationPayload,
  ResendVerificationResponse,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
} from "./auth.type";

export const authMutationKeys = {
  login: ["auth", "login"] as const,
  signup: ["auth", "signup"] as const,
  verifyEmail: ["auth", "verifyEmail"] as const,
  resendVerification: ["auth", "resendVerification"] as const,
  forgotPassword: ["auth", "forgotPassword"] as const,
  resetPassword: ["auth", "resetPassword"] as const,
  revokeAllSessions: ["auth", "revokeAllSessions"] as const,
};

export function useLogin(
  options?: UseMutationOptions<LoginResponse, ApiError, LoginPayload>,
) {
  return useMutation<LoginResponse, ApiError, LoginPayload>({
    mutationKey: authMutationKeys.login,
    mutationFn: (payload) => AuthService.login(payload),
    ...options,
  });
}

export function useSignup(
  options?: UseMutationOptions<SignupResponse, ApiError, SignupPayload>,
) {
  return useMutation<SignupResponse, ApiError, SignupPayload>({
    mutationKey: authMutationKeys.signup,
    mutationFn: (payload) => AuthService.signup(payload),
    ...options,
  });
}

export function useVerifyEmail(
  options?: UseMutationOptions<
    VerifyEmailResponse,
    ApiError,
    VerifyEmailPayload
  >,
) {
  return useMutation<VerifyEmailResponse, ApiError, VerifyEmailPayload>({
    mutationKey: authMutationKeys.verifyEmail,
    mutationFn: (payload) => AuthService.verifyEmail(payload),
    ...options,
  });
}

export function useResendVerificationEmail(
  options?: UseMutationOptions<
    ResendVerificationResponse,
    ApiError,
    ResendVerificationPayload
  >,
) {
  return useMutation<
    ResendVerificationResponse,
    ApiError,
    ResendVerificationPayload
  >({
    mutationKey: authMutationKeys.resendVerification,
    mutationFn: (payload) => AuthService.resendVerification(payload),
    ...options,
  });
}

export function useForgotPassword(
  options?: UseMutationOptions<
    ForgotPasswordResponse,
    ApiError,
    ForgotPasswordPayload
  >,
) {
  return useMutation<ForgotPasswordResponse, ApiError, ForgotPasswordPayload>({
    mutationKey: authMutationKeys.forgotPassword,
    mutationFn: (payload) => AuthService.forgotPassword(payload),
    ...options,
  });
}

export function useResetPassword(
  options?: UseMutationOptions<
    ResetPasswordResponse,
    ApiError,
    ResetPasswordPayload
  >,
) {
  return useMutation<ResetPasswordResponse, ApiError, ResetPasswordPayload>({
    mutationKey: authMutationKeys.resetPassword,
    mutationFn: (payload) => AuthService.resetPassword(payload),
    ...options,
  });
}

export function useRevokeAllSessions(
  options?: UseMutationOptions<unknown, ApiError, void>,
) {
  return useMutation<unknown, ApiError, void>({
    mutationKey: authMutationKeys.revokeAllSessions,
    mutationFn: () => AuthService.revokeAllSessions(),
    ...options,
  });
}
