import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Home, Info, UtensilsCrossed, Phone, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import orientLogo from "@/assets/orient-logo-main.png";

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
    <nav className="sticky top-0 z-50 border-b border-gray-300/20 bg-white/95 shadow-[0_2px_8px_rgba(255,255,255,0.1)] backdrop-blur-sm dark:border-white/10 dark:bg-orient-dark/95">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex min-h-[3.5rem] items-center justify-between gap-3 py-2 sm:min-h-[4rem] sm:py-3">
          <Link to="/" className="flex min-w-0 flex-shrink-0 items-center py-1" onClick={() => setMobileOpen(false)}>
            <img
              src={orientLogo}
              alt="Orient Kebab Pizzeria"
              className="h-9 w-auto max-w-[min(100%,200px)] object-contain drop-shadow-lg sm:h-12 md:h-14"
            />
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-1.5 md:flex md:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "hero" : "outline"}
                    size="sm"
                    className={`touch-manipulation text-xs sm:text-sm ${isActive ? "border-0 shadow-md" : "bg-background/80 shadow-sm backdrop-blur-sm dark:bg-muted/35"}`}
                  >
                    <Icon className="h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-1.5 md:hidden">
            <LanguageSwitcher />
            <ThemeToggle />
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="touch-manipulation shrink-0"
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
