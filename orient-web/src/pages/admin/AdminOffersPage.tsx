import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiOnlyLocalizedInput, FiOnlyLocalizedTextarea } from "@/pages/admin/FiOnlyLocalizedFields";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import type { SpecialOffer } from "@/types/siteConfig";
import { activeSpecialOffers } from "@/lib/siteConfigStorage";
import {
  Plus,
  Trash2,
  Copy,
  Sparkles,
  CheckCircle2,
  EyeOff,
  CalendarClock,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const emptyOffer = (): SpecialOffer => ({
  id: `offer-${crypto.randomUUID()}`,
  title: { fi: "", en: "", sv: "" },
  description: { fi: "", en: "", sv: "" },
  priceLabel: "",
  active: true,
  validUntil: null,
});

function offerStatus(offer: SpecialOffer): "live" | "hidden" | "expired" {
  if (!offer.active) return "hidden";
  const today = new Date().toISOString().slice(0, 10);
  if (offer.validUntil && offer.validUntil < today) return "expired";
  return "live";
}

const AdminOffersPage = () => {
  const { config, setConfig } = useSiteConfig();

  const updateOffers = (offers: SpecialOffer[]) => {
    setConfig({ ...config, specialOffers: offers, version: 1 });
  };

  const addOffer = () => {
    updateOffers([...config.specialOffers, emptyOffer()]);
    toast.success("Uusi tarjous lisätty — täytä tiedot alla.");
  };

  const removeOffer = (index: number) => {
    updateOffers(config.specialOffers.filter((_, i) => i !== index));
    toast.message("Tarjous poistettu");
  };

  const duplicateOffer = (index: number) => {
    const o = config.specialOffers[index];
    const copy: SpecialOffer = {
      ...o,
      id: `offer-${crypto.randomUUID()}`,
      active: false,
    };
    const next = [...config.specialOffers];
    next.splice(index + 1, 0, copy);
    updateOffers(next);
    toast.success("Kopio luotu (pois päältä — käynnitä kun valmis)");
  };

  const patchOffer = (index: number, patch: Partial<SpecialOffer>) => {
    const next = [...config.specialOffers];
    next[index] = { ...next[index], ...patch };
    updateOffers(next);
  };

  const visibleCount = activeSpecialOffers(config.specialOffers).length;

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-28 md:pb-6">
      {/* Ohje-yläosa — app-tyylinen */}
      <div className="rounded-2xl border border-border/80 bg-gradient-to-b from-card to-muted/20 p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Tarjoukset</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Kirjoita vain suomeksi — englanti ja ruotsi päivittyvät automaattisesti, kun poistut kentästä.
            </p>
          </div>
          <div className="flex flex-col items-stretch gap-2 sm:items-end">
            <Badge variant="outline" className="gap-1 border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium text-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" aria-hidden />
              Tallentuu automaattisesti
            </Badge>
            <Button
              type="button"
              size="lg"
              className="hidden h-12 touch-manipulation font-semibold md:inline-flex"
              onClick={addOffer}
            >
              <Plus className="mr-2 h-5 w-5" />
              Lisää uusi tarjous
            </Button>
          </div>
        </div>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="font-semibold text-foreground">1.</span>
            Kirjoita otsikko ja kuvaus suomeksi — käännös tehdään automaattisesti.
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-foreground">2.</span>
            Merkitse hinta (esim. &quot;10 €&quot;) ja voimassaolopäivä tarvittaessa.
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-foreground">3.</span>
            Kytke <strong className="font-medium text-foreground">Tarjous käytössä</strong> päälle, kun julkaiset.
          </li>
        </ul>
        <p className="mt-3 flex items-start gap-2 rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground dark:bg-muted/30">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
          Tiedot tallentuvat tähän selaimeen (localStorage). Muut laitteet eivät näe muutoksia automaattisesti.
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-xl border bg-card px-4 py-3 text-sm shadow-sm">
        <span className="text-muted-foreground">Näkyviä tarjouksia sivulla nyt</span>
        <span className="text-lg font-bold tabular-nums text-foreground">{visibleCount}</span>
      </div>

      <div className="space-y-5">
        {config.specialOffers.map((offer, i) => {
          const status = offerStatus(offer);
          return (
            <Card
              key={offer.id}
              className="overflow-hidden border-2 border-border/80 shadow-md transition-shadow hover:shadow-lg"
            >
              <div
                className={cn(
                  "flex flex-wrap items-center justify-between gap-3 border-b bg-muted/30 px-4 py-3 sm:px-5",
                  status === "live" && "border-l-4 border-l-primary",
                )}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">Tarjous {i + 1}</span>
                  {status === "live" && (
                    <Badge className="border-green-700/30 bg-green-100 text-green-900 dark:bg-green-950 dark:text-green-100">
                      Näkyy asiakkaille
                    </Badge>
                  )}
                  {status === "hidden" && (
                    <Badge variant="outline" className="gap-1 text-muted-foreground">
                      <EyeOff className="h-3 w-3" aria-hidden />
                      Ei käytössä
                    </Badge>
                  )}
                  {status === "expired" && (
                    <Badge variant="destructive" className="gap-1">
                      <CalendarClock className="h-3 w-3" aria-hidden />
                      Päättynyt (päivitä päivä tai poista)
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="touch-manipulation"
                    onClick={() => duplicateOffer(i)}
                  >
                    <Copy className="mr-1.5 h-4 w-4" />
                    Kopioi
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="touch-manipulation text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => removeOffer(i)}
                    aria-label="Poista tarjous"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <CardContent className="space-y-6 p-4 sm:p-6">
                <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-background/50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <Switch
                      id={`active-${offer.id}`}
                      className="h-7 w-12 shrink-0 data-[state=checked]:bg-primary [&>span]:h-6 [&>span]:w-6"
                      checked={offer.active}
                      onCheckedChange={(v) => patchOffer(i, { active: v })}
                    />
                    <div>
                      <Label htmlFor={`active-${offer.id}`} className="text-base font-semibold">
                        Tarjous käytössä
                      </Label>
                      <p className="text-xs text-muted-foreground">Kun pois päältä, tarjous piilotetaan kokonaan.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Tekstit (suomi → EN/SV automaattisesti)
                  </h2>
                  <FiOnlyLocalizedInput
                    id={`title-fi-${offer.id}`}
                    label="Otsikko"
                    value={offer.title}
                    onCommit={(title) => patchOffer(i, { title })}
                    placeholder="Esim. Pizzaperjantai"
                    className="min-h-11 text-base"
                  />
                  <FiOnlyLocalizedTextarea
                    id={`desc-fi-${offer.id}`}
                    label="Kuvaus"
                    value={offer.description}
                    onCommit={(description) => patchOffer(i, { description })}
                    placeholder="Lyhyt kuvaus asiakkaille…"
                    rows={4}
                    className="min-h-[120px] resize-y text-base"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`price-${offer.id}`} className="text-base">
                      Hinta tai maininta
                    </Label>
                    <Input
                      id={`price-${offer.id}`}
                      value={offer.priceLabel}
                      onChange={(e) => patchOffer(i, { priceLabel: e.target.value })}
                      placeholder="Esim. 12 € tai Alkaen 10 €"
                      className="min-h-11 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`until-${offer.id}`} className="text-base">
                      Voimassa asti (valinnainen)
                    </Label>
                    <Input
                      id={`until-${offer.id}`}
                      type="date"
                      value={offer.validUntil ?? ""}
                      onChange={(e) => patchOffer(i, { validUntil: e.target.value || null })}
                      className="min-h-11 text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                    <Sparkles className="h-4 w-4 text-orient-red" aria-hidden />
                    Esikatselu (näin näkyy sivulla)
                  </div>
                  <div className="rounded-xl border border-orient-red/30 bg-card p-4 shadow-inner">
                    <p className="text-xs font-semibold uppercase text-orient-red">
                      {offer.priceLabel || "— hinta —"}
                    </p>
                    <h3 className="mt-1 text-lg font-bold tracking-tight text-foreground">
                      {offer.title.fi || "Otsikko tähän"}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {offer.description.fi || "Kuvaus näkyy tässä."}
                    </p>
                    {offer.validUntil && (
                      <p className="mt-3 text-xs text-muted-foreground">Voimassa asti {offer.validUntil}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {config.specialOffers.length === 0 && (
          <Card className="border-dashed p-10 text-center">
            <p className="text-lg font-medium">Ei tarjouksia vielä</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Lisää ensimmäinen tarjous alla olevalla painikkeella.
            </p>
          </Card>
        )}
      </div>

      {/* Mobile-friendly sticky action */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur-md md:hidden">
        <Button
          type="button"
          size="lg"
          className="h-14 w-full touch-manipulation text-base font-semibold shadow-md md:h-12 md:max-w-md"
          onClick={addOffer}
        >
          <Plus className="mr-2 h-5 w-5" />
          Lisää uusi tarjous
        </Button>
      </div>
    </div>
  );
};

export default AdminOffersPage;
