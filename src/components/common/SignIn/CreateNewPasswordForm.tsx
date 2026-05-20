"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { IoArrowBackOutline } from "react-icons/io5";

import AuthInput from "./AuthInput";
import PasswordRequirements from "./PasswordRequirements";
import PasswordResetSuccess from "./PasswordResetSuccess";

import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/schemas/resetPasswordSchema";

const CreateNewPasswordForm = () => {
  const [resetSuccess, setResetSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = useWatch({
    control,
    name: "password",
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    console.log(data);

    setResetSuccess(true);
  };

  if (resetSuccess) {
    return <PasswordResetSuccess />;
  }

  return (
    <div className="rounded-[32px] bg-white px-6 py-8 lg:px-8 lg:py-10">
      {/* Heading */}
      <h2 className="text-center text-[24px] font-bold text-text-color-primary">
        Create a new password
      </h2>

      {/* Subtitle */}
      <p className="mt-4 text-center text-[20px] leading-[150%] text-text-subtext">
        Your new password must be different from previous passwords.
      </p>

      {/* Form */}
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-6"
      >
        {/* Password */}
        <div>
          <AuthInput
            label="New password"
            type="password"
            placeholder="Enter new password"
            registration={register("password", {
              onChange: () => {
                if (errors.password) clearErrors("password");
              },
            })}
            error={errors.password}
            leftIcon={<HiOutlineLockClosed size={20} />}
            showPasswordToggle
          />

          {/* Requirements */}
          {password && <PasswordRequirements password={password} />}
        </div>

        {/* Confirm */}
        <AuthInput
          label="Confirm password"
          type="password"
          placeholder="Enter new password"
          registration={register("confirmPassword", {
            onChange: () => {
              if (errors.confirmPassword) {
                clearErrors("confirmPassword");
              }
            },
          })}
          error={errors.confirmPassword}
          leftIcon={<HiOutlineLockClosed size={20} />}
          showPasswordToggle
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="
            h-[48px] w-full rounded-[12px]
            bg-button-primary-bg cursor-pointer
            text-[18px] font-semibold text-white
            transition-all hover:opacity-80
            disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          {isSubmitting ? "Resetting..." : "Reset password"}
        </button>

        {/* Back */}
        <Link
          href="/sign-in"
          className="
            flex items-center justify-center gap-2
            text-[16px] text-text-subtext
            hover:opacity-80
          "
        >
          <IoArrowBackOutline size={18} />
          Back to login
        </Link>
      </form>
    </div>
  );
};

export default CreateNewPasswordForm;
