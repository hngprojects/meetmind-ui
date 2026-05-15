// interface Props {}

import Link from "next/link";

const TermText = () => {
  return (
    <div>
      <p className="text-[#5E6470] text-base flex flex-row gap-3">
        <span> Already have an account?</span>
        <Link href="/signIn" className="text-[#035A69]">
          Sign In
        </Link>
      </p>

      <p className=" text-base text-[#91949D]">
        By using Meetminds you agree to the{" "}
        <Link href="/Term-and-services" className="text-[#035A69] underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/Privacy-policy" className="text-[#035A69] underline">
          Privacy Policy
        </Link>{" "}
        .
      </p>
    </div>
  );
};

export default TermText;
