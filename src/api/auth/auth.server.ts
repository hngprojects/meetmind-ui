import { AuthService } from "./auth.service";

export const authServer = {
  login: AuthService.login.bind(AuthService),
  signup: AuthService.signup.bind(AuthService),
  verifyEmail: AuthService.verifyEmail.bind(AuthService),
  resendVerification: AuthService.resendVerification.bind(AuthService),
  forgotPassword: AuthService.forgotPassword.bind(AuthService),
  resetPassword: AuthService.resetPassword.bind(AuthService),
  revokeAllSessions: AuthService.revokeAllSessions.bind(AuthService),
};
export type AuthServer = typeof authServer;
