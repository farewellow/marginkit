import type { ComponentType } from "react";
import Link from "next/link";
import { ArrowRight, BookOpenText, Boxes, ShipWheel, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { GuideDefinition } from "@/types/guides";

interface GuideCardProps {
  guide: GuideDefinition;
  compact?: boolean;
}

const workflowStyles: Record<
  GuideDefinition["workflow"],
  { label: string; icon: ComponentType<{ className?: string }>; tone: string }
> = {
  "import-cost": {
    label: "Import cost",
    icon: ShipWheel,
    tone: "from-sky-500/15 to-cyan-500/5 border-sky-200"
  },
  "profit-margin": {
    label: "Profit & margin",
    icon: TrendingUp,
    tone: "from-emerald-500/15 to-teal-500/5 border-emerald-200"
  },
  "inventory-planning": {
    label: "Inventory planning",
    icon: Boxes,
    tone: "from-amber-500/15 to-orange-500/5 border-amber-200"
  }
};

export function GuideCard({ guide, compact = false }: GuideCardProps) {
  const style = workflowStyles[guide.workflow];
  const Icon = style.icon;

  return (
    <Card className="relative h-full overflow-hidden border-border/85 shadow-none transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className={cn("absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r", style.tone)} />
      <CardHeader className={cn("space-y-3 p-5", compact && "p-4")}>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="border border-border bg-muted/70">
            <Icon className="mr-1.5 h-3.5 w-3.5" />
            {style.label}
          </Badge>
          <Badge className="border border-primary/10 bg-primary/10 text-primary">
            <BookOpenText className="mr-1.5 h-3.5 w-3.5" />
            Guide
          </Badge>
        </div>

        <CardTitle className={cn("text-lg leading-snug", compact && "text-base")}>{guide.title}</CardTitle>
      </CardHeader>

      <CardContent className={cn("space-y-3 p-5 pt-0", compact && "space-y-2.5 p-4 pt-0")}>
        <p className="text-sm text-muted-foreground">{guide.shortDescription}</p>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Practical angle:</span> {guide.practicalAngle}
        </p>
        {!compact ? (
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Helps with:</span> {guide.helpsWith}
          </p>
        ) : null}

        {!compact ? (
          <div className="rounded-xl border bg-background/70 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Use with calculators</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {guide.relatedTools.map((tool) => (
                <Link key={tool.href} href={tool.href} className="text-xs text-primary hover:text-primary/80">
                  {tool.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <Link href={guide.href} className="inline-flex items-center text-sm font-medium text-primary">
          Read guide <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
