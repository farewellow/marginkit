import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "success" | "warning" | "danger";
  suffix?: ReactNode;
}

const toneStyles: Record<NonNullable<MetricCardProps["tone"]>, string> = {
  default: "",
  success: "border-emerald-200 bg-emerald-50/65",
  warning: "border-amber-200 bg-amber-50/70",
  danger: "border-rose-200 bg-rose-50/75"
};

export function MetricCard({ label, value, hint, tone = "default", suffix }: MetricCardProps) {
  const hintVariant = tone === "success" ? "success" : tone === "warning" ? "warning" : tone === "danger" ? "danger" : "secondary";
  const showHint = Boolean(hint && hint !== value);

  return (
    <Card data-metric-card className={cn("shadow-none transition-colors first-of-type:sm:col-span-2", toneStyles[tone])}>
      <CardContent className="space-y-2.5 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
        <p data-metric-value className="text-2xl font-semibold leading-tight tracking-tight">
          {value}
        </p>

        {suffix ? <div className="text-xs text-muted-foreground">{suffix}</div> : null}

        {showHint ? (
          <Badge variant={hintVariant} className="w-fit px-2 py-1 text-[11px] font-medium">
            {hint}
          </Badge>
        ) : null}
      </CardContent>
    </Card>
  );
}
