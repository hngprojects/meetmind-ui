"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddContextFormData,
  addContextSchema,
} from "@/schemas/addContextSchema";
import Buttons from "@/components/reuseable-component/buttons";
import {
  useCreateStep3,
  useCreateStep4,
  useCreateStep5,
} from "@/store/createInterviewStore";
import { useResumeStore } from "@/store/ResumeStore";
import { useUserDetailsStore } from "@/store/userDetail";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function AddContextForm() {
  const { extractedDetails } = useResumeStore();
  const { interviewDetails, setInterviewDetails } = useUserDetailsStore();

  const { setStep3 } = useCreateStep3();
  const { setStep4 } = useCreateStep4();
  const { setStep5 } = useCreateStep5();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddContextFormData>({
    resolver: zodResolver(addContextSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      roleTitle:
        interviewDetails.role_title ?? extractedDetails?.current_role ?? "",
      jobDescription: interviewDetails.job_description ?? "",
      keySkills:
        interviewDetails.skills_to_assess?.join(", ") ??
        extractedDetails?.skills?.join(", ") ??
        "",
      customQuestion: interviewDetails.custom_question ?? "",
    },
  });

  const handleBack = () => {
    setStep3(true);
    setStep4(false);
  };

  const handleContinue = (data: AddContextFormData) => {
    setInterviewDetails({
      role_title: data.roleTitle,
      job_description: data.jobDescription,
      skills_to_assess: data.keySkills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      custom_question: data.customQuestion ?? "",
    });
    setStep4(false);
    setStep5(true);
  };

  return (
    <form
      onSubmit={handleSubmit(handleContinue)}
      className="flex flex-col gap-5"
    >
      {errors.root && (
        <p className="text-[#C0392B] text-sm text-center bg-[#FDEDEC] border border-[#F8C6C6] rounded-lg px-3 py-2">
          {errors.root.message}
        </p>
      )}
      {/* Role title */}
      <div className="flex flex-col gap-1">
        <label htmlFor="role" className="text-base text-text-subtext ">
          Role title
        </label>
        <input
          type="text"
          id="role"
          className="bg-white h-11 py-2 px-3 
          placeholder:text-muted-foreground"
          {...register("roleTitle")}
          placeholder="Senior Product Manager"
        />
        {errors.roleTitle && (
          <p className="text-[#C0392B] text-sm">{errors.roleTitle.message}</p>
        )}
      </div>

      {/* Job Description */}
      <div className="flex flex-col gap-1">
        <label htmlFor="job" className="text-base text-text-subtext">
          Job description
        </label>
        <textarea
          id="job"
          className="bg-white pt-2 px-4 
           py-6 placeholder:text-muted-foreground
           h-20"
          {...register("jobDescription")}
          placeholder="We’re looking for a product manager ..."
        />
        {errors.jobDescription && (
          <p className="text-[#C0392B] text-sm">
            {errors.jobDescription.message}
          </p>
        )}
      </div>

      {/* Key skills to assess  */}
      <div className="flex flex-col gap-1">
        <label htmlFor="keySkills" className="text-base text-text-subtext">
          Key skills to assess
        </label>
        <input
          type="text"
          id="keySkills"
          className="bg-white pt-2 placeholder:text-muted-foreground"
          {...register("keySkills")}
          placeholder="Communication, technical depth…"
        />
        {errors.keySkills && (
          <p className="text-[#C0392B] text-sm">{errors.keySkills.message}</p>
        )}
      </div>

      {/* Custom question */}
      <div className="flex flex-col gap-1">
        <label htmlFor="custom" className="text-base text-text-subtext">
          Custom question
        </label>
        <textarea
          id="custom"
          className="bg-white  placeholder:text-muted-foreground pt-2
           h-20"
          {...register("customQuestion")}
          placeholder="Validate product judgement, visual ...."
        />
        {errors.customQuestion && (
          <p className="text-[#C0392B] text-sm">
            {errors.customQuestion.message}
          </p>
        )}
      </div>

      <div className="flex flex-row gap-5 justify-end">
        <Buttons
          style="bg-white text-[#3F4555] hover:bg-white/70"
          icon={<FaArrowLeft />}
          text="Back"
          type="button"
          onClick={handleBack}
        />
        <Buttons
          icon2={<FaArrowRight />}
          type="submit"
          disabled={isSubmitting}
          text={isSubmitting ? "Saving…" : "Continue"}
        />
      </div>
    </form>
  );
}
