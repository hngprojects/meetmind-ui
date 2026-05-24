import Navbar from "@/components/common/LandingPage/Navbar";
import Footer from "@/components/common/LandingPage/Footer";
import AboutHero from "./AboutHero";
import AboutStats from "./AboutStats";
import AboutWhyChoose from "./AboutWhyChoose";
import AboutTeam from "./AboutTeam";
import AboutTimeline from "./AboutTimeline";
import AboutNewsletter from "./AboutNewsletter";

export default function AboutUsPage() {
  return (
    <div className="bg-bg-secondary min-h-screen">
      <Navbar />
      <main>
        <AboutHero />
        <AboutStats />
        <AboutWhyChoose />
        <AboutTeam />
        <AboutTimeline />
        <AboutNewsletter />
      </main>
      <Footer />
    </div>
  );
}
