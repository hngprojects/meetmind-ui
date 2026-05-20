import { ReactNode } from "react";
import { FaCheck } from "react-icons/fa";

interface IntegrationCardProps {
  name: string;
  logo: ReactNode;
  isConnected: boolean;
  onConnect: () => void;
}

export function IntegrationCard({
  name,
  logo,
  isConnected,
  onConnect,
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
          <span className="text-xs font-bold">Done</span>
        </div>
      ) : (
        <button
          type="button"
          onClick={onConnect}
          className="px-4 py-1.5 bg-[#005a64] text-white text-xs font-bold rounded-full hover:bg-[#004a52] transition-colors"
        >
          Connect
        </button>
      )}
    </div>
  );
}
