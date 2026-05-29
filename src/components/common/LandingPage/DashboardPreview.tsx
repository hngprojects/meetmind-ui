import Image from "next/image";

export default function DashboardPreview() {
  return (
    <section className="bg-[#F7F9FB]">
      <div className="flex justify-center max-w-360 mx-auto px-6 md:px-20 lg:px-20">
        {/* Desktop */}
        <div
          className="hidden md:flex md:justify-between md:bg-[#FDFDFE] rounded-[30px] md:p-12 md:max-w-[906px] 
                lg:max-w-[962px] gap-10 items-center"
        >
          <div className="max-w-[552px]">
            <div className="mb-10 flex justify-between items-center">
              <div
                className="w-56.25 h-9 flex font-medium justify-between items-center px-4 py-2 
                    text-[14px] text-[#3F4555] bg-[#E6F0F1] rounded-full"
              >
                <div className="rounded-full bg-[#035A69] w-3.75 h-3.75"></div>
                <p>Live interview • Senior PM</p>
              </div>
              <div className="w-14 h-10 bg-[#E6F0F1] rounded-lg flex items-center justify-center">
                <p className="text-[14px] font-medium rounded-2 text-[#3F4555]">
                  14:32
                </p>
              </div>
            </div>
            <Image
              src="/icons/dashboard-desktop.svg"
              alt="MeetMind dashboard preview showing frequency bars"
              width={88}
              height={88}
              className="md:w-202.5 md:h-37.5"
            />
            <div className="mt-10 max-w-202.5 max-h-11 flex justify-between items-center">
              <div className="w-67.5 h-full flex flex-col font-medium justify-between items-center border-r border-[#E1E3E4]">
                <h2 className="text-[36px] font-bold text-[#111827]">12,847</h2>
                <p className="text-[14px] text-[#6B7280]">
                  Interviews analyzed
                </p>
              </div>
              <div className="w-67.5 h-full flex flex-col font-medium justify-between items-center border-r border-[#E1E3E4]">
                <h2 className="text-[36px] font-bold text-[#111827]">94%</h2>
                <p className="text-[14px] text-[#6B7280]">
                  Avg. scorecard coverage
                </p>
              </div>
              <div className="w-67.5 h-full flex flex-col font-medium justify-between items-center">
                <h2 className="text-[36px] font-bold text-[#111827]">
                  6.2 hrs
                </h2>
                <p className="text-[14px] text-[#6B7280]">Saved per hire</p>
              </div>
            </div>
          </div>
          {/* Right Section */}
          <div className="w-[275px] rounded-[18px] bg-[#EEF3F4] overflow-hidden">
            <div className="relative h-[193px] overflow-hidden">
              <Image
                src="/images/zoom-transcription-options.png"
                alt="Zoom transcription preview"
                width={950}
                height={594}
                className="absolute -top-4 left-1/2 -translate-x-[50%]
                  h-[193px] w-[350px] max-w-none"
                priority
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
                &quot;I&apos;ve reviewed the candidate&apos;s portfolio.
                I&apos;d like to ask about their experience with distributed
                systems.&quot;
              </p>
            </div>
          </div>
        </div>
        {/* Mobile */}
        <div className="bg-[#FDFDFE] w-full max-w-sm rounded-2xl p-6 md:hidden">
          <div className="mb-8 flex justify-between items-center gap-2">
            <div className="h-9 flex font-medium justify-center items-center gap-2 px-4 py-2 text-[#3F4555] bg-[#E6F0F1] rounded-full">
              <div className="rounded-full bg-[#035A69] w-3 h-3"></div>
              <p className="text-[14px]">Live interview • Senior PM</p>
            </div>
            <div className="w-14 h-9 bg-[#E6F0F1] rounded-lg flex items-center justify-center">
              <p className="text-[12px] font-medium text-[#3F4555]">14:32</p>
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src="/icons/dashboard-mobile.svg"
              alt="MeetMind dashboard preview"
              width={88}
              height={88}
              className="w-full h-auto max-w-70"
            />
          </div>

          <div className="mt-8 flex flex-col gap-6">
            <div className="flex flex-col items-center border-r border-[#E1E3E4] pb-4">
              <h2 className="text-[36px] font-bold text-[#111827]">12,847</h2>
              <p className="text-[14px] text-[#6B7280]">Interviews analyzed</p>
            </div>

            <div className="flex flex-col items-center border-r border-[#E1E3E4] pb-4">
              <h2 className="text-[36px] font-bold text-[#111827]">94%</h2>
              <p className="text-[14px] text-[#6B7280]">
                Avg. scorecard coverage
              </p>
            </div>

            <div className="flex flex-col items-center">
              <h2 className="text-[36px] font-bold text-[#111827]">6.2 hrs</h2>
              <p className="text-[14px] text-[#6B7280]">Saved per hire</p>
            </div>
          </div>

          <div className="w-[275px] rounded-[18px] bg-[#EEF3F4] overflow-hidden">
            <div className="relative h-[193px] overflow-hidden">
              <Image
                src="/images/zoom-transcription-options.png"
                alt="Zoom transcription preview"
                width={950}
                height={594}
                className="absolute -top-4 left-1/2 -translate-x-[50%]
                  h-[193px] w-[350px] max-w-none"
                priority
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

              <p className="text-xs leading-5 text-[#475569] mb-6">
                &quot;I&apos;ve reviewed the candidate&apos;s portfolio.
                I&apos;d like to ask about their experience with distributed
                systems.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
