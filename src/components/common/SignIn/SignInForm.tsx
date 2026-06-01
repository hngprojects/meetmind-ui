"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInFormData } from "@/schemas/signInSchema";
import AuthInput from "@/components/common/SignIn/AuthInput";
import { loginUser } from "@/lib/auth";
import axios from "axios";
import { useState } from "react";
import AuthDivider from "@/components/common/SignIn/AuthDivider";
import GoogleAuthButton from "./GoogleAuthButton";
import AuthFooter from "@/components/common/SignIn/AuthFooter";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";
import { normalizeCurrentUser } from "@/lib/api/currentUser";

const SignInForm = () => {
  const [serverError, setServerError] = useState("");
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFieldChange = (field: keyof SignInFormData) => () => {
    if (errors[field]) clearErrors(field);
    if (serverError) setServerError("");
  };

  const onSubmit = async (data: SignInFormData) => {
    setServerError("");
    try {
      const response = await loginUser(data);

      if (!response.success) {
        setServerError(response.message || "Invalid credentials");
        return;
      }

      const { access_token, refresh_token, access_token_expires_at } =
        response.data;
      if (!access_token || !refresh_token || !access_token_expires_at) {
        setServerError("Invalid authentication response. Please try again.");
        return;
      }

      // Save access token before calling /users/me so the API interceptor can attach it.
      localStorage.setItem("token", access_token);

      const meRes = await api.get("/api/v1/users/me");
      const user = meRes.data.data;
      const authUser = normalizeCurrentUser({ ...response.data, ...user });

      setAuth(authUser, access_token, refresh_token, access_token_expires_at);

      if (!user.onboarding_completed) {
        router.push("/onboarding");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const detail = error.response?.data?.detail;
        const errorMessage =
          (Array.isArray(detail) ? detail[0]?.msg : undefined) ||
          (typeof detail === "string" ? detail : undefined) ||
          error.response?.data?.message ||
          "Invalid email or password";

        setServerError(errorMessage);
      } else {
        setServerError("Something went wrong");
      }
    }
  };

  return (
    <>
      <div className="rounded-[32px] bg-white px-6 py-8 lg:px-8 lg:py-10">
        <h2 className="text-center text-[24px] font-bold text-text-color-primary">
          Sign In
        </h2>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6"
        >
          {/* Email Field */}
          <AuthInput
            label="Email address"
            type="email"
            placeholder="you@company.com"
            registration={register("email", {
              onChange: handleFieldChange("email"),
            })}
            error={errors.email}
          />

          {/* Password Field */}
          <AuthInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            registration={register("password", {
              onChange: handleFieldChange("password"),
            })}
            error={errors.password}
            showPasswordToggle
          />

          {serverError && (
            <p role="alert" className="text-center text-sm text-error-text">
              {serverError}
            </p>
          )}

          {/* Forgot Password */}
          <div className="flex justify-center">
            <Link
              href="/forgot-password"
              className="text-[16px] text-text-subtext cursor-pointer 
                hover:opacity-80"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-[48px] w-full rounded-[8px] bg-button-primary-bg text-[18px] 
          font-semibold text-white transition-all hover:opacity-80 cursor-pointer 
          disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
      <AuthDivider />

      <GoogleAuthButton />

      <AuthFooter
        text="Don’t have an account?"
        linkText="Sign Up"
        href="/sign-up"
      />
    </>
  );
};

export default SignInForm;
