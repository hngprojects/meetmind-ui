import { onboardingStore } from "../../../../store/onboardingStore";
import { cn } from "@/lib/utils";

const tones = ["Friendly", "Casual", "Professional"];

const TonePicker = () => {
  const { data, updateData } = onboardingStore();
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-900">
        Default interview tone
      </label>

      <div className="flex gap-2">
        {tones.map((tone) => {
          const isSelected = data.tone === tone;
          return (
            <button
              type="button"
              aria-pressed={isSelected}
              key={tone}
              onClick={() => updateData({ tone })}
              className={cn(
                "flex-1 py-2 h-12 text-sm font-medium rounded-lg border transition-all",
                isSelected
                  ? "border-primary text-primary bg-white shadow-sm"
                  : "border-border text-muted-foreground bg-white hover:border-slate-300 hover:text-slate-700",
              )}
            >
              {tone}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TonePicker;
