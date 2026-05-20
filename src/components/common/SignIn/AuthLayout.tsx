import { ReactNode } from "react";
import Image from "next/image";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => {
  return (
    <section className="relative flex h-screen overflow-hidden">
      {/* LEFT PANEL DESKTOP */}
      <div className="relative hidden h-full flex-shrink-0 lg:block lg:w-[45%]">
        <Image
          src="/images/signupBg.png"
          alt="Authentication background"
          fill
          sizes="45vw"
          className="object-cover"
          priority
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* DESKTOP TEXT */}
        <div className="absolute inset-0 z-10 flex items-center px-12">
          <div className="max-w-[540px]">
            <h1 className="max-w-[527px] text-[48px] font-bold leading-[0.95] text-white">
              {title}
            </h1>

            <p className="mt-6 max-w-[527px] text-[36px] leading-[1.1] text-white">
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div
        className="
          relative h-full w-full overflow-y-auto
          bg-bg-secondary
          lg:w-[55%]
        "
      >
        <div
          className="
            min-h-full
            flex flex-col items-center justify-center
            px-4 py-8
            sm:px-6
            lg:px-10
          "
        >
          {/* MOBILE*/}
          <div className="relative mb-8 h-[260px] w-full overflow-hidden lg:hidden">
            <Image
              src="/images/sign-in-bg-mobile.png"
              alt="Authentication background"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />

            <div className="absolute inset-0 bg-black/55" />

            <div className="absolute inset-0 z-10 flex items-start px-6 pt-8">
              <div className="max-w-[320px]">
                <h1 className="text-[40px] font-bold leading-[0.95] text-white">
                  {title}
                </h1>

                <p className="mt-4 text-[28px] leading-[1.1] text-white">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* content wrapper */}
          <div className="w-full max-w-[460px]">
            {/* logo */}
            <div className="mb-6 flex justify-center">
              <Image
                src="/icons/meetmind-logo.svg"
                alt="MeetMind logo"
                width={60}
                height={60}
                className="h-auto"
                priority
              />
            </div>

            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
