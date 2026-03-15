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
    "Risk-threshold guide for ecommerce safety stock: formula logic, volatility scenarios, charted buffer growth, and practical reorder implications.",
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
    question: "Which variable usually changes safety stock the most?",
    answer:
      "Lead-time volatility often has the largest impact because delays compound demand exposure while replacement stock is in transit."
  },
  {
    question: "Can safety stock be too high?",
    answer:
      "Yes. If stockout risk is low but inventory carrying pressure rises, your buffer may be beyond what service levels require."
  },
  {
    question: "How often should safety-stock assumptions be reviewed?",
    answer:
      "Review monthly for active SKUs and immediately after demand shocks, supplier changes, or recurring lead-time delays."
  },
  {
    question: "Should every SKU use the same safety-stock rule?",
    answer:
      "No. High-velocity or volatile SKUs usually need larger buffers than slow and stable products."
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
          Safety stock protects you from demand spikes and lead-time surprises. This guide shows how to size the buffer with practical
          volatility scenarios, then translate that buffer into reorder decisions. Use it with the
          <Link href="/tools/safety-stock-calculator-ecommerce" className="text-primary hover:text-primary/80">
            {" "}safety stock calculator
          </Link>
          {" "}and your SKU-level lead-time data.
        </p>
      </section>

      <Card className="border-primary/20 bg-gradient-to-r from-sky-50/80 to-white shadow-none">
        <CardContent className="p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/90">Short direct answer</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            A practical safety stock formula is: (max daily sales x max lead time) - (average daily sales x average lead time).
            Higher demand and lead-time volatility require a larger buffer.
          </p>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Risk tradeoff"
          title="Buffer policy in one view"
          description="The right safety stock balances service reliability against cash and carrying pressure."
        />
        <ComparisonFrame
          leftTitle="Safety stock too low"
          leftPoints={[
            "Frequent stockout risk during demand spikes",
            "Late reorder windows when lead time stretches",
            "Lost sales and unstable ad efficiency",
            "Reactive emergency replenishment costs"
          ]}
          rightTitle="Safety stock too high"
          rightPoints={[
            "Lower stockout probability at same service target",
            "More stable reorder cadence under volatility",
            "Higher capital tied in slow-moving inventory",
            "Potential markdown risk if demand cools"
          ]}
        />
      </section>

      <FormulaBreakdownCard
        title="Safety stock formula explained simply"
        formula="Safety stock = (Max daily sales x Max lead time) - (Average daily sales x Average lead time)"
        items={[
          {
            label: "Worst-case demand during replenishment",
            detail: "Max daily sales multiplied by max observed lead time."
          },
          {
            label: "Expected demand during replenishment",
            detail: "Average daily sales multiplied by average lead time."
          },
          {
            label: "Decision use",
            detail: "Add safety stock to lead-time demand to set reorder thresholds."
          }
        ]}
      />

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Worked scenario"
          title="Worked example with real volatility"
          description="Single ecommerce SKU with mixed demand and supplier delay risk."
        />
        <Card className="border-border/85 shadow-none">
          <CardContent className="grid gap-4 p-5 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold">Inputs</p>
              <ul className="mt-2 space-y-2.5 text-sm leading-6 text-muted-foreground">
                <li>Average daily sales: 42 units</li>
                <li>Max daily sales: 65 units</li>
                <li>Average lead time: 14 days</li>
                <li>Max lead time: 20 days</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">Outputs</p>
              <ul className="mt-2 space-y-2.5 text-sm leading-6 text-muted-foreground">
                <li>Expected lead-time demand: 588 units</li>
                <li>Worst-case lead-time demand: 1,300 units</li>
                <li>Safety stock: 712 units</li>
                <li>Reorder point baseline: 1,300 units</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Primary table"
          title="Stable vs volatile conditions"
          description="Same average demand, different volatility assumptions and resulting safety-stock needs."
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
        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-2.5 p-5 text-sm leading-6 text-muted-foreground">
            <p>
              The slope between moderate and high volatility is the real risk signal. If your lead time or demand profile starts drifting,
              delayed adjustments can push reorder thresholds out of date very quickly.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <ThresholdNote
          title="What changes the answer most?"
          description="These drivers usually move safety stock faster than teams expect:"
          bullets={[
            "Lead-time variance after customs or carrier disruptions",
            "Promotional demand spikes that invalidate old averages",
            "Low update cadence on max-demand and max-lead-time assumptions",
            "Shared safety-stock rules across SKUs with different volatility"
          ]}
        />

        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-3.5 p-5 sm:p-6">
            <h2 className="text-xl font-semibold tracking-tight">When safety stock becomes too aggressive</h2>
            <p className="text-sm leading-6 text-muted-foreground">
              Oversized buffers can protect service levels but consume capital and increase aged inventory risk. If stockouts are rare
              and days-on-hand keeps expanding, your buffer may be above what current volatility requires.
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              Recalibrate with
              <Link href="/tools/reorder-point-calculator-lead-time" className="text-primary hover:text-primary/80">
                {" "}reorder point modeling
              </Link>
              {" "}and align thresholds by SKU risk tier.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-3.5 p-5 sm:p-6">
            <h2 className="text-xl font-semibold tracking-tight">Common mistakes</h2>
            <ul className="space-y-2.5 pl-5 text-sm leading-6 text-muted-foreground">
              <li className="list-disc marker:text-amber-600">Treating average demand as if demand volatility does not exist.</li>
              <li className="list-disc marker:text-amber-600">Using fixed lead time while supplier performance is drifting.</li>
              <li className="list-disc marker:text-amber-600">Applying one buffer rule to every SKU regardless of risk profile.</li>
              <li className="list-disc marker:text-amber-600">Updating reorder alerts without revisiting safety-stock assumptions.</li>
            </ul>
          </CardContent>
        </Card>

        <OperatorTakeawayCard
          title="Operator takeaway and risk balancing"
          bullets={[
            "Set safety stock from volatility evidence, not static habit.",
            "Increase buffers when lead-time reliability weakens or promotions intensify.",
            "Reduce buffers gradually when volatility normalizes to avoid overstock lockup.",
            "Review SKU thresholds monthly and after each major supply event."
          ]}
        />
      </section>

      <ContentCtaBlock
        title="Turn buffer policy into live reorder actions"
        description="Calculate safety stock, map reorder points, and monitor status across your CSV inventory in one workflow."
        actions={[
          { label: "Safety Stock Calculator", href: "/tools/safety-stock-calculator-ecommerce" },
          { label: "Reorder Point Calculator", href: "/tools/reorder-point-calculator-lead-time" },
          { label: "Upload Inventory CSV", href: "/tools/upload-inventory-csv-reorder-alerts" },
          { label: "Reorder Point Guide", href: "/how-to-calculate-reorder-point-with-lead-time" }
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
          <Link href="/inventory-planning-tools" className="text-primary hover:text-primary/80">
            inventory planning tool workflows
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


