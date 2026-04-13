import { Button } from "@/components/ui/button";
import { Facebook, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const SocialMediaSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orient-red/5 via-white to-orient-yellow/5 py-12 dark:from-orient-dark dark:via-orient-dark/95 dark:to-orient-dark sm:py-16">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-2xl font-bold text-black sm:mb-8 sm:text-3xl dark:text-white">
            {t('followUs')}
          </h2>
          
          <div className="mb-10 flex flex-col items-stretch justify-center gap-3 sm:mb-12 sm:flex-row sm:flex-wrap sm:gap-4">
            <a 
              href="https://www.facebook.com/p/Iin-Pizzeria-Orient-Kebab-100046487516056/?locale=fi_FI" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border-0 bg-[#1877F2] px-5 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-[#1877F2]/90 hover:shadow-xl touch-manipulation"
            >
              <Facebook className="w-5 h-5" />
              Facebook
            </a>

            <a 
              href="https://www.instagram.com/orientpizzeria/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border-0 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] px-5 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:opacity-90 hover:shadow-xl touch-manipulation"
            >
              <Instagram className="w-5 h-5" />
              Instagram
            </a>

            <a 
              href="https://www.tiktok.com/@iinpizzeriaorient" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border-0 bg-black px-5 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-black/90 hover:shadow-xl touch-manipulation"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
              TikTok
            </a>
          </div>

          <p className="text-gray-600 dark:text-white/80 text-sm mb-8">
            {t('findUs')}
          </p>

          <div className="border-t border-gray-200 pt-6 dark:border-white/10">
            <p className="mb-3 font-playfair text-base text-foreground">
              {t('footerTagline')}
            </p>
            <div className="flex flex-col items-center gap-1 text-sm font-playfair text-muted-foreground">
              <span>{t('footerCompanyLegal')}</span>
              <span>{t('allRightsReserved')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};