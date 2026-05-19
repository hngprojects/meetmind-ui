import Link from 'next/link';
import Image from 'next/image';

function SimpleHeader() {
  return (
    <header className="mx-auto flex h-[5.25rem] w-full max-w-[90rem] items-center px-5 sm:h-24 sm:px-10 xl:h-[7.5rem] xl:px-[4.5rem]">
      <Link
        href="/"
        className={
          "flex items-center gap-5 rounded-md focus-visible:outline-none " +
          "focus-visible:ring-2 focus-visible:ring-[#035A69] focus-visible:ring-offset-4"
        }
        aria-label="MeetMind homepage"
      >
        <Image
          src="/icons/meetmind-logo.svg"
          alt=""
          aria-hidden="true"
          width={42}
          height={42}
          className="h-[2.625rem] w-[2.625rem]"
        />
        <Image
          src="/icons/MeetMind.svg"
          alt="MeetMind"
          width={112}
          height={18}
          className="h-[1.125rem] w-28"
        />
      </Link>
    </header>
  );
}

function ErrorCodeMark() {
  return (
    <div className="flex items-center justify-center mb-6" aria-hidden="true">
      <Image 
        src="/icons/error-404-off.svg" 
        alt="404 Graphic" 
        width={160} 
        height={160} 
        priority
        className="h-32 w-32 sm:h-40 sm:w-40"
      />
    </div>
  );
}

export default function NotFoundPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-white text-[#111827]">
      <SimpleHeader />

      <main className="mx-auto flex w-full max-w-[90rem] flex-1 flex-col items-center justify-center px-6 text-center sm:px-10 xl:px-[4.5rem] pb-20">
        <ErrorCodeMark />

        <h1 className="mt-[2.75rem] text-[2rem] font-bold leading-[1.15] text-[#111827] sm:mt-[3.125rem] sm:text-[2.25rem]">
          Page Not Found
        </h1>
        <p className="mt-5 max-w-[36rem] text-[1.125rem] leading-[1.35] text-[#4B5563] sm:mt-6 sm:text-[1.375rem] sm:leading-none">
          We couldn&apos;t find the page you&apos;re looking for
        </p>

        <Link
          href="/"
          className={
            "mt-[2.5rem] flex h-14 w-full max-w-[41.75rem] items-center justify-center " +
            "rounded-md bg-[#035A69] px-6 text-[1.0625rem] font-semibold text-white " +
            "transition-colors hover:bg-[#024A56] focus-visible:outline-none " +
            "focus-visible:ring-2 focus-visible:ring-[#035A69] focus-visible:ring-offset-4 sm:mt-[2.625rem]"
          }
        >
          Back to Homepage
        </Link>
      </main>
    </div>
  );
}
