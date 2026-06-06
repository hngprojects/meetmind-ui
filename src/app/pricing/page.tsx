import { PricingCards } from "@/components/common/pricing/PricingCards";
import { FeaturesSection } from "@/components/common/pricing/FeaturesSection";
import Navbar from "@/components/common/LandingPage/Navbar";
import Footer from "@/components/common/LandingPage/Footer";

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
        {/* Centered header section - EXACTLY as shown in image */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-3 text-black">
            Pricing Plans
          </h1>
          <p className="text-base text-[#4a4a4a] max-w-[600px] mx-auto">
            The core SDK is open source and free forever. Managed infrastructure
            when you need it.
          </p>
        </div>

        <PricingCards />
        <FeaturesSection />
      </main>
      <Footer />
    </>
  );
}
