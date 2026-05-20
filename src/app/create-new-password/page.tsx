import AuthLayout from "@/components/common/SignIn/AuthLayout";
import CreateNewPasswordForm from "@/components/common/SignIn/CreateNewPasswordForm";

const CreateNewPasswordPage = () => {
  return (
    <AuthLayout
      title="Welcome to Meet Mind"
      subtitle="Designing intelligence that knows how to speak"
    >
      <CreateNewPasswordForm />
    </AuthLayout>
  );
};

export default CreateNewPasswordPage;
