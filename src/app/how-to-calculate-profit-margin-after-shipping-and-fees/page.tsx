import Link from "next/link";

import { AnalyticalSectionHeading } from "@/components/content/analytical-section-heading";
import { AnalysisLineChart } from "@/components/content/analysis-line-chart";
import { ComparisonFrame, ProgressionStages, ThresholdNote } from "@/components/content/analysis-devices";
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
  title: "How to Calculate Profit Margin After Shipping and Fees",
  description:
    "Clear formula and worked example for shipping and fee-adjusted margin. Compare gross margin vs real margin before discounts and scaling.",
  pathname: "/how-to-calculate-profit-margin-after-shipping-and-fees"
});

const stageLabels = ["Gross margin", "+ Shipping", "+ Payment fees", "+ Shipping + import + variable fees"];

const progressionStages = [
  {
    label: "Gross margin",
    metric: "50.0% margin",
    detail: "Price $52, product cost $26.00. This is gross margin before operational drag."
  },
  {
    label: "After shipping",
    metric: "40.4% margin",
    detail: "Add $5.00 shipping and fulfillment. Profit per unit drops from $26.00 to $21.00."
  },
  {
    label: "After payment fees",
    metric: "36.9% margin",
    detail: "Add $1.80 payment processing. Contribution shrinks again."
  },
  {
    label: "After shipping + import + variable fees",
    metric: "27.9% margin",
    detail: "Add $3.20 import allocation and $1.50 other variable fees for a decision-grade margin."
  }
];

const comparisonRows = [
  {
    scenario: "Gross margin",
    cells: ["Product cost only", "$26.00", "$26.00", "50.0%"]
  },
  {
    scenario: "Margin after shipping",
    cells: ["+ shipping and fulfillment", "$31.00", "$21.00", "40.4%"]
  },
  {
    scenario: "Margin after payment fees",
    cells: ["+ payment processing", "$32.80", "$19.20", "36.9%"]
  },
  {
    scenario: "Margin after shipping + import costs",
    cells: ["+ import allocation + other variable fees", "$37.50", "$14.50", "27.9%"]
  }
];

const marginSeries = [50, 40.4, 36.9, 27.9];
const costLoadSeries = [50, 59.6, 63.1, 72.1];

const faqItems: FAQItem[] = [
  {
    question: "How do I calculate profit margin after shipping?",
    answer:
      "Subtract product cost and shipping from selling price, then divide by selling price. Margin after shipping = (price - product cost - shipping) / price."
  },
  {
    question: "Do shipping costs reduce margin?",
    answer:
      "Yes. Shipping is a per-order cost that directly reduces profit per unit unless it is fully recovered in the selling price."
  },
  {
    question: "Should payment and marketplace fees be included in margin?",
    answer:
      "Yes for decision-making. Excluding payment and channel fees overstates margin and can lead to unsafe discount or ad spend decisions."
  },
  {
    question: "What is the difference between gross margin and real margin?",
    answer:
      "Gross margin usually uses product cost only. Real margin includes shipping, payment, import allocations, and other variable selling costs."
  }
];

