import { IoCheckmark } from "react-icons/io5";

interface PasswordRequirementsProps {
  password: string;
}

const PasswordRequirements = ({ password }: PasswordRequirementsProps) => {
  const checks = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "Upper case letter (A-Z)",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "Lower case letter (a-z)",
      valid: /[a-z]/.test(password),
    },
    {
      label: "One symbol (@,#,$,%)",
      valid: /[@#$%]/.test(password),
    },
  ];

  return (
    <div className="mt-4 space-y-2">
      {checks.map((check) => (
        <div
          key={check.label}
          className={`flex items-center gap-2 text-sm ${
            check.valid ? "text-[#12B76A]" : "text-[#98A2B3]"
          }`}
        >
          <IoCheckmark size={16} />

          <span>{check.label}</span>
        </div>
      ))}
    </div>
  );
};

export default PasswordRequirements;
