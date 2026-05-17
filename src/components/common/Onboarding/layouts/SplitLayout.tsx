import type { ReactNode } from 'react';
import { Brain, BellDot, ClipboardCheck, Notebook } from 'lucide-react';

const SplitLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden w-full flex flex-col lg:flex-row gap-12 md:gap-0 justify-center items-center bg-background lg:pb-0 pb-11">
      <div className="w-full lg:w-1/2 justify-center items-center py-8 px-6 sm:px-10 md:px-12 lg:px-16 md:py-10">
        {children}
      </div>
      <div className="lg:w-1/2 w-full flex items-center justify-center">
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-md">
          <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6 lg:flex lg:flex-col">
            <div className="w-full flex gap-2.5 bg-card rounded-3xl p-4 sm:p-5 md:p-6">
              <div className="p-2.5">
                <Brain size={24} />
              </div>

              <div className="flex flex-col gap-4 ">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-8 tracking-[-2%]">
                  Fully autonomous
                </h3>
                <p className="text-[hsla(220, 9%, 40%, 1)]">
                  Meet Mind conducts the interview on your behalf. You don&apos;t
                  need to be on the call.
                </p>
              </div>
            </div>
            <div className="flex w-full gap-2.5 bg-card rounded-3xl p-4 sm:p-5 md:p-6">
              <div className="p-2.5">
                <BellDot size={24} />
              </div>

              <div className="flex flex-col gap-4 ">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-8 tracking-[-2%]">
                  Real-time feedback
                </h3>
                <p className="text-[hsla(220, 9%, 40%, 1)]">
                  Analyze candidate responses instantly to make faster
                  decisions.
                </p>
              </div>
            </div>
            <div className="flex gap-2.5 bg-card rounded-3xl p-4 sm:p-5 md:p-6">
              <div className="p-2.5">
                <ClipboardCheck size={24} />
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-8 tracking-[-2%]">
                  Customizable questions
                </h3>
                <p className="text-[hsla(220, 9%, 40%, 1)]">
                  Tailor the interview flow to fit your company’s unique
                  requirements.
                </p>
              </div>
            </div>
            <div className="flex gap-2.5 bg-card rounded-3xl p-4 sm:p-5 md:p-6">
              <div className="p-2.5">
                <Notebook size={24} />
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-8 tracking-[-2%]">
                  Panel-ready summaries
                </h3>
                <p className="text-[hsla(220, 9%, 40%, 1)]">
                  Structured output — rated, noted, and ready to share the
                  moment the call ends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitLayout;
