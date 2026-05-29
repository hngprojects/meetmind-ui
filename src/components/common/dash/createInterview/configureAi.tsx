"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Buttons from "@/components/reuseable-component/buttons";
import { useUserDetailsStore } from "@/store/userDetail";
import {
  useCreateStep4,
  useCreateStep5,
  useCreateStep6,
} from "@/store/createInterviewStore";
import {
  ConfigureAIFormData,
  configureAISchema,
} from "@/schemas/ConfigureAiSchema";

export default function ConfigureAI() {
  const { aiConfig, setAIConfig } = useUserDetailsStore();
  const { setStep5 } = useCreateStep5();
  const { setStep4 } = useCreateStep4();
  const { setStep6 } = useCreateStep6();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ConfigureAIFormData>({
    resolver: zodResolver(configureAISchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      ai_tone: aiConfig.ai_tone ?? "friendly",
      participation_mode: aiConfig.participation_mode ?? "moderate",
      platform: aiConfig.platform ?? "zoom",
      call_link: aiConfig.call_link ?? "",
      scheduled_start: aiConfig.scheduled_start ?? "",
      scheduled_end: aiConfig.scheduled_end ?? "",
    },
  });

  const selectedTone = watch("ai_tone");
  const selectedMode = watch("participation_mode");
  const selectedPlatform = watch("platform");

  const handleBack = () => {
    setStep5(false);
    setStep4(true);
  };

  const onSubmit = (data: ConfigureAIFormData) => {
    setAIConfig({
      ai_tone: data.ai_tone,
      participation_mode: data.participation_mode,
      platform: data.platform ?? "ai_sdk",
      call_link: data.call_link,
      scheduled_start: data.scheduled_start,
      scheduled_end: data.scheduled_end,
    });

    setStep5(false);
    setStep6(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {/* AI Tone */}
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold text-base">AI Tone</h3>
        <div className="flex flex-row gap-3">
          {(["professional", "friendly", "casual"] as const).map((tone) => (
            <button
              key={tone}
              type="button"
              onClick={() => setValue("ai_tone", tone)}
              className={`flex-1 py-2 px-4 rounded-lg border text-sm capitalize
                transition-colors duration-200 cursor-pointer
                ${
                  selectedTone === tone
                    ? "bg-[#02505E] text-white border-[#02505E]"
                    : "bg-white text-gray-700 border-gray-300 hover:border-[#02505E]"
                }`}
            >
              {tone.charAt(0).toUpperCase() + tone.slice(1)}
            </button>
          ))}
        </div>
        {errors.ai_tone && (
          <p className="text-[#C0392B] text-sm">{errors.ai_tone.message}</p>
        )}
      </div>

      {/* Response Detailed Level */}
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold text-base">Response Detailed Level</h3>
        <div className="flex flex-row gap-3">
          {(["brief", "moderate", "detailed"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setValue("participation_mode", mode)}
              className={`flex-1 py-2 px-4 rounded-lg border text-sm capitalize
                transition-colors duration-200 cursor-pointer
                ${
                  selectedMode === mode
                    ? "bg-[#02505E] text-white border-[#02505E]"
                    : "bg-white text-gray-700 border-gray-300 hover:border-[#02505E]"
                }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
        {errors.participation_mode && (
          <p className="text-[#C0392B] text-sm">
            {errors.participation_mode.message}
          </p>
        )}
      </div>

      {/* Platform */}
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold text-base">Platform</h3>
        <p className="text-sm text-gray-500">
          Select which platform Meet Mind should join
        </p>
        <div className="flex flex-row gap-3">
          {(
            [
              { value: "google_meet", label: "Google Meet", disabled: true },
              { value: "zoom", label: "Zoom", disabled: true },
              { value: "ai_sdk", label: "AI SDK", disabled: false },
            ] as const
          ).map(({ value, label, disabled }) => (
            <button
              key={value}
              type="button"
              onClick={() => !disabled && setValue("platform", value)}
              disabled={disabled}
              className={`flex-1 py-2 px-4 rounded-lg border text-sm
      transition-colors duration-200
      ${
        disabled
          ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
          : selectedPlatform === value
            ? "bg-[#02505E] text-white border-[#02505E] cursor-pointer"
            : "bg-white text-gray-700 border-gray-300 hover:border-[#02505E] cursor-pointer"
      }`}
            >
              {label}
              {disabled && (
                <span className="block text-xs text-gray-400 mt-0.5">
                  Coming soon
                </span>
              )}
            </button>
          ))}
        </div>
        {errors.platform && (
          <p className="text-[#C0392B] text-sm">{errors.platform.message}</p>
        )}
      </div>

      {/* Call Link */}
      <div className="flex flex-col gap-1">
        <label htmlFor="call_link" className="text-base text-text-subtext">
          Call link
        </label>
        <input
          type="text"
          id="call_link"
          className="bg-white h-11 py-2 px-3 border border-gray-200 rounded-lg
            placeholder:text-gray-400 focus:outline-none focus:border-[#02505E]"
          {...register("call_link")}
          placeholder="Paste meeting link here"
        />
        {errors.call_link && (
          <p className="text-[#C0392B] text-sm">{errors.call_link.message}</p>
        )}
      </div>

      {/* Schedule date & time */}
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold text-base">Schedule date & time</h3>
        <div className="flex flex-col gap-3">
          {/* Start */}
          <div className="flex flex-col gap-1 flex-1">
            <label htmlFor="scheduled_start" className="text-sm text-gray-500">
              Start time
            </label>
            <input
              type="datetime-local"
              id="scheduled_start"
              className="bg-white h-11 py-2 px-3 border border-gray-200 rounded-lg
                focus:outline-none focus:border-[#02505E] text-sm"
              {...register("scheduled_start")}
            />
            {errors.scheduled_start && (
              <p className="text-[#C0392B] text-sm">
                {errors.scheduled_start.message}
              </p>
            )}
          </div>

          {/* End */}
          <div className="flex flex-col gap-1 flex-1">
            <label htmlFor="scheduled_end" className="text-sm text-gray-500">
              End time
            </label>
            <input
              type="datetime-local"
              id="scheduled_end"
              className="bg-white h-11 py-2 px-3 border border-gray-200 rounded-lg
                focus:outline-none focus:border-[#02505E] text-sm"
              {...register("scheduled_end")}
            />
            {errors.scheduled_end && (
              <p className="text-[#C0392B] text-sm">
                {errors.scheduled_end.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-5 justify-end">
        <Buttons text="Back" type="button" onClick={handleBack} />
        <Buttons
          type="submit"
          disabled={isSubmitting}
          text={isSubmitting ? "Saving…" : "Continue →"}
        />
      </div>
    </form>
  );
}
