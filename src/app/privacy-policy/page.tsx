import { Metadata } from "next";
import PrivacyPolicyPageView from "@/components/common/PrivacyPolicyPage/PrivacyPolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy | MeetMind",
  description: "Privacy Policy for MeetMind platform",
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <PrivacyPolicyPageView />
    </main>
  );
}
