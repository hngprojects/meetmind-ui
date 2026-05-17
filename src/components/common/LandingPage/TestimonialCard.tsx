import Image from "next/image";

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
  quoteIcon?: string;
  isWide?: boolean;
}

export default function TestimonialCard({
  name,
  role,
  company,
  quote,
  image,
  quoteIcon,
  isWide = false,
}: TestimonialCardProps) {
  return (
    <div
      className={`
      bg-[#FFFFFF]
      rounded-2xl
      p-6
      flex
      flex-col
      ${isWide ? "md:row-span-2 justify-between" : ""}
    `}
    >
      <div>
        <div className="flex items-center gap-3 mb-6">
          {/* <img
            src={image}
            alt={name}
            className={`
            rounded-full
            object-cover
            ${isWide ? 'w-10 h-10' : 'w-12 h-12'}
          `}
          /> */}
          <Image
            src={image}
            alt={name}
            width={88}
            height={88}
            className={`
            rounded-full
            object-cover
            ${isWide ? "w-10 h-10" : "w-12 h-12"}
          `}
          />

          <div>
            <p className="text-[#030712] text-sm font-semibold">{name}</p>

            <p className="text-[#3F4555] text-xs">
              {role}, {company}
            </p>
          </div>
        </div>

        <p className="text-sm leading-5 text-[#0F172A]">{quote}</p>
      </div>

      {quoteIcon && (
        <div className="flex justify-end mt-8">
          {/* <img src={quoteIcon} alt="" className="w-47.5 h-50" /> */}
          <Image
            src={quoteIcon}
            alt=""
            width={88}
            height={88}
            className="w-47.5 h-50"
          />
        </div>
      )}
    </div>
  );
}
