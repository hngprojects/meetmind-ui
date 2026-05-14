import Image from 'next/image';
import LogoIcon from './logo-icon';

export default function HeroSection() {
  return (
    <section className="relative hidden w-1/2 flex-shrink-0 flex-col items-start justify-center bg-slate-900 px-14 py-10 md:flex">
      <Image
        src="/signupBg.png"
        alt=""
        aria-hidden="true"
        fill
        className="object-cover object-[2%_center]"
        priority
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 w-full max-w-[420px] text-left">
        <div className="max-w-[340px] md:max-w-[420px]">
          <h1 className="text-[28px] font-bold leading-tight tracking-[-0.02em] text-white md:text-[64px] md:leading-[1.1]">
            <span className="block">Welcome to</span>
            <span className="block">
              Meet <span className="text-[#a8ddd4]">Mind</span>
            </span>
          </h1>
          <p className="mt-4 text-[15px] font-light leading-relaxed text-[#dbe0e7] md:mt-6 md:text-[28px] md:leading-[1.4]">
            Designing intelligence that knows how to speak
          </p>
        </div>
      </div>

      <div className="absolute bottom-[-32px] left-1/2 z-20 h-16 w-16 -translate-x-1/2 md:hidden">
        <LogoIcon className="h-full w-full" />
      </div>
    </section>
  );
}
