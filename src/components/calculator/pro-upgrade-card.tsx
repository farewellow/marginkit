"use client";

import { Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";
import type { ToolCategory } from "@/types/tools";

interface ProUpgradeCardProps {
  category: ToolCategory;
}

const categoryConfig: Record<
  ToolCategory,
  {
    bullets: string[];
    ctaLabel: string;
    headline: string;
  }
> = {
  "import-cost": {
    headline: "Turn import calculations into repeatable sourcing workflows",
    bullets: [
      "Save import scenarios",
      "Compare supplier cost changes",
      "Export landed cost reports",
      "Analyze multiple SKUs at once"
    ],
    ctaLabel: "Unlock bulk analysis"
  },
  "inventory-planning": {
    headline: "Move from one-off stock checks to ongoing reorder planning",
    bullets: [
      "Save reorder assumptions",
      "Upload bulk inventory CSVs",
      "Monitor reorder alerts",
      "Export stock planning results"
    ],
    ctaLabel: "See Pro features"
  },
  "profit-margin": {
    headline: "Make pricing and margin decisions with saved scenario history",
    bullets: [
      "Save pricing scenarios",
      "Compare discount outcomes",
      "Track margin shifts",
      "Export calculator summaries"
    ],
    ctaLabel: "Save and compare scenarios"
  },
  "marketplace-seller": {
    headline: "Keep campaign and channel economics consistent across SKUs",
    bullets: [
      "Save pricing scenarios",
      "Compare discount outcomes",
      "Track margin shifts",
      "Export calculator summaries"
    ],
    ctaLabel: "Save and compare scenarios"
  }
};

export function ProUpgradeCard({ category }: ProUpgradeCardProps) {
  const config = categoryConfig[category];

  return (
    <Card className="border-primary/25 bg-gradient-to-r from-sky-50 to-cyan-50">
      <CardContent className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            Pro
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">{config.headline}</h3>
          <ul className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            {config.bullets.map((feature) => (
              <li key={feature}>- {feature}</li>
            ))}
          </ul>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="w-full md:w-auto"
              onClick={() => trackEvent("pro_cta_clicked", { source: "calculator_page", category })}
            >
              <Lock className="mr-2 h-4 w-4" />
              {config.ctaLabel}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Pro features are coming soon</DialogTitle>
              <DialogDescription>
                MarginKit Pro will add saved scenarios, bulk workflows, and export-ready outputs. The current product already includes
                the UI and architecture for future Stripe + Supabase integration.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

