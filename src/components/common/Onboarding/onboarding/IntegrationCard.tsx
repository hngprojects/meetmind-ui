import { ReactNode } from "react";
import { FaCheck } from "react-icons/fa";

interface IntegrationCardProps {
  name: string;
  logo: ReactNode;
  isConnected: boolean;
  onConnect?: () => void;
  disabled?: boolean;
  connectedLabel?: string;
}

export function IntegrationCard({
  name,
  logo,
  isConnected,
  onConnect,
  disabled,
  connectedLabel = "Connected",
}: IntegrationCardProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 flex items-center justify-center">{logo}</div>
        <span className="font-semibold text-slate-700 text-sm">{name}</span>
      </div>

      {isConnected ? (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
          <FaCheck size={14} strokeWidth={3} />
          <span className="text-xs font-bold">{connectedLabel}</span>
        </div>
      ) : (
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            if (disabled) return;
            onConnect?.();
          }}
          className={`px-4 py-1.5 text-xs font-bold rounded-full transition-colors
      ${
        disabled
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-[#005a64] text-white hover:bg-[#004a52]"
      }`}
        >
          {disabled ? "Coming soon" : "Connect"}
        </button>
      )}
    </div>
  );
}
