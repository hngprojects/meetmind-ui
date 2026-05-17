import { cn } from "@/lib/utils";

interface ToggleCardProps {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}

export function ToggleCard({
  title,
  description,
  enabled,
  onToggle,
}: ToggleCardProps) {
  return (
    <button
      type="button"
      aria-pressed={enabled}
      aria-label={title}
      onClick={onToggle}
      className="flex items-center justify-between p-5 bg-white border border-border rounded-2xl cursor-pointer hover:border-slate-200 transition-all"
    >
      <div className="flex flex-col gap-0.5">
        <h4 className="font-bold text-foreground text-[16px]">{title}</h4>
        <p className="text-sm text-slate-400 font-medium">{description}</p>
      </div>
      <div
        className={cn(
          "w-12 h-6 rounded-full transition-colors relative flex items-center px-1 shrink-0",
          enabled ? "bg-primary text-primary-foreground" : "bg-muted",
        )}
      >
        <div
          className={cn(
            "bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out shadow-sm",
            enabled ? "translate-x-6" : "translate-x-0",
          )}
        />
      </div>
    </button>
  );
}
