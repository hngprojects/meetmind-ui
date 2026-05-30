import { useDashboardStore } from "@/store/dashboardInterview";
import { useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { MdKeyboardArrowRight } from "react-icons/md";

const LiveSession = () => {
  const { getSessions, sessions, sessionsLoading } = useDashboardStore();

  useEffect(() => {
    getSessions();
  }, [getSessions]);

  if (sessionsLoading) return <div>Loading...</div>;

  return (
    <div className="px-2 md:px-10 lg:px-20  flex flex-col gap-4 bg-white ">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl  text-text-color-primary font-bold">
          Live Now
        </h1>
        <p className="flex flex-row justify-between w-[7%]">
          See all <MdKeyboardArrowRight className="text-2xl" />
        </p>
      </div>

      {sessions.length === 0 && (
        <div className="flex items-center justify-center py-8">
          <p className="text-sm text-gray-400">
            No live sessions at the moment
          </p>
        </div>
      )}

      <div>
        {sessions.slice(0, 3).map((session) => (
          <div
            className="flex flex-row  justify-between w-full"
            key={session.interview_id}
          >
            <div className="flex flex-col rounded-2xl gap-5">
              <div className="flex flex-row gap-3">
                <p>{session.candidate_name || "david"}</p>
                <p
                  className="text-sm text-[#4F46E5] rounded-2xl
                   flex flex-row bg-[#EFE6FD] py-0.5 px-2"
                >
                  <GoDotFill /> Live
                </p>
              </div>
              <p className="text-base text-[#5E6470]">
                {session.role_title || "Software Engineer"}
              </p>
              <p className="text-2xl text-[#4F46E5]">
                {session.elapsed_seconds
                  ? `${Math.floor(session.elapsed_seconds / 60)} mins`
                  : "Just started"}
              </p>

              <p className="text-base text-[#5E6470]">
                {session.questions_asked || "tell me about yourself"}
              </p>
              <p>{session.questions_total || 5}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveSession;
