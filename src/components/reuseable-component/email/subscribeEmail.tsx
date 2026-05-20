import {
  subscribeEmailschema,
  type subscribeEmailType,
} from "@/schemas/subscribeEmail";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import api from "@/lib/api";
import { usesubscribeStore } from "@/store/subscribeEmailStore";
import Buttons from "../buttons";

type Props = {
  style: string;
  label?: string;
  labelStyle?: string;
};

const SubscribeEmail = ({ style, label, labelStyle }: Props) => {
  const {
    focusedFields,
    handleFocus,
    isLoading,
    isSuccess,
    serverError,
    setFormData,
    setIsLoading,
    setIsSuccess,
    setServerError,
  } = usesubscribeStore();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<subscribeEmailType>({
    resolver: zodResolver(subscribeEmailschema),
    defaultValues: { email: "" },
  });

  const getInputStyle = (field: keyof subscribeEmailType) => {
    if (errors[field])
      return "border-[#C0392B] focus:border-[#C0392B] focus:ring-[#C0392B]";
    if (dirtyFields[field])
      return "border-green-500 focus:border-green-500 focus:ring-green-500";
    if (focusedFields[field])
      return "border-[#02505E] focus:border-[#02505E] focus:ring-[#02505E]";
    return "border-[#B5B7BD]";
  };

  const SubmitData = async (data: subscribeEmailType) => {
    try {
      setIsLoading(true);
      setServerError(null);
      setIsSuccess(false);

      await api.post("/api/v1/subscriptions/email", data);

      setFormData(data);
      setIsSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;
        const message =
          responseData?.error?.details?.[0]?.msg ||
          responseData?.message ||
          "Something went wrong. Try again.";
        setServerError(message);
      } else {
        setServerError("Unexpected error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {serverError && (
        <p className="text-[#C0392B] text-sm text-center bg-[#FDEDEC] border border-[#F8C6C6] rounded-lg px-3 py-2">
          {serverError}
        </p>
      )}

      {isSuccess && (
        <p className="text-green-600 text-sm text-center bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          You&apos;re on the list! We&apos;ll be in touch soon.
        </p>
      )}

      <form onSubmit={handleSubmit(SubmitData)} className={`${style} w-full`}>
        <div className="flex flex-col gap-1 flex-1 w-full">
          <label className={`${labelStyle}`}> {label}</label>
          <input
            className={`border h-12 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-1 w-full ${getInputStyle("email")}`}
            type="email"
            id="email"
            {...register("email")}
            onFocus={() => handleFocus("email")}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-[#C0392B] text-sm">{errors.email.message}</p>
          )}
        </div>

        <Buttons
          text={isLoading ? "Signing up..." : "Get early access"}
          type="submit"
          style="bg-[#02505E] hover:bg-[#02505e]/80 h-12"
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default SubscribeEmail;
