import Buttons from "@/components/reuseable-component/buttons";
import { FcGoogle } from "react-icons/fc";

const Authwith = () => {
  // handle Google sign-in
  // const handleGoogleSignIn = () => {
  //   window.location.href =
  //     "https://api.staging.meetmind.hng14.com/api/v1/auth/google";
  // };
  const handleGoogleSignIn = () => {
    // Tell the backend to redirect to YOUR Next.js route handler
    const redirectUri = `${window.location.origin}/auth/google/callback`;
    window.location.href = `https://api.staging.meetmind.hng14.com/api/v1/auth/google?redirect_uri=${encodeURIComponent(redirectUri)}`;
  };
  return (
    <section
      className="flex  items-center justify-center gap-3 flex-row w-full
     h-10"
    >
      {/* sign in with google */}
      <Buttons
        text=" Google"
        type="button"
        icon={<FcGoogle />}
        onClick={handleGoogleSignIn}
        style="bg-[#FEFEFF]  hover:bg-[#FEFEFF]/80 border-[#E1E3E4]
         text-[#0F172A] "
        style2="w-[75%] h-14"
      />
    </section>
  );
};

export default Authwith;
