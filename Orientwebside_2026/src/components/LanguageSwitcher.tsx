import { useLanguage, type Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';
import { LanguageOptionIcon } from '@/components/LanguageOptionIcon';
import flagFinland from '@/assets/images/flag-finland.png';
import flagUk from '@/assets/images/flag-uk.png';
import flagSweden from '@/assets/images/flag-sweden.png';
import flagGermany from '@/assets/images/flag-germany.png';
import flagFrance from '@/assets/images/flag-france.png';
import flagKurdistan from '@/assets/images/flag-kurdistan.png';
import flagSaudiArabia from '@/assets/images/flag-saudi-arabia.png';

export const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  const languages: {
    code: Language;
    name: string;
    flag?: string;
    iconSrc?: string;
  }[] = [
    { code: 'fi', name: 'Suomi', iconSrc: flagFinland },
    { code: 'en', name: 'English', iconSrc: flagUk },
    { code: 'sv', name: 'Svenska', iconSrc: flagSweden },
    { code: 'de', name: 'Deutsch', iconSrc: flagGermany },
    { code: 'fr', name: 'Français', iconSrc: flagFrance },
    { code: 'ku', name: 'Kurdî (Kurmancî)', iconSrc: flagKurdistan },
    { code: 'bah', name: 'Kurdî (Bahdînî)', iconSrc: flagKurdistan },
    { code: 'ckb', name: 'کوردی (سۆرانی)', iconSrc: flagKurdistan },
    { code: 'ar', name: 'العربية', iconSrc: flagSaudiArabia },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:bg-muted/80 hover:text-foreground dark:hover:bg-white/10"
          aria-label={t("welcomeChooseLabel", { defaultValue: "Choose language" })}
        >
          <Languages className="h-[1.15rem] w-[1.15rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background z-50">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={language === lang.code ? "bg-gray-200/90 dark:bg-neutral-800/90" : ""}
          >
            <span className="me-2 inline-flex items-center">
              <LanguageOptionIcon flag={lang.flag} iconSrc={lang.iconSrc} />
            </span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
