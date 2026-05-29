"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { inputSchema, InputValuesType } from "@/schemas/inputSchema";
import { useUserDetailsStore } from "@/store/userDetail";
import { useResumeStore } from "@/store/ResumeStore";
import {
  useCreateStep2,
  useCreateStep3,
  useCreateStep4,
} from "@/store/createInterviewStore";
import Buttons from "@/components/reuseable-component/buttons";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import StepIndicator from "./stepIndicator";

// ── Skill Counter ─────────────────────────────────────────────────────────────
function SkillCounter({ value }: { value: string }) {
  const count = value
    ? value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean).length
    : 0;

  return (
    <p
      className={`text-xs mt-0.5 ${count > 10 ? "text-[#C0392B]" : "text-gray-400"}`}
    >
      {count}/10 skills
      {count > 10 && " — max 10 allowed"}
    </p>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
const Input = () => {
  const { extractedDetails } = useResumeStore();
  const { setCandidate, candidate } = useUserDetailsStore();
  const { setStep2 } = useCreateStep2();
  const { setStep3 } = useCreateStep3();
  const { setStep4 } = useCreateStep4();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<InputValuesType>({
    resolver: zodResolver(inputSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      name: candidate.full_name || extractedDetails?.full_name || "",
      email: candidate.email || extractedDetails?.email || "",
      phone: candidate.phone || extractedDetails?.phone || "",
      roleTitle: candidate.current_role || extractedDetails?.current_role || "",
      yearsofExperience:
        candidate.years_of_experience ??
        extractedDetails?.years_of_experience ??
        undefined,
      keySkills:
        candidate.skills?.join(", ") ||
        extractedDetails?.skills?.join(", ") ||
        "",
      location: candidate.location || extractedDetails?.location || "",
      portfolioLink: candidate.portfolio_url || "",
    },
  });
  // ← replace watch() with useWatch()
  const keySkillsValue = useWatch({ control, name: "keySkills" });
  const handleBack = () => {
    setStep3(false);
    setStep2(true);
  };

  const onSubmit = (data: InputValuesType) => {
    setCandidate({
      full_name: data.name,
      email: data.email,
      phone: data.phone,
      current_role: data.roleTitle,
      years_of_experience: data.yearsofExperience,
      skills: data.keySkills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 10),
      location: data.location,
      portfolio_url: data.portfolioLink,
    });

    setStep3(false);
    setStep4(true);
  };

  return (
    <div>
      <StepIndicator currentStep={2} currentstyle="pb-6" />

      <div className="flex flex-col gap-4 pb-4">
        <h1 className="font-bold text-xl">Candidate Information</h1>
        <p className="text-text-subtext text-base">
          Edit your candidate information below:
        </p>
        <p className="bg-text-primary w-[60%] md:w-[40%] p-2 text-center rounded-lg text-white">
          Edit Form input
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-base text-text-subtext">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-white h-11 py-2 px-3 placeholder:text-text-color-primary
              border border-gray-200 rounded-lg focus:outline-none focus:border-[#02505E]"
            {...register("name")}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-[#C0392B] text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-base text-text-subtext">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-white h-11 py-2 px-3 placeholder:text-text-color-primary
              border border-gray-200 rounded-lg focus:outline-none focus:border-[#02505E]"
            {...register("email")}
            placeholder="Temibalogun@gmail.com"
          />
          {errors.email && (
            <p className="text-[#C0392B] text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Job Role */}
        <div className="flex flex-col gap-1">
          <label htmlFor="roleTitle" className="text-base text-text-subtext">
            Job Role
          </label>
          <input
            type="text"
            id="roleTitle"
            className="bg-white h-11 py-2 px-3 placeholder:text-text-color-primary
              border border-gray-200 rounded-lg focus:outline-none focus:border-[#02505E]"
            {...register("roleTitle")}
            placeholder="Product Designer"
          />
          {errors.roleTitle && (
            <p className="text-[#C0392B] text-sm">{errors.roleTitle.message}</p>
          )}
        </div>

        {/* Years of Experience */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="yearsofExperience"
            className="text-base text-text-subtext"
          >
            Years of Experience
          </label>
          <input
            type="number"
            id="yearsofExperience"
            className="bg-white h-11 py-2 px-3 placeholder:text-text-color-primary
              border border-gray-200 rounded-lg focus:outline-none focus:border-[#02505E]"
            {...register("yearsofExperience", { valueAsNumber: true })}
            placeholder="5"
          />
          {errors.yearsofExperience && (
            <p className="text-[#C0392B] text-sm">
              {errors.yearsofExperience.message}
            </p>
          )}
        </div>

        {/* Key Skills */}
        <div className="flex flex-col gap-1">
          <label htmlFor="keySkills" className="text-base text-text-subtext">
            Key Skills
            <span className="text-xs text-gray-400 ml-2">
              (max 10, comma-separated)
            </span>
          </label>
          <input
            type="text"
            id="keySkills"
            className="bg-white h-11 py-2 px-3 placeholder:text-text-color-primary
              border border-gray-200 rounded-lg focus:outline-none focus:border-[#02505E]"
            {...register("keySkills")}
            placeholder="Figma, Sketch, Adobe XD"
          />
          {/*  Live skill counter */}
          <SkillCounter value={keySkillsValue ?? ""} />
          {errors.keySkills && (
            <p className="text-[#C0392B] text-sm">{errors.keySkills.message}</p>
          )}
        </div>

        {/* Location */}
        <div className="flex flex-col gap-1">
          <label htmlFor="location" className="text-base text-text-subtext">
            Location
          </label>
          <input
            type="text"
            id="location"
            className="bg-white h-11 py-2 px-3 placeholder:text-text-color-primary
              border border-gray-200 rounded-lg focus:outline-none focus:border-[#02505E]"
            {...register("location")}
            placeholder="Lagos, Nigeria"
          />
          {errors.location && (
            <p className="text-[#C0392B] text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-base text-text-subtext">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            className="bg-white h-11 py-2 px-3 placeholder:text-text-color-primary
              border border-gray-200 rounded-lg focus:outline-none focus:border-[#02505E]"
            {...register("phone")}
            placeholder="+2348012345678"
          />
          {errors.phone && (
            <p className="text-[#C0392B] text-sm">{errors.phone.message}</p>
          )}
        </div>

        {/* Portfolio Link */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="portfolioLink"
            className="text-base text-text-subtext"
          >
            Portfolio Link
          </label>
          <input
            type="text"
            id="portfolioLink"
            className="bg-white h-11 py-2 px-3 placeholder:text-text-color-primary
              border border-gray-200 rounded-lg focus:outline-none focus:border-[#02505E]"
            {...register("portfolioLink")}
            placeholder="https://www.behance.net/your-profile"
          />
          {errors.portfolioLink && (
            <p className="text-[#C0392B] text-sm">
              {errors.portfolioLink.message}
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
            text={isSubmitting ? "Saving..." : "Continue"}
            type="submit"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default Input;
