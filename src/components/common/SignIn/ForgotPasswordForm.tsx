"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { IoChevronDown } from "react-icons/io5";
import AuthInput from "@/components/common/SignIn/AuthInput";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/schemas/forgotPasswordSchema";
import AuthFooter from "@/components/common/SignIn/AuthFooter";
import { IoArrowBackOutline } from "react-icons/io5";
import Link from "next/link";
import CheckInbox from "./CheckInbox";

const ForgotPasswordForm = () => {
  const [serverError, setServerError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async () => {
    setServerError("");

    try {
      setEmailSent(true);
    } catch {
      setServerError("Something went wrong");
    }
  };

  if (emailSent) {
    return <CheckInbox />;
  }

  return (
    <>
      <div className="rounded-[32px] bg-white px-6 py-8 lg:px-8 lg:py-10">
        <h2 className="text-center text-[24px] font-bold text-text-color-primary">
          Reset Your Password
        </h2>

        <p className="mt-2 text-center text-[20px] text-text-body">
          Enter your email and we’ll send you a secure reset link.
        </p>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6"
        >
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
            leftIcon={<HiOutlineEnvelope size={20} />}
            rightIcon={<IoChevronDown size={18} />}
          />

          {serverError && (
            <p className="text-center text-sm text-error-text">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-[48px] w-full rounded-[8px] bg-button-primary-bg 
                text-[18px] font-semibold text-white transition-all 
                hover:opacity-80 disabled:cursor-not-allowed 
                disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Sending link..." : "Send reset link"}
          </button>

          <Link
            href="/sign-in"
            className="flex items-center justify-center gap-2 text-sm 
            text-text-subtext hover:opacity-80"
          >
            <IoArrowBackOutline size={18} />
            Back to login
          </Link>
        </form>
      </div>
      <AuthFooter
        text="Don’t have an account?"
        linkText="Sign up"
        href="/sign-up"
      />
    </>
  );
};

export default ForgotPasswordForm;
