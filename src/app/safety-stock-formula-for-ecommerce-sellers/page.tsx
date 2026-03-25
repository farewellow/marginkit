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
  title: "Safety Stock Formula for Ecommerce Sellers",
  description:
    "Use a practical safety stock formula for ecommerce demand and lead-time variability. Includes worked examples, reorder-point context, and risk guidance.",
  pathname: "/safety-stock-formula-for-ecommerce-sellers"
});

const volatilityLabels = ["Stable", "Moderate", "High volatility"];

const safetyStockSeries = [144, 390, 960];
const reorderPointSeries = [504, 810, 1440];

const comparisonRows = [
  {
    scenario: "Stable demand",
    cells: ["30 avg / 36 peak", "12d avg / 14d max", "144", "504", "Lean but resilient"]
  },
  {
    scenario: "Moderate volatility",
    cells: ["30 avg / 45 peak", "14d avg / 18d max", "390", "810", "Balanced for mixed risk"]
  },
  {
    scenario: "High volatility",
    cells: ["30 avg / 60 peak", "16d avg / 24d max", "960", "1,440", "Service-first, capital heavy"]
  }
];

const faqItems: FAQItem[] = [
  {
    question: "What is safety stock?",
    answer:
      "Safety stock is extra inventory kept above expected lead-time demand to reduce stockout risk when demand spikes or supplier lead times slip."
  },
  {
    question: "What is the safety stock formula?",
    answer:
      "A practical formula is: (max daily sales x max lead time) - (average daily sales x average lead time). This estimates the demand buffer for volatility."
  },
  {
    question: "What is the difference between safety stock and reorder point?",
    answer:
      "Safety stock is the buffer. Reorder point is lead-time demand plus that buffer. Reorder point tells you when to reorder, safety stock defines the protection level."
  },
  {
    question: "How much safety stock should ecommerce sellers keep?",
    answer:
      "Enough to match your stockout tolerance and lead-time reliability. Fast-moving or volatile SKUs usually need larger buffers than stable long-tail SKUs."
  }
];

