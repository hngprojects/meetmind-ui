import Navbar from "../LandingPage/Navbar";
import Footer from "../LandingPage/Footer";
import HeaderSection from "./HeaderSection";
import ContentContainer from "./ContentContainer";
import SubscribeCTA from "@/components/common/ReusableComponents/SubscribeCTA";

export default function PrivacyPolicyPageView() {
  return (
    <div className="bg-[#F7F9FB] min-h-screen pt-8">
      <Navbar />
      <div className="w-full flex flex-col items-center border-t border-t-[#E1E3E4]">
        <HeaderSection />
        <ContentContainer />
        <SubscribeCTA />
      </div>
      <Footer />
    </div>
  );
}
