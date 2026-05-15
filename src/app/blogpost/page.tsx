import Navbar from '@/components/common/LandingPage/navbar';
import Footer from '@/components/common/LandingPage/footer';
import NewsletterSection from '@/components/common/BlogPost/NewsletterSection';
import SocialShare from '@/components/common/BlogPost/SocialShare';
import Image from 'next/image';



export default function BlogPost() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto px-4 md:px-6 mb-12">
          <div className="rounded-xl overflow-hidden shadow-xl mb-12">
            <Image
                src="/images/blogpostimage.png"
                alt="AI Meeting Interaction"
                className="w-full"
                width={1280}
                height={510}
                priority={false}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px"
            />
           </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="leading-relaxed">
              MeetMind is an SDK that lets developers create AI agents that can
              join live calls and behave like real participants, not just
              passive note-takers. Unlike tools like Fireflies or Otter that
              simply transcribe, MeetMind agents understand the context before
              and during the call, based on structured inputs such as agendas,
              titles, and documents, so their contributions remain relevant
              throughout the session.
            </p>

            <p>
              During a live call, a MeetMind agent can speak, send chat messages
              when appropriate, adjust its tone and verbosity to avoid
              over-talking, and wait for its turn before responding. Developers
              who build on the SDK have full control over this behavior. They
              can inject context such as documents, prompts, and structured
              data, define rules for when the agent speaks, how often, and in
              what tone, connect it to meeting platforms like Google Meet and
              Zoom, and handle real-time interaction, including audio, chat, and
              meeting events.
            </p>

            <p>
              Built on top of this SDK is a real-product use case: an AI-powered
              Interview Assistant. It pulls candidate data such as the resume,
              name, and role applied for; understands the job description and
              interview goals; automatically joins scheduled interview calls;
              and conducts or assists in interviews intelligently while staying
              aligned with role requirements and candidate context throughout
              the session.
            </p>

            <div className="relative py-10 border-t border-b
             border-gray-100 flex flex-row items-start
              gap-4 md:gap-8 px-4">
              {/* The Quote Icon */}
              <Image
                src="/icons/quote.svg"
                alt=""
                role="presentation"
                className="w-8 h-8 md:w-16 md:h-16 shrink-0 mt-1"
                width={72}
                height={72}
              />

              <h2
            className="
                font-['Bodoni_Moda']
                text-[#111111]
                text-xl
                md:text-3xl
                lg:text-5xl
                leading-[0.88]
                tracking-[-0.045em]
                font-normal
                antialiased
                whitespace-nowrap
                normal-case
                lg:uppercase
            "
            >
              <span className="block">Interview Better.</span>
              <span className="block mt-6px">Remember Everything.</span>
            </h2>
            </div>

            <p>
              Meet AI tools used in meetings today do one of two things: they
              sit silently recording everything without contributing anything,
              or they respond to every single message like an overactive bot.
              Neither is useful. What teams actually need is an AI that knows
              when to speak, what to say, and when to stay quiet, and nothing on
              the market does that today.
            </p>

            <p>
              MeetMind is built to close that gap. Transcription tools like
              Otter and Fireflies join calls and record everything, but they
              cannot ask follow-up questions, flag unresolved agenda items, or
              hold the conversation when the interviewer steps away. They are
              recorders, not participants.
            </p>

            <p className="mb-12">
              For recruitment teams, the problem runs deeper: In scale,
              different interviewers ask different questions, evaluate
              differently, and fill scorecards hours after the call. The result
              is inconsistent evaluation and candidate experience that vary
              wildly depending on who is available.
            </p>

            {/* Solution Section */}
            <section className="mb-12">
              <h2 className="text-2xl  text-[#272626] mb-6 uppercase tracking-wider">
                SOLUTION
              </h2>
              <p>
                MeetMind is a voice-enabled AI participation engine that joins
                live Zoom and Google Meet calls, listens actively, speaks when
                relevant, and captures structured knowledge that users can query
                and export the moment the session ends. It participates like a
                smart, well-briefed team member.
              </p>
              <p>
                For developers, the open-source SDK and API handle context
                injection, voice interaction, behavior configuration, and
                platform connection, so teams can build on proven infrastructure
                rather than start from scratch. For end users, the web platform
                manages the full session lifecycle from pre-session context
                setup to post-session reviews.
              </p>
              <p className="mb-10">
                The AI Interviewer makes the value tangible. The recruiter feeds
                the agent a job description, candidate profile, and scorecard
                before the call. MeetMind joins the interview on Zoom or Google
                Meet, asks structured questions, probes follow-ups, and delivers
                a complete scorecard the moment the call ends.
              </p>

              <SocialShare />

              <div className="flex justify-center mb-16">
                <button className="px-10 py-4 bg-[#035A69] text-white font-bold rounded-lg hover:bg-[#024a57] transition-all uppercase tracking-widest text-sm cursor-pointer">
                  VIEW COMMENTS (0)
                </button>
              </div>

              <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-gray-100">
                <p className="text-gray-600 mb-8 leading-relaxed">
                  The following use cases represent the primary scenarios in
                  which MeetMind delivers value across its target user groups:
                </p>

                <div className="space-y-6">
                  <div>
                    <p>
                      Actor: David Dad | Senior Backend Developer | Age: 28 |
                      Male | Fintech Startup | Accra, Ghana
                    </p>
                    <p>
                      Goal: Integrate MeetMind into his product without building
                      context management or participation infrastructure from
                      scratch.
                    </p>
                    <p>
                      Precondition: David has access to the MeetMind SDK
                      documentation and a GitHub account. His product is already
                      connected to Zoom or Google Meet.
                    </p>
                  </div>

                  <div>
                    <p>Steps:</p>

                    <ul className="list-disc pl-8 space-y-2 text-gray-600">
                      <li>
                        David accesses the MeetMind SDK documentation and GitHub
                        repository.
                      </li>
                      <li>
                        He installs the Python SDK and sets up his API
                        credentials.
                      </li>
                      <li>
                        He selects and configures a plug-and-play adapter for
                        Zoom or Google Meet.
                      </li>
                      <li>
                        He injects session content through the API — agenda,
                        participant profiles, and scoring rubric.
                      </li>
                      <li>
                        He deploys the agent into a sandbox session to test
                        real-time voice participation and response behavior.
                      </li>
                      <li>
                        He reviews the structured output returned by the
                        get-summary endpoint after the session ends.
                      </li>
                      <li>He ships the integration into his product.</li>
                    </ul>
                  </div>

                  <div className="pt-4">
                    <p>
                      Result: David has a fully functional, context-aware AI
                      meeting agent running inside his product without having to
                      build the participation layer from scratch.
                    </p>
                    <p className="mt-2">
                      MeetMind Advantage: No other tool provides a programmable
                      SDK that lets developers inject context, control agent
                      behavior, and retrieve structured output. Every
                      alternative starts from zero. MeetMind does not.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}