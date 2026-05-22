"use client";

import { FiChevronDown, FiArrowLeft } from "react-icons/fi";
import api from "@/lib/api";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";

interface Props {
  setStep: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const forgotPasswordSchema = z.object({
  email: z.string().email("Email address is required"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// ==================== 🧩Main Component ====================
export default function EnterEmailForm({ setStep, setEmail }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(data: ForgotPasswordFormData) {
    // setStep("enter-email");

    try {
      await api.post("/api/v1/auth/forgot-password", data);

      reset();

      setEmail(data.email);
      setStep("email-sent");
    } catch {
      setStep("enter-email");
    }
  }

  return (
    <div className="flex items-center justify-center h-full md:bg-[#F7F9FB]">
      <div className="p-4 max-w-[420px] flex flex-col justify-center">
        <div className="flex justify-center">
          <Image
            src="/icons/meetmind-logo.svg"
            alt="logo"
            width={43}
            height={43}
          />
        </div>

        <div className="mt-8 p-6 bg-[#FEFEFF] rounded-2xl shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-center">
              <h3 className="font-bold text-xl">Reset your Password</h3>
              <p className="text-[#5E6470] mt-2 mb-3">
                Enter your email and we&apos;ll send you a secure reset link.
              </p>
            </div>

            <label className="block mb-1 mt-4">
              <p className="mb-1">Email address</p>

              <div className="relative">
                <Image
                  src="/icons/mail.svg"
                  alt="mail"
                  width={20}
                  height={20}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2"
                />

                <input
                  type="email"
                  className={`w-full pl-11 pr-10 py-2.5 border rounded-lg text-gray-800 text-sm font-medium placeholder:text-gray-400 placeholder:text-sm placeholder:font-normal focus:outline-none 
                    ${errors.email ? "border-[#EF4444]" : "border-gray-300"}`}
                  {...register("email")}
                  placeholder="you@company.com"
                />

                <FiChevronDown
                  size={18}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#070D17]"
                />
              </div>
            </label>
            {errors.email && (
              <p className="text-[#EF4444] text-sm">{errors.email.message}</p>
            )}
            <button
              disabled={isSubmitting}
              className="text-white font-semibold bg-[#02505E] rounded-md w-full p-2 mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
            >
              {isSubmitting ? "Sending..." : "Send reset link"}
            </button>

            <Link
              href="/sign-in"
              className="flex text-[#5E6470] gap-2 mt-5 justify-center items-center text-sm"
            >
              <FiArrowLeft size={18} className="text-[#91949D]" />
              <span className="pt-[2px]">Back to login</span>
            </Link>
          </form>
        </div>
        <p className="text-center p-4 mt-2 md:p-0 md:mt-5 text-[#5E6470] text-shadow-mauve-400 bg-[#F7F9FB] rounded-2xl">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-[#035A69]">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
