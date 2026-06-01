"use client";
import { Signupschema, type SignUpType } from "@/schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import api from "@/lib/api";
import { useSignupStore } from "@/store/signupStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import Buttons from "@/components/reuseable-component/buttons";
import { useAuthStore } from "@/store/authStore";
import { normalizeCurrentUser } from "@/lib/api/currentUser";
import { useVerifyStore } from "@/store/verifyStore";

const Signform = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  // show password
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // import zustand store
  const {
    isLoading,
    serverError,
    focusedFields,
    setIsLoading,
    setServerError,
    handleFocus,
    handleBlur,
    setIsSuccess,
    setFormData,
  } = useSignupStore();

  // import zustand store
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<SignUpType>({
    resolver: zodResolver(Signupschema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const getInputStyle = (field: keyof SignUpType) => {
    if (errors[field])
      return "border-[#C0392B] focus:border-[#C0392B] focus:ring-[#C0392B]";
    if (focusedFields[field] && !dirtyFields[field])
      return "border-[#C0392B] focus:border-[#C0392B] focus:ring-[#C0392B]";
    if (dirtyFields[field])
      return "border-green-500 focus:border-green-500 focus:ring-green-500";
    return "border-[#B5B7BD]";
  };

  // submit data to backend
  const SubmitData = async (data: SignUpType) => {
    try {
      setIsLoading(true);
      setServerError(null);
      setIsSuccess(false);
      const response = await api.post("/api/v1/auth/signup", data);

      const responseData = response.data.data ?? response.data;
      const { access_token, next_step } = responseData;

      setFormData(data);

      if (next_step === "verify_email") {
        useVerifyStore.getState().setPendingEmail(data.email);
        setIsSuccess(true);
        router.push("/verify-email");
        return;
      }

      if (!access_token) {
        setServerError("Sign up succeeded, but no access token was returned.");
        return;
      }

      localStorage.setItem("token", access_token);
      const meRes = await api.get("/api/v1/users/me");
      const user = meRes.data.data;

      const authUser = normalizeCurrentUser(user);

      setAuth(authUser, access_token);
      setIsSuccess(true);

      router.push("/onboarding");
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;
        const message =
          responseData?.error?.details?.[0]?.msg ||
          responseData?.message ||
          error.message ||
          "Something went wrong. Try again.";
        setServerError(message);
      } else {
        setServerError(
          error instanceof Error
            ? error.message
            : "Unexpected error. Please try again.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="lg:pt-12 flex flex-col items-center 
    justify-center  gap-3.5"
    >
      {/* logo */}
      <div
        className="flex  h-10 w-10 hover:cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image
          src="/icons/meetmind-logo.svg"
          alt="MeetMind logo"
          width={40}
          height={40}
          // fill
          // className=" object-contain"
        />
      </div>

      <div className="bg-[#FEFEFF] flex flex-col gap-2 p-6 rounded-2xl w-full">
        <h1 className="text-center text-[#0F172A] font-bold text-2xl">
          Sign up
        </h1>
        <form
          onSubmit={handleSubmit(SubmitData)}
          className="flex flex-col gap-3.5"
        >
          {/* server error */}
          {serverError && (
            <p
              className="text-[#C0392B] text-sm text-center bg-[#FDEDEC] border
           border-[#F8C6C6] rounded-lg px-3 py-2"
            >
              {serverError}
            </p>
          )}

          {/* name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-base text-[#0F0D0B]">
              Name
            </label>
            <input
              className={`border h-12 rounded-lg px-4 py-3.5
               focus:outline-none focus:ring-0 ${getInputStyle("name")}`}
              type="text"
              id="name"
              {...register("name")}
              onFocus={() => handleFocus("name")}
              onBlur={() => handleBlur("name")}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-[#C0392B] text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-base text-[#0F0D0B]">
              Email
            </label>
            <input
              className={`border h-12 rounded-lg px-4 py-3.5
              focus:outline-none focus:ring-0 ${getInputStyle("email")} `}
              type="email"
              id="email"
              {...register("email")}
              onFocus={() => handleFocus("email")}
              onBlur={() => handleBlur("email")}
              placeholder="you@company.com"
            />
            {errors.email && (
              <p className="text-[#C0392B] text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-base text-[#0F0D0B]">
              Password
            </label>
            <div className="w-full relative">
              <input
                className={`border h-12 rounded-lg px-4 py-3.5 w-full
                focus:outline-none focus:ring-0 ${getInputStyle("password")}`}
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password")}
                onFocus={() => handleFocus("password")}
                onBlur={() => handleBlur("password")}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute text-gray-400 right-2 top-4 hover:cursor-pointer"
              >
                {showPassword ? (
                  <FaRegEyeSlash size={18} />
                ) : (
                  <IoEyeOutline size={18} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-[#C0392B] text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          <Buttons
            text={isLoading ? "Signing up..." : "Sign up"}
            type="submit"
            style="bg-[#02505E] hover:bg-[#02505e]/80  h-12"
            disabled={isLoading}
          />
        </form>
      </div>
    </section>
  );
};

export default Signform;
