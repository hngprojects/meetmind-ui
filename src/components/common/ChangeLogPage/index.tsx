import NavBar from "./NavBar";
import HeroBanner from "./HeroBanner";
import Logs from "./Logs";
import SubscriptionBanner from "./SubscriptionBanner";
import Footer from "./Footer";

export default function ChangeLogPage() {
  return (
    <div className="bg-[#F7F9FB] pt-16 ">
      <NavBar />
      <HeroBanner />
      <Logs />
      <SubscriptionBanner />
      <Footer />
    </div>
  );
}
