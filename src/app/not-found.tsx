"use client";

import { useRouter } from "next/navigation";
import { GoArrowLeft } from "react-icons/go";

export default function NotFound() {
  const router = useRouter();

  const handleBackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
  };

  return (
    <main className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-12 bg-[#FEFEFF] text-center">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-[#D9E8EA] flex items-center justify-center text-[#036475] text-4xl mb-8 animate-pulse">
          🚧
        </div>
        <h1 className="text-[#3F4555] text-3xl sm:text-5xl font-serif font-normal tracking-tight mb-4">
          Coming soon
        </h1>
        <p className="text-gray-500 text-base sm:text-lg max-w-md mb-10 leading-relaxed">
          This page is currently under construction and will be available soon.
        </p>

        <button
          onClick={handleBackClick}
          type="button"
          className="inline-flex items-center gap-2 text-[#036475] 
          hover:text-[#0A4C57] text-sm font-semibold 
          py-2 px-4 rounded-md transition-colors cursor-pointer
           focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-offset-2 focus-visible:ring-[#036475]"
        >
          <GoArrowLeft className="w-4 h-4" />
          Go back
        </button>
      </div>
    </main>
  );
}
