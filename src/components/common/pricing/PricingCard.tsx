"use client";

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  buttonText: string;
  buttonVariant: "outline" | "solid";
  isCustom?: boolean;
  onButtonClick?: () => void;
}

export function PricingCard({
  name,
  price,
  description,
  buttonText,
  buttonVariant,
  isCustom,
  onButtonClick,
}: PricingCardProps) {
  return (
    <div className="max-w-7xl mx-auto flex-1 min-w-[240px] bg-white border border-[#eaeef2] rounded-2xl py-7 px-6 pb-8 shadow-sm">
      <div className="text-[1.35rem] font-bold tracking-[-0.2px] mb-2 text-black">
        {name}
      </div>
      {isCustom ? (
        <>
          <div className="text-3xl font-bold mt-3 mb-1 text-black">{price}</div>
          <div className="text-sm text-[#5c6b7a] mt-2 mb-6 leading-normal">
            {description}
          </div>
        </>
      ) : (
        <>
          <div className="text-4xl font-bold mt-3 mb-1 tracking-[-0.02em] text-black">
            {price}
          </div>
          <div className="text-sm text-[#5c6b7a] mt-1 mb-6">{description}</div>
        </>
      )}
      <button
        type="button"
        onClick={onButtonClick}
        className={`
          w-full text-center py-2.5 px-4 rounded-full font-semibold text-sm transition-colors cursor-pointer
          ${
            buttonVariant === "solid"
              ? "bg-black text-white border border-transparent hover:bg-gray-800"
              : "bg-transparent border border-[#cbd5e1] text-[#1f2a3e] hover:bg-gray-50"
          }
        `}
      >
        {buttonText}
      </button>
    </div>
  );
}
