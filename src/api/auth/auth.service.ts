import { BaseService } from "../base/base.service";
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

export class AuthService extends BaseService {
  static async login(payload: LoginPayload): Promise<LoginResponse> {
    return this.post<LoginResponse>("/api/v1/auth/login", payload);
  }

  static async signup(payload: SignupPayload): Promise<SignupResponse> {
    return this.post<SignupResponse>("/api/v1/auth/signup", payload);
  }

  static async verifyEmail(
    payload: VerifyEmailPayload,
  ): Promise<VerifyEmailResponse> {
    return this.post<VerifyEmailResponse>("/api/v1/auth/verify-email", payload);
  }

  static async resendVerification(
    payload: ResendVerificationPayload,
  ): Promise<ResendVerificationResponse> {
    return this.post<ResendVerificationResponse>(
      "/api/v1/auth/resend-verification",
      payload,
    );
  }

  static async forgotPassword(
    payload: ForgotPasswordPayload,
  ): Promise<ForgotPasswordResponse> {
    return this.post<ForgotPasswordResponse>(
      "/api/v1/auth/forgot-password",
      payload,
    );
  }

  static async resetPassword(
    payload: ResetPasswordPayload,
  ): Promise<ResetPasswordResponse> {
    return this.post<ResetPasswordResponse>(
      "/api/v1/auth/reset-password",
      payload,
    );
  }

  static async revokeAllSessions(): Promise<unknown> {
    return this.post<unknown>("/api/v1/auth/signout/all");
  }
}
