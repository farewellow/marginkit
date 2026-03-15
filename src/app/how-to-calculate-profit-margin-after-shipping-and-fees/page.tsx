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
    "Stage-by-stage margin compression guide that shows how shipping, payment, and variable selling costs erode paper margin in real operations.",
  pathname: "/how-to-calculate-profit-margin-after-shipping-and-fees"
});

const stageLabels = ["Paper margin", "+ Shipping", "+ Payment fees", "+ All variable costs"];

const progressionStages = [
  {
    label: "Before fees",
    metric: "50.0% margin",
    detail: "Price $48, product cost $24. Looks strong before operational fees are loaded."
  },
  {
    label: "After shipping",
    metric: "40.0% margin",
    detail: "Add $4.80 fulfillment and delivery. Profit per unit drops from $24.00 to $19.20."
  },
  {
    label: "After payment fees",
    metric: "36.5% margin",
    detail: "Add $1.70 processing. Fee drag starts to compress contribution faster."
  },
  {
    label: "After full variable load",
    metric: "27.1% margin",
    detail: "Add channel and returns reserve. Real margin is almost half of paper margin."
  }
];

const comparisonRows = [
  {
    scenario: "Margin before fees",
    cells: ["Product only", "$24.00", "$24.00", "50.0%"]
  },
  {
    scenario: "After shipping",
    cells: ["Product + shipping/fulfillment", "$28.80", "$19.20", "40.0%"]
  },
  {
    scenario: "After shipping + payment",
    cells: ["+ processing fees", "$30.50", "$17.50", "36.5%"]
  },
  {
    scenario: "After all variable costs",
    cells: ["+ channel + returns reserve", "$35.00", "$13.00", "27.1%"]
  }
];

const marginSeries = [50, 40, 36.5, 27.1];
const costLoadSeries = [50, 60, 63.5, 72.9];

