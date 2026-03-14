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
  title: "How Discounts Affect Profit Margin",
  description:
    "Practical discount economics for operators: margin compression, extra units required, worked scenarios, and decision thresholds before running promos.",
  pathname: "/how-discounts-affect-profit-margin"
});

const basePrice = 40;
const unitCost = 26;
const baseUnits = 800;
const discountLevels = [0, 5, 10, 15, 20];

const scenarioRows = [
  {
    scenario: "5% discount",
    cells: ["$38.00", "31.6%", "+133 units", "Medium pressure"]
  },
  {
    scenario: "10% discount",
    cells: ["$36.00", "27.8%", "+320 units", "High pressure"]
  },
  {
    scenario: "15% discount",
    cells: ["$34.00", "23.5%", "+600 units", "Very high pressure"]
  },
  {
    scenario: "20% discount",
    cells: ["$32.00", "18.8%", "+1,067 units", "Critical"]
  }
];

const marginSeries = discountLevels.map((discount) => {
  const price = basePrice * (1 - discount / 100);
  const profit = price - unitCost;
  return Number(((profit / price) * 100).toFixed(1));
});

const requiredVolumeLiftSeries = discountLevels.map((discount) => {
  if (discount === 0) return 0;

  const oldProfitPerUnit = basePrice - unitCost;
  const newPrice = basePrice * (1 - discount / 100);
  const newProfitPerUnit = newPrice - unitCost;
  const oldTotalProfit = oldProfitPerUnit * baseUnits;
  const neededUnits = oldTotalProfit / newProfitPerUnit;
  return Number((((neededUnits - baseUnits) / baseUnits) * 100).toFixed(1));
});

const faqItems: FAQItem[] = [
  {
    question: "Why can revenue rise while profit gets worse?",
    answer:
      "Discounts can increase order count, but if profit per unit drops too much, total profit still declines even with higher revenue."
  },
  {
    question: "What is a practical warning threshold before launching a discount?",
    answer:
      "If required volume lift exceeds 40-50%, most teams should pressure-test conversion assumptions before launch."
  },
  {
    question: "Are discounts always bad for low-margin products?",
    answer:
      "Not always, but low-margin SKUs are less forgiving. Small discount depth can create large volume requirements."
  },
  {
    question: "When is bundling better than direct discounting?",
    answer:
      "Bundling can protect perceived price and improve average order value while reducing direct margin compression on core SKUs."
  }
];

