import Link from "next/link";

import { AnalyticalSectionHeading } from "@/components/content/analytical-section-heading";
import { AnalysisLineChart } from "@/components/content/analysis-line-chart";
import { ComparisonFrame, ThresholdNote } from "@/components/content/analysis-devices";
import { ContentCtaBlock } from "@/components/content/content-cta-block";
import { FormulaBreakdownCard } from "@/components/content/formula-breakdown-card";
import { OperatorTakeawayCard } from "@/components/content/operator-takeaway-card";
import { ScenarioComparisonTable } from "@/components/content/scenario-comparison-table";
import { SiteBreadcrumbs } from "@/components/layout/site-breadcrumbs";
import { FAQSection } from "@/components/marketing/faq-section";
import { RelatedTools } from "@/components/marketing/related-tools";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo/metadata";
import type { FAQItem } from "@/types/tools";

export const metadata = buildMetadata({
  title: "Landed Cost vs Product Cost: Key Difference for Pricing Decisions",
  description:
    "Clear comparison of landed cost vs product cost for importers, including what each metric includes, practical examples, and pricing impact.",
  pathname: "/landed-cost-vs-product-cost"
});

const chartLabels = ["Product only", "+ Shipping", "+ Duty + VAT", "+ Other fees"];

const comparisonRows = [
  {
    scenario: "Product cost only",
    cells: ["$24,000", "$0", "$24,000", "$12.00", "$0.00"]
  },
  {
    scenario: "Product + shipping",
    cells: ["$24,000", "$3,400", "$27,400", "$13.70", "$1.70"]
  },
  {
    scenario: "Full landed cost",
    cells: ["$24,000", "$8,260", "$32,260", "$16.13", "$4.13"]
  }
];

const faqItems: FAQItem[] = [
  {
    question: "What is the difference between landed cost and product cost?",
    answer:
      "Product cost is supplier invoice only. Landed cost adds shipping, customs duties, import taxes, insurance, and handling fees required to stock inventory."
  },
  {
    question: "Why is landed cost usually higher than product cost?",
    answer:
      "Because import logistics and customs-related charges are layered on top of supplier price. Those layers can materially change unit economics."
  },
  {
    question: "Does product cost include shipping?",
    answer:
      "Usually no. Product cost typically reflects supplier pricing only, while shipping belongs to landed-cost calculations."
  },
  {
    question: "Does landed cost include duties and customs fees?",
    answer:
      "Yes. Duties, customs fees, and related import taxes are core landed-cost components."
  },
  {
    question: "Which metric should I use for pricing decisions?",
    answer:
      "Use landed cost for pricing and margin decisions. Product cost is useful for early supplier comparisons but not for final sell-price planning."
  }
];

