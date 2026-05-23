import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddContextFormData,
  addContextSchema,
} from "@/schemas/addContextSchema";
import { useAddContextStore } from "@/store/useAddContextStore";
import Buttons from "@/components/reuseable-component/buttons";
import axios from "axios";
import api from "@/lib/api";

export default function AddContextForm() {
  const { contextData, setContextData } = useAddContextStore();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AddContextFormData>({
    resolver: zodResolver(addContextSchema),
    defaultValues: {
      roleTitle: contextData?.roleTitle ?? "",
      jobDescription: contextData?.jobDescription ?? "",
      keySkills: contextData?.keySkills ?? "",
      customQuestion: contextData?.customQuestion ?? "",
    },
  });

  const onSubmit = async (data: AddContextFormData) => {
    try {
      const response = await api.put(
        "/api/v1/interviews/${interviewId}/context",
        data,
      );
      setContextData(data);
      console.log("Success:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message ?? "Something went wrong";
        setError("root", { message });
      } else {
        setError("root", { message: "Unexpected error" });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-5">
      {/* Tab toggle — writes to the "mode" field */}

      {/* Role title */}
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-base text-text-subtext">
          Role title
        </label>
        <input
          type="text"
          id="name"
          className="bg-white pt-2 placeholder:text-[#0F172A]"
          {...register("roleTitle")}
          placeholder="Senior Product Manager"
        />
        {errors.roleTitle && (
          <p className="text-[#C0392B] text-sm">{errors.roleTitle.message}</p>
        )}
      </div>

      {/* Job disscription */}
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-base text-text-subtext">
          Job description
        </label>
        <textarea
          id="name"
          className="bg-white pt-2 placeholder:text-[#0F172A]
           h-20"
          {...register("jobDescription")}
          placeholder="We’re looking for a 
          product manager with at  3 years of
           experience and a good technical knowledge"
        />
        {errors.jobDescription && (
          <p className="text-[#C0392B] text-sm">
            {errors.jobDescription.message}
          </p>
        )}
      </div>

      {/* Key skills to assess  */}
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-base text-text-subtext">
          Key skills to assess
        </label>
        <input
          type="text"
          id="name"
          className="bg-white pt-2 placeholder:text-[#0F172A]"
          {...register("keySkills")}
          placeholder="Communication, technical depth…"
        />
        {errors.keySkills && (
          <p className="text-[#C0392B] text-sm">{errors.keySkills.message}</p>
        )}
      </div>

      {/* Custom question */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="name"
          className="text-base text-text-subtext  placeholder:text-[#0F172A]"
        >
          Job description
        </label>
        <textarea
          id="name"
          className="bg-white  placeholder:text-[#0F172A] pt-2
           h-20"
          {...register("customQuestion")}
          placeholder="Validate product judgement, visual 
          hierarchy,
           and how Temitope handles tradeoffs with engineering."
        />
        {errors.customQuestion && (
          <p className="text-[#C0392B] text-sm">
            {errors.customQuestion.message}
          </p>
        )}
      </div>

      <div className="flex flex-row gap-5 justify-end">
        <Buttons text="Back" type="button" />
        <Buttons
          type="submit"
          disabled={isSubmitting}
          text={isSubmitting ? "Saving…" : "Continue →"}
        />
      </div>
    </form>
  );
}
