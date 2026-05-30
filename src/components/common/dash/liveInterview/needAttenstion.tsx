import React from "react";
import { AiTwotoneExclamationCircle } from "react-icons/ai";
import { CiCalendar, CiRedo } from "react-icons/ci";

const NeedAttention = () => {
  return (
    <div
      className=" px-2
     md:px-10 lg:px-20  flex flex-col gap-4"
    >
      <div className="bg-white">
        <h1 className="text-xl font-bold"> Need Attention</h1>
        <div className="flex flex-row gap-2">
          <AiTwotoneExclamationCircle />
          <p> AI failed to join </p>
          <p>- Temi Balogun </p>
          <p>. frontend Engineer</p>
          <CiRedo />
          <CiCalendar />
        </div>
      </div>
    </div>
  );
};

export default NeedAttention;
