export * from "./auth.type";
export * from "./auth.options";

// Export server functions with Server suffix to avoid conflicts
export {
  signUp as signUpServer,
  verifyEmail as verifyEmailServer,
  resendVerification as resendVerificationServer,
  loginApi as loginApiServer,
  forgotPassword as forgotPasswordServer,
  resetPassword as resetPasswordServer,
  refreshTokenApi as refreshTokenApiServer,
  logoutApi as logoutApiServer,
  getMeApi as getMeApiServer,
} from "./auth.server";

// Export client functions as default names
export {
  signUp,
  verifyEmail,
  resendVerification,
  loginApi,
  forgotPassword,
  resetPassword,
  refreshTokenApi,
  logoutApi,
  getMeApi,
} from "./auth.service";
