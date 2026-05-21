"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { FaRegUser } from "react-icons/fa";

export interface HireOption {
  value: string;
  title: string;
  description?: string;
}

interface Props {
  options: HireOption[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export function HireRadioGroup({
  options,
  defaultValue,
  onValueChange,
  ...ariaProps
}: Props) {
  const [selected, setSelected] = useState(defaultValue ?? "");

  const handleSelect = (value: string) => {
    setSelected(value);
    onValueChange?.(value);
  };

  return (
    <div className="space-y-3" role="radiogroup" {...ariaProps}>
      {options.map((opt, index) => {
        const active = selected === opt.value;

        return (
          <button
            type="button"
            role="radio"
            key={opt.value}
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => handleSelect(opt.value)}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                handleSelect(opt.value);
                return;
              }
              if (
                e.key === "ArrowRight" ||
                e.key === "ArrowDown" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowUp"
              ) {
                e.preventDefault();
                const dir =
                  e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
                const nextIndex =
                  (index + dir + options.length) % options.length;
                handleSelect(options[nextIndex].value);
                const radios = e.currentTarget
                  .closest('[role="radiogroup"]')
                  ?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
                radios?.[nextIndex]?.focus();
              }
            }}
            className={cn(
              "flex items-center gap-4 cursor-pointer rounded-xl border p-4 transition-all relative w-full",
              active
                ? "border-primary bg-card ring-1 ring-ring"
                : "border-border hover:border-slate-300 bg-white",
            )}
          >
            <div className="shrink-0 text-slate-400">
              <FaRegUser size={20} />
            </div>

            <div className="grow">
              <p
                className={cn(
                  "font-semibold text-[15px]",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {opt.title}
              </p>
              <p className="text-sm text-slate-400">{opt.description}</p>
            </div>
            <div className="shrink-0 ml-2 w-5 h-5 flex items-center justify-center">
              {active && <div className="w-3 h-3 rounded-full bg-primary" />}
            </div>
          </button>
        );
      })}
    </div>
  );
}
