import VerifyEmail from "@/components/common/VerifyEmail/verify-email";

export const metadata = {
  title: "Verify Email | MeetMind",
  description: "Verify your email address to complete sign-up.",
};

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FB] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <VerifyEmail />
    </div>
  );
}
