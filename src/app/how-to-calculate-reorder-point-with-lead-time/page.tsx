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
  title: "How to Calculate Reorder Point with Lead Time",
  description:
    "Practical reorder-point guide with lead-time demand, safety-stock scenarios, comparison table, and demand sensitivity chart for inventory decisions.",
  pathname: "/how-to-calculate-reorder-point-with-lead-time"
});

const salesLabels = ["10", "20", "30", "40", "50", "60"];
const leadTimeDays = 18;

const salesValues = [10, 20, 30, 40, 50, 60];
const reorderSeries = [
  {
    name: "Safety stock 100",
    color: "#0284c7",
    values: salesValues.map((sales) => sales * leadTimeDays + 100)
  },
  {
    name: "Safety stock 200",
    color: "#14b8a6",
    values: salesValues.map((sales) => sales * leadTimeDays + 200)
  },
  {
    name: "Safety stock 300",
    color: "#f59e0b",
    values: salesValues.map((sales) => sales * leadTimeDays + 300)
  }
];

const scenarioRows = [
  {
    scenario: "Low demand",
    cells: ["18 units/day", "20 days", "120 units", "480 units"]
  },
  {
    scenario: "Medium demand",
    cells: ["32 units/day", "20 days", "180 units", "820 units"]
  },
  {
    scenario: "High demand",
    cells: ["48 units/day", "20 days", "250 units", "1,210 units"]
  }
];

const faqItems: FAQItem[] = [
  {
    question: "What changes reorder point more: demand or lead time?",
    answer:
      "Both matter, but lead-time surprises are usually more damaging operationally because they compound demand while stock is already in transit."
  },
  {
    question: "How often should reorder point assumptions be updated?",
    answer:
      "At least monthly for active SKUs, and immediately after supplier delays, demand shifts, or major campaign changes."
  },
  {
    question: "Can I set one safety stock value for every SKU?",
    answer:
      "Usually no. Fast movers and volatile SKUs need larger buffers than slow, stable products."
  },
  {
    question: "When is a reorder point too aggressive?",
    answer:
      "If frequent stockouts happen despite reordering on time, your lead-time demand or safety-stock assumptions are too low."
  }
];

