type Props = {
  currentStep: number;
  currentstyle?: string;
};

const stepIndicator = ({ currentStep, currentstyle }: Props) => {
  const TOTAL_STEPS = 4;
  return (
    <div className={`flex flex-row gap-3 ${currentstyle}`}>
      {" "}
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div
          key={i}
          className={`flex-1 h-1.5 rounded-full transition-colors duration-300
        ${i < currentStep ? "bg-[#02505E]" : "bg-gray-200"}`}
        />
      ))}
    </div>
  );
};

export default stepIndicator;
