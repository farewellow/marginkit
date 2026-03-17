import Link from "next/link";

import { AnalysisLineChart } from "@/components/content/analysis-line-chart";
import { AnalyticalSectionHeading } from "@/components/content/analytical-section-heading";
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
  title: "Landed Cost Formula: Total Landed Cost Formula + Excel Logic",
  description:
    "Practical landed cost formula guide with components, worked numeric example, spreadsheet logic, and links to pricing and margin decisions.",
  pathname: "/landed-cost-formula"
});

const formulaStageLabels = ["Product only", "+ Shipping", "+ Duty + tax", "+ Insurance + handling"];

const formulaComparisonRows = [
  {
    scenario: "Product cost only",
    cells: ["Product cost", "$14,400", "$12.00"]
  },
  {
    scenario: "After shipping",
    cells: ["Product + shipping", "$16,500", "$13.75"]
  },
  {
    scenario: "After duty and import tax",
    cells: ["Product + shipping + duty + tax", "$18,990", "$15.83"]
  },
  {
    scenario: "Total landed cost",
    cells: ["All formula components", "$19,800", "$16.50"]
  }
];

const formulaPerUnitSeries = [12, 13.75, 15.83, 16.5];

const faqItems: FAQItem[] = [
  {
    question: "What is the formula for landed cost?",
    answer:
      "A practical landed cost formula is: (product cost + shipping + duties + import tax + insurance + handling fees) divided by units received."
  },
  {
    question: "How do you calculate total landed cost?",
    answer:
      "Sum all import-related costs required to receive inventory into stock. That total is your landed cost amount for the shipment."
  },
  {
    question: "What should be included in a landed cost formula?",
    answer:
      "Include supplier invoice, freight, customs duty, import tax, insurance, brokerage, and local handling or port-related charges tied to the shipment."
  },
  {
    question: "Is shipping included in landed cost?",
    answer:
      "Yes. Shipping is a core landed-cost component and should be included before per-unit allocation."
  },
  {
    question: "Are duties and customs fees included?",
    answer:
      "Yes. Duties and customs-related charges are part of total landed cost and materially affect unit economics."
  },
  {
    question: "How do you calculate landed cost in Excel?",
    answer:
      "Use one row per cost component, sum all rows for total landed cost, then divide by units received to get landed cost per unit."
  },
  {
    question: "What is the difference between landed cost and product cost?",
    answer:
      "Product cost is supplier price only. Landed cost includes supplier price plus import and logistics overhead used for pricing and margin decisions."
  }
];

