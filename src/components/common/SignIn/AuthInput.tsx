"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { ReactNode, useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

interface AuthInputProps {
  label: string;
  type: string;
  placeholder: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  showPasswordToggle?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const AuthInput = ({
  label,
  type,
  placeholder,
  registration,
  error,
  showPasswordToggle,
  leftIcon,
  rightIcon,
}: AuthInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="mb-2 block text-[16px] font-medium text-text-color-label">
        {label}
      </label>

      <div className="relative">
        {leftIcon && (
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2 
                text-input-placeholder"
          >
            {leftIcon}
          </div>
        )}
        <input
          type={
            showPasswordToggle ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          {...registration}
          className={`h-[48px] w-full rounded-[8px] border px-4 outline-none 
            transition-all placeholder:text-placeholder 
            focus:border-input-border-focus 
            ${error ? "border-error" : "border-input-border"}
            ${leftIcon ? "pl-12" : ""}
            ${showPasswordToggle || rightIcon ? "pr-12" : ""}
            `}
        />
        {rightIcon && (
          <div
            className="absolute right-4 top-1/2 -translate-y-1/2 
                text-input-placeholder cursor-pointer"
          >
            {rightIcon}
          </div>
        )}

        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-input-placeholder 
            hover:text-input-placeholder/80 cursor-pointer"
          >
            {showPassword ? (
              <LuEyeOff size={20} className="animate-in fade-in duration-200" />
            ) : (
              <LuEye size={20} className="animate-in fade-in duration-200" />
            )}
          </button>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-error-text">{error.message}</p>}
    </div>
  );
};

export default AuthInput;
