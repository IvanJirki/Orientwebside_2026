import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { SiteConfig } from "@/types/siteConfig";
import { mergeConfigWithStorage, saveSiteConfig } from "@/lib/siteConfigStorage";

interface SiteConfigContextValue {
  config: SiteConfig;
  setConfig: (next: SiteConfig) => void;
  patchConfig: (partial: Partial<SiteConfig>) => void;
}

const SiteConfigContext = createContext<SiteConfigContextValue | null>(null);

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfigState] = useState<SiteConfig>(() => mergeConfigWithStorage());

  const setConfig = useCallback((next: SiteConfig) => {
    setConfigState(next);
    saveSiteConfig(next);
  }, []);

  const patchConfig = useCallback((partial: Partial<SiteConfig>) => {
    setConfigState((prev) => {
      const next = { ...prev, ...partial, version: 1 as const };
      saveSiteConfig(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ config, setConfig, patchConfig }),
    [config, setConfig, patchConfig],
  );

  return <SiteConfigContext.Provider value={value}>{children}</SiteConfigContext.Provider>;
}

export function useSiteConfig() {
  const ctx = useContext(SiteConfigContext);
  if (!ctx) {
    throw new Error("useSiteConfig must be used within SiteConfigProvider");
  }
  return ctx;
}
