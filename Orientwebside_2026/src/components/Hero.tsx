import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Phone, MapPin, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { resolveLocalized, type SiteLang } from "@/types/siteConfig";
import { HeroBackground } from "@/components/HeroBackground";

const heroNavOutlineClass =
  "w-full sm:flex-1 py-6 text-lg sm:text-xl bg-background/75 shadow-[0_8px_20px_rgba(0,0,0,0.5)] backdrop-blur-sm dark:bg-muted/45";

export const Hero = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language } = useLanguage();
  const { config } = useSiteConfig();
  const lang = language as SiteLang;

  const customTitle = resolveLocalized(config.homeHero.title, lang);
  const customSubtitle = resolveLocalized(config.homeHero.subtitle, lang);
  const heroTitle =
    config.useCustomHome && customTitle.trim() ? customTitle : t("heroTitle");
  const heroSubtitle =
    config.useCustomHome && customSubtitle.trim() ? customSubtitle : t("heroSubtitle");

  return (
    <section className="relative flex min-h-[72dvh] items-center justify-center overflow-hidden py-6 sm:min-h-[78dvh] sm:py-8">
      <HeroBackground />
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 leading-tight px-2" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.2)' }}>
          {heroTitle}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-800 dark:text-white/90 mb-6 sm:mb-8 leading-relaxed px-2 font-sans" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.1)' }}>
          {heroSubtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 max-w-4xl mx-auto">
          <Button 
            variant={location.pathname === "/menu" ? "hero" : "outline"}
            size="lg" 
            onClick={() => navigate("/menu")} 
            className={location.pathname === "/menu" 
              ? "w-full sm:flex-1 py-6 text-lg sm:text-xl shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
              : heroNavOutlineClass
            }
          >
            {t('menu')}
          </Button>
          <Button 
            variant={location.pathname === "/tietoa" ? "hero" : "outline"}
            size="lg" 
            className={location.pathname === "/tietoa"
              ? "w-full sm:flex-1 py-6 text-lg sm:text-xl shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
              : heroNavOutlineClass
            }
            onClick={() => navigate("/tietoa")}
          >
            {t('aboutUs')}
          </Button>
          <Button 
            variant={location.pathname === "/yhteystiedot" ? "hero" : "outline"}
            size="lg" 
            className={location.pathname === "/yhteystiedot"
              ? "w-full sm:flex-1 py-6 text-lg sm:text-xl shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
              : heroNavOutlineClass
            }
            onClick={() => navigate("/yhteystiedot")}
          >
            {t('contact')}
          </Button>
        </div>
        
        <div className="mt-6 px-4 max-w-md mx-auto">
          <a href="tel:088176676">
            <Button 
              variant="hero" 
              size="lg" 
              className="w-full py-6 text-lg sm:text-xl shadow-[0_8px_20px_rgba(0,0,0,0.5)] bg-gradient-to-r from-orient-red to-orient-yellow hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)] flex items-center justify-center gap-3"
            >
              <Phone className="w-6 h-6 sm:w-7 sm:h-7" /> {t('callAndOrder')}
            </Button>
          </a>
        </div>
        
        {/* Contact Info */}
        <div className="mt-6 space-y-2 px-2 text-gray-700 dark:text-white/80 sm:mt-8">
          <p
            className="flex flex-col items-center justify-center gap-2 text-xs sm:flex-row sm:text-sm"
            style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.1)" }}
          >
            <span className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" aria-hidden />
              <a href="tel:088176676" className="underline-offset-2 hover:underline">
                08 817 6676
              </a>
            </span>
            <span className="hidden sm:inline" aria-hidden>
              |
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden />
              Ii, Laurintie 2, 91100
            </span>
          </p>
          <p
            className="flex items-center justify-center gap-2 text-xs sm:text-sm"
            style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.1)" }}
          >
            <Globe className="h-4 w-4 shrink-0" aria-hidden />
            <a href="https://www.orientkebab.com" className="underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">
              www.orientkebab.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};