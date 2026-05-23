"use client";
import Buttons from "@/components/reuseable-component/buttons";
import Image from "next/image";
import { useCreateStore } from "@/store/createInterviewStore";
import CreatePage1 from "../createInterview/createPage1";

const Dashboard = () => {
  const { toggle } = useCreateStore();

  return (
    <section
      className={` flex flex-col items-center
     justify-center`}
    >
      <div
        className="bg-white flex flex-col items-center 
        justify-center gap-4 mt-10 md:mt-14 p-4
        md:w-[60%]"
      >
        {/* Dashboard */}
        <Image
          src="/images/Remote-meeting.png"
          alt="remote worker image"
          // fill
          width={350}
          height={350}
          className="object-contain"
        />

        <h1 className="text-[#0F172A] font-semibold text-4xl">
          No session yet
        </h1>
        <p className="text-[#3F4555] text-base">
          Sessions you create will appear here. Click below to set up your first
          one.
        </p>

        <Buttons
          text="Create interview"
          type="button"
          style2="w-[50%]"
          style=" bg-[#02505E]"
          onClick={toggle}
        />
      </div>

      <CreatePage1 />
    </section>
  );
};

export default Dashboard;