export default function DiscountImpactGuidePage() {
  return (
    <div className="container space-y-10 py-8 sm:space-y-11 sm:py-10">
      <SiteBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Profit & Margin Tools", href: "/profit-margin-tools" },
          { label: "How Discounts Affect Profit Margin" }
        ]}
      />

      <section className="max-w-4xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/90">Pricing Decision Guide</p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">How discounts affect profit margin</h1>
        <p className="text-sm leading-6 text-muted-foreground sm:text-base">
          Discounts do not hurt every product equally. The same 10% promotion can be manageable on a high-margin SKU and destructive on a
          low-margin SKU. This guide helps you check margin compression and required volume lift before launch.
        </p>
      </section>

      <Card className="border-primary/20 bg-gradient-to-r from-sky-50/80 to-white shadow-none">
        <CardContent className="p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/90">Short direct answer</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Discounts reduce profit per unit first. To break even on total profit, you must sell extra units. The deeper the discount,
            the faster required volume increases.
          </p>
        </CardContent>
      </Card>

      <FormulaBreakdownCard
        title="Core discount formulas for operators"
        formula="Extra units needed = (Old profit per unit x current units / New profit per unit) - current units"
        items={[
          {
            label: "Old profit per unit",
            detail: "Original selling price minus full per-unit cost."
          },
          {
            label: "New profit per unit",
            detail: "Discounted price minus the same per-unit cost."
          },
          {
            label: "Margin before and after",
            detail: "Profit per unit divided by selling price. Track this to avoid hidden compression."
          }
        ]}
      />

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Worked scenario"
          title="Worked example: $40 item, $26 cost, 800 units/month"
          description="Baseline margin is 35% before discounts."
        />
        <Card className="border-border/85 shadow-none">
          <CardContent className="grid gap-4 p-5 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold">Before discount</p>
              <ul className="mt-2 space-y-2.5 text-sm leading-6 text-muted-foreground">
                <li>Selling price: $40</li>
                <li>Unit cost: $26</li>
                <li>Profit per unit: $14</li>
                <li>Monthly profit at 800 units: $11,200</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">After 15% discount</p>
              <ul className="mt-2 space-y-2.5 text-sm leading-6 text-muted-foreground">
                <li>Discounted price: $34</li>
                <li>New profit per unit: $8</li>
                <li>New margin: 23.5%</li>
                <li>Required units to hold $11,200 profit: 1,400 (+600 units)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Scenario comparison"
          title="Discount depth vs margin and volume pressure"
          description="Same SKU economics across four promo depths."
        />
        <ScenarioComparisonTable
          headers={["Discounted price", "New margin", "Extra units needed", "Interpretation"]}
          rows={scenarioRows}
        />
      </section>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Analytical interpretation"
          title="Where discounting becomes dangerous"
          description="Margin drops while required volume lift climbs faster than many teams expect."
        />
        <AnalysisLineChart
          xLabels={discountLevels.map((item) => `${item}%`)}
          series={[
            {
              name: "Margin after discount (%)",
              color: "#0284c7",
              values: marginSeries
            },
            {
              name: "Required volume lift (%)",
              color: "#f59e0b",
              values: requiredVolumeLiftSeries
            }
          ]}
          yAxisLabel="Percent"
          xAxisLabel="Discount depth"
          yTickFormatter={(value) => `${value.toFixed(0)}%`}
        />
        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-2.5 p-5 text-sm leading-6 text-muted-foreground">
            <p>
              In this scenario, 10% discount already needs 40% more units just to keep profit flat. At 20% discount, you need more than
              double-digit demand growth pressure in almost every channel.
            </p>
            <p>
              Low-margin products are more fragile because new profit per unit gets small quickly. Test assumptions first in the
              <Link href="/tools/discount-impact-on-margin-calculator" className="text-primary hover:text-primary/80"> discount impact calculator</Link>
              and cross-check full cost basis in <Link href="/tools/margin-calculator-after-shipping-fees" className="text-primary hover:text-primary/80">margin after shipping fees</Link>.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-3.5 p-5 sm:p-6">
            <h2 className="text-xl font-semibold tracking-tight">Common mistakes</h2>
            <ul className="space-y-2.5 text-sm leading-6 text-muted-foreground">
              <li className="list-disc pl-1 marker:text-amber-600">Judging promo performance by revenue only, not contribution profit.</li>
              <li className="list-disc pl-1 marker:text-amber-600">Discounting low-margin SKUs without modeling required unit lift.</li>
              <li className="list-disc pl-1 marker:text-amber-600">Ignoring fee drag from shipping, payment, and channel charges during promos.</li>
              <li className="list-disc pl-1 marker:text-amber-600">Running same discount depth across all SKUs without profitability tiers.</li>
            </ul>
          </CardContent>
        </Card>

        <OperatorTakeawayCard
          title="Operator takeaways"
          bullets={[
            "Discount when inventory pressure is real and you can support required volume.",
            "Hold price when required volume lift is above your realistic conversion upside.",
            "Bundle instead of deep discount when you need to protect SKU-level margin.",
            "Set maximum discount depth by margin tier, not by campaign preference."
          ]}
        />
      </section>

      <ContentCtaBlock
        title="Validate your promo economics before launch"
        description="Run discount scenarios on your own products and quantify the exact margin and volume tradeoff."
        actions={[
          { label: "Discount Impact Calculator", href: "/tools/discount-impact-on-margin-calculator" },
          { label: "Margin After Shipping Fees", href: "/tools/margin-calculator-after-shipping-fees" },
          { label: "Profit & Margin Hub", href: "/profit-margin-tools" }
        ]}
      />

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Clarifications for promotion planning decisions."
        />
        <FAQSection items={faqItems} />
      </section>

      <Card className="border-border/85 shadow-none">
        <CardContent className="p-5 text-sm text-muted-foreground">
          Continue analysis: <Link href="/how-to-calculate-landed-cost-for-imported-products" className="text-primary hover:text-primary/80">landed cost for imported products</Link>
          {" "}and{" "}
          <Link href="/how-to-calculate-reorder-point-with-lead-time" className="text-primary hover:text-primary/80">
            reorder point with lead time
          </Link>
          .
        </CardContent>
      </Card>

      <RelatedTools
        relatedSlugs={[
          "discount-impact-on-margin-calculator",
          "margin-calculator-after-shipping-fees",
          "supplier-cost-increase-impact-calculator",
          "break-even-roas-calculator-ecommerce"
        ]}
      />
    </div>
  );
}




