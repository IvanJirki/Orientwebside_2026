import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Phone, MapPin, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import type { SiteLang } from "@/types/siteConfig";
import heroImage from "@/assets/hero-food-spread.jpg";
import orientLogo from "@/assets/orient-logo-hero.png";

const heroNavOutlineClass =
  "w-full sm:flex-1 py-6 text-lg sm:text-xl bg-background/75 shadow-[0_8px_20px_rgba(0,0,0,0.5)] backdrop-blur-sm dark:bg-muted/45";

export const Hero = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language } = useLanguage();
  const { config } = useSiteConfig();
  const lang = language as SiteLang;

  const heroTitle =
    config.useCustomHome && config.homeHero.title[lang].trim()
      ? config.homeHero.title[lang]
      : t("heroTitle");
  const heroSubtitle =
    config.useCustomHome && config.homeHero.subtitle[lang].trim()
      ? config.homeHero.subtitle[lang]
      : t("heroSubtitle");

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden py-10 sm:py-12">
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
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        {/* Logo */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <img 
            src={orientLogo} 
            alt="Orient Kebab Pizzeria - Since 2002" 
            className="mx-auto w-[min(100%,16rem)] max-w-xs drop-shadow-2xl sm:w-80 md:w-96 lg:w-[28rem]"
          />
        </div>
        
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