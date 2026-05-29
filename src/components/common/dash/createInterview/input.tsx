"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const Input = () => {
  const { extractedDetails } = useResumeStore();
  const { setCandidate, candidate } = useUserDetailsStore();
  const { setStep2 } = useCreateStep2();
  const { setStep3 } = useCreateStep3();
  const { setStep4 } = useCreateStep4();

  // form submission
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputValuesType>({
    resolver: zodResolver(inputSchema),
    mode: "onSubmit",
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

  const handleBack = () => {
    setStep3(false);
    setStep2(true);
  };
  const onSubmit = (data: InputValuesType) => {
    //  Save to userDetailsStore — transform to match API shape
    setCandidate({
      full_name: data.name,
      email: data.email,
      phone: data.phone,
      current_role: data.roleTitle,
      years_of_experience: data.yearsofExperience,
      skills: data.keySkills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      location: data.location,
      portfolio_url: data.portfolioLink,
    });

    // Move to step 4
    setStep3(false);
    setStep4(true);
  };
  return (
    <div>
      <div className="flex flex-col gap-4 pb-4">
        <h1 className="font-bold text-xl">Candidate Information</h1>
        <p className="text-text-subtext text-base">
          Edit your candidate information below:
        </p>
        <p
          className="bg-text-primary w-[60%] md:w-[40%] p-2 
                   text-center rounded-lg text-white"
        >
          Edit Form input
        </p>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-base text-text-subtext ">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-white h-11 py-2 px-3 
          placeholder:text-text-color-primary"
            {...register("name")}
            placeholder="Senior Product Manager"
          />
          {errors.name && (
            <p className="text-[#C0392B] text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-base text-text-subtext ">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="bg-white h-11 py-2 px-3 
          placeholder:text-text-color-primary"
            {...register("email")}
            placeholder="Temibalogun@gmail.com"
          />
          {errors.email && (
            <p className="text-[#C0392B] text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Job Role */}
        <div className="flex flex-col gap-1">
          <label htmlFor="roleTitle" className="text-base text-text-subtext ">
            Job Role
          </label>
          <input
            type="text"
            id="roleTitle"
            className="bg-white h-11 py-2 px-3 
          placeholder:text-text-color-primary"
            {...register("roleTitle")}
            placeholder=" Product Designer"
          />
          {errors.roleTitle && (
            <p className="text-[#C0392B] text-sm">{errors.roleTitle.message}</p>
          )}
        </div>

        {/* Years of Experience */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="yearsofExperience"
            className="text-base text-text-subtext "
          >
            Years of Experience
          </label>
          <input
            type="number"
            id="yearsofExperience"
            className="bg-white h-11 py-2 px-3 
          placeholder:text-text-color-primary"
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
          <label htmlFor="keySkills" className="text-base text-text-subtext ">
            Key Skills
          </label>
          <input
            type="text"
            id="keySkills"
            className="bg-white h-11 py-2 px-3 
          placeholder:text-text-color-primary"
            {...register("keySkills")}
            placeholder="Figma, Sketch, Adobe XD"
          />
          {errors.keySkills && (
            <p className="text-[#C0392B] text-sm">{errors.keySkills.message}</p>
          )}
        </div>

        {/* location */}
        <div className="flex flex-col gap-1">
          <label htmlFor="location" className="text-base text-text-subtext ">
            Location
          </label>
          <input
            type="text"
            id="location"
            className="bg-white h-11 py-2 px-3 
          placeholder:text-text-color-primary"
            {...register("location")}
            placeholder="Lagos, Nigeria"
          />
          {errors.location && (
            <p className="text-[#C0392B] text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* phone */}
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-base text-text-subtext ">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            className="bg-white h-11 py-2 px-3 
          placeholder:text-text-color-primary"
            {...register("phone")}
            placeholder="+234 801 234 5678"
          />
          {errors.phone && (
            <p className="text-[#C0392B] text-sm">{errors.phone.message}</p>
          )}
        </div>

        {/* Portfolio Link */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="portfolioLink"
            className="text-base text-text-subtext "
          >
            Portfolio Link
          </label>
          <input
            type="text"
            id="portfolioLink"
            className="bg-white h-11 py-2 px-3 
          placeholder:text-text-color-primary"
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