const faqItems: FAQItem[] = [
  {
    question: "Which costs should always be included in margin after fees?",
    answer:
      "At minimum: product cost, shipping or fulfillment, payment processing, and recurring channel-related variable costs such as returns allowance or marketplace charges."
  },
  {
    question: "Why do operators overestimate margin so often?",
    answer:
      "Many teams track product cost precisely but leave variable selling costs in separate reports, so pricing decisions are made from incomplete unit economics."
  },
  {
    question: "What is a practical warning threshold?",
    answer:
      "If real margin after full variable costs is more than 8 to 10 points below paper margin, repricing and fee controls usually become urgent."
  },
  {
    question: "Should discounts be evaluated before or after fee loading?",
    answer:
      "After fee loading. Discount decisions based on paper margin can look safe while total contribution actually degrades."
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
          Paper margin can look healthy while real margin is weak. Use this guide to load shipping, payment, and recurring variable costs
          in sequence, then compare the real outcome before pricing or promotions. For quick modeling, pair this with the
          <Link href="/tools/margin-calculator-after-shipping-fees" className="text-primary hover:text-primary/80">
            {" "}margin calculator after shipping fees
          </Link>
          .
        </p>
      </section>

      <Card className="border-primary/20 bg-gradient-to-r from-sky-50/80 to-white shadow-none">
        <CardContent className="p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/90">Short direct answer</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Profit margin after fees = (selling price - all variable costs) / selling price. If you stop at product cost,
            margin is usually overstated and pricing decisions drift out of sync with reality.
          </p>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Paper vs real result"
          title="The key difference"
          description="Margin before fees is a screening metric. Margin after full variable cost loading is the decision metric."
        />
        <ComparisonFrame
          leftTitle="Paper margin (incomplete)"
          leftPoints={[
            "Uses selling price minus product cost only",
            "Looks strong during planning decks",
            "Hides logistics and payment drag",
            "Can approve discounts that destroy contribution"
          ]}
          rightTitle="Real margin (decision-grade)"
          rightPoints={[
            "Includes shipping, payment, and channel-variable costs",
            "Shows true profit retained per unit sold",
            "Creates safer price floors and promo rules",
            "Supports realistic growth and spend decisions"
          ]}
        />
      </section>

      <FormulaBreakdownCard
        title="Formula breakdown in plain language"
        formula="Real margin (%) = ((Selling price - Product cost - Shipping - Payment fees - Other variable costs) / Selling price) x 100"
        items={[
          {
            label: "Product cost",
            detail: "Unit purchase or production cost before selling operations."
          },
          {
            label: "Variable cost stack",
            detail: "Shipping, fulfillment, payment processing, channel fees, returns allowance."
          },
          {
            label: "Decision use",
            detail: "Use real margin to set discounts, ad targets, and repricing thresholds."
          }
        ]}
      />

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Worked scenario"
          title="Worked example: same SKU, four margin states"
          description="SKU sells at $48 with monthly volume baseline of 1,200 units."
        />
        <Card className="border-border/85 shadow-none">
          <CardContent className="grid gap-4 p-5 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold">Inputs</p>
              <ul className="mt-2 space-y-2.5 text-sm leading-6 text-muted-foreground">
                <li>Price: $48.00</li>
                <li>Product cost: $24.00</li>
                <li>Shipping and fulfillment: $4.80</li>
                <li>Payment processing: $1.70</li>
                <li>Channel and returns reserve: $4.50</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">Outputs</p>
              <ul className="mt-2 space-y-2.5 text-sm leading-6 text-muted-foreground">
                <li>Paper margin: 50.0%</li>
                <li>Real margin after full fee load: 27.1%</li>
                <li>Profit per unit drops from $24.00 to $13.00</li>
                <li>At 1,200 units/month, contribution drops by $13,200 vs paper expectation</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Progression view"
          title="Stage-by-stage margin erosion"
          description="This sequence is the fastest way to expose where margin compression starts."
        />
        <ProgressionStages title="Margin states" stages={progressionStages} />
      </section>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Primary table"
          title="Margin compression by cost layer"
          description="Use this pattern to audit any SKU before scaling spend or discount depth."
        />
        <ScenarioComparisonTable
          headers={["Included variable costs", "Total variable cost / unit", "Profit per unit", "Margin"]}
          rows={comparisonRows}
        />
      </section>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Primary visual"
          title="How quickly fee loading compresses margin"
          description="Margin falls while cumulative cost load climbs toward the selling price ceiling."
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
              Compression is nonlinear in practice because operators usually apply discounts and ad spend on top of this baseline.
              A 27% real margin can turn fragile quickly once promotional pressure starts.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <ThresholdNote
          title="What compresses margin the fastest?"
          description="These factors usually produce the largest gap between paper and real margin:"
          bullets={[
            "Fulfillment and shipping costs on low-AOV SKUs",
            "Payment processing drag during discount periods",
            "Channel and returns allowances that are not loaded at SKU level",
            "Price cuts approved before full cost restatement"
          ]}
        />

        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-3.5 p-5 sm:p-6">
            <h2 className="text-xl font-semibold tracking-tight">Why healthy margin on paper collapses in real selling</h2>
            <p className="text-sm leading-6 text-muted-foreground">
              Paper margin treats operational fees as background noise. Real selling turns those fees into hard per-unit deductions.
              When each deduction is stacked, price flexibility shrinks and break-even thresholds move closer than expected.
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              Next step: model discount sensitivity with
              <Link href="/how-discounts-affect-profit-margin" className="text-primary hover:text-primary/80">
                {" "}discount impact analysis
              </Link>
              {" "}before launch.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-3.5 p-5 sm:p-6">
            <h2 className="text-xl font-semibold tracking-tight">Common mistakes</h2>
            <ul className="space-y-2.5 pl-5 text-sm leading-6 text-muted-foreground">
              <li className="list-disc marker:text-amber-600">Treating shipping as fixed overhead instead of unit economics input.</li>
              <li className="list-disc marker:text-amber-600">Ignoring payment and channel fees when setting promo depth.</li>
              <li className="list-disc marker:text-amber-600">Using one margin target across SKUs with different fee profiles.</li>
              <li className="list-disc marker:text-amber-600">Reviewing revenue trends without contribution trend by SKU tier.</li>
            </ul>
          </CardContent>
        </Card>

        <OperatorTakeawayCard
          title="Practical operator recommendations"
          bullets={[
            "Audit margin in stages before changing price or ad budgets.",
            "Set minimum acceptable real margin after full fee loading, not before.",
            "Flag SKUs where real margin drops below threshold after shipping and payment fees.",
            "Pair fee-aware margin checks with discount scenario testing before campaigns."
          ]}
        />
      </section>

      <ContentCtaBlock
        title="Calculate real margin before you commit pricing"
        description="Run your actual fee stack to see contribution margin after shipping and payment drag, then validate promo safety."
        actions={[
          { label: "Margin Calculator After Shipping Fees", href: "/tools/margin-calculator-after-shipping-fees" },
          { label: "Import Profit Margin Calculator", href: "/tools/import-profit-margin-calculator" },
          { label: "Discount Impact Guide", href: "/how-discounts-affect-profit-margin" }
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
          <Link href="/landed-cost-vs-product-cost" className="text-primary hover:text-primary/80">
            landed cost vs product cost
          </Link>
          {" "}and{" "}
          <Link href="/profit-margin-tools" className="text-primary hover:text-primary/80">
            profit margin tool workflows
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


