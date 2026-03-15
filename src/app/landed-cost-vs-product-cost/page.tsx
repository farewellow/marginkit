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
  title: "Landed Cost vs Product Cost: What Changes Your Real Price Floor",
  description:
    "Comparison guide for importers: product cost vs landed cost, widening unit-cost gap analysis, worked scenarios, and underpricing risk signals.",
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
    question: "Why is the gap often larger on small orders?",
    answer:
      "Fixed shipment and clearance costs are spread over fewer units, so per-unit distortion increases quickly on low-volume imports."
  },
  {
    question: "Can I price from product cost and add fees later?",
    answer:
      "You can estimate that way, but final price and margin decisions should use landed cost per unit to avoid hidden underpricing."
  },
  {
    question: "What omission causes the biggest practical error?",
    answer:
      "Most operators underestimate combined duty, tax, and local handling. Individually small fees become meaningful together."
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
          Product cost is what you pay the supplier. Landed cost is what inventory actually costs after shipping, duties, taxes,
          insurance, and local handling. Pricing off product cost alone often creates silent underpricing.
        </p>
      </section>

      <Card className="border-primary/20 bg-gradient-to-r from-sky-50/80 to-white shadow-none">
        <CardContent className="p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/90">Short direct answer</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Product cost is incomplete for pricing decisions. Landed cost per unit is the usable number for margin and price-floor logic.
          </p>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Misconception breaker"
          title="The key difference"
          description="Same SKU, different decision quality depending on what you include."
        />
        <ComparisonFrame
          leftTitle="Product cost only"
          leftPoints={[
            "Represents supplier invoice only",
            "Ignores logistics and import friction",
            "Usually overstates margin on paper",
            "Can push you into underpricing without noticing"
          ]}
          rightTitle="Full landed cost"
          rightPoints={[
            "Includes shipping, duty, tax, insurance, and handling",
            "Matches real cost-to-stock inventory",
            "Gives reliable price floor and margin base",
            "Reduces surprise loss after launch"
          ]}
        />
      </section>

      <FormulaBreakdownCard
        title="Concept explained simply"
        formula="Landed cost per unit = (Product cost + Shipping + Duty + VAT/Tax + Insurance + Other fees) / Units received"
        items={[
          {
            label: "Product cost",
            detail: "Base invoice amount from supplier."
          },
          {
            label: "Fee layers",
            detail: "Freight, customs duty, tax, insurance, brokerage, inland logistics."
          },
          {
            label: "Units received",
            detail: "Use actual received quantity; shortages increase landed cost per unit."
          }
        ]}
      />

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Worked example"
          title="How omission turns into underpricing risk"
          description="Shipment of 2,000 units with realistic import overhead."
        />
        <Card className="border-border/85 shadow-none">
          <CardContent className="grid gap-4 p-5 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold">If you use product cost only</p>
              <ul className="mt-2 space-y-2.5 text-sm leading-6 text-muted-foreground">
                <li>Supplier invoice: $24,000</li>
                <li>Assumed unit cost: $12.00</li>
                <li>At $21 sale price, expected margin looks healthy</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">After full landed-cost loading</p>
              <ul className="mt-2 space-y-2.5 text-sm leading-6 text-muted-foreground">
                <li>Total extra import costs: $8,260</li>
                <li>Real unit cost: $16.13</li>
                <li>At $21 sale price, margin is far thinner than expected</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Primary comparison"
          title="Where the per-unit gap opens"
          description="Each added cost layer widens distance from supplier-only assumptions."
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
              Gap width is pricing risk. In this scenario, ignoring full import overhead understates unit cost by $4.13.
              That is $8,260 of hidden cost over the batch.
            </p>
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
          "If the gap exceeds 10-15% of sell price, revisit pricing immediately."
        ]}
      />

      <ContentCtaBlock
        title="Model your real import economics"
        description="Calculate full landed cost and compare per-unit outcomes before locking pricing."
        actions={[
          { label: "Landed Cost Calculator", href: "/tools/landed-cost-calculator-importers" },
          { label: "Cost Per Unit After Fees", href: "/tools/cost-per-unit-after-shipping-import-fees" },
          { label: "Full Landed Cost Guide", href: "/how-to-calculate-landed-cost-for-imported-products" }
        ]}
      />

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Quick clarifications for landed-cost vs supplier-cost decisions."
        />
        <FAQSection items={faqItems} />
      </section>

      <RelatedTools
        relatedSlugs={[
          "landed-cost-calculator-importers",
          "cost-per-unit-after-shipping-import-fees",
          "import-profit-margin-calculator"
        ]}
      />
    </div>
  );
}



