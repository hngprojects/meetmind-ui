import Image from "next/image";

export default function FeaturesGrid() {
  return (
    <section id="features" className="pt-28 pb-18">
      <div className="max-w-360 mx-auto px-6 md:px-15 lg:px-20">
        <h2 className="text-[#0F172A] text-[30px] md:text-[40px] font-semibold text-center">
          Features
        </h2>
        <p className="mt-2 text-[16px] text-[#3F4555] text-center max-w-86 md:max-w-140.25 mx-auto">
          Every part of the hiring workflow handled by a single intelligent
          participant.
        </p>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-4 gap-6">
          {/* Real Time Score Card */}
          <div
            className="lg:row-span-2 bg-white rounded-2xl p-6 flex flex-col 
                  justify-between items-center gap-6 lg:col-start-1 lg:gap-4"
          >
            <Image
              src="/icons/real-time-scorecard-tracking.svg"
              alt="Real-time scorecard tracking interface"
              width={88}
              height={88}
              className="w-full h-50 md:h-55 lg:h-50 object-cover rounded-lg mb-4"
            />
            <div className="flex flex-col items-start">
              <Image
                src="/icons/archive-icon.svg"
                alt=""
                width={88}
                height={88}
                className="w-10 h-10 object-cover rounded-lg mb-6"
                aria-hidden="true"
              />
              <h3 className="text-[#0F172A] text-sm md:text-lg font-bold leading-tight">
                Real-time scorecard tracking
              </h3>
              <p className="text-sm md:text-lg text-[#3F4555] mt-2">
                Live coverage bars for every competency on your scorecard. Know
                exactly what&apos;s been covered and what hasn&apos;t - without
                taking notes
              </p>
            </div>
          </div>

          {/* Pre Assigned Task */}
          <div className="lg:row-start-1 lg:col-start-2 bg-white rounded-2xl p-6 flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-16">
            <Image
              src="/images/pre-assigned-task.jpg"
              alt="Pre-assigned task queue interface"
              width={88}
              height={88}
              className="block w-full h-50 md:h-55 lg:h-50 object-cover rounded-xl shrink-0 lg:hidden"
            />

            <div className="w-full">
              <Image
                src="/icons/checklist-icon.svg"
                alt=""
                width={88}
                height={88}
                className="w-10 h-10 object-cover rounded-lg mb-3"
                aria-hidden="true"
              />
              <h3 className="text-[#0F172A] text-sm md:text-lg font-bold leading-tight">
                Pre-assigned task queue
              </h3>
              <p className="text-sm md:text-lg text-[#3F4555] mt-2">
                Queue instructions before the call begins.
              </p>
            </div>
            <Image
              src="/images/pre-assigned-task.jpg"
              alt="Pre-assigned task queue interface"
              width={88}
              height={88}
              className="hidden lg:w-44 lg:h-36 lg:object-cover lg:rounded-xl lg:shrink-0 lg:block"
            />
          </div>

          {/* Role Briefing */}
          <div className="lg:row-start-2 lg:col-start-2 bg-white rounded-2xl p-6 flex flex-col justify-between lg:flex-row items-start lg:items-center gap-6 lg:gap-4">
            <Image
              src="/icons/role-briefing-red-flag.svg"
              alt="Role briefing & red flags interface"
              width={88}
              height={88}
              className="block w-full h-50 md:h-55 lg:h-50 object-cover rounded-xl shrink-0 lg:hidden"
            />
            <div>
              <Image
                src="/icons/flag-icon.svg"
                alt=""
                width={88}
                height={88}
                className="w-10 h-10 object-cover rounded-lg mb-6"
                aria-hidden="true"
              />
              <h3 className="text-[#0F172A] text-sm md:text-lg font-bold leading-tight">
                Role briefing & red flags
              </h3>
              <p className="text-sm md:text-lg text-[#3F4555] mt-2">
                MeetMind internalizes warning signs to watch for.
              </p>
            </div>
            <Image
              src="/icons/role-briefing-red-flag.svg"
              alt="Role briefing & red flags interface"
              width={88}
              height={88}
              className="hidden lg:w-44 lg:h-36 lg:object-cover lg:rounded-xl lg:shrink-0 lg:block"
            />
          </div>

          {/* Zoom, Meet & Team Support */}
          <div className="lg:row-span-2 lg:row-start-3 lg:col-start-2 bg-white rounded-2xl p-6 flex flex-col items-start gap-6 lg:gap-4">
            <Image
              src="/images/zoom-chrome-image.jpg"
              alt="Zoom, Meet & Teams support"
              width={88}
              height={88}
              className="w-full h-50 md:h-55 lg:h-50 object-cover rounded-lg mb-4"
            />
            <div>
              <Image
                src="/icons/video-recorder-icon.svg"
                alt=""
                width={88}
                height={88}
                className="w-10 h-10 object-cover rounded-lg mb-6"
                aria-hidden="true"
              />
              <h3 className="text-[#0F172A] text-sm md:text-lg font-bold leading-tight">
                Zoom, Meet & Teams support
              </h3>
              <p className="text-sm md:text-lg text-[#3F4555] mt-2">
                Works wherever you already run interviews. MeetMind joins as a
                named participant - no recordings required, no integration to
                install.
              </p>
            </div>
          </div>

          {/* Structured Summary */}
          <div className="lg:row-start-3 bg-white rounded-2xl p-6 flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
            <Image
              src="/images/structured-interview.jpg"
              alt="Structured summary interface"
              width={88}
              height={88}
              className="hidden lg:w-44 lg:h-36 lg:object-cover lg:rounded-xl lg:shrink-0 lg:block"
            />
            <Image
              src="/images/structured-interview.jpg"
              alt="Structured summary interface"
              width={88}
              height={88}
              className="block w-full h-50 md:h-55 lg:h-50 object-cover rounded-xl shrink-0 lg:hidden"
            />
            <div>
              <Image
                src="/icons/book-icon.svg"
                alt=""
                width={88}
                height={88}
                className="w-10 h-10 object-cover rounded-lg mb-6"
                aria-hidden="true"
              />
              <h3 className="text-[#0F172A] text-sm md:text-lg font-bold leading-tight">
                Structured summary
              </h3>
              <p className="text-sm md:text-lg text-[#3F4555] mt-2">
                Organized notes ready immediately after.
              </p>
            </div>
          </div>

          {/* Timed Gap Alerts */}
          <div className="lg:row-start-4 bg-white rounded-2xl p-6 flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8">
            <Image
              src="/images/timed-gap-alert.jpg"
              alt="Timed gap alerts interface"
              width={88}
              height={88}
              className="hidden lg:w-44 lg:h-36 lg:object-cover lg:rounded-xl lg:shrink-0 lg:block"
            />
            <Image
              src="/images/timed-gap-alert.jpg"
              alt="Timed gap alerts interface"
              width={88}
              height={88}
              className="block w-full h-50 md:h-55 lg:h-50 object-cover rounded-xl shrink-0 lg:hidden"
            />
            <div>
              <Image
                src="/icons/alert-shield-icon.svg"
                alt=""
                width={88}
                height={88}
                className="w-10 h-10 object-cover rounded-lg mb-6"
                aria-hidden="true"
              />
              <h3 className="text-[#0F172A] text-sm md:text-lg font-bold leading-tight">
                Timed gap alerts
              </h3>
              <p className="text-sm md:text-lg text-[#3F4555] mt-2">
                Set thresholds to flag missed culture fit questions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
