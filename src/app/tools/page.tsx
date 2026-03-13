import Link from "next/link";

import { SiteBreadcrumbs } from "@/components/layout/site-breadcrumbs";
import { ToolsDirectory } from "@/components/marketing/tools-directory";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "All MarginKit Tools",
  description:
    "Browse all MarginKit calculators for landed cost, margin, inventory planning, and marketplace economics.",
  pathname: "/tools"
});

export default function ToolsPage() {
  return (
    <div className="container space-y-8 py-8 sm:py-10">
      <SiteBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools" }]} />

      <section className="max-w-3xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">All calculators</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Explore every MarginKit calculator, filter by category, and jump directly into the workflow you need.
        </p>
      </section>

      <Card className="border-primary/15 bg-gradient-to-r from-sky-50/70 to-white">
        <CardContent className="flex flex-wrap items-center gap-3 p-5">
          <SectionHeading
            eyebrow="Start by category"
            title="Need a guided path?"
            description="Use category hubs to follow suggested tool order."
            className="max-w-none"
          />
          <div className="flex flex-wrap gap-2 md:ml-auto">
            <Button asChild size="sm" variant="outline">
              <Link href="/import-cost-tools">Import cost</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="/profit-margin-tools">Profit margin</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="/inventory-planning-tools">Inventory planning</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <ToolsDirectory />
    </div>
  );
}