export default function ReorderPointGuidePage() {
  return (
    <div className="container space-y-10 py-8 sm:space-y-11 sm:py-10">
      <SiteBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Inventory Planning Tools", href: "/inventory-planning-tools" },
          { label: "How to Calculate Reorder Point with Lead Time" }
        ]}
      />

      <section className="max-w-4xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/90">Inventory Decision Guide</p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">How to calculate reorder point with lead time</h1>
        <p className="text-sm leading-6 text-muted-foreground sm:text-base">
          Reorder point tells you when to place the next PO so inventory covers lead-time demand plus a risk buffer. This page goes beyond
          the formula and shows how demand pace, lead-time assumptions, and safety stock move the threshold.
        </p>
      </section>

      <Card className="border-primary/20 bg-gradient-to-r from-sky-50/80 to-white shadow-none">
        <CardContent className="p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/90">Short direct answer</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Reorder point = average daily sales x lead time (days) + safety stock. If either demand or lead time rises, reorder point should
            rise too.
          </p>
        </CardContent>
      </Card>

      <FormulaBreakdownCard
        title="Reorder-point formula breakdown"
        formula="Reorder point = Lead-time demand + Safety stock = (Average daily sales x Lead time) + Safety stock"
        items={[
          {
            label: "Lead-time demand",
            detail: "Units expected to sell while waiting for replenishment to arrive."
          },
          {
            label: "Safety stock",
            detail: "Buffer to absorb volatility in demand and delays in supply."
          },
          {
            label: "Practical use",
            detail: "Set reorder alerts at or above this threshold to reduce stockout risk."
          }
        ]}
      />

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Worked scenario"
          title="Worked example with lead-time logic"
          description="SKU baseline with medium demand and moderate supply risk."
        />
        <Card className="border-border/85 shadow-none">
          <CardContent className="grid gap-4 p-5 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold">Inputs</p>
              <ul className="mt-2 space-y-2.5 text-sm leading-6 text-muted-foreground">
                <li>Average daily sales: 35 units</li>
                <li>Lead time: 18 days</li>
                <li>Safety stock: 220 units</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">Output</p>
              <ul className="mt-2 space-y-2.5 text-sm leading-6 text-muted-foreground">
                <li>Lead-time demand: 630 units</li>
                <li>Reorder point: 850 units</li>
                <li>If stock drops below 850, reorder window is already tight</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Scenario comparison"
          title="How demand profile changes reorder threshold"
          description="Lead time is fixed at 20 days to isolate demand impact."
        />
        <ScenarioComparisonTable
          headers={["Average daily sales", "Lead time", "Safety stock", "Reorder point"]}
          rows={scenarioRows}
        />
      </section>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Demand sensitivity"
          title="Reorder point rises fast as daily sales increase"
          description="Three safety-stock assumptions are shown for the same 18-day lead time."
        />
        <AnalysisLineChart
          xLabels={salesLabels}
          series={reorderSeries}
          yAxisLabel="Reorder point (units)"
          xAxisLabel="Average daily sales"
          yTickFormatter={(value) => `${Math.round(value)}`}
        />
        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-2.5 p-5 text-sm leading-6 text-muted-foreground">
            <p>
              The distance between lines is pure safety stock policy. The slope of each line is lead time. If lead time is unstable,
              your reorder point should usually be more conservative, not tighter.
            </p>
            <p>
              Example: at 35 units/day, changing lead time from 14 to 24 days adds 350 units to lead-time demand before safety stock.
              Many spreadsheet setups underweight this risk.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-3.5 p-5 sm:p-6">
            <h2 className="text-xl font-semibold tracking-tight">Common mistakes</h2>
            <ul className="space-y-2.5 text-sm leading-6 text-muted-foreground">
              <li className="list-disc pl-1 marker:text-amber-600">Using old sales averages that ignore recent demand acceleration.</li>
              <li className="list-disc pl-1 marker:text-amber-600">Assuming supplier lead time is stable when customs or freight is volatile.</li>
              <li className="list-disc pl-1 marker:text-amber-600">Keeping safety stock unchanged across SKUs with different risk profiles.</li>
              <li className="list-disc pl-1 marker:text-amber-600">Reordering too late because threshold is based on optimistic assumptions.</li>
            </ul>
          </CardContent>
        </Card>

        <OperatorTakeawayCard
          title="Operator takeaways"
          bullets={[
            "If stockouts persist, your reorder point is likely too aggressive.",
            "If lead time is volatile, safety stock should absorb that volatility.",
            "Review reorder assumptions whenever demand or supplier reliability shifts.",
            "Use SKU-level thresholds instead of one global rule for all products."
          ]}
        />
      </section>

      <ContentCtaBlock
        title="Turn this into operational reorder thresholds"
        description="Calculate SKU-level reorder points, safety stock, and CSV-based alert status with your own data."
        actions={[
          { label: "Reorder Point Calculator", href: "/tools/reorder-point-calculator-lead-time" },
          { label: "Safety Stock Calculator", href: "/tools/safety-stock-calculator-ecommerce" },
          { label: "Upload Inventory CSV", href: "/tools/upload-inventory-csv-reorder-alerts" }
        ]}
      />

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Clarifications for lead-time and threshold decisions."
        />
        <FAQSection items={faqItems} />
      </section>

      <Card className="border-border/85 shadow-none">
        <CardContent className="p-5 text-sm text-muted-foreground">
          Continue analysis: <Link href="/how-to-calculate-landed-cost-for-imported-products" className="text-primary hover:text-primary/80">landed cost for imported products</Link>
          {" "}and{" "}
          <Link href="/how-discounts-affect-profit-margin" className="text-primary hover:text-primary/80">how discounts affect margin</Link>
          .
        </CardContent>
      </Card>

      <RelatedTools
        relatedSlugs={[
          "reorder-point-calculator-lead-time",
          "safety-stock-calculator-ecommerce",
          "upload-inventory-csv-reorder-alerts",
          "days-of-inventory-left-calculator"
        ]}
      />
    </div>
  );
}




