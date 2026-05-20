import AuthLayout from "@/components/common/SignIn/AuthLayout";
import ForgotPasswordForm from "@/components/common/SignIn/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <AuthLayout
      title="Welcome to MeetMind"
      subtitle="Designing intelligence that knows how to speak"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
