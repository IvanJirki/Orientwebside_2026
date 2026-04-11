import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { SocialMediaSection } from "@/components/SocialMediaSection";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <Contact />
      <SocialMediaSection />
    </div>
  );
};

export default ContactPage;
