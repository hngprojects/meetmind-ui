import Navbar from './Navbar';
import HeroSection from './HeroSection';
import HowItWorks from './HowItWorks';
import Features from './Features';
import Pricing from './Pricing';
import CTABanner from './CTABanner';
import Footer from './Footer';

export default function SDKLandingPage() {
  return (
    <div className="bg-[#F7F9FB] pt-16">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <Features />
      <Pricing />
      <CTABanner />
      <Footer />
    </div>
  );
}


