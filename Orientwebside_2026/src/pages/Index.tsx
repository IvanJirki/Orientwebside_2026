import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SocialMediaSection } from "@/components/SocialMediaSection";
import { IndexOffersStrip } from "@/components/IndexOffersStrip";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <IndexOffersStrip />
      <Hero />
      <SocialMediaSection />
    </div>
  );
};

export default Index;