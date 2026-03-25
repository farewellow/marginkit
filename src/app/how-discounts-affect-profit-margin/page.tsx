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
    "Learn exactly how discount depth compresses profit margin, when discount campaigns become risky, and how many extra units you need to protect profit.",
  pathname: "/how-discounts-affect-profit-margin"
});

const basePrice = 40;
const unitCost = 26;
const baseUnits = 800;
const discountLevels = [0, 5, 10, 15, 20, 30];

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
  },
  {
    scenario: "30% discount",
    cells: ["$28.00", "7.1%", "+4,800 units", "Unsustainable for most SKUs"]
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
    question: "How do discounts affect profit margin in practice?",
    answer:
      "Discounts reduce selling price while many costs stay unchanged. Profit per unit shrinks first, so margin drops even when unit sales increase."
  },
  {
    question: "How do I calculate margin after discount?",
    answer:
      "Use margin after discount = (discounted price - full unit cost) / discounted price. Full unit cost should include product, shipping, payment, and other variable fees."
  },
  {
    question: "When does discounting become dangerous?",
    answer:
      "Discounting becomes dangerous when required volume lift is unrealistic for your channel. If you need 40-60% more units just to hold profit flat, risk is already high."
  },
  {
    question: "Can discount campaigns increase revenue but reduce contribution margin?",
    answer:
      "Yes. Revenue can grow from higher order count while contribution margin falls because profit per order is lower. Always compare both revenue and profit contribution."
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
          A discount percent is not equal to a margin drop. A 10% price cut can compress margin much more than 10% once full costs are
          loaded. This guide helps you model margin compression, contribution impact, and required volume lift before launching campaigns.
        </p>
      </section>

      <Card className="border-primary/20 bg-gradient-to-r from-sky-50/80 to-white shadow-none">
        <CardContent className="p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/90">Short direct answer</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Discounts reduce profit per unit first, then force volume growth to protect total profit. In this guide scenario, a 10%
            discount lowers margin from 35.0% to 27.8% and needs about 40% more units to break even on monthly contribution.
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
          description="Same SKU economics across five promo depths."
        />
        <ScenarioComparisonTable
          headers={["Discounted price", "New margin", "Extra units needed", "Interpretation"]}
          rows={scenarioRows}
        />
      </section>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Decision signal"
          title="When revenue can rise but contribution margin still declines"
          description="Campaigns can look strong on top-line sales while unit economics weaken underneath."
        />
        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-3 p-5 text-sm leading-6 text-muted-foreground">
            <p>
              Discount campaigns are often judged by revenue and order count. The operating risk appears when the added orders do not
              offset lower profit per order. In that case, contribution margin declines even with visible sales growth.
            </p>
            <p>
              Pressure-test discount plans with
              <Link href="/how-to-calculate-profit-margin-after-shipping-and-fees" className="text-primary hover:text-primary/80">
                {" "}real margin after shipping and fees
              </Link>
              , set a hard price floor using the
              <Link href="/tools/break-even-selling-price-after-import-costs" className="text-primary hover:text-primary/80">
                {" "}break-even selling price tool
              </Link>
              , and validate import overhead with
              <Link href="/how-to-calculate-landed-cost-for-imported-products" className="text-primary hover:text-primary/80">
                {" "}landed cost calculations
              </Link>
              .
            </p>
          </CardContent>
        </Card>
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
          secondarySeriesIndex={1}
          secondaryYAxisLabel="Volume lift"
          secondaryYTickFormatter={(value) => `${value.toFixed(0)}%`}
          yDomain={{ min: 0, max: 40 }}
          secondaryYDomain={{ min: 0, max: 600 }}
        />
        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-2.5 p-5 text-sm leading-6 text-muted-foreground">
            <p>
              In this scenario, 10% discount already needs 40% more units just to keep profit flat. At 20% discount, you need more than
              double-digit demand growth pressure in almost every channel.
            </p>
            <p>
              Low-margin products are more fragile because new profit per unit gets small quickly. Test assumptions first in the
              <Link href="/tools/discount-impact-on-margin-calculator" className="text-primary hover:text-primary/80">
                {" "}discount impact calculator
              </Link>
              {" "}and cross-check full cost basis in
              <Link href="/tools/margin-calculator-after-shipping-fees" className="text-primary hover:text-primary/80">
                {" "}margin after shipping fees
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
          { label: "How to Calculate Margin After Fees", href: "/how-to-calculate-profit-margin-after-shipping-and-fees" },
          { label: "Break-even Selling Price Tool", href: "/tools/break-even-selling-price-after-import-costs" },
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
          Continue analysis:{" "}
          <Link href="/how-to-calculate-landed-cost-for-imported-products" className="text-primary hover:text-primary/80">
            landed cost for imported products
          </Link>
          {" "}and{" "}
          <Link href="/landed-cost-formula" className="text-primary hover:text-primary/80">
            landed cost formula
          </Link>
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