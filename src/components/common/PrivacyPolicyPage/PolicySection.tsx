import type { ReactNode } from 'react';

interface PolicySectionProps {
  id: string;
  number: number;
  title: string;
  children: ReactNode;
}

export default function PolicySection({
  id,
  number,
  title,
  children,
}: PolicySectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-24 mb-8 md:mb-10 bg-white p-6 rounded-2xl"
    >
      <div className="inline-flex items-center justify-center bg-[#035A69] text-white text-xs font-bold px-3 py-3 rounded mb-6">
        No. {number}
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-[#035A69] mb-3">
        {title}
      </h2>
      <div className="text-sm md:text-base text-[#3F4555] leading-relaxed space-y-4">
        {children}
      </div>
    </section>
  );
}
