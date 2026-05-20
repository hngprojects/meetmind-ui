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

const SignInForm = () => {
  const [serverError, setServerError] = useState("");
  const router = useRouter();

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

  const onSubmit = async (data: SignInFormData) => {
    setServerError("");
    try {
      await loginUser(data);
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setServerError(error.response?.data?.detail || "Something went wrong");
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
              onChange: () => {
                if (errors.email) clearErrors("email");
              },
            })}
            error={errors.email}
          />

          {/* Password Field */}
          <AuthInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            registration={register("password", {
              onChange: () => {
                if (errors.password) clearErrors("password");
              },
            })}
            error={errors.password}
            showPasswordToggle
          />

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

          {serverError && (
            <p className="text-center text-sm text-error-text">{serverError}</p>
          )}

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
