import Buttons from "@/components/reuseable-component/buttons";
import { useSignupStore } from "@/store/signupStore";
import Image from "next/image";
import Link from "next/link";

const UploadSuccess = () => {
  const { formData } = useSignupStore();

  if (!formData) return <h1>error signing up</h1>;

  return (
    <div
      className="flex flex-col gap-8 items-center justify-center w-full 
     md:w-[75%] "
    >
      {/* success image */}
      <div className="relative w-60 h-60">
        {/* control size here */}
        <Image
          src="/icons/success-icon.svg"
          alt="Success"
          fill
          className="object-contain"
        />
      </div>

      <div className="flex flex-col gap-5">
        <h1 className="text-center font-semibold text-4xl">
          {" "}
          you&apos;re set, {formData.name}
        </h1>
        <p className="text-center text-base">
          Welcome to MeetMind, your AI co-pilot for thoughtful interviews.
          Here&apos;s what you can do from day one.
        </p>
      </div>

      <Link href="/onboarding" className="w-[80%] h-11">
        <Buttons
          text="Get Started fully"
          type="button"
          style="bg-[#02505E] hover:bg-[#02505E]/80"
        />
      </Link>
    </div>
  );
};

export default UploadSuccess;