export default function LandedCostVsProductCostPage() {
  return (
    <div className="container space-y-10 py-8 sm:space-y-11 sm:py-10">
      <SiteBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Import Cost Tools", href: "/import-cost-tools" },
          { label: "Landed Cost vs Product Cost" }
        ]}
      />

      <section className="max-w-4xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/90">Comparison Guide</p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Landed cost vs product cost</h1>
        <p className="text-sm leading-6 text-muted-foreground sm:text-base">
          Product cost tells you what you pay your supplier. Landed cost tells you what inventory actually costs after shipping,
          duties, customs taxes, insurance, and handling fees. For pricing and margin decisions, this difference matters more than most teams expect.
        </p>
      </section>

      <Card className="border-primary/20 bg-gradient-to-r from-sky-50/80 to-white shadow-none">
        <CardContent className="p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/90">Short direct answer</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Product cost is a supplier benchmark. Landed cost is a pricing metric. If you price from product cost alone, you can
            overestimate margin and underprice by a meaningful amount.
          </p>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Misconception breaker"
          title="The key difference in plain language"
          description="Same SKU, very different decisions depending on what costs are included."
        />
        <ComparisonFrame
          leftTitle="Product cost only"
          leftPoints={[
            "Supplier invoice amount only",
            "Excludes freight, duties, taxes, and local handling",
            "Useful for supplier quote screening",
            "Not reliable for final pricing or margin planning"
          ]}
          rightTitle="Full landed cost"
          rightPoints={[
            "Includes shipping, customs duty, VAT/tax, insurance, and handling",
            "Represents real cost to stock inventory",
            "Useful for price floors and margin validation",
            "Reduces underpricing and post-launch surprises"
          ]}
        />
      </section>

      <FormulaBreakdownCard
        title="Comparison logic"
        formula="Landed cost per unit = (Product cost + Shipping + Duty + VAT/Tax + Insurance + Other fees) / Units received"
        items={[
          {
            label: "Product cost",
            detail: "Good for supplier negotiations and early quote comparison."
          },
          {
            label: "Landed cost",
            detail: "Use this for sell-price planning, margin checks, and break-even validation."
          },
          {
            label: "Decision rule",
            detail: "If you are deciding price, discount, or ad spend, use landed cost instead of supplier cost alone."
          }
        ]}
      />

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Practical comparison"
          title="What landed cost includes that product cost does not"
          description="These omitted layers are where most pricing distortion starts."
        />
        <Card className="border-border/85 shadow-none">
          <CardContent className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
            <div>
              <p className="text-sm font-semibold">Usually excluded from product cost</p>
              <ul className="mt-2.5 space-y-2.5 pl-5 text-sm leading-6 text-muted-foreground">
                <li className="list-disc marker:text-primary">International shipping and freight surcharges</li>
                <li className="list-disc marker:text-primary">Customs duties and import VAT/tax</li>
                <li className="list-disc marker:text-primary">Broker, clearance, and handling fees</li>
                <li className="list-disc marker:text-primary">Insurance and inbound local transfer costs</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">Why this matters operationally</p>
              <ul className="mt-2.5 space-y-2.5 pl-5 text-sm leading-6 text-muted-foreground">
                <li className="list-disc marker:text-primary">Price floors move higher than expected</li>
                <li className="list-disc marker:text-primary">Margin plans look better on paper than in reality</li>
                <li className="list-disc marker:text-primary">Discount decisions can become dangerous quickly</li>
                <li className="list-disc marker:text-primary">Break-even targets become harder to hit</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Worked example"
          title="How product-cost pricing can mislead margin decisions"
          description="Shipment of 2,000 units with realistic import overhead."
        />
        <Card className="border-border/85 shadow-none">
          <CardContent className="grid gap-4 p-5 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold">If you use product cost only</p>
              <ul className="mt-2 space-y-2.5 text-sm leading-6 text-muted-foreground">
                <li>Supplier invoice: $24,000</li>
                <li>Assumed unit cost: $12.00</li>
                <li>At $21 sell price, expected margin looks healthy</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">After full landed-cost loading</p>
              <ul className="mt-2 space-y-2.5 text-sm leading-6 text-muted-foreground">
                <li>Total extra import costs: $8,260</li>
                <li>Real unit cost: $16.13</li>
                <li>At $21 sell price, margin is much thinner than expected</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Primary comparison"
          title="Where the per-unit gap opens"
          description="Each added fee layer widens distance from supplier-only assumptions."
        />
        <ScenarioComparisonTable
          headers={["Product cost", "Extra costs", "Total cost", "Per-unit cost", "Gap vs product-cost/unit"]}
          rows={comparisonRows}
        />
      </section>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Primary visual"
          title="Widening gap between product-cost assumptions and landed reality"
          description="Baseline line stays flat while fully loaded cost climbs with each fee layer."
        />
        <AnalysisLineChart
          xLabels={chartLabels}
          series={[
            {
              name: "Product-cost assumption ($/unit)",
              color: "#94a3b8",
              values: [12, 12, 12, 12]
            },
            {
              name: "Fully loaded cost ($/unit)",
              color: "#0284c7",
              values: [12, 13.7, 15.3, 16.13]
            }
          ]}
          yAxisLabel="Cost per unit"
          xAxisLabel="Cost layers included"
          yTickFormatter={(value) => `$${value.toFixed(2)}`}
        />
        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-2.5 p-5 text-sm leading-6 text-muted-foreground">
            <p>
              In this scenario, ignoring full import overhead understates unit cost by $4.13. That gap directly affects price floors,
              margin expectations, and break-even assumptions.
            </p>
            <p>
              For step-by-step calculation flow, use
              <Link href="/how-to-calculate-landed-cost-for-imported-products" className="text-primary hover:text-primary/80">
                {" "}how to calculate landed cost for imported products
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Decision use"
          title="When each metric is useful"
          description="Use the right metric for the decision you are making."
        />
        <Card className="border-border/85 shadow-none">
          <CardContent className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
            <div>
              <p className="text-sm font-semibold">Use product cost when:</p>
              <ul className="mt-2.5 space-y-2.5 pl-5 text-sm leading-6 text-muted-foreground">
                <li className="list-disc marker:text-primary">Screening supplier quotes quickly</li>
                <li className="list-disc marker:text-primary">Negotiating invoice terms</li>
                <li className="list-disc marker:text-primary">Running early sourcing comparisons</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">Use landed cost when:</p>
              <ul className="mt-2.5 space-y-2.5 pl-5 text-sm leading-6 text-muted-foreground">
                <li className="list-disc marker:text-primary">Setting sell price and margin targets</li>
                <li className="list-disc marker:text-primary">Testing discounts and paid-growth plans</li>
                <li className="list-disc marker:text-primary">Calculating break-even selling price</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <ThresholdNote
          title="When product cost is misleading"
          description="Product-cost pricing is especially dangerous in these conditions:"
          bullets={[
            "Low order volume with high fixed shipment overhead",
            "Products with duty/VAT exposure and volatile freight",
            "Channel strategies that rely on narrow margin bands",
            "Promo periods where price floors already tighten"
          ]}
        />

        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-3.5 p-5 sm:p-6">
            <h2 className="text-xl font-semibold tracking-tight">Common mistakes</h2>
            <ul className="space-y-2.5 pl-5 text-sm leading-6 text-muted-foreground">
              <li className="list-disc marker:text-amber-600">Using product cost as if it were final unit economics.</li>
              <li className="list-disc marker:text-amber-600">Skipping local handling and broker fees because each appears small.</li>
              <li className="list-disc marker:text-amber-600">Dividing by ordered quantity instead of received quantity.</li>
              <li className="list-disc marker:text-amber-600">Setting marketplace price before landed-cost validation.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <OperatorTakeawayCard
        title="Operator takeaway"
        bullets={[
          "Treat landed cost per unit as your default pricing baseline.",
          "Recalculate whenever freight, duty, or quantity assumptions change.",
          "Use product cost only for rough screening, never final price commitments.",
          "Validate margin effects in fee-aware scenarios before discounting."
        ]}
      />

      <ContentCtaBlock
        title="Model your real import economics"
        description="Calculate full landed cost and compare break-even and margin outcomes before locking pricing."
        actions={[
          { label: "Landed Cost Calculator", href: "/tools/landed-cost-calculator-importers" },
          { label: "Break-Even Selling Price", href: "/tools/break-even-selling-price-after-import-costs" },
          { label: "How to Calculate Landed Cost", href: "/how-to-calculate-landed-cost-for-imported-products" }
        ]}
      />

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Quick clarifications for landed cost vs product cost decisions."
        />
        <FAQSection items={faqItems} />
      </section>

      <Card className="border-border/85 shadow-none">
        <CardContent className="p-5 text-sm text-muted-foreground">
          Continue analysis:{" "}
          <Link href="/how-to-calculate-profit-margin-after-shipping-and-fees" className="text-primary hover:text-primary/80">
            margin after shipping and fees
          </Link>
          {" "},{" "}
          <Link href="/how-discounts-affect-profit-margin" className="text-primary hover:text-primary/80">
            discount impact on margin
          </Link>
          {" "}, and{" "}
          <Link href="/guides" className="text-primary hover:text-primary/80">
            all operator guides
          </Link>
          .
        </CardContent>
      </Card>

      <RelatedTools
        relatedSlugs={[
          "landed-cost-calculator-importers",
          "cost-per-unit-after-shipping-import-fees",
          "import-profit-margin-calculator",
          "break-even-selling-price-after-import-costs"
        ]}
      />
    </div>
  );
}

