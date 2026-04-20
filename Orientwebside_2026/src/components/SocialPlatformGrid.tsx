import { Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const socialButtons = [
  {
    href: "https://www.facebook.com/p/Iin-Pizzeria-Orient-Kebab-100046487516056/?locale=fi_FI",
    label: "Facebook",
    icon: Facebook,
    buttonClass:
      "h-8 border-0 bg-[#1877F2] px-2.5 text-xs text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-[#1877F2]/90 hover:shadow-md",
  },
  {
    href: "https://www.instagram.com/orientpizzeria/",
    label: "Instagram",
    icon: Instagram,
    buttonClass:
      "h-8 border-0 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] px-2.5 text-xs text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:opacity-90 hover:shadow-md",
  },
  {
    href: "https://www.tiktok.com/@iinpizzeriaorient",
    label: "TikTok",
    icon: TikTokIcon,
    buttonClass:
      "h-8 border-0 bg-black px-2.5 text-xs text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-black/90 hover:shadow-md",
  },
] as const;

type SocialPlatformGridProps = {
  className?: string;
};

/** Facebook / Instagram / TikTok — compact button row (same pattern as Tietoa page). */
export function SocialPlatformGrid({ className }: SocialPlatformGridProps) {
  return (
    <div
      className={cn(
        "flex flex-col flex-wrap justify-center gap-1.5 sm:flex-row sm:gap-2",
        className,
      )}
      role="group"
      aria-label="Social media"
    >
      {socialButtons.map((item) => {
        const Icon = item.icon;
        return (
          <Button key={item.href} asChild size="sm" className={item.buttonClass}>
            <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              <Icon className="h-3.5 w-3.5 shrink-0" />
              {item.label}
            </a>
          </Button>
        );
      })}
    </div>
  );
}
