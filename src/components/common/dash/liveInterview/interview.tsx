"use client";
import { useCreateStore } from "@/store/createInterviewStore";
import CreatePage1 from "../createInterview/createPage1";
import InterviewOverview from "./interviewOverview";
import LiveSession from "./liveSession";
import Schedule from "./schedule";
import NeedAttention from "./needAttenstion";
import Completed from "./completed";
import { ToastContainer } from "react-toastify";

const Interview = () => {
  const { open } = useCreateStore();
  return (
    <div className="flex flex-col gap-6">
      <ToastContainer />
      <InterviewOverview />
      <LiveSession />
      <div
        className="flex flex-col gap-6 md:flex-row  px-2
     md:px-10 lg:px-20"
      >
        <div className="w-fullmd:w-1/3 ">
          <Schedule />
        </div>
        <div className="md:w-2/3 flex flex-col gap-4">
          <NeedAttention />
          <Completed />
        </div>
      </div>

      {open && <CreatePage1 />}
    </div>
  );
};

export default Interview;
