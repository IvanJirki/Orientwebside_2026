import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { buildStoredMenuFromI18n } from "@/lib/siteConfigStorage";
import { delay, translateFiToEnSv } from "@/lib/autoTranslate";
import {
  FiOnlyLocalizedInput,
  FiOnlyLocalizedTextarea,
  FiOnlyLocalizedTitlePriceSplit,
} from "@/pages/admin/FiOnlyLocalizedFields";
import type { LocalizedString, StoredMenuCategory, StoredSizeCategory, StoredSubcategory } from "@/types/siteConfig";
import {
  Plus,
  Trash2,
  AlertTriangle,
  Download,
  ChevronDown,
  Settings2,
  ListTree,
  Rocket,
} from "lucide-react";
import { toast } from "sonner";
import { SubcategoryItemsEditor } from "@/pages/admin/SubcategoryItemsEditor";
import { shouldMergePizzaBaseBlockStored } from "@/lib/menuSubcategoryUtils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { EditableFieldBlock } from "@/pages/admin/EditableFieldBlock";
import { cn } from "@/lib/utils";

function AdminDirtyField({
  path,
  dirtyPaths,
  className,
  children,
}: {
  path: string;
  dirtyPaths: Set<string>;
  className?: string;
  children: ReactNode;
}) {
  const dirty = dirtyPaths.has(path);
  return (
    <div
      className={cn(
        "rounded-md transition-colors",
        dirty && "bg-amber-50/90 ring-2 ring-amber-500/70 ring-offset-2 ring-offset-background dark:bg-amber-950/30 dark:ring-amber-400/60",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Ensimmäisen listan rivit yhdeksi kentäksi (yhteinen selite). */
function mergedItemsAsOneField(items: LocalizedString[]): LocalizedString {
  if (items.length === 0) return { fi: "", en: "", sv: "" };
  if (items.length === 1) return { ...items[0] };
  return {
    fi: items.map((i) => i.fi).join("\n"),
    en: items.map((i) => i.en).join("\n"),
    sv: items.map((i) => i.sv).join("\n"),
  };
}

function imageIdLabel(id: string): string {
  const m: Record<string, string> = {
    pizza: "Pizza",
    kids: "Lasten menu",
    dishes: "Annokset",
    drinks: "Juomat",
  };
  return m[id] ?? id;
}

type DeleteIntent =
  | { type: "category"; ci: number }
  | { type: "size"; ci: number; si: number }
  | { type: "sub"; ci: number; si: number; ki: number };

const AdminMenuPage = () => {
  const { t } = useTranslation();
  const { config, setConfig } = useSiteConfig();

  const [localCategories, setLocalCategories] = useState<StoredMenuCategory[]>(
    () => JSON.parse(JSON.stringify(config.categories)) as StoredMenuCategory[],
  );
  const [dirtyPaths, setDirtyPaths] = useState<Set<string>>(() => new Set());
  const syncedCategoriesJson = useRef(JSON.stringify(config.categories));
  const [deleteIntent, setDeleteIntent] = useState<DeleteIntent | null>(null);

  const categories = localCategories;

  const markDirty = useCallback((path: string) => {
    setDirtyPaths((prev) => new Set(prev).add(path));
  }, []);

  useEffect(() => {
    const incoming = JSON.stringify(config.categories);
    if (incoming !== syncedCategoriesJson.current) {
      syncedCategoriesJson.current = incoming;
      setLocalCategories(JSON.parse(incoming) as StoredMenuCategory[]);
      setDirtyPaths(new Set());
    }
  }, [config.categories]);

  const hasUnsavedMenuChanges = dirtyPaths.size > 0;

  /** Tallenna luonnos selaimeen ja näytä se /menu-sivulla. */
  const publishMenu = useCallback(() => {
    if (localCategories.length === 0) return;
    setConfig({ ...config, categories: localCategories, useCustomMenu: true, version: 1 });
    syncedCategoriesJson.current = JSON.stringify(localCategories);
    setDirtyPaths(new Set());
    toast.success("Ruokalista julkaistu — näkyy /menu-sivulla tästä selaimesta.");
  }, [config, localCategories, setConfig]);

  const discardMenuChanges = useCallback(() => {
    const j = JSON.stringify(config.categories);
    setLocalCategories(JSON.parse(j) as StoredMenuCategory[]);
    syncedCategoriesJson.current = j;
    setDirtyPaths(new Set());
    toast.message("Tallentamattomat muutokset hylätty.");
  }, [config.categories]);

  const [catTab, setCatTab] = useState("0");
  const [sizeTab, setSizeTab] = useState("0");

  useEffect(() => {
    if (categories.length === 0) return;
    const i = parseInt(catTab, 10);
    if (Number.isNaN(i) || i >= categories.length) setCatTab("0");
  }, [categories.length, catTab]);

  useEffect(() => {
    setSizeTab("0");
  }, [catTab]);

  const loadFromTranslations = () => {
    const next = buildStoredMenuFromI18n();
    setLocalCategories(JSON.parse(JSON.stringify(next.categories)) as StoredMenuCategory[]);
    setDirtyPaths((prev) => new Set(prev).add("import-from-i18n"));
    setCatTab("0");
    setSizeTab("0");
    toast.success("Ruokalista kopioitu luonnokseen — julkaise, kun haluat näyttää sen /menu-sivulla.");
  };

  const patchCategory = useCallback(
    (index: number, patch: Partial<StoredMenuCategory>) => {
      setLocalCategories((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], ...patch };
        return next;
      });
      if ("title" in patch) markDirty(`c${index}-title`);
      if ("description" in patch) markDirty(`c${index}-desc`);
      if ("id" in patch) markDirty(`c${index}-id`);
      if ("imageId" in patch) markDirty(`c${index}-image`);
      if ("sizeCategories" in patch) markDirty(`c${index}-sizes`);
    },
    [markDirty],
  );

  const patchSize = (ci: number, si: number, patch: Partial<StoredSizeCategory>) => {
    setLocalCategories((prev) => {
      const next = [...prev];
      const sizes = [...next[ci].sizeCategories];
      sizes[si] = { ...sizes[si], ...patch };
      next[ci] = { ...next[ci], sizeCategories: sizes };
      return next;
    });
    if ("size" in patch) markDirty(`c${ci}-s${si}-name`);
    if ("subcategories" in patch) markDirty(`c${ci}-s${si}-subs`);
  };

  const patchSub = (ci: number, si: number, ki: number, patch: Partial<StoredSubcategory>) => {
    setLocalCategories((prev) => {
      const next = [...prev];
      const sizes = [...next[ci].sizeCategories];
      const subs = [...sizes[si].subcategories];
      subs[ki] = { ...subs[ki], ...patch };
      sizes[si] = { ...sizes[si], subcategories: subs };
      next[ci] = { ...next[ci], sizeCategories: sizes };
      return next;
    });
    if ("title" in patch) markDirty(`c${ci}-s${si}-k${ki}-title`);
    if ("items" in patch) markDirty(`c${ci}-s${si}-k${ki}-items`);
  };

  const addCategory = async () => {
    const id = `cat-${crypto.randomUUID().slice(0, 8)}`;
    const tTitle = await translateFiToEnSv("Uusi ryhmä").catch(() => ({ en: "New group", sv: "Ny grupp" }));
    await delay(100);
    const tSize = await translateFiToEnSv("Koko / ryhmä").catch(() => ({ en: "Size / group", sv: "Storlek" }));
    await delay(100);
    const tSub = await translateFiToEnSv("Alaotsikko").catch(() => ({ en: "Subtitle", sv: "Underrubrik" }));
    const cat: StoredMenuCategory = {
      id,
      imageId: "pizza",
      title: { fi: "Uusi ryhmä", ...tTitle },
      description: { fi: "", en: "", sv: "" },
      sizeCategories: [
        {
          size: { fi: "Koko / ryhmä", ...tSize },
          subcategories: [
            {
              title: { fi: "Alaotsikko", ...tSub },
              items: [],
            },
          ],
        },
      ],
    };
    setLocalCategories((prev) => {
      const next = [...prev, cat];
      queueMicrotask(() => {
        setCatTab(String(next.length - 1));
        setSizeTab("0");
      });
      return next;
    });
    markDirty("categories-structure");
    toast.success("Ryhmä lisätty. Tallenna muutokset, kun olet valmis.");
  };

  const runRemoveCategory = (index: number) => {
    const next = categories.filter((_, i) => i !== index);
    setLocalCategories(next);
    markDirty("categories-structure");
    if (next.length === 0) {
      setCatTab("0");
      return;
    }
    const cur = parseInt(catTab, 10);
    if (cur > index) setCatTab(String(cur - 1));
    else if (cur === index) setCatTab(String(Math.min(index, next.length - 1)));
  };

  const runRemoveSize = (ci: number, si: number) => {
    setLocalCategories((prev) => {
      const next = [...prev];
      const nextSizes = next[ci].sizeCategories.filter((_, i) => i !== si);
      next[ci] = { ...next[ci], sizeCategories: nextSizes };
      return next;
    });
    markDirty(`c${ci}-sizes`);
    setSizeTab("0");
  };

  const runRemoveSub = (ci: number, si: number, ki: number) => {
    setLocalCategories((prev) => {
      const next = [...prev];
      const sizes = [...next[ci].sizeCategories];
      const subs = sizes[si].subcategories.filter((_, i) => i !== ki);
      sizes[si] = { ...sizes[si], subcategories: subs };
      next[ci] = { ...next[ci], sizeCategories: sizes };
      return next;
    });
    markDirty(`c${ci}-s${si}-subs`);
  };

  const executeDelete = () => {
    if (!deleteIntent) return;
    if (deleteIntent.type === "category") runRemoveCategory(deleteIntent.ci);
    else if (deleteIntent.type === "size") runRemoveSize(deleteIntent.ci, deleteIntent.si);
    else runRemoveSub(deleteIntent.ci, deleteIntent.si, deleteIntent.ki);
    setDeleteIntent(null);
  };

  const deleteDialogCopy = useMemo(() => {
    if (!deleteIntent) return { title: "", description: "" };
    if (deleteIntent.type === "category") {
      const c = categories[deleteIntent.ci];
      return {
        title: "Poistetaanko koko ryhmä?",
        description: `Ryhmä "${c?.title?.fi?.trim() || c?.id || "tuntematon"}" poistetaan pysyvästi luonnoksesta. Tallenna, jotta muutos tallentuu selaimeen.`,
      };
    }
    if (deleteIntent.type === "size") {
      const s = categories[deleteIntent.ci]?.sizeCategories[deleteIntent.si];
      return {
        title: "Poistetaanko tämä osio?",
        description: `Osio "${s?.size?.fi?.trim() || "tuntematon"}" ja sen listat poistetaan luonnoksesta.`,
      };
    }
    return {
      title: "Poistetaanko tämä lista?",
      description: "Lista ja sen rivit poistetaan luonnoksesta.",
    };
  }, [deleteIntent, categories]);

  const addSize = async (ci: number) => {
    const cat = localCategories[ci];
    const tSize = await translateFiToEnSv("Uusi koko").catch(() => ({ en: "New size", sv: "Ny storlek" }));
    await delay(80);
    const tList = await translateFiToEnSv("Lista").catch(() => ({ en: "List", sv: "Lista" }));
    const sizes = [
      ...cat.sizeCategories,
      {
        size: { fi: "Uusi koko", ...tSize },
        subcategories: [{ title: { fi: "Lista", ...tList }, items: [] }],
      },
    ];
    patchCategory(ci, { sizeCategories: sizes });
    setSizeTab(String(sizes.length - 1));
  };

  const addSub = async (ci: number, si: number) => {
    const cat = localCategories[ci];
    const t = await translateFiToEnSv("Uusi lista").catch(() => ({ en: "New list", sv: "Ny lista" }));
    const sizes = [...cat.sizeCategories];
    const subs = [...sizes[si].subcategories, { title: { fi: "Uusi lista", ...t }, items: [] }];
    sizes[si] = { ...sizes[si], subcategories: subs };
    patchCategory(ci, { sizeCategories: sizes });
  };

  /** Julkaistu näkymä: tallennettu asetus + tallennetut kategoriat (ei pelkkä luonnos). */
  const publishedMenuLive = config.useCustomMenu && config.categories.length > 0;
  const needsImport = categories.length === 0;

  const ci = Math.min(parseInt(catTab, 10) || 0, Math.max(0, categories.length - 1));
  const activeCat = categories[ci];

  return (
    <div className="mx-auto max-w-3xl space-y-8 pb-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Sivusto & ruokalista</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Avaa kentät <strong className="font-medium text-foreground">Muokkaa</strong>-painikkeesta.{" "}
          <strong className="font-medium text-foreground">Julkaise</strong> tallentaa luonnoksen ja näyttää sen /menu-sivulla
          (tämä selain).
        </p>
      </div>

      {needsImport && (
        <div className="flex flex-col gap-3 rounded-lg border border-amber-500/40 bg-amber-50/70 p-4 dark:bg-amber-950/20 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2 text-sm text-amber-950 dark:text-amber-100">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
            <span>
              Lataa lista käännöksistä muokattavaksi, julkaise kun valmista.
            </span>
          </p>
          <Button type="button" size="lg" className="touch-manipulation shrink-0 font-semibold" onClick={loadFromTranslations}>
            <Download className="mr-2 h-5 w-5" />
            Aloita muokkaus
          </Button>
        </div>
      )}

      {categories.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Ei ryhmiä. Lataa lista yllä tai lisää ryhmä käsin.
        </p>
      )}

      {categories.length > 0 && activeCat && (
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <ListTree className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                <span className="text-sm font-medium text-foreground">Ruokalista</span>
                {hasUnsavedMenuChanges ? (
                  <Badge variant="secondary" className="font-normal text-amber-900 dark:text-amber-100">
                    Luonnos
                  </Badge>
                ) : publishedMenuLive ? (
                  <Badge variant="outline" className="border-green-700/30 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100">
                    Julkaistu
                  </Badge>
                ) : null}
              </div>
              <p className="text-xs text-muted-foreground">
                Kentät ovat lukittuja, kunnes painat Muokkaa. Julkaise päivittää julkisen /menu-näkymän.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:shrink-0 sm:justify-end">
              <Button type="button" variant="outline" size="sm" className="touch-manipulation" onClick={addCategory}>
                <Plus className="mr-2 h-4 w-4" />
                Lisää ryhmä
              </Button>
              <Button
                type="button"
                variant="outline"
                className="touch-manipulation"
                disabled={!hasUnsavedMenuChanges}
                onClick={discardMenuChanges}
              >
                Hylkää
              </Button>
              <Button type="button" className="touch-manipulation font-semibold" onClick={publishMenu}>
                <Rocket className="mr-2 h-4 w-4" />
                Julkaise
              </Button>
            </div>
          </div>

          <Tabs value={catTab} onValueChange={setCatTab} className="w-full">
            <Card className="overflow-hidden rounded-xl border-2 border-primary/25 bg-card shadow-md ring-1 ring-black/[0.04] dark:border-primary/30 dark:bg-card/95 dark:ring-white/10">
              <CardHeader className="space-y-3 border-b border-border/80 bg-muted/10 px-3 py-4 sm:px-6">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-primary/15">
                    <ListTree className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold leading-none text-foreground">Valitse kategoria</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Klikkaa välilehteä — sama kortti jatkuu alla.
                    </p>
                  </div>
                </div>
                <AdminDirtyField
                  path="categories-structure"
                  dirtyPaths={dirtyPaths}
                  className="overflow-x-auto rounded-xl pb-0.5 [-webkit-overflow-scrolling:touch]"
                >
                  <TabsList className="inline-flex h-auto min-h-[3.25rem] w-max max-w-full flex-wrap justify-start gap-2 rounded-xl bg-muted/70 p-2 shadow-inner dark:bg-muted/50">
                    {categories.map((cat, i) => (
                      <TabsTrigger
                        key={cat.id}
                        value={String(i)}
                        className={cn(
                          "min-h-11 shrink-0 rounded-lg border border-transparent px-4 py-2.5 text-sm font-semibold transition-all",
                          "text-muted-foreground hover:border-border hover:bg-background/80 hover:text-foreground",
                          "data-[state=active]:border-primary/35 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md",
                          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        )}
                      >
                        {cat.title.fi?.trim() || `Ryhmä ${i + 1}`}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </AdminDirtyField>

                <AdminDirtyField path={`c${ci}-title`} dirtyPaths={dirtyPaths} className="rounded-lg">
                  <div className="flex flex-col gap-3 border-t border-border/70 pt-4 sm:flex-row sm:items-end sm:gap-3">
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <Label htmlFor={`active-cat-title-fi-${ci}`} className="text-xs font-medium text-muted-foreground">
                        Ryhmän nimi (välilehti)
                      </Label>
                      <Input
                        id={`active-cat-title-fi-${ci}`}
                        value={activeCat.title.fi}
                        onChange={(e) =>
                          patchCategory(ci, { title: { ...activeCat.title, fi: e.target.value } })
                        }
                        placeholder="Esim. Pizzat"
                        className="h-10"
                        autoComplete="off"
                        aria-describedby={`active-cat-title-hint-${ci}`}
                      />
                      <p id={`active-cat-title-hint-${ci}`} className="text-[11px] leading-snug text-muted-foreground">
                        Päivittää välilehden ja otsikon suomenkielisen nimen. Käännökset: kohdan 1 Muokkaa.
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 shrink-0 touch-manipulation border-destructive/40 text-destructive hover:bg-destructive/10 sm:min-w-[9.5rem]"
                      onClick={() => setDeleteIntent({ type: "category", ci })}
                    >
                      <Trash2 className="mr-2 h-4 w-4 shrink-0" aria-hidden />
                      Poista ryhmä
                    </Button>
                  </div>
                </AdminDirtyField>
              </CardHeader>

            {categories.map((cat, catIndex) => {
              const si = Math.min(
                parseInt(sizeTab, 10) || 0,
                Math.max(0, cat.sizeCategories.length - 1),
              );
              const sc = cat.sizeCategories[si];
              const mergePizzaBaseBlock =
                sc && shouldMergePizzaBaseBlockStored(cat.id === "pizza", sc.subcategories ?? []);

              return (
                <TabsContent key={cat.id} value={String(catIndex)} className="mt-0 space-y-0 focus-visible:outline-none">
                  <CardContent className="space-y-8 px-4 pb-8 pt-6 sm:px-6">
                      <p className="-mt-1 border-b border-border/60 pb-4 text-sm text-muted-foreground">
                        Muokkaat:{" "}
                        <span className="font-semibold text-foreground">{cat.title.fi?.trim() || cat.id}</span>
                        <span className="hidden sm:inline"> · Vaiheet 1–3, ryhmän poisto myös yllä tai lisäasetuksista</span>
                      </p>
                      {/* 1 */}
                      <section className="space-y-4" aria-labelledby={`step1-${cat.id}`}>
                        <div>
                          <h2 id={`step1-${cat.id}`} className="text-lg font-semibold tracking-tight">
                            1. Nimi ja kuvaus
                          </h2>
                          <p className="text-sm text-muted-foreground">Näkyvät valintaruudussa ja ruokalistan otsikossa.</p>
                        </div>
                        <AdminDirtyField path={`c${catIndex}-title`} dirtyPaths={dirtyPaths}>
                          <EditableFieldBlock label="Otsikko (suomi)" preview={cat.title.fi}>
                            <FiOnlyLocalizedInput
                              label="Otsikko (suomi)"
                              value={cat.title}
                              onCommit={(title) => patchCategory(catIndex, { title })}
                            />
                          </EditableFieldBlock>
                        </AdminDirtyField>
                        <AdminDirtyField path={`c${catIndex}-desc`} dirtyPaths={dirtyPaths}>
                          <EditableFieldBlock label="Kuvaus (suomi)" preview={cat.description.fi}>
                            <FiOnlyLocalizedTextarea
                              label="Kuvaus (suomi)"
                              value={cat.description}
                              onCommit={(description) => patchCategory(catIndex, { description })}
                              rows={3}
                            />
                          </EditableFieldBlock>
                        </AdminDirtyField>
                      </section>

                      <Separator />

                      {/* 2 */}
                      <section className="space-y-4" aria-labelledby={`step2-${cat.id}`}>
                        <div>
                          <h2 id={`step2-${cat.id}`} className="text-lg font-semibold tracking-tight">
                            2. Valitse osio
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Suuret listat on jaettu osioihin (esim. eri pizzatyypit). Valitse yksi kerrallaan.
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {cat.sizeCategories.map((s, idx) => (
                            <Button
                              key={`${cat.id}-szbtn-${idx}`}
                              type="button"
                              variant={si === idx ? "default" : "outline"}
                              size="lg"
                              className="min-h-12 touch-manipulation px-4"
                              onClick={() => setSizeTab(String(idx))}
                            >
                              {s.size.fi?.trim() || `Osio ${idx + 1}`}
                            </Button>
                          ))}
                          <Button
                            type="button"
                            variant="secondary"
                            size="lg"
                            className="min-h-12 touch-manipulation"
                            onClick={() => addSize(catIndex)}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Uusi osio
                          </Button>
                        </div>
                        {cat.sizeCategories.length === 0 && (
                          <p className="text-sm text-amber-800 dark:text-amber-200">
                            Ei vielä osioita — paina &quot;Uusi osio&quot;.
                          </p>
                        )}
                      </section>

                      {sc && (
                        <>
                          <Separator />

                          <section className="space-y-5" aria-labelledby={`step3-${cat.id}`}>
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                              <div>
                                <h2 id={`step3-${cat.id}`} className="text-lg font-semibold tracking-tight">
                                  3. Osion nimi ja hinnat
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                  Muokkaa välilehden nimeä tarvittaessa. Alla: yksi tai useampi lista (esim. eri hintaryhmät).
                                </p>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="shrink-0 text-destructive"
                                onClick={() => setDeleteIntent({ type: "size", ci: catIndex, si })}
                              >
                                <Trash2 className="mr-1 h-4 w-4" />
                                Poista tämä osio
                              </Button>
                            </div>

                            <AdminDirtyField path={`c${catIndex}-s${si}-name`} dirtyPaths={dirtyPaths}>
                              <EditableFieldBlock label="Osion nimi (suomi)" preview={sc.size.fi}>
                                <FiOnlyLocalizedInput
                                  label="Osion nimi (suomi)"
                                  value={sc.size}
                                  onCommit={(size) => patchSize(catIndex, si, { size })}
                                />
                              </EditableFieldBlock>
                            </AdminDirtyField>

                            <div className="space-y-4">
                              <h3 className="text-base font-semibold">Listat ja annokset</h3>
                              {mergePizzaBaseBlock && (
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2 text-base font-semibold tracking-tight">
                                    <span
                                      className="h-5 w-1 shrink-0 rounded-full bg-gradient-to-b from-orient-red to-orient-yellow shadow-sm"
                                      aria-hidden
                                    />
                                    {t("pizzaBaseOptionsHeading")}
                                  </div>
                                  <Card className="overflow-hidden border-2 border-primary/15 bg-muted/10">
                                    {[0, 1, 2].map((ki) => {
                                      const sub = sc.subcategories[ki];
                                      return (
                                        <div
                                          key={`${cat.id}-${si}-base-${ki}`}
                                          className="border-b border-border/50 bg-muted/20 last:border-b-0"
                                        >
                                          <div className="flex justify-end px-4 pb-2 pt-4 sm:px-5">
                                            <Button
                                              type="button"
                                              variant="ghost"
                                              size="icon"
                                              className="text-destructive"
                                              onClick={() => setDeleteIntent({ type: "sub", ci: catIndex, si, ki })}
                                              aria-label="Poista tämä pohjavaihtoehto"
                                            >
                                              <Trash2 className="h-4 w-4" />
                                            </Button>
                                          </div>
                                          <CardContent className="space-y-4 px-4 pb-4 pt-0 sm:px-5">
                                            <AdminDirtyField path={`c${catIndex}-s${si}-k${ki}-title`} dirtyPaths={dirtyPaths}>
                                              <EditableFieldBlock
                                                label="Listan otsikko (suomi)"
                                                description="Avaa muokataksesi nimeä ja hintaa erikseen."
                                                preview={sub.title.fi}
                                              >
                                                <FiOnlyLocalizedTitlePriceSplit
                                                  label="Listan otsikko (suomi)"
                                                  nameId={`pizza-base-title-${cat.id}-${si}-${ki}-name`}
                                                  priceId={`pizza-base-title-${cat.id}-${si}-${ki}-price`}
                                                  value={sub.title}
                                                  onCommit={(title) => patchSub(catIndex, si, ki, { title })}
                                                />
                                              </EditableFieldBlock>
                                            </AdminDirtyField>
                                          </CardContent>
                                        </div>
                                      );
                                    })}
                                    <div className="border-t border-border/60 bg-muted/25 px-4 py-4 sm:px-5">
                                      <p className="mb-3 text-xs text-muted-foreground">
                                        Yhteinen selite näkyy kerran ruokalistalla kaikkien kolmen pohjan alla. Tallennus päivittää
                                        kaikkien kolmen listan saman tekstin (suomi → en/sv).
                                      </p>
                                      <AdminDirtyField
                                        path={`c${catIndex}-s${si}-pizza-base-merged`}
                                        dirtyPaths={dirtyPaths}
                                      >
                                        <EditableFieldBlock
                                          label="Yhteinen selite (suomi)"
                                          preview={mergedItemsAsOneField(sc.subcategories[0]?.items ?? []).fi}
                                        >
                                          <FiOnlyLocalizedTextarea
                                            label="Yhteinen selite (suomi)"
                                            rows={4}
                                            value={mergedItemsAsOneField(sc.subcategories[0]?.items ?? [])}
                                            onCommit={(next) => {
                                              const items: LocalizedString[] =
                                                next.fi.trim() === "" && next.en.trim() === "" && next.sv.trim() === ""
                                                  ? []
                                                  : [next];
                                              const cat = categories[catIndex];
                                              const sizes = [...cat.sizeCategories];
                                              const subs = [...sizes[si].subcategories];
                                              for (let i = 0; i < 3; i++) {
                                                subs[i] = { ...subs[i], items };
                                              }
                                              sizes[si] = { ...sizes[si], subcategories: subs };
                                              patchCategory(catIndex, { sizeCategories: sizes });
                                              markDirty(`c${catIndex}-s${si}-pizza-base-merged`);
                                            }}
                                          />
                                        </EditableFieldBlock>
                                      </AdminDirtyField>
                                    </div>
                                  </Card>
                                </div>
                              )}
                              {sc.subcategories.slice(mergePizzaBaseBlock ? 3 : 0).map((sub, idx) => {
                                const ki = mergePizzaBaseBlock ? idx + 3 : idx;
                                return (
                                  <Card key={`${cat.id}-${si}-${ki}`} className="border bg-muted/20">
                                    <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2 pt-4">
                                      <CardTitle className="text-base font-medium">Lista {ki + 1}</CardTitle>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive"
                                        onClick={() => setDeleteIntent({ type: "sub", ci: catIndex, si, ki })}
                                        aria-label="Poista lista"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </CardHeader>
                                    <CardContent className="space-y-4 pb-6">
                                      <AdminDirtyField path={`c${catIndex}-s${si}-k${ki}-title`} dirtyPaths={dirtyPaths}>
                                        <EditableFieldBlock label="Listan otsikko (suomi)" preview={sub.title.fi}>
                                          <FiOnlyLocalizedInput
                                            label="Listan otsikko (suomi)"
                                            value={sub.title}
                                            onCommit={(title) => patchSub(catIndex, si, ki, { title })}
                                          />
                                        </EditableFieldBlock>
                                      </AdminDirtyField>
                                      <AdminDirtyField path={`c${catIndex}-s${si}-k${ki}-items`} dirtyPaths={dirtyPaths}>
                                        <SubcategoryItemsEditor
                                          sub={sub}
                                          onItemsChange={(items) => patchSub(catIndex, si, ki, { items })}
                                        />
                                      </AdminDirtyField>
                                    </CardContent>
                                  </Card>
                                );
                              })}
                              <Button type="button" variant="secondary" className="w-full touch-manipulation sm:w-auto" onClick={() => addSub(catIndex, si)}>
                                <Plus className="mr-2 h-4 w-4" />
                                Lisää uusi lista tähän osioon
                              </Button>
                            </div>
                          </section>
                        </>
                      )}

                      <Collapsible className="group rounded-xl border border-dashed">
                        <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-medium hover:bg-muted/40">
                          <span className="flex items-center gap-2">
                            <Settings2 className="h-4 w-4" aria-hidden />
                            Lisäasetukset (tunniste, kuva, poista ryhmä)
                          </span>
                          <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-4 px-4 pb-4 pt-0">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <AdminDirtyField path={`c${catIndex}-id`} dirtyPaths={dirtyPaths}>
                              <EditableFieldBlock label="Tekninen tunniste (id)" preview={cat.id}>
                                <div className="space-y-2">
                                  <Label>Tekninen tunniste (id)</Label>
                                  <Input
                                    value={cat.id}
                                    onChange={(e) => patchCategory(catIndex, { id: e.target.value })}
                                    className="font-mono text-sm"
                                  />
                                </div>
                              </EditableFieldBlock>
                            </AdminDirtyField>
                            <AdminDirtyField path={`c${catIndex}-image`} dirtyPaths={dirtyPaths}>
                              <EditableFieldBlock
                                label="Kuva valikossa"
                                preview={`${imageIdLabel(cat.imageId)} (${cat.imageId})`}
                              >
                                <div className="space-y-2">
                                  <Label>Kuva valikossa</Label>
                                  <Select
                                    value={cat.imageId}
                                    onValueChange={(v) => patchCategory(catIndex, { imageId: v as StoredMenuCategory["imageId"] })}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pizza">Pizza</SelectItem>
                                      <SelectItem value="kids">Lasten menu</SelectItem>
                                      <SelectItem value="dishes">Annokset</SelectItem>
                                      <SelectItem value="drinks">Juomat</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </EditableFieldBlock>
                            </AdminDirtyField>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => setDeleteIntent({ type: "category", ci: catIndex })}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Poista koko tämä ryhmä
                          </Button>
                        </CollapsibleContent>
                      </Collapsible>
                  </CardContent>
                </TabsContent>
              );
            })}
            </Card>
          </Tabs>
        </div>
      )}

      <AlertDialog open={deleteIntent !== null} onOpenChange={(open) => !open && setDeleteIntent(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{deleteDialogCopy.title}</AlertDialogTitle>
            <AlertDialogDescription>{deleteDialogCopy.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Peruuta</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={executeDelete}
            >
              Poista
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminMenuPage;