export default function SafetyStockFormulaGuidePage() {
  return (
    <div className="container space-y-10 py-8 sm:space-y-11 sm:py-10">
      <SiteBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Inventory Planning Tools", href: "/inventory-planning-tools" },
          { label: "Safety Stock Formula for Ecommerce Sellers" }
        ]}
      />

      <section className="max-w-4xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/90">Risk Threshold Guide</p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Safety stock formula for ecommerce sellers
        </h1>
        <p className="text-sm leading-6 text-muted-foreground sm:text-base">
          Safety stock is a decision tool, not just a formula. Set your buffer too low and you miss sales during lead-time delays. Set
          it too high and cash gets trapped in inventory. This guide helps you size the buffer based on demand and supply volatility.
        </p>
      </section>

      <Card className="border-primary/20 bg-gradient-to-r from-sky-50/80 to-white shadow-none">
        <CardContent className="p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/90">Short direct answer</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Safety stock formula: (max daily sales x max lead time) - (average daily sales x average lead time). Then calculate reorder
            point as lead-time demand plus safety stock.
          </p>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Core distinction"
          title="Safety stock vs reorder point"
          description="These two metrics work together but solve different planning questions."
        />
        <ComparisonFrame
          leftTitle="Safety stock"
          leftPoints={[
            "Inventory buffer for uncertainty",
            "Absorbs demand spikes and delay risk",
            "Calculated from volatility assumptions",
            "Defines service-level protection"
          ]}
          rightTitle="Reorder point"
          rightPoints={[
            "Trigger level for placing a purchase order",
            "Equals lead-time demand plus safety stock",
            "Operational threshold used by planners",
            "Keeps replenishment timing consistent"
          ]}
        />
      </section>

      <FormulaBreakdownCard
        title="Safety stock formula explained simply"
        formula="Safety stock = (Max daily sales x Max lead time) - (Average daily sales x Average lead time)"
        items={[
          {
            label: "Worst-case lead-time demand",
            detail: "Max daily sales multiplied by max observed lead time."
          },
          {
            label: "Expected lead-time demand",
            detail: "Average daily sales multiplied by average lead time."
          },
          {
            label: "Decision use",
            detail: "Use safety stock as your volatility buffer, then add it to lead-time demand for reorder point."
          }
        ]}
      />

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Worked example"
          title="Worked ecommerce scenario"
          description="SKU with seasonal demand swings and import lead-time variability."
        />
        <Card className="border-border/85 shadow-none">
          <CardContent className="grid gap-4 p-5 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold">Inputs</p>
              <ul className="mt-2 space-y-2.5 text-sm leading-6 text-muted-foreground">
                <li>Average daily sales: 40 units</li>
                <li>Max daily sales: 62 units</li>
                <li>Average lead time: 16 days</li>
                <li>Max lead time: 24 days</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">Outputs</p>
              <ul className="mt-2 space-y-2.5 text-sm leading-6 text-muted-foreground">
                <li>Expected lead-time demand: 640 units</li>
                <li>Worst-case lead-time demand: 1,488 units</li>
                <li>Safety stock: 848 units</li>
                <li>Reorder point: 1,488 units</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Primary table"
          title="Stable vs volatile conditions"
          description="Same average demand, different volatility assumptions and resulting safety-stock policy."
        />
        <ScenarioComparisonTable
          headers={[
            "Demand profile (units/day)",
            "Lead time profile",
            "Safety stock (units)",
            "Reorder point (units)",
            "Interpretation"
          ]}
          rows={comparisonRows}
        />
      </section>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Primary visual"
          title="Safety stock requirement grows as volatility rises"
          description="Buffer policy and reorder threshold both expand quickly from stable to high-volatility conditions."
        />
        <AnalysisLineChart
          xLabels={volatilityLabels}
          series={[
            {
              name: "Safety stock (units)",
              color: "#0284c7",
              values: safetyStockSeries
            },
            {
              name: "Reorder point (units)",
              color: "#f59e0b",
              values: reorderPointSeries
            }
          ]}
          yAxisLabel="Units"
          xAxisLabel="Volatility profile"
          yTickFormatter={(value) => `${Math.round(value)}`}
        />
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <ThresholdNote
          title="Which inputs matter most?"
          description="These three drivers usually move safety stock the fastest:"
          bullets={[
            "Lead time reliability: longer and less predictable lead times require larger buffers.",
            "Demand variability: wider daily sales swings increase stockout exposure.",
            "Service level target: lower stockout tolerance means higher safety stock.",
            "Review cadence: stale max-demand or max-lead assumptions create false confidence."
          ]}
        />

        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-3.5 p-5 sm:p-6">
            <h2 className="text-xl font-semibold tracking-tight">When the buffer policy should change</h2>
            <p className="text-sm leading-6 text-muted-foreground">
              Increase safety stock when lead-time delays become frequent, campaigns drive demand volatility, or stockouts carry higher
              revenue risk. Reduce gradually when demand normalizes and supplier performance stabilizes.
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              Keep action thresholds aligned with
              <Link href="/tools/reorder-point-calculator-lead-time" className="text-primary hover:text-primary/80">
                {" "}reorder point calculations
              </Link>
              {" "}and review workflow from the
              <Link href="/inventory-planning-tools" className="text-primary hover:text-primary/80">
                {" "}inventory planning hub
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
              <li className="list-disc marker:text-amber-600">Using average demand only and ignoring peak-day demand risk.</li>
              <li className="list-disc marker:text-amber-600">Keeping fixed lead-time assumptions while suppliers drift.</li>
              <li className="list-disc marker:text-amber-600">Applying one safety-stock rule to all SKUs regardless of volatility.</li>
              <li className="list-disc marker:text-amber-600">Updating reorder alerts without refreshing safety-stock inputs.</li>
            </ul>
          </CardContent>
        </Card>

        <OperatorTakeawayCard
          title="Operator takeaway and risk balancing"
          bullets={[
            "Treat safety stock as a risk policy linked to service level.",
            "Recalculate after major lead-time or demand changes.",
            "Set SKU-tier buffers instead of one blanket rule.",
            "Use CSV reorder alerts to monitor urgency at scale."
          ]}
        />
      </section>

      <ContentCtaBlock
        title="Turn buffer policy into live reorder actions"
        description="Calculate safety stock, map reorder points, and monitor status across your SKU list."
        actions={[
          { label: "Safety Stock Calculator", href: "/tools/safety-stock-calculator-ecommerce" },
          { label: "Reorder Point Calculator", href: "/tools/reorder-point-calculator-lead-time" },
          { label: "Upload Inventory CSV", href: "/tools/upload-inventory-csv-reorder-alerts" },
          { label: "Inventory Planning Tools", href: "/inventory-planning-tools" }
        ]}
      />

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Clarifications for safety-stock and reorder-threshold decisions."
        />
        <FAQSection items={faqItems} />
      </section>

      <Card className="border-border/85 shadow-none">
        <CardContent className="p-5 text-sm text-muted-foreground">
          Continue analysis:{" "}
          <Link href="/how-to-calculate-reorder-point-with-lead-time" className="text-primary hover:text-primary/80">
            reorder point with lead time
          </Link>
          {" "}and{" "}
          <Link href="/tools/days-of-inventory-left-calculator" className="text-primary hover:text-primary/80">
            days of inventory left
          </Link>
          .
        </CardContent>
      </Card>

      <RelatedTools
        relatedSlugs={[
          "safety-stock-calculator-ecommerce",
          "reorder-point-calculator-lead-time",
          "upload-inventory-csv-reorder-alerts",
          "days-of-inventory-left-calculator"
        ]}
      />
    </div>
  );
}