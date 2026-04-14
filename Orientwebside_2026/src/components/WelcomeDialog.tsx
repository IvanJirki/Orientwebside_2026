import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import type { Language } from "@/contexts/LanguageContext";
import { LanguageOptionIcon } from "@/components/LanguageOptionIcon";
import flagFinland from "@/assets/images/flag-finland.png";
import flagUk from "@/assets/images/flag-uk.png";
import flagSweden from "@/assets/images/flag-sweden.png";
import flagGermany from "@/assets/images/flag-germany.png";
import flagFrance from "@/assets/images/flag-france.png";
import flagKurdistan from "@/assets/images/flag-kurdistan.png";
import flagSaudiArabia from "@/assets/images/flag-saudi-arabia.png";

const STORAGE_KEY = "orient-welcome-v1";

const LANGUAGES: { code: Language; label: string; flag?: string; iconSrc?: string }[] = [
  { code: "fi", label: "Suomi", iconSrc: flagFinland },
  { code: "en", label: "English", iconSrc: flagUk },
  { code: "sv", label: "Svenska", iconSrc: flagSweden },
  { code: "de", label: "Deutsch", iconSrc: flagGermany },
  { code: "fr", label: "Français", iconSrc: flagFrance },
  { code: "ku", label: "Kurdî (Kurmancî)", iconSrc: flagKurdistan },
  { code: "bah", label: "Kurdî (Bahdînî)", iconSrc: flagKurdistan },
  { code: "ckb", label: "کوردی (سۆرانی)", iconSrc: flagKurdistan },
  { code: "ar", label: "العربية", iconSrc: flagSaudiArabia },
];

export function WelcomeDialog() {
  const { pathname } = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    if (window.location.pathname.startsWith("/admin")) return false;
    try {
      return !localStorage.getItem(STORAGE_KEY);
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      setOpen(false);
      return;
    }
    try {
      setOpen(!localStorage.getItem(STORAGE_KEY));
    } catch {
      setOpen(true);
    }
  }, [pathname]);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  const pickLanguage = (code: Language) => {
    setLanguage(code);
    dismiss();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) dismiss();
        else setOpen(next);
      }}
    >
      <DialogContent className="max-h-[min(90vh,640px)] overflow-y-auto border-border/60 p-0 sm:max-w-[440px]">
        <div className="relative overflow-hidden bg-gradient-to-br from-orient-red via-red-700 to-red-950 px-6 pb-8 pt-10 text-white">
          <div
            className="pointer-events-none absolute -end-16 -top-16 h-40 w-40 rounded-full bg-orient-yellow/25 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-10 -start-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"
            aria-hidden
          />
          <div className="relative flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 shadow-lg ring-1 ring-white/20 backdrop-blur-sm">
              <Sparkles className="h-6 w-6 text-orient-yellow" aria-hidden />
            </div>
            <DialogTitle className="font-playfair text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {t("welcomeTitle")}
            </DialogTitle>
            <DialogDescription className="mt-3 max-w-sm text-base leading-relaxed text-white/90">
              {t("welcomeSubtitle")}
            </DialogDescription>
          </div>
        </div>

        <div className="space-y-5 p-6 pt-5">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {t("welcomeChooseLabel")}
          </p>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {LANGUAGES.map(({ code, label, flag, iconSrc }) => {
              const active = language === code;
              return (
                <Button
                  key={code}
                  type="button"
                  variant={active ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "h-auto min-h-[3rem] flex-col gap-1 py-2.5 font-medium transition-all",
                    active &&
                      "bg-gradient-to-br from-orient-red to-red-800 text-white shadow-md hover:from-orient-red hover:to-red-800 hover:text-white dark:hover:text-white",
                  )}
                  onClick={() => pickLanguage(code)}
                >
                  <LanguageOptionIcon flag={flag} iconSrc={iconSrc} active={active} />
                  <span className="text-xs leading-tight">{label}</span>
                </Button>
              );
            })}
          </div>

          <Button
            type="button"
            variant="ghost"
            className="w-full text-muted-foreground hover:text-foreground"
            onClick={dismiss}
          >
            {t("welcomeContinue")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
