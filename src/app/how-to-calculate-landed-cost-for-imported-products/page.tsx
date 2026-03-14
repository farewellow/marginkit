import Link from "next/link";

import { AnalysisLineChart } from "@/components/content/analysis-line-chart";
import { ContentCtaBlock } from "@/components/content/content-cta-block";
import { FormulaBreakdownCard } from "@/components/content/formula-breakdown-card";
import { OperatorTakeawayCard } from "@/components/content/operator-takeaway-card";
import { ScenarioComparisonTable } from "@/components/content/scenario-comparison-table";
import { AnalyticalSectionHeading } from "@/components/content/analytical-section-heading";
import { SiteBreadcrumbs } from "@/components/layout/site-breadcrumbs";
import { FAQSection } from "@/components/marketing/faq-section";
import { RelatedTools } from "@/components/marketing/related-tools";

import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo/metadata";
import type { FAQItem } from "@/types/tools";

export const metadata = buildMetadata({
  title: "How to Calculate Landed Cost for Imported Products",
  description:
    "Practical landed-cost analysis for importers: formula, worked scenarios, cost-comparison table, and sensitivity chart for better pricing decisions.",
  pathname: "/how-to-calculate-landed-cost-for-imported-products"
});

const baseProductCost = 18000;
const units = 1500;
const extraCostSteps = [0, 1500, 3000, 4500, 6000, 7500];

const chartLabels = extraCostSteps.map((step) => `$${(step / 1000).toFixed(step === 0 ? 0 : 1)}k`);
const landedCostPerUnit = extraCostSteps.map((step) => Number(((baseProductCost + step) / units).toFixed(2)));

const comparisonRows = [
  {
    scenario: "Product cost only",
    cells: ["$18,000", "$0", "$18,000", "$12.00"]
  },
  {
    scenario: "Product + shipping",
    cells: ["$18,000", "$2,400", "$20,400", "$13.60"]
  },
  {
    scenario: "Product + shipping + duty + VAT + fees",
    cells: ["$18,000", "$6,200", "$24,200", "$16.13"]
  }
];

const faqItems: FAQItem[] = [
  {
    question: "Should VAT and duty be included if they are paid later?",
    answer:
      "Yes. If those costs are required to release and sell inventory, they belong in landed cost and unit economics."
  },
  {
    question: "What is the fastest way to compare two suppliers?",
    answer:
      "Use the same quantity and run both options with full freight, duty, and fee assumptions. Compare landed cost per unit first."
  },
  {
    question: "Can landed cost per unit decrease even if freight gets more expensive?",
    answer:
      "Yes, when higher order volume spreads fixed shipment overhead over more units."
  },
  {
    question: "When is product-cost-only pricing acceptable?",
    answer: "Only for rough screening. Final pricing should use fully loaded landed cost."
  }
];

