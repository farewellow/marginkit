import Link from "next/link";

import { SiteBreadcrumbs } from "@/components/layout/site-breadcrumbs";
import { GuideCard } from "@/components/marketing/guide-card";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { guides } from "@/data/guides";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Practical Guides for Cost, Margin, and Inventory Decisions",
  description:
    "Browse operator-focused analytical guides for landed cost, discount margin impact, and reorder point planning with actionable scenarios.",
  pathname: "/guides"
});

export default function GuidesPage() {
  return (
    <div className="container space-y-8 py-8 sm:py-10">
      <SiteBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides" }]} />

      <section className="max-w-3xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Practical operator guides</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          These guides are analytical companions to MarginKit calculators. Each one includes worked scenarios, comparison logic,
          and decision takeaways you can apply before changing price, placing purchase orders, or adjusting inventory policy.
        </p>
      </section>

      <Card className="border-primary/15 bg-gradient-to-r from-sky-50/80 to-white">
        <CardContent className="flex flex-wrap items-center gap-4 p-5">
          <SectionHeading
            eyebrow="Use by workflow"
            title="Start where the operational risk is highest"
            description="Choose a guide, then validate the same scenario in calculators."
            className="max-w-none"
          />
          <div className="flex flex-wrap gap-2 md:ml-auto">
            <Button asChild size="sm" variant="outline">
              <Link href="/import-cost-tools">Import cost tools</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="/profit-margin-tools">Profit margin tools</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="/inventory-planning-tools">Inventory planning tools</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-5">
        <SectionHeading
          eyebrow="Guides"
          title="Current analytical guides"
          description="Focused resources for operators who need decision support beyond one-click calculations."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {guides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </section>
    </div>
  );
}