export default function LandedCostFormulaPage() {
  return (
    <div className="container space-y-10 py-8 sm:space-y-11 sm:py-10">
      <SiteBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Import Cost Tools", href: "/import-cost-tools" },
          { label: "Landed Cost Formula" }
        ]}
      />

      <section className="max-w-4xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/90">Formula Guide</p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Landed cost formula</h1>
        <p className="text-sm leading-6 text-muted-foreground sm:text-base">
          A landed cost formula converts all real import costs into a total landed cost number and a per-unit cost you can use for pricing.
          If you need a step-by-step process first, start with
          <Link href="/how-to-calculate-landed-cost-for-imported-products" className="text-primary hover:text-primary/80">
            {" "}how to calculate landed cost for imported products
          </Link>
          .
        </p>
      </section>

      <Card className="border-primary/20 bg-gradient-to-r from-sky-50/80 to-white shadow-none">
        <CardContent className="p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/90">Direct answer</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Total landed cost = product cost + shipping + duties + import taxes + insurance + handling and related fees.
            Landed cost per unit = total landed cost / units received.
          </p>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Definition"
          title="What is a landed cost formula?"
          description="It is a practical way to translate import overhead into usable unit economics."
        />
        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-3 p-5 sm:p-6">
            <p className="text-sm leading-6 text-muted-foreground">
              The formula is not one universal template for every company. But the objective is consistent: capture every shipment-related
              cost that affects inventory, then allocate those costs into a total and per-unit number that supports pricing and margin decisions.
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              For comparison context, see
              <Link href="/landed-cost-vs-product-cost" className="text-primary hover:text-primary/80">
                {" "}landed cost vs product cost
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </section>

      <FormulaBreakdownCard
        title="Standard landed cost formula in plain language"
        formula="Landed cost per unit = (Product cost + Shipping + Customs duty + Import tax + Insurance + Handling/Brokerage/Port fees) / Units received"
        items={[
          {
            label: "Total landed cost",
            detail: "Use this to understand full shipment spend and cash impact."
          },
          {
            label: "Per-unit landed cost",
            detail: "Use this for sell-price floors, margin checks, and break-even math."
          },
          {
            label: "Important",
            detail: "Divide by actual units received, not ordered quantity, when there are shortages or damage."
          }
        ]}
      />

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Formula inputs"
          title="What costs belong in the formula?"
          description="Include costs that are necessary to import and receive inventory."
        />
        <Card className="border-border/85 shadow-none">
          <CardContent className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
            <div>
              <p className="text-sm font-semibold">Core components</p>
              <ul className="mt-2.5 space-y-2.5 pl-5 text-sm leading-6 text-muted-foreground">
                <li className="list-disc marker:text-primary">Supplier product cost</li>
                <li className="list-disc marker:text-primary">International and inbound shipping</li>
                <li className="list-disc marker:text-primary">Customs duty and import tax</li>
                <li className="list-disc marker:text-primary">Insurance</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">What people forget to include</p>
              <ul className="mt-2.5 space-y-2.5 pl-5 text-sm leading-6 text-muted-foreground">
                <li className="list-disc marker:text-primary">Brokerage and documentation fees</li>
                <li className="list-disc marker:text-primary">Port or terminal handling charges</li>
                <li className="list-disc marker:text-primary">Inspection and compliance costs</li>
                <li className="list-disc marker:text-primary">Local transfer and receiving costs</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Worked example"
          title="Worked landed cost formula example"
          description="1,200 imported units with common cost layers."
        />
        <Card className="border-border/85 shadow-none">
          <CardContent className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
            <div>
              <p className="text-sm font-semibold">Inputs</p>
              <ul className="mt-2.5 space-y-2.5 text-sm leading-6 text-muted-foreground">
                <li>Product cost: $14,400</li>
                <li>Shipping: $2,100</li>
                <li>Duty: $1,440</li>
                <li>Import tax: $1,050</li>
                <li>Insurance: $360</li>
                <li>Handling and brokerage: $450</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">Outputs</p>
              <ul className="mt-2.5 space-y-2.5 text-sm leading-6 text-muted-foreground">
                <li>Total landed cost: $19,800</li>
                <li>Units received: 1,200</li>
                <li>Landed cost per unit: $16.50</li>
                <li>Cost gap vs supplier-only unit cost: +$4.50</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Stage comparison"
          title="How the formula builds total and per-unit landed cost"
          description="Each additional cost layer changes your usable unit-economics baseline."
        />
        <ScenarioComparisonTable
          headers={["Formula components included", "Total cost", "Per-unit landed cost"]}
          rows={formulaComparisonRows}
        />
      </section>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Formula behavior"
          title="Per-unit landed cost rises as more real costs are included"
          description="This is why total landed cost formula depth affects pricing confidence."
        />
        <AnalysisLineChart
          xLabels={formulaStageLabels}
          series={[
            {
              name: "Per-unit landed cost",
              color: "#0284c7",
              values: formulaPerUnitSeries
            }
          ]}
          yAxisLabel="Cost per unit"
          xAxisLabel="Formula completeness"
          yTickFormatter={(value) => `$${value.toFixed(2)}`}
        />
      </section>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Spreadsheet logic"
          title="How to calculate landed cost formula in Excel"
          description="Simple structure that works in most spreadsheet models."
        />
        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-3.5 p-5 sm:p-6">
            <p className="text-sm leading-6 text-muted-foreground">
              Keep one row per cost component and one row for units received. Then calculate total landed cost and per-unit landed cost separately.
            </p>
            <div className="space-y-2 rounded-xl border bg-muted/25 p-3 text-[13px] leading-6 sm:text-sm">
              <p className="font-mono">B2:B7 = Product, Shipping, Duty, Tax, Insurance, Handling</p>
              <p className="font-mono">B8 = Units received</p>
              <p className="font-mono">B9 (Total landed cost) =SUM(B2:B7)</p>
              <p className="font-mono">B10 (Landed cost per unit) =IF(B8=0,&quot;&quot;,B9/B8)</p>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              If you want a faster workflow than manual sheets, use the
              <Link href="/tools/landed-cost-calculator-importers" className="text-primary hover:text-primary/80">
                {" "}landed cost calculator
              </Link>
              {" "}and the
              <Link href="/tools/cost-per-unit-after-shipping-import-fees" className="text-primary hover:text-primary/80">
                {" "}cost-per-unit calculator
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-3.5 p-5 sm:p-6">
            <h2 className="text-xl font-semibold tracking-tight">Common mistakes when building a landed cost formula</h2>
            <ul className="space-y-2.5 pl-5 text-sm leading-6 text-muted-foreground">
              <li className="list-disc marker:text-amber-600">Using product cost as total landed cost.</li>
              <li className="list-disc marker:text-amber-600">Skipping customs and handling fees because each looks small.</li>
              <li className="list-disc marker:text-amber-600">Dividing by ordered units instead of received units.</li>
              <li className="list-disc marker:text-amber-600">Not updating formulas when freight or tax assumptions change.</li>
            </ul>
          </CardContent>
        </Card>

        <OperatorTakeawayCard
          title="When landed cost formula matters for pricing and margin"
          bullets={[
            "Use landed cost per unit before setting sell price or promo discounts.",
            "Validate break-even selling price from landed cost, not supplier cost.",
            "Model margin after shipping and variable fees before scaling volume.",
            "Recalculate formula outputs when duty, freight, or quantity assumptions move."
          ]}
        />
      </section>

      <Card className="border-border/85 shadow-none">
        <CardContent className="space-y-2.5 p-5 text-sm leading-6 text-muted-foreground">
          <p>
            Next decision steps: test break-even thresholds in
            <Link href="/tools/break-even-selling-price-after-import-costs" className="text-primary hover:text-primary/80">
              {" "}break-even selling price after import costs
            </Link>
            , then validate contribution margins in
            <Link href="/how-to-calculate-profit-margin-after-shipping-and-fees" className="text-primary hover:text-primary/80">
              {" "}profit margin after shipping and fees
            </Link>
            .
          </p>
          <p>
            If discounting is part of your plan, review
            <Link href="/how-discounts-affect-profit-margin" className="text-primary hover:text-primary/80">
              {" "}how discounts affect profit margin
            </Link>
            {" "}before launch.
          </p>
        </CardContent>
      </Card>

      <ContentCtaBlock
        title="Turn your landed cost formula into pricing decisions"
        description="Calculate totals and per-unit costs, then connect them to break-even and margin planning workflows."
        actions={[
          { label: "Landed Cost Calculator", href: "/tools/landed-cost-calculator-importers" },
          { label: "Break-Even Selling Price", href: "/tools/break-even-selling-price-after-import-costs" },
          { label: "All Guides", href: "/guides" }
        ]}
      />

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Clarifications for landed cost formula, total landed cost, and spreadsheet use."
        />
        <FAQSection items={faqItems} />
      </section>

      <RelatedTools
        relatedSlugs={[
          "landed-cost-calculator-importers",
          "cost-per-unit-after-shipping-import-fees",
          "break-even-selling-price-after-import-costs",
          "import-profit-margin-calculator"
        ]}
      />
    </div>
  );
}

