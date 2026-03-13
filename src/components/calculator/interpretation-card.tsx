import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface InterpretationItem {
  label: string;
  description: string;
  tone?: "default" | "success" | "warning" | "danger";
}

interface InterpretationCardProps {
  interpretation: InterpretationItem;
}

const toneStyles: Record<NonNullable<InterpretationItem["tone"]>, string> = {
  default: "border-border bg-card",
  success: "border-emerald-200 bg-emerald-50/70",
  warning: "border-amber-200 bg-amber-50/70",
  danger: "border-rose-200 bg-rose-50/75"
};

export function InterpretationCard({ interpretation }: InterpretationCardProps) {
  const tone = interpretation.tone ?? "default";

  return (
    <Card className={cn("shadow-none", toneStyles[tone])}>
      <CardContent className="space-y-2 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Interpretation</p>
        <p className="text-base font-semibold tracking-tight">{interpretation.label}</p>
        <p className="text-sm text-muted-foreground">{interpretation.description}</p>
      </CardContent>
    </Card>
  );
}
