import Onboarding from "@/components/common/Onboarding/Onboarding";
import ProtectedRoute from "@/components/providers/ProtectedRoute";

const OnboardingPage = () => {
  return (
    <ProtectedRoute>
      <Onboarding />
    </ProtectedRoute>
  );
};

export default OnboardingPage;
