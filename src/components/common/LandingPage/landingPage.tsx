import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import DashboardPreview from "./DashboardPreview";
import HowItWorks from "./HowItWorks";
import FeaturesGrid from "./FeaturesGrid";
import TemperatureControl from "./TemperatureControl";
import Testimonials from "./Testimonials";
import CTASection from "./CTASection";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div className="bg-[#F7F9FB]">
      <Navbar />
      <HeroSection />
      <DashboardPreview />
      <HowItWorks />
      <FeaturesGrid />
      <TemperatureControl />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;
