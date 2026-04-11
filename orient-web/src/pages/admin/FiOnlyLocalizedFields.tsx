import { useEffect, useState, type ComponentProps } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { translateFiParagraph, translateFiToEnSv } from "@/lib/autoTranslate";
import { joinDishLineForEditor, splitDishLineForEditor } from "@/lib/menuSubcategoryUtils";
import type { LocalizedString } from "@/types/siteConfig";
import { toast } from "sonner";

type InputProps = Omit<ComponentProps<typeof Input>, "value" | "onChange">;
type TextareaProps = Omit<ComponentProps<typeof Textarea>, "value" | "onChange">;

export function FiOnlyLocalizedInput({
  label,
  value,
  onCommit,
  id,
  ...rest
}: {
  label: string;
  value: LocalizedString;
  onCommit: (next: LocalizedString) => void;
  id?: string;
} & InputProps) {
  const [fi, setFi] = useState(value.fi);
  useEffect(() => setFi(value.fi), [value.fi]);

  const handleBlur = async () => {
    if (fi.trim() === value.fi.trim()) return;
    const tid = toast.loading("Käännetään englanniksi ja ruotsiksi…");
    try {
      if (!fi.trim()) {
        onCommit({ fi: "", en: "", sv: "" });
        toast.dismiss(tid);
        return;
      }
      const { en, sv } = await translateFiToEnSv(fi);
      onCommit({ fi, en, sv });
      toast.success("Käännös tallennettu", { id: tid });
    } catch {
      onCommit({ fi, en: fi, sv: fi });
      toast.error("Käännös epäonnistui — käytetään suomea myös muilla kielillä.", { id: tid });
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} value={fi} onChange={(e) => setFi(e.target.value)} onBlur={handleBlur} {...rest} />
    </div>
  );
}

/**
 * Yksi suomenkielinen otsikkorivi pilkottuna nimi + hinta (tallennetaan muodossa "nimi - 12,00€").
 * Käännös tehdään yhdistetystä tekstistä kuten FiOnlyLocalizedInput.
 */
export function FiOnlyLocalizedTitlePriceSplit({
  label,
  value,
  onCommit,
  nameId,
  priceId,
  ...rest
}: {
  label: string;
  value: LocalizedString;
  onCommit: (next: LocalizedString) => void;
  nameId?: string;
  priceId?: string;
} & Omit<InputProps, "id" | "value" | "onChange">) {
  const split = splitDishLineForEditor(value.fi);
  const [fiName, setFiName] = useState(split.name);
  const [fiPrice, setFiPrice] = useState(split.price);

  useEffect(() => {
    const s = splitDishLineForEditor(value.fi);
    setFiName(s.name);
    setFiPrice(s.price);
  }, [value.fi]);

  const handleBlur = async () => {
    const combined = joinDishLineForEditor(fiName, fiPrice);
    if (combined.trim() === value.fi.trim()) return;
    const tid = toast.loading("Käännetään englanniksi ja ruotsiksi…");
    try {
      if (!combined.trim()) {
        onCommit({ fi: "", en: "", sv: "" });
        toast.dismiss(tid);
        return;
      }
      const { en, sv } = await translateFiToEnSv(combined);
      onCommit({ fi: combined, en, sv });
      toast.success("Käännös tallennettu", { id: tid });
    } catch {
      onCommit({ fi: combined, en: combined, sv: combined });
      toast.error("Käännös epäonnistui — käytetään suomea myös muilla kielillä.", { id: tid });
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <p className="text-xs text-muted-foreground">
        Nimi ja hinta eri kentissä; tallennus yhdistää ne samaan muotoon kuin ruokalistalla.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <div className="min-w-0 flex-1 space-y-1">
          <Label htmlFor={nameId} className="text-[11px] font-medium text-muted-foreground">
            Nimi
          </Label>
          <Input
            id={nameId}
            value={fiName}
            onChange={(e) => setFiName(e.target.value)}
            onBlur={handleBlur}
            placeholder="Esim. Pannu / Gluteeniton"
            className="font-mono text-sm"
            {...rest}
          />
        </div>
        <div className="w-full shrink-0 space-y-1 sm:w-[7.5rem]">
          <Label htmlFor={priceId} className="text-[11px] font-medium text-muted-foreground">
            Hinta
          </Label>
          <Input
            id={priceId}
            value={fiPrice}
            inputMode="decimal"
            onChange={(e) => setFiPrice(e.target.value)}
            onBlur={handleBlur}
            placeholder="14,00€"
            className="font-mono text-sm tabular-nums"
            autoComplete="off"
            {...rest}
          />
        </div>
      </div>
    </div>
  );
}

export function FiOnlyLocalizedTextarea({
  label,
  value,
  onCommit,
  id,
  ...rest
}: {
  label: string;
  value: LocalizedString;
  onCommit: (next: LocalizedString) => void;
  id?: string;
} & TextareaProps) {
  const [fi, setFi] = useState(value.fi);
  useEffect(() => setFi(value.fi), [value.fi]);

  const handleBlur = async () => {
    if (fi.trim() === value.fi.trim()) return;
    const tid = toast.loading("Käännetään englanniksi ja ruotsiksi…");
    try {
      if (!fi.trim()) {
        onCommit({ fi: "", en: "", sv: "" });
        toast.dismiss(tid);
        return;
      }
      const { en, sv } = await translateFiParagraph(fi);
      onCommit({ fi, en, sv });
      toast.success("Käännös tallennettu", { id: tid });
    } catch {
      onCommit({ fi, en: fi, sv: fi });
      toast.error("Käännös epäonnistui — käytetään suomea myös muilla kielillä.", { id: tid });
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea id={id} value={fi} onChange={(e) => setFi(e.target.value)} onBlur={handleBlur} {...rest} />
    </div>
  );
}
