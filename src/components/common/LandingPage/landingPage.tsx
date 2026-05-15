import React from "react";
import Navbar from "./navbar";
import HeroSection from "./herroSection";
import DashboardPreview from "./dashboardReview";
import HowItWorks from "./HowItWorks";
import FeaturesGrid from "./FeaturesGrid";
import TemperatureControl from "./TemperatureControl";
import Testimonials from "./Testimonials";
import CTASection from "./CTASection";
import Footer from "./footer";

type Props = {};

const LandingPage = () => {
  return (
    <div>
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
