import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Home, Info, UtensilsCrossed, Phone, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import orientLogo from "@/assets/images/orient-logo-main.png";

export const Navbar = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { path: "/", label: t("home"), icon: Home },
    { path: "/tietoa", label: t("about"), icon: Info },
    { path: "/menu", label: t("menu"), icon: UtensilsCrossed },
    { path: "/yhteystiedot", label: t("contact"), icon: Phone },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/85 shadow-[0_1px_0_0_hsl(var(--border)/0.4)] backdrop-blur-md supports-[backdrop-filter]:bg-background/75 dark:border-white/10 dark:bg-orient-dark/90 dark:shadow-[0_1px_0_0_rgba(255,255,255,0.06)]">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
          <Link
            to="/"
            className="flex min-w-0 flex-shrink-0 items-center py-1 transition-opacity hover:opacity-90"
            onClick={() => setMobileOpen(false)}
          >
            <img
              src={orientLogo}
              alt="Orient Kebab Pizzeria"
              className="h-10 w-auto max-w-[min(100%,220px)] object-contain sm:h-12 md:h-14"
            />
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-6 md:flex">
            <nav className="flex items-center gap-0.5 lg:gap-1" aria-label={t("mobileNavTitle")}>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "relative touch-manipulation rounded-md px-3.5 py-2.5 text-sm font-medium tracking-tight transition-colors sm:text-base lg:px-4",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground dark:hover:bg-white/5",
                    )}
                  >
                    {item.label}
                    {isActive ? (
                      <span
                        className="absolute bottom-1.5 left-1/2 h-[3px] w-[1.5rem] -translate-x-1/2 rounded-full bg-primary"
                        aria-hidden
                      />
                    ) : null}
                  </Link>
                );
              })}
            </nav>
            <div className="flex items-center gap-1 border-l border-border/60 pl-6 dark:border-white/10">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-1 md:hidden">
            <LanguageSwitcher />
            <ThemeToggle />
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="touch-manipulation shrink-0 text-muted-foreground hover:bg-muted/80 hover:text-foreground dark:hover:bg-white/10"
                  aria-expanded={mobileOpen}
                  aria-controls="mobile-navigation"
                  aria-label={t("mobileNavTitle")}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                id="mobile-navigation"
                className="flex w-[min(100vw-1rem,20rem)] flex-col border-l pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-10"
              >
                <SheetHeader className="text-left">
                  <SheetTitle>{t("mobileNavTitle")}</SheetTitle>
                </SheetHeader>
                <nav className="mt-4 flex flex-1 flex-col gap-1" aria-label={t("mobileNavTitle")}>
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Button
                        key={item.path}
                        asChild
                        variant={isActive ? "hero" : "ghost"}
                        className="h-12 w-full touch-manipulation justify-start gap-3 text-base font-semibold"
                      >
                        <Link to={item.path} onClick={() => setMobileOpen(false)}>
                          <Icon className="h-5 w-5 shrink-0" />
                          {item.label}
                        </Link>
                      </Button>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
