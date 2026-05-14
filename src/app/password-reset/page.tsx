'use client';

import { useState } from 'react';
import Image from 'next/image';
import HeroSection from '@/components/password-reset/hero-section';
import PasswordForm from '@/components/password-reset/password-form';
import LogoIcon from '@/components/password-reset/logo-icon';

export default function PasswordResetPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <>
      <div className="relative min-h-screen overflow-hidden md:hidden">
        <div className="absolute inset-0">
          <Image
            src="/signupBg.png"
            alt=""
            aria-hidden="true"
            fill
            className={`${isSuccess ? 'h-full' : 'h-[70%]'} object-cover object-[5%_center]`}
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
          {!isSuccess && (
            <div className="absolute bottom-0 h-[30%] w-full bg-[#f7f9fb]" />
          )}
        </div>

        <div className="relative z-10 flex h-full flex-col px-4 pt-12 pb-6">
          <div>
            <h1 className="text-left text-[42px] font-bold leading-tight tracking-[-0.02em] text-white">
              <span className="block">Welcome to</span>
              <span className="block">
                Meet <span className="text-[#a8ddd4]">Mind</span>
              </span>
            </h1>
            <p className="mt-4 text-left text-[20px] font-light leading-relaxed text-[#dbe0e7]">
              Designing intelligence that knows how to speak
            </p>
          </div>

          <div className="mt-auto -mb-12">
            <div className="flex flex-col items-center">
              <div className="mb-2 h-16 w-16">
                <LogoIcon className="h-full w-full" />
              </div>
              <div className="w-full">
                <PasswordForm onSuccess={() => setIsSuccess(true)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden min-h-screen bg-[#f7f9fb] md:flex">
        <HeroSection />
        <PasswordForm />
      </div>
    </>
  );
}
