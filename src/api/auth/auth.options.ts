import {
  signUp,
  verifyEmail,
  resendVerification,
  loginApi,
  forgotPassword,
  resetPassword,
  refreshTokenApi,
  logoutApi,
  getMeApi,
} from "@/api/auth/auth.service";
import { QueryKey, QueryStaleTime } from "@/api/base/base.const";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

export const signUpOption = mutationOptions({
  mutationKey: ["auth", "signup"],
  mutationFn: signUp,
});

export const verifyEmailOption = mutationOptions({
  mutationKey: ["auth", "verify-email"],
  mutationFn: verifyEmail,
});

export const resendVerificationOption = mutationOptions({
  mutationKey: ["auth", "resend-verification"],
  mutationFn: resendVerification,
});

export const loginOption = mutationOptions({
  mutationKey: ["auth", "login"],
  mutationFn: loginApi,
});

export const forgotPasswordOption = mutationOptions({
  mutationKey: ["auth", "forgot-password"],
  mutationFn: forgotPassword,
});

export const resetPasswordOption = mutationOptions({
  mutationKey: ["auth", "reset-password"],
  mutationFn: resetPassword,
});

export const refreshTokenOption = mutationOptions({
  mutationKey: ["auth", "refresh"],
  mutationFn: refreshTokenApi,
});

export const logoutOption = mutationOptions({
  mutationKey: ["auth", "logout"],
  mutationFn: logoutApi,
});

export const meQueryOptions = queryOptions({
  queryKey: QueryKey.auth.me,
  queryFn: ({ signal }) => getMeApi({ signal }),
  staleTime: QueryStaleTime.fiveMins,
  retry: false,
});
