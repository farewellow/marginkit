import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { SiteBreadcrumbs } from "@/components/layout/site-breadcrumbs";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "About MarginKit",
  description:
    "Learn why MarginKit was built for importers, resellers, marketplace sellers, and e-commerce teams that need faster pricing and inventory decisions.",
  pathname: "/about"
});

const workflows = [
  {
    title: "Import costing",
    description: "Estimate landed cost, per-unit fees, and break-even pricing before placing purchase orders."
  },
  {
    title: "Margin and pricing",
    description: "Model margin impact from shipping, discounts, and supplier changes before campaigns go live."
  },
  {
    title: "Inventory planning",
    description: "Set reorder points, safety stock, and runway checks to reduce stockout and overstock risk."
  },
  {
    title: "Marketplace decisions",
    description: "Use break-even price and ROAS tools to keep channel growth aligned with unit economics."
  }
];

export default function AboutPage() {
  return (
    <div className="container space-y-8 py-8 sm:py-10">
      <SiteBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />

      <section className="max-w-3xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">About MarginKit</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          MarginKit is a practical calculator toolkit for operators who need clear pricing and inventory decisions quickly,
          without rebuilding spreadsheets every week.
        </p>
        <p className="text-sm text-muted-foreground sm:text-base">
          It was built for importers, resellers, e-commerce sellers, and marketplace teams that manage real SKU-level
          tradeoffs across cost, margin, and stock risk.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/85 shadow-none">
          <CardContent className="p-5">
            <p className="text-sm font-semibold">What MarginKit helps with</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Faster unit-economics checks, clearer reorder decisions, and more consistent pricing workflows.
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/85 shadow-none">
          <CardContent className="p-5">
            <p className="text-sm font-semibold">Who it is built for</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Teams handling supplier costs, shipping, channel fees, promotions, and inventory planning across multiple products.
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/85 shadow-none">
          <CardContent className="p-5">
            <p className="text-sm font-semibold">Why it exists</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Many teams outgrow ad-hoc sheets but still need lightweight, reliable tools that keep daily decisions moving.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-5">
        <SectionHeading
          eyebrow="Workflows"
          title="What workflows MarginKit supports"
          description="Use focused calculators for the decisions that happen every week in product and operations."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {workflows.map((workflow) => (
            <Card key={workflow.title} className="border-border/85 shadow-none">
              <CardContent className="p-5">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {workflow.title}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{workflow.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <Card className="border-primary/20 bg-gradient-to-r from-sky-50/80 to-white">
          <CardContent className="flex flex-col gap-5 p-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Start here</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Explore tools by category</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Jump into import cost, profit margin, inventory planning, or marketplace workflows.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                <Link href="/import-cost-tools" className="text-primary hover:text-primary/80">Import cost</Link>
                <Link href="/profit-margin-tools" className="text-primary hover:text-primary/80">Profit & margin</Link>
                <Link href="/inventory-planning-tools" className="text-primary hover:text-primary/80">Inventory planning</Link>
                <Link href="/marketplace-seller-tools" className="text-primary hover:text-primary/80">Marketplace seller</Link>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/tools">Browse all tools</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/tools/landed-cost-calculator-importers">
                  Open a calculator
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
