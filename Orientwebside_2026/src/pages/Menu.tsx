import { Navbar } from "@/components/Navbar";
import { MenuSelector } from "@/components/MenuSelector";
import { SocialMediaSection } from "@/components/SocialMediaSection";
import { SpecialOffersBanner } from "@/components/SpecialOffersBanner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMenuSections } from "@/hooks/useMenuSections";

import heroImage from "@/assets/images/hero-food-spread.jpg";

const Menu = () => {
  const { t, language } = useLanguage();
  const menuSections = useMenuSections();

  return (
    <div className="min-h-[100dvh]">
      <Navbar />
      
      <section className="relative min-h-[100dvh] overflow-hidden">
        {/* Salmiakki Pattern Background */}
        <div className="absolute inset-0 z-0 bg-slate-100 dark:bg-orient-dark">
          <div 
            className="absolute inset-0 opacity-30 sm:opacity-40"
          >
            <div 
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 60px,
                    rgba(0, 0, 0, 0.3) 60px,
                    rgba(0, 0, 0, 0.3) 62px
                  ),
                  repeating-linear-gradient(
                    -45deg,
                    transparent,
                    transparent 60px,
                    rgba(0, 0, 0, 0.3) 60px,
                    rgba(0, 0, 0, 0.3) 62px
                  )
                `,
                backgroundSize: '85px 85px',
                backgroundPosition: '0 0, 42.5px 0'
              }}
              className="absolute inset-0 dark:[background-image:repeating-linear-gradient(45deg,transparent,transparent_60px,rgba(255,255,255,0.5)_60px,rgba(255,255,255,0.5)_62px),repeating-linear-gradient(-45deg,transparent,transparent_60px,rgba(255,255,255,0.5)_60px,rgba(255,255,255,0.5)_62px)] sm:[background-size:120px_120px] sm:[background-position:0_0,60px_0]"
            />
          </div>
          <img 
            src={heroImage} 
            alt="Delicious Mediterranean food" 
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30 sm:opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-200/70 via-orient-red/15 to-slate-200/70 dark:from-orient-dark/70 dark:via-orient-red/15 dark:to-orient-dark/70"></div>
        </div>
        
        <div className="relative z-10 container mx-auto max-w-5xl px-4 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] font-sans sm:px-6 sm:py-14 md:py-20">
          <div className="mb-8 text-center sm:mb-12 md:mb-16">
            <h1 className="mb-3 text-3xl font-bold text-black sm:text-4xl md:text-5xl dark:text-white dark:[text-shadow:2px_2px_10px_rgba(0,0,0,0.8),0_0_20px_rgba(0,0,0,0.5),0_4px_6px_rgba(0,0,0,0.6)]">
              {t("menuTitle")}
            </h1>
            <p className="mx-auto max-w-3xl text-base text-black sm:text-lg md:text-xl dark:text-white dark:[text-shadow:2px_2px_8px_rgba(0,0,0,0.8),0_2px_4px_rgba(0,0,0,0.6)]">
              {t("menuSubtitle")}
            </p>
          </div>

          <SpecialOffersBanner variant="onImage" />

          <MenuSelector key={language} menuSections={menuSections} />
        </div>
      </section>

      <SocialMediaSection />
    </div>
  );
};

export default Menu;
