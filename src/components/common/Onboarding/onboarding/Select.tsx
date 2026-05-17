import type React from "react";
import { useId } from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
};

const Select = ({
  label,
  error,
  options,
  className,
  ...props
}: SelectProps) => {
  const generatedId = useId();
const selectId = props.id ?? generatedId;
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label  htmlFor={selectId} className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <select id={selectId}
        className={`
          w-full rounded-md border border-gray-200 bg-white
          px-3 py-2 text-sm outline-none transition
          focus:border-[#005566] focus:ring-1 focus:ring-[#005566]/20
          ${error ? "border-red-500 focus:border-red-500 focus:ring-red-200" : ""}
          ${className ?? ""}
        `}
        {...props}
      >
        <option value="" disabled hidden>
          Select an option
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Select;
