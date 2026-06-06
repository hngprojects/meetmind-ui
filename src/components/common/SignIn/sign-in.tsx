import AuthLayout from "./AuthLayout";
import SignInForm from "./SignInForm";

const SignIn = () => {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Designing intelligence that knows how to speak"
    >
      <SignInForm />
    </AuthLayout>
  );
};

export default SignIn;
