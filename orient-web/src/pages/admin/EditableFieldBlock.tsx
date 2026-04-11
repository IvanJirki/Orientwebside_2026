import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";

type EditableFieldBlockProps = {
  label: string;
  description?: string;
  /** Finnish (or plain) text shown when not editing */
  preview: string;
  children: ReactNode;
  className?: string;
  /** Scroll long previews (e.g. dish lists) */
  previewScroll?: boolean;
};

/**
 * Kenttä näytetään vain luku -tilassa, kunnes käyttäjä painaa Muokkaa.
 * Valmis sulkee editorin (blur ensin, jotta FiOnly-kentät ehtivät tallentua).
 */
export function EditableFieldBlock({
  label,
  description,
  preview,
  children,
  className,
  previewScroll,
}: EditableFieldBlockProps) {
  const [open, setOpen] = useState(false);

  const close = () => {
    const ae = document.activeElement;
    if (ae instanceof HTMLElement) ae.blur();
    window.setTimeout(() => setOpen(false), 150);
  };

  const shown = preview.trim() || "—";

  if (!open) {
    return (
      <div className={cn("rounded-lg border border-border/80 bg-muted/25 p-3", className)}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-1">
            <p className="text-sm font-medium text-foreground">{label}</p>
            {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
            <div
              className={cn(
                "mt-2 whitespace-pre-wrap break-words text-sm text-foreground",
                previewScroll && "max-h-48 overflow-y-auto rounded-md border border-border/50 bg-background/50 p-2 font-mono text-xs",
              )}
            >
              {shown}
            </div>
          </div>
          <Button type="button" size="sm" variant="secondary" className="shrink-0 gap-1.5" onClick={() => setOpen(true)}>
            <Pencil className="h-3.5 w-3.5" aria-hidden />
            Muokkaa
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-lg border border-primary/35 bg-background p-3 shadow-sm ring-1 ring-primary/15",
        className,
      )}
    >
      <div className="mb-3 flex justify-end">
        <Button type="button" size="sm" variant="outline" onClick={close}>
          Valmis
        </Button>
      </div>
      {children}
    </div>
  );
}
