

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <h2 className="text-[#0F172A] text-3xl font-semibold text-center">
          Features
        </h2>
        <p className="mt-2 text-md md:text-sm text-[#5E6470] text-center max-w-lg mx-auto">
          Every part of the hiring workflow handled by a single intelligent
          participant.
        </p>

        <div className="mt-12 grid grid-cols-1 grid-rows-6 lg:grid-cols-2 lg:grid-rows-4 gap-6">
          {/* Real Time Score Card */}
          <div className="lg:row-span-2 bg-white rounded-2xl p-6 flex flex-col justify-between items-center gap-6 lg:gap-4">
            <img
              src="/icons/real-time-scorecard-tracking.svg"
              className="w-full h-50 md:h-55 lg:h-50 object-cover rounded-lg mb-4"
              alt="Real-time scorecard tracking interface"
            />
            <div className="flex flex-col items-start">
              <img
                src="/icons/archive-icon.svg"
                className="w-10 h-10 object-cover rounded-lg mb-6"
                alt=""
                aria-hidden="true"
              />
              <h3 className="text-[#0F172A] text-sm md:text-lg font-bold leading-tight">
                Real-time scorecard tracking
              </h3>
              <p className="text-sm md:text-lg text-[#3F4555] mt-2">
                Live coverage bars for every competency on your scorecard. Know
                exactly what&apos;s been covered and what hasn&apos;t - without taking
                notes
              </p>
            </div>
          </div>

          {/* Pre Assigned Task */}
          <div className="lg:row-start-1 bg-white rounded-2xl p-6 flex flex-col lg:flex-row justify-between lg:justify-center items-center gap-6 lg:gap-16">
            <img
              src="/images/pre-assigned-task.jpg"
              className="block w-full h-50 md:h-55 lg:h-50 object-cover rounded-xl shrink-0 lg:hidden"
              alt="Pre-assigned task queue interface"
            />

            <div className="w-full">
              <img
                src="/icons/checklist-icon.svg"
                className="w-10 h-10 object-cover rounded-lg mb-6"
                alt=""
                aria-hidden="true"
              />
              <h3 className="text-[#0F172A] text-sm md:text-lg font-bold leading-tight">
                Pre-assigned task queue
              </h3>
              <p className="text-sm md:text-lg text-[#3F4555] mt-2">
                Queue instructions before the call begins.
              </p>
            </div>
            <img
              src="/images/pre-assigned-task.jpg"
              className="hidden lg:w-44 lg:h-36 lg:object-cover lg:rounded-xl lg:shrink-0 lg:block"
              alt="Pre-assigned task queue interface"
            />
          </div>

          {/* Role Briefing */}
          <div className="lg:row-start-2 bg-white rounded-2xl p-6 flex flex-col justify-between lg:flex-row items-start lg:items-center gap-6 lg:gap-4">
            <img
              src="/icons/role-briefing-red-flag.svg"
              className="block w-full h-50 md:h-55 lg:h-50 object-cover rounded-xl shrink-0 lg:hidden"
              alt="Role briefing & red flags interface"
            />
            <div>
              <img
                src="/icons/flag-icon.svg"
                className="w-10 h-10 object-cover rounded-lg mb-6"
                alt=""
                aria-hidden="true"
              />
              <h3 className="text-[#0F172A] text-sm md:text-lg font-bold leading-tight">
                Role briefing & red flags
              </h3>
              <p className="text-sm md:text-lg text-[#3F4555] mt-2">
                MeetMind internalizes warning signs to watch for.
              </p>
            </div>
            <img
              src="/icons/role-briefing-red-flag.svg"
              className="hidden lg:w-44 lg:h-36 lg:object-cover lg:rounded-xl lg:shrink-0 lg:block"
              alt="Role briefing & red flags interface"
            />
          </div>

          {/* Zoom, Meet & Team Support */}
          <div className="lg:row-span-2 lg:row-start-3 lg:col-start-2 bg-white rounded-2xl p-6 flex flex-col items-start gap-6 lg:gap-4">
            <img
              src="/images/zoom-chrome-image.jpg"
              className="w-full h-50 md:h-55 lg:h-50 object-cover rounded-lg mb-4"
              alt="Zoom, Meet & Teams support"
            />
            <div>
              <img
                src="/icons/video-recorder-icon.svg"
                className="w-10 h-10 object-cover rounded-lg mb-6"
                alt=""
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
            <img
              src="/images/structured-interview.jpg"
              className="hidden lg:w-44 lg:h-36 lg:object-cover lg:rounded-xl lg:shrink-0 lg:block"
              alt="Structured summary interface"
            />
            <img
              src="/images/structured-interview.jpg"
              className="block w-full h-50 md:h-55 lg:h-50 object-cover rounded-xl shrink-0 lg:hidden"
              alt="Structured summary interface"
            />
            <div>
              <img
                src="/icons/book-icon.svg"
                className="w-10 h-10 object-cover rounded-lg mb-6"
                alt=""
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
            <img
              src="/images/timed-gap-alert.jpg"
              className="hidden lg:w-44 lg:h-36 lg:object-cover lg:rounded-xl lg:shrink-0 lg:block"
              alt="Timed gap alerts interface"
            />
            <img
              src="/images/timed-gap-alert.jpg"
              className="block w-full h-50 md:h-55 lg:h-50 object-cover rounded-xl shrink-0 lg:hidden"
              alt="Timed gap alerts interface"
            />
            <div>
              <img
                src="/icons/alert-shield-icon.svg"
                className="w-10 h-10 object-cover rounded-lg mb-6"
                alt=""
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
