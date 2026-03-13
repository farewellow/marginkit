"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { ArrowRight, Boxes, ShipWheel, Store, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { ToolDefinition } from "@/types/tools";

interface ToolCardProps {
  tool: ToolDefinition;
}

const categoryStyles: Record<
  ToolDefinition["category"],
  { icon: ComponentType<{ className?: string }>; tone: string; chip: string }
> = {
  "import-cost": {
    icon: ShipWheel,
    tone: "from-sky-500/15 to-cyan-500/5 border-sky-200",
    chip: "Import cost"
  },
  "profit-margin": {
    icon: TrendingUp,
    tone: "from-emerald-500/15 to-teal-500/5 border-emerald-200",
    chip: "Profit & margin"
  },
  "inventory-planning": {
    icon: Boxes,
    tone: "from-amber-500/15 to-orange-500/5 border-amber-200",
    chip: "Inventory"
  },
  "marketplace-seller": {
    icon: Store,
    tone: "from-indigo-500/15 to-blue-500/5 border-indigo-200",
    chip: "Marketplace"
  }
};

export function ToolCard({ tool }: ToolCardProps) {
  const style = categoryStyles[tool.category];
  const Icon = style.icon;

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group block h-full"
      onClick={() => trackEvent("related_tool_clicked", { tool_slug: tool.slug, source_category: tool.category })}
    >
      <Card className="relative h-full overflow-hidden border-border/85 transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
        <div className={cn("absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r", style.tone)} />
        <CardHeader className="p-5 pb-3">
          <div className="flex items-center justify-between gap-2">
            <Badge variant="secondary" className="border border-border bg-muted/70">
              <Icon className="mr-1.5 h-3.5 w-3.5" />
              {style.chip}
            </Badge>
            {tool.featured ? <Badge className="border border-primary/10 bg-primary/10 text-primary">Featured</Badge> : null}
          </div>
          <CardTitle className="mt-1 line-clamp-2 text-lg leading-snug group-hover:text-primary">{tool.title}</CardTitle>
          <CardDescription className="line-clamp-2 text-sm">{tool.shortDescription}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between p-5 pt-0 text-sm">
          <span className="font-medium text-primary">Open calculator</span>
          <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
        </CardContent>
      </Card>
    </Link>
  );
}
