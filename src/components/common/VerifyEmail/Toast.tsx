"use client";

import { CheckCircle, AlertCircle, X } from "lucide-react";

interface ToastProps {
  type?: "success" | "error";
  message: string;
  onClose: () => void;
}

export default function Toast({
  type = "success",
  message,
  onClose,
}: ToastProps) {
  return (
    <div
      className={`
        fixed top-4 right-4 z-50
        flex items-center gap-3
        min-w-[320px]
        rounded-lg border px-4 py-3 shadow-lg
        ${
          type === "success"
            ? "bg-green-50 border-green-200 text-green-700"
            : "bg-red-50 border-red-200 text-red-700"
        }
      `}
    >
      {type === "success" ? (
        <CheckCircle size={18} />
      ) : (
        <AlertCircle size={18} />
      )}

      <p className="flex-1 text-sm">{message}</p>

      <button onClick={onClose}>
        <X size={16} />
      </button>
    </div>
  );
}
