"use client";
import Buttons from "@/components/reuseable-component/buttons";
import Image from "next/image";
import CreatePage1 from "../createInterview/createPage1";
import { useCreateStore } from "@/store/createInterviewStore";

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
          width={350}
          height={350}
          className="object-contain"
        />

        <h1 className="text-text-color-primary font-semibold text-4xl">
          No session yet
        </h1>
        <p className="text-text-subtext text-base">
          Sessions you create will appear here. Click below to set up your first
          one.
        </p>

        <Buttons
          text="Create interview"
          type="button"
          style2="w-[50%]"
          style=" bg-color-brand-primary"
          onClick={toggle}
        />
      </div>

      <CreatePage1 />
    </section>
  );
};

export default Dashboard;
