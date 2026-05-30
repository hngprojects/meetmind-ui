// src/components/common/LandingPage/TranscriptionCard.tsx
import Image from "next/image";

export default function TranscriptionCard() {
  return (
    <div className="w-full rounded-[18px] bg-[#EEF3F4] overflow-hidden">
      <div className="relative h-[193px] overflow-hidden">
        <Image
          src="/images/zoom-transcription-options.png"
          alt="Zoom transcription preview"
          width={950}
          height={594}
          className="absolute -top-4 left-1/2 -translate-x-[50%]
            h-[193px] w-[350px] max-w-none"
        />
      </div>

      <div className="h-[131px] px-4 pt-0 py-3">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full 
              bg-[#0F4D52] text-white text-xs font-semibold"
          >
            AI
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-[#0A1628]">Alex</span>
            <span className="text-[#94A3B8]">speaking • 0:42</span>
          </div>
        </div>

        <p className="text-xs leading-5 text-[#475569]">
          &quot;I&apos;ve reviewed the candidate&apos;s portfolio. I&apos;d like
          to ask about their experience with distributed systems.&quot;
        </p>
      </div>
    </div>
  );
}
