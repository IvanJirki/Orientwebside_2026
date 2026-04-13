import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/images/hero-food-spread.jpg";

export const Contact = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden py-10 md:py-16">
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
        
        <div className="relative z-10 container mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-8 text-center md:mb-14">
            <h2
              className="mb-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl"
              style={{
                textShadow: "2px 2px 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5), 0 4px 6px rgba(0,0,0,0.6)",
              }}
            >
              {t("contactTitle")}
            </h2>
            <p
              className="mx-auto max-w-2xl text-base text-white sm:text-lg md:text-xl"
              style={{
                textShadow: "2px 2px 8px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)",
              }}
            >
              {t("contactSubtitle")}
            </p>
            <p
              className="mx-auto mt-2 max-w-2xl text-sm text-white/95 sm:text-base md:text-lg"
              style={{
                textShadow: "2px 2px 8px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)",
              }}
            >
              {t("contactLocation")}
            </p>
          </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <Card className="border-2 border-border bg-card/90 p-6 backdrop-blur-sm transition-all duration-500 hover:border-orient-red/30 hover:shadow-[var(--shadow-elegant)] sm:p-8">
            <h3 className="mb-5 text-xl font-bold text-foreground sm:mb-6 sm:text-2xl">
              {t("contactInfoTitle")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orient-red/20 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-orient-red" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t('contactAddress')}</p>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Laurintie+2,+Ii,+Finland+91100" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-orient-red transition-colors cursor-pointer"
                  >
                    Laurintie 2<br />Ii, Finland 91100
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orient-red/20 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-orient-red" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t('contactPhone')}</p>
                  <a href="tel:088176676" className="text-muted-foreground hover:text-orient-red transition-colors">08 8176676</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orient-red/20 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-orient-red" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t('contactEmail')}</p>
                  <a href="mailto:orientkebab@windowslive.com" className="text-muted-foreground hover:text-orient-red transition-colors break-all">orientkebab@windowslive.com</a>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="border-2 border-border bg-card/90 p-6 backdrop-blur-sm transition-all duration-500 hover:border-orient-red/30 hover:shadow-[var(--shadow-elegant)] sm:p-8">
            <h3 className="mb-5 text-xl font-bold text-foreground sm:mb-6 sm:text-2xl">
              {t("openingHoursTitle")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-orient-red/20 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orient-red" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t('openLabel')}</p>
                  <p className="text-muted-foreground">{t('openDays')}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-medium text-foreground">{t('mondayThursday')}</span>
                  <span className="text-muted-foreground">10:30 - 21:00</span>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-medium text-foreground">{t('fridaySaturday')}</span>
                  <span className="text-muted-foreground">10:30 - 05:00</span>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-medium text-foreground">{t('sunday')}</span>
                  <span className="text-muted-foreground">12:00 - 21:00</span>
                </div>
              </div>
              
              <a href="tel:088176676">
                <Button variant="hero" className="w-full mt-6 bg-gradient-to-r from-orient-red to-orient-yellow hover:shadow-[var(--shadow-elegant)] shadow-md">
                  {t('callAndOrder')}
                </Button>
              </a>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};