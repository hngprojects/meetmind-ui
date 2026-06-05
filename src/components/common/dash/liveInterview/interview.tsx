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
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col gap-8">
      <ToastContainer />
      <InterviewOverview />
      <LiveSession />
      <div className="grid gap-6 lg:grid-cols-[35%_65%] items-stretch">
        <div className="w-full h-full">
          <Schedule />
        </div>
        <div className="flex flex-col gap-6">
          <NeedAttention />
          <Completed />
        </div>
      </div>

      {open && <CreatePage1 />}
    </div>
  );
};

export default Interview;
