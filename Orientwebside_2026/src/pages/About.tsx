import { Navbar } from "@/components/Navbar";
import { HeroBackground } from "@/components/HeroBackground";
import { OrientMap } from "@/components/OrientMap";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SocialMediaSection } from "@/components/SocialMediaSection";
import { MAP_OPEN_URL } from "@/lib/orientLocation";

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative min-h-[50dvh] overflow-hidden py-12 md:min-h-[60dvh] md:py-20">
        <HeroBackground />

        <div className="relative z-10 container mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl space-y-6 rounded-2xl bg-background/80 px-4 py-8 text-center shadow-lg backdrop-blur-sm dark:bg-background/50 sm:space-y-8 sm:px-8 sm:py-10">
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl">
              {t("aboutWelcomeTitle")}
            </h2>
            <p className="mb-4 text-base leading-relaxed text-black/90 dark:text-white/90 sm:text-lg">
              {t("aboutParagraph1")}
            </p>
            <p className="mb-4 text-base leading-relaxed text-black/90 dark:text-white/90 sm:text-lg">
              {t("aboutParagraph2")}
            </p>
            <p className="text-base leading-relaxed text-black/90 dark:text-white/90 sm:text-lg">
              {t("aboutParagraph3")}
            </p>
          </div>

          <div className="mx-auto mt-10 w-full max-w-3xl">
            <h3 className="mb-2 flex items-center justify-center gap-2 text-center text-xl font-semibold text-black dark:text-white sm:text-2xl">
              <MapPin className="h-5 w-5 shrink-0 text-orient-red" aria-hidden />
              {t("aboutMapTitle")}
            </h3>
            <p className="mb-4 text-center text-sm text-black/80 dark:text-white/85 sm:text-base">
              {t("aboutMapAddress")}
            </p>
            <div className="overflow-hidden rounded-2xl border border-black/10 shadow-lg dark:border-white/15">
              <OrientMap popupLabel={t("aboutMapAddress")} />
            </div>
            <p className="mt-2 text-center text-[0.65rem] text-muted-foreground">
              <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:underline"
              >
                © OpenStreetMap contributors
              </a>
            </p>
            <p className="mt-4 text-center">
              <a
                href={MAP_OPEN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-orient-red underline-offset-4 hover:underline"
              >
                {t("aboutMapOpenInGoogleMaps")}
              </a>
            </p>
          </div>
        </div>
      </section>

      <SocialMediaSection />
    </div>
  );
};

export default About;
