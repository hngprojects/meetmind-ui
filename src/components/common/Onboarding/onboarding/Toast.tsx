"use client";

import { onboardingStore } from "@/store/onboardingStore";
import { cn } from "@/lib/utils";

export default function ToastContainer() {
  const toasts = onboardingStore((s) => s.toasts);
  const removeToast = onboardingStore((s) => s.removeToast);

  return (
    <div
      className="fixed top-4 right-4 flex flex-col gap-2 z-50 w-[320px]"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          onClick={() => removeToast(toast.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") removeToast(toast.id);
          }}
          className={cn(
            "px-4 py-3 rounded-lg text-sm shadow border cursor-pointer",
            "transition-all duration-200 transform",
            "hover:scale-[1.01]",

            toast.type === "success" &&
              "bg-green-50 text-green-700 border-green-200",

            toast.type === "error" && "bg-red-50 text-red-700 border-red-200",

            toast.type === "info" && "bg-white text-slate-700 border-slate-200",
          )}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