export default function LandedCostGuidePage() {
  return (
    <div className="container space-y-10 py-8 sm:space-y-11 sm:py-10">
      <SiteBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Import Cost Tools", href: "/import-cost-tools" },
          { label: "How to Calculate Landed Cost for Imported Products" }
        ]}
      />

      <section className="max-w-4xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/90">Operator Guide</p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          How to calculate landed cost for imported products
        </h1>
        <p className="text-sm leading-6 text-muted-foreground sm:text-base">
          Landed cost is total product cost plus import overhead, divided by actual units received. If you price from product
          cost only, you usually overestimate margin and underprice risk. Pair this guide with the
          <Link href="/tools/landed-cost-calculator-importers" className="text-primary hover:text-primary/80"> landed cost calculator</Link>
          and the <Link href="/import-cost-tools" className="text-primary hover:text-primary/80"> import cost hub</Link>.
        </p>
      </section>

      <Card className="border-primary/20 bg-gradient-to-r from-sky-50/80 to-white shadow-none">
        <CardContent className="p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/90">Short direct answer</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Use: <span className="font-medium text-foreground">product cost + shipping + duty + tax + insurance + handling fees</span>,
            then divide by confirmed units received. That output is your real cost floor.
          </p>
        </CardContent>
      </Card>

      <FormulaBreakdownCard
        title="Landed cost formula in plain language"
        formula="Landed cost per unit = (Product cost + Shipping + Duty + VAT/Tax + Insurance + Other import fees) / Units received"
        items={[
          {
            label: "Units received",
            detail: "Use real received quantity. Short shipments increase per-unit landed cost."
          },
          {
            label: "Other import fees",
            detail: "Include broker, handling, port, inspection, and local delivery if they are shipment costs."
          },
          {
            label: "Decision use",
            detail: "Use landed cost per unit as baseline for margin, discount, and break-even decisions."
          }
        ]}
      />

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Worked scenario"
          title="Worked example with realistic overhead"
          description="Batch: 1,500 units from an overseas supplier."
        />
        <Card className="border-border/85 shadow-none">
          <CardContent className="grid gap-4 p-5 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold">Inputs</p>
              <ul className="mt-2 space-y-2.5 text-sm leading-6 text-muted-foreground">
                <li>Product cost: $18,000</li>
                <li>Freight and insurance: $2,900</li>
                <li>Duty and VAT: $2,600</li>
                <li>Broker and local handling: $700</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">Outputs</p>
              <ul className="mt-2 space-y-2.5 text-sm leading-6 text-muted-foreground">
                <li>Total landed cost: $24,200</li>
                <li>Landed cost per unit: $16.13</li>
                <li>At $24 sell price, gross profit per unit before channel fees: $7.87</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Scenario comparison"
          title="Why product-cost-only assumptions distort pricing"
          description="Same SKU and quantity, different depth of cost inclusion."
        />
        <ScenarioComparisonTable
          headers={["Product cost", "Extra import costs", "Total landed cost", "Landed cost per unit"]}
          rows={comparisonRows}
        />
      </section>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Sensitivity analysis"
          title="How extra import costs change per-unit economics"
          description="At 1,500 units, every additional $1,000 overhead adds about $0.67 per unit."
        />
        <AnalysisLineChart
          xLabels={chartLabels}
          series={[
            {
              name: "Landed cost per unit",
              color: "#0284c7",
              values: landedCostPerUnit
            }
          ]}
          yAxisLabel="Landed cost per unit"
          xAxisLabel="Total extra import costs"
          yTickFormatter={(value) => `$${value.toFixed(2)}`}
        />
        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-2.5 p-5 text-sm leading-6 text-muted-foreground">
            <p>
              This slope is your sensitivity signal. On low-volume shipments, each fee dollar hits harder per unit. Before approving
              expensive shipping options, model the unit-cost lift first.
            </p>
            <p>
              Next step: validate your final unit cost in
              <Link href="/tools/cost-per-unit-after-shipping-import-fees" className="text-primary hover:text-primary/80"> cost per unit after shipping and fees</Link>
              , then test margin safety in <Link href="/how-discounts-affect-profit-margin" className="text-primary hover:text-primary/80">discount scenarios</Link>.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-3.5 p-5 sm:p-6">
            <h2 className="text-xl font-semibold tracking-tight">Common mistakes</h2>
            <ul className="space-y-2.5 text-sm leading-6 text-muted-foreground">
              <li className="list-disc pl-1 marker:text-amber-600">Pricing from supplier cost only and treating import fees as overhead later.</li>
              <li className="list-disc pl-1 marker:text-amber-600">Spreading costs across ordered units instead of received units.</li>
              <li className="list-disc pl-1 marker:text-amber-600">Ignoring broker, inspection, and local logistics because each looks small.</li>
              <li className="list-disc pl-1 marker:text-amber-600">Setting promo prices before landed cost is fully loaded.</li>
            </ul>
          </CardContent>
        </Card>

        <OperatorTakeawayCard
          title="Operator takeaways"
          bullets={[
            "Landed cost is a pricing input, not an accounting afterthought.",
            "If landed cost per unit rises more than 5-8%, revalidate sell price immediately.",
            "Lower shipment volume increases per-unit cost pressure fast.",
            "Run landed-cost checks before discounts, ad scaling, or channel expansion."
          ]}
        />
      </section>

      <ContentCtaBlock
        title="Run the exact numbers on your SKU"
        description="Use your shipment data to calculate total landed cost and per-unit impact in under a minute."
        actions={[
          { label: "Landed Cost Calculator", href: "/tools/landed-cost-calculator-importers" },
          { label: "Cost Per Unit After Fees", href: "/tools/cost-per-unit-after-shipping-import-fees" },
          { label: "Import Cost Hub", href: "/import-cost-tools" }
        ]}
      />

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Clarifications for practical implementation."
        />
        <FAQSection items={faqItems} />
      </section>

      <Card className="border-border/85 shadow-none">
        <CardContent className="p-5 text-sm text-muted-foreground">
          Continue analysis: <Link href="/how-discounts-affect-profit-margin" className="text-primary hover:text-primary/80">How discounts affect profit margin</Link>
          {" "}and{" "}
          <Link href="/how-to-calculate-reorder-point-with-lead-time" className="text-primary hover:text-primary/80">
            how to calculate reorder point with lead time
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




