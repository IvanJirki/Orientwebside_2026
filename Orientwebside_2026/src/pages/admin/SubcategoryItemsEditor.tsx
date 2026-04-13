import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { translateFiLinesToItems } from "@/lib/autoTranslate";
import { joinDishLineForEditor, splitDishLineForEditor } from "@/lib/menuSubcategoryUtils";
import type { LocalizedString, StoredSubcategory } from "@/types/siteConfig";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

function itemsToFiLine(items: LocalizedString[]): string {
  return items.map((i) => i.fi).join("\n");
}

function fiLinesToRows(fi: string): { name: string; price: string }[] {
  const lines = fi.split("\n");
  if (lines.length === 0 || (lines.length === 1 && !lines[0].trim())) {
    return [{ name: "", price: "" }];
  }
  return lines.map((line) => {
    const t = line.trim();
    if (!t) return { name: "", price: "" };
    return splitDishLineForEditor(t);
  });
}

export function SubcategoryItemsEditor({
  sub,
  onItemsChange,
}: {
  sub: StoredSubcategory;
  onItemsChange: (items: LocalizedString[]) => void;
}) {
  const [rows, setRows] = useState<{ name: string; price: string }[]>([{ name: "", price: "" }]);
  const [translating, setTranslating] = useState(false);
  const [editing, setEditing] = useState(false);

  const serialized = JSON.stringify(sub.items);
  useEffect(() => {
    setRows(fiLinesToRows(itemsToFiLine(sub.items)));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync only when saved items change
  }, [serialized]);

  const commit = async (sourceRows?: { name: string; price: string }[]) => {
    const source = sourceRows ?? rows;
    const fi = source
      .map((r) => joinDishLineForEditor(r.name, r.price))
      .map((l) => l.trim())
      .filter(Boolean)
      .join("\n");
    const currentFi = itemsToFiLine(sub.items);
    if (fi.trim() === currentFi.trim()) return;
    const tid = toast.loading("Käännetään annoksia riveittäin…");
    setTranslating(true);
    try {
      const items = await translateFiLinesToItems(fi);
      onItemsChange(items);
      toast.success("Käännökset tallennettu", { id: tid });
    } catch {
      const lines = fi
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      onItemsChange(lines.map((l) => ({ fi: l, en: l, sv: l })));
      toast.error("Käännös epäonnistui — käytetään suomea kaikilla kielillä.", { id: tid });
    } finally {
      setTranslating(false);
    }
  };

  const updateRow = (index: number, patch: Partial<{ name: string; price: string }>) => {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  };

  const addRow = () => {
    setRows((prev) => [...prev, { name: "", price: "" }]);
  };

  const removeRow = (index: number) => {
    const next = rows.filter((_, j) => j !== index);
    const normalized = next.length ? next : [{ name: "", price: "" }];
    setRows(normalized);
    void commit(normalized);
  };

  const finishEditing = () => {
    const ae = document.activeElement;
    if (ae instanceof HTMLElement) ae.blur();
    window.setTimeout(() => {
      void commit();
      setEditing(false);
    }, 120);
  };

  const readOnly = !editing;

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Label className="text-base font-semibold">Annokset ja hinnat (kirjoita suomeksi)</Label>
            <p className="text-xs text-muted-foreground">
              Nimi ja hinta ovat eri kentissä; tallennus yhdistää ne muodossa &quot;nimi - hinta&quot;. Poistu kentästä (tai
              poista rivi) tallentaaksesi — käännökset päivittyvät. Esimerkki: nimi{" "}
              <code className="rounded bg-muted px-1">ORIENT - kinkku, salami</code>, hinta{" "}
              <code className="rounded bg-muted px-1">11,00€</code>
            </p>
          </div>
          {readOnly ? (
            <Button type="button" size="sm" variant="secondary" className="shrink-0 gap-1.5 sm:self-start" onClick={() => setEditing(true)}>
              <Pencil className="h-3.5 w-3.5" aria-hidden />
              Muokkaa
            </Button>
          ) : (
            <Button type="button" size="sm" variant="outline" className="shrink-0 sm:self-start" onClick={finishEditing}>
              Valmis
            </Button>
          )}
        </div>
        <div className="relative space-y-2">
          {rows.map((row, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 rounded-lg border border-border/80 bg-muted/15 p-2 shadow-sm transition-colors focus-within:border-ring/50 focus-within:bg-background sm:flex-row sm:items-stretch"
            >
              <div
                className="flex h-9 min-w-[2.25rem] shrink-0 select-none items-center justify-center self-start rounded-md bg-muted/80 text-xs font-semibold tabular-nums text-muted-foreground sm:self-stretch sm:pt-2"
                aria-hidden
              >
                {index + 1}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-stretch">
                <div className="min-w-0 flex-1 space-y-1">
                  <Label className="text-[11px] font-medium text-muted-foreground">Annoksen nimi ja täytteet</Label>
                  <Textarea
                    rows={2}
                    readOnly={readOnly}
                    className="min-h-[3.25rem] w-full resize-none font-mono text-sm leading-relaxed read-only:cursor-default read-only:bg-muted/40"
                    value={row.name}
                    onChange={(e) => updateRow(index, { name: e.target.value })}
                    onBlur={() => void commit()}
                    disabled={translating}
                    placeholder='Esim. ORIENT - kinkku, salami'
                  />
                </div>
                <div className="w-full shrink-0 space-y-1 sm:w-[7.5rem]">
                  <Label className="text-[11px] font-medium text-muted-foreground">Hinta</Label>
                  <Input
                    type="text"
                    inputMode="decimal"
                    readOnly={readOnly}
                    className="h-[3.25rem] font-mono text-sm tabular-nums read-only:cursor-default read-only:bg-muted/40"
                    value={row.price}
                    onChange={(e) => updateRow(index, { price: e.target.value })}
                    onBlur={() => void commit()}
                    disabled={translating}
                    placeholder="11,00€"
                    autoComplete="off"
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 shrink-0 self-end text-muted-foreground hover:text-destructive sm:self-start"
                disabled={readOnly || translating || (rows.length === 1 && !row.name.trim() && !row.price.trim())}
                aria-label={`Poista annos ${index + 1}`}
                onClick={() => removeRow(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {translating && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-md bg-background/60">
              <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden />
            </div>
          )}
        </div>
        <Button type="button" variant="outline" size="sm" className="w-full sm:w-auto" onClick={addRow} disabled={readOnly || translating}>
          <Plus className="mr-2 h-4 w-4" />
          Lisää annos
        </Button>
      </div>
    </div>
  );
}
