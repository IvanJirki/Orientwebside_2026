import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import i18n from '@/i18n';

export type Language = 'fi' | 'en' | 'sv' | 'de' | 'ar' | 'fr' | 'ku' | 'ckb' | 'bah';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TFunction;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const SUPPORTED: Language[] = ['fi', 'en', 'sv', 'de', 'ar', 'fr', 'ku', 'ckb', 'bah'];

function normalizeLanguage(raw: string | null): Language {
  if (!raw) return 'fi';
  const n = raw.replace('_', '-').toLowerCase();
  if (SUPPORTED.includes(n as Language)) return n as Language;
  const base = n.split('-')[0] as Language;
  return SUPPORTED.includes(base) ? base : 'fi';
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() =>
    normalizeLanguage(localStorage.getItem('i18nextLng')),
  );
  const { t } = useTranslation();

  const setLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
    setLanguageState(lang);
    localStorage.setItem('i18nextLng', lang);
  };

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    const isRtl = language === 'ar' || language === 'ckb';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