export default function ProfitMarginAfterFeesGuidePage() {
  return (
    <div className="container space-y-10 py-8 sm:space-y-11 sm:py-10">
      <SiteBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Profit & Margin Tools", href: "/profit-margin-tools" },
          { label: "How to Calculate Profit Margin After Shipping and Fees" }
        ]}
      />

      <section className="max-w-4xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/90">Margin Compression Guide</p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          How to calculate profit margin after shipping and fees
        </h1>
        <p className="text-sm leading-6 text-muted-foreground sm:text-base">
          Real margin is what remains after product cost, shipping, payment fees, and recurring variable costs. Use this method to avoid
          overestimating contribution and to set safer pricing and promo thresholds.
        </p>
      </section>

      <Card className="border-primary/20 bg-gradient-to-r from-sky-50/80 to-white shadow-none">
        <CardContent className="space-y-2 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/90">Short direct answer</p>
          <p className="text-sm font-medium leading-6 text-foreground">
            Margin after shipping and fees = (Selling price - Product cost - Shipping - Payment fees - Other variable costs) / Selling
            price.
          </p>
          <p className="text-sm leading-6 text-muted-foreground">
            Gross margin is a screening metric. Fee-adjusted margin is the operating metric you should use for discount, reorder, and
            paid traffic decisions.
          </p>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Core difference"
          title="Why gross margin differs from real margin"
          description="Gross margin often looks healthy because fee layers are not loaded yet."
        />
        <ComparisonFrame
          leftTitle="Gross margin view"
          leftPoints={[
            "Uses selling price minus product cost only",
            "Fast for rough SKU screening",
            "Can hide shipping and fee drag",
            "Often overstates pricing flexibility"
          ]}
          rightTitle="Real margin view"
          rightPoints={[
            "Loads shipping, payment, and channel-variable costs",
            "Reflects true per-unit contribution",
            "Improves discount and ad spend decisions",
            "Supports safer break-even thresholds"
          ]}
        />
      </section>

      <FormulaBreakdownCard
        title="Formula breakdown in plain language"
        formula="Real margin (%) = ((Selling price - Product cost - Shipping - Payment fees - Other variable costs) / Selling price) x 100"
        items={[
          {
            label: "Shipping and fulfillment",
            detail: "Treat as per-unit variable costs if they scale with each order."
          },
          {
            label: "Payment and channel fees",
            detail: "Include recurring transaction fees and marketplace charges."
          },
          {
            label: "Import allocations",
            detail: "If you import inventory, add landed-cost components to avoid underpricing."
          }
        ]}
      />

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Worked scenario"
          title="Worked example with full cost loading"
          description="One SKU sold at $52 with realistic fee layers."
        />
        <Card className="border-border/85 shadow-none">
          <CardContent className="grid gap-4 p-5 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold">Inputs</p>
              <ul className="mt-2 space-y-2.5 text-sm leading-6 text-muted-foreground">
                <li>Selling price: $52.00</li>
                <li>Product cost: $26.00</li>
                <li>Shipping and fulfillment: $5.00</li>
                <li>Payment processing: $1.80</li>
                <li>Import allocation + other variable fees: $4.70</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">Outputs</p>
              <ul className="mt-2 space-y-2.5 text-sm leading-6 text-muted-foreground">
                <li>Gross margin: 50.0%</li>
                <li>Fee-adjusted margin: 27.9%</li>
                <li>Profit per unit drops from $26.00 to $14.50</li>
                <li>Margin compression: -22.1 percentage points</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Progression view"
          title="Stage-by-stage margin erosion"
          description="Load costs in sequence to isolate where margin compression starts."
        />
        <ProgressionStages title="Margin states" stages={progressionStages} />
      </section>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Comparison table"
          title="Gross margin vs shipping and fee-adjusted margin"
          description="Use this structure for SKU-level pricing reviews."
        />
        <ScenarioComparisonTable
          headers={[
            "Included costs",
            "Total variable cost / unit",
            "Profit per unit",
            "Margin"
          ]}
          rows={comparisonRows}
        />
      </section>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Primary visual"
          title="How quickly fee loading compresses margin"
          description="Margin falls while cumulative cost load approaches the selling-price ceiling."
        />
        <AnalysisLineChart
          xLabels={stageLabels}
          series={[
            {
              name: "Real margin (%)",
              color: "#0284c7",
              values: marginSeries
            },
            {
              name: "Cumulative cost load (% of price)",
              color: "#f59e0b",
              values: costLoadSeries
            }
          ]}
          yAxisLabel="Percent"
          xAxisLabel="Cost layers included"
          yTickFormatter={(value) => `${value.toFixed(0)}%`}
        />
        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-2.5 p-5 text-sm leading-6 text-muted-foreground">
            <p>
              Fee-adjusted margin is the baseline you should test before running promotions. To capture import overhead correctly, pair
              this page with
              <Link href="/how-to-calculate-landed-cost-for-imported-products" className="text-primary hover:text-primary/80">
                {" "}how to calculate landed cost
              </Link>
              {" "}and
              <Link href="/landed-cost-formula" className="text-primary hover:text-primary/80">
                {" "}the landed cost formula
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <ThresholdNote
          title="What compresses margin the fastest?"
          description="These factors usually create the largest gross-vs-real gap:"
          bullets={[
            "Fulfillment and shipping on low-AOV SKUs",
            "Payment processing drag during discounts",
            "Import charges not allocated at unit level",
            "Channel fees loaded too late in pricing workflow"
          ]}
        />

        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-3.5 p-5 sm:p-6">
            <h2 className="text-xl font-semibold tracking-tight">From margin estimate to decision-ready margin</h2>
            <p className="text-sm leading-6 text-muted-foreground">
              Teams often start with gross margin and then approve campaigns before full fee loading. This is where avoidable erosion
              happens. Move from estimate to decision-grade margin before discounting or scaling spend.
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              Next step: stress-test promo economics with
              <Link href="/how-discounts-affect-profit-margin" className="text-primary hover:text-primary/80">
                {" "}discount margin analysis
              </Link>
              {" "}and validate price floors with the
              <Link href="/tools/break-even-selling-price-after-import-costs" className="text-primary hover:text-primary/80">
                {" "}break-even selling price tool
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-3.5 p-5 sm:p-6">
            <h2 className="text-xl font-semibold tracking-tight">Common mistakes</h2>
            <ul className="space-y-2.5 pl-5 text-sm leading-6 text-muted-foreground">
              <li className="list-disc marker:text-amber-600">Treating shipping as overhead instead of a per-order margin input.</li>
              <li className="list-disc marker:text-amber-600">Excluding payment and channel fees from pricing decisions.</li>
              <li className="list-disc marker:text-amber-600">Ignoring import charges when calculating real product economics.</li>
              <li className="list-disc marker:text-amber-600">Comparing revenue growth without contribution margin trend by SKU.</li>
            </ul>
          </CardContent>
        </Card>

        <OperatorTakeawayCard
          title="Practical operator recommendations"
          bullets={[
            "Track gross and real margin separately so tradeoffs are visible.",
            "Use fee-adjusted margin thresholds for pricing and promotions.",
            "Recalculate margins when shipping, payment, or import costs change.",
            "Pair real margin checks with break-even floor modeling before launch."
          ]}
        />
      </section>

      <ContentCtaBlock
        title="Calculate real margin before you commit pricing"
        description="Run full fee-stack checks, then set safer floor prices and discount depth limits."
        actions={[
          { label: "Margin Calculator After Shipping Fees", href: "/tools/margin-calculator-after-shipping-fees" },
          { label: "Break-even Selling Price Tool", href: "/tools/break-even-selling-price-after-import-costs" },
          { label: "How Discounts Affect Profit Margin", href: "/how-discounts-affect-profit-margin" }
        ]}
      />

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Quick clarifications for fee-aware margin decisions."
        />
        <FAQSection items={faqItems} />
      </section>

      <Card className="border-border/85 shadow-none">
        <CardContent className="p-5 text-sm text-muted-foreground">
          Continue analysis:{" "}
          <Link href="/how-to-calculate-landed-cost-for-imported-products" className="text-primary hover:text-primary/80">
            how to calculate landed cost
          </Link>
          {" "}and{" "}
          <Link href="/landed-cost-formula" className="text-primary hover:text-primary/80">
            landed cost formula
          </Link>
          {" "}and{" "}
          <Link href="/landed-cost-vs-product-cost" className="text-primary hover:text-primary/80">
            landed cost vs product cost
          </Link>
          .
        </CardContent>
      </Card>

      <RelatedTools
        relatedSlugs={[
          "margin-calculator-after-shipping-fees",
          "import-profit-margin-calculator",
          "discount-impact-on-margin-calculator",
          "supplier-cost-increase-impact-calculator"
        ]}
      />
    </div>
  );
}