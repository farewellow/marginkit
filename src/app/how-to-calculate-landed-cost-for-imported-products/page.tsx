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
  title: "How to Calculate Landed Cost for Imported Products (Formula + Example)",
  description:
    "Learn what landed cost is, what to include (shipping, duty, customs, insurance, handling, fees), and how to calculate landed cost with a practical import example.",
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
    question: "What is landed cost?",
    answer:
      "Landed cost is the full cost to bring imported inventory into sellable stock, not just supplier price. It includes logistics, customs-related charges, and handling fees."
  },
  {
    question: "How do you calculate landed cost for imported goods?",
    answer:
      "Add product cost, shipping, duties, taxes, insurance, and relevant import handling fees, then divide by confirmed units received."
  },
  {
    question: "What should be included in landed cost?",
    answer:
      "Include all shipment-level costs required to release and move goods into inventory: freight, customs duty, VAT/tax, insurance, broker and local handling charges."
  },
  {
    question: "Is shipping included in landed cost?",
    answer: "Yes. International freight and any local delivery needed to receive stock should be included in landed cost."
  },
  {
    question: "Are customs duties part of landed cost?",
    answer:
      "Yes. Duties and related customs charges are part of the cost to import goods and should be loaded into landed cost per unit."
  },
  {
    question: "What is a landed cost formula in Excel?",
    answer:
      "A common formula is: =(Product+Shipping+Duty+Tax+Insurance+Fees)/UnitsReceived. The key is using complete cost inputs and actual received units."
  },
  {
    question: "How is landed cost different from product cost?",
    answer:
      "Product cost is supplier invoice only. Landed cost adds import overhead and gives a decision-grade baseline for pricing and margin."
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
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/90">Landed Cost Calculation Guide</p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          How to calculate landed cost for imported products
        </h1>
        <p className="text-sm leading-6 text-muted-foreground sm:text-base">
          Landed cost is the total cost to get imported inventory into sellable stock. It includes supplier cost plus shipping,
          customs duties, import taxes, insurance, handling, and related fees. If you skip these layers, your pricing and margin
          decisions are usually too optimistic.
        </p>
      </section>

      <Card className="border-primary/20 bg-gradient-to-r from-sky-50/80 to-white shadow-none">
        <CardContent className="p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/90">Short direct answer</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Use: <span className="font-medium text-foreground">product cost + shipping + duty + customs tax + insurance + handling fees</span>,
            then divide by confirmed units received. This gives your real imported cost per unit.
          </p>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="What is included"
          title="What costs belong in landed cost"
          description="Landed cost should capture every cost required to import and release inventory."
        />
        <Card className="border-border/85 shadow-none">
          <CardContent className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
            <div>
              <p className="text-sm font-semibold">Core cost layers</p>
              <ul className="mt-2.5 space-y-2.5 pl-5 text-sm leading-6 text-muted-foreground">
                <li className="list-disc marker:text-primary">Supplier invoice (product cost)</li>
                <li className="list-disc marker:text-primary">International freight and local delivery</li>
                <li className="list-disc marker:text-primary">Customs duty and import VAT/tax</li>
                <li className="list-disc marker:text-primary">Cargo insurance and shipment protection</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">Often missed fees</p>
              <ul className="mt-2.5 space-y-2.5 pl-5 text-sm leading-6 text-muted-foreground">
                <li className="list-disc marker:text-primary">Broker, clearance, and documentation fees</li>
                <li className="list-disc marker:text-primary">Port, inspection, and handling charges</li>
                <li className="list-disc marker:text-primary">Inbound transfer to warehouse</li>
                <li className="list-disc marker:text-primary">Any mandatory release-related fees</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

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
          eyebrow="Before you calculate"
          title="Inputs you need before estimating landed cost"
          description="This checklist prevents most landed-cost errors."
        />
        <Card className="border-border/85 shadow-none">
          <CardContent className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
            <div>
              <p className="text-sm font-semibold">Shipment fields</p>
              <ul className="mt-2.5 space-y-2.5 pl-5 text-sm leading-6 text-muted-foreground">
                <li className="list-disc marker:text-primary">Supplier invoice total and currency</li>
                <li className="list-disc marker:text-primary">Order quantity and expected received units</li>
                <li className="list-disc marker:text-primary">Freight mode and quoted shipping cost</li>
                <li className="list-disc marker:text-primary">Insurance and local delivery charges</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">Import fee fields</p>
              <ul className="mt-2.5 space-y-2.5 pl-5 text-sm leading-6 text-muted-foreground">
                <li className="list-disc marker:text-primary">Duty rate or duty amount</li>
                <li className="list-disc marker:text-primary">Import VAT/tax assumptions</li>
                <li className="list-disc marker:text-primary">Broker, customs, and handling fees</li>
                <li className="list-disc marker:text-primary">Any fixed fees allocated per shipment</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="Worked scenario"
          title="Worked landed cost example with realistic import overhead"
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
              Compare this with
              <Link href="/landed-cost-vs-product-cost" className="text-primary hover:text-primary/80">
                {" "}landed cost vs product cost
              </Link>
              , then move to
              <Link href="/how-to-calculate-profit-margin-after-shipping-and-fees" className="text-primary hover:text-primary/80">
                {" "}margin after shipping and fees
              </Link>
              {" "}for pricing decisions.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-3.5 p-5 sm:p-6">
            <h2 className="text-xl font-semibold tracking-tight">Common mistakes</h2>
            <ul className="space-y-2.5 pl-5 text-sm leading-6 text-muted-foreground">
              <li className="list-disc marker:text-amber-600">Pricing from supplier cost only and treating import fees as overhead later.</li>
              <li className="list-disc marker:text-amber-600">Spreading costs across ordered units instead of received units.</li>
              <li className="list-disc marker:text-amber-600">Ignoring broker, inspection, and local logistics because each looks small.</li>
              <li className="list-disc marker:text-amber-600">Setting promo prices before landed cost is fully loaded.</li>
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
        description="Use your shipment data to calculate landed cost, then test break-even selling price and margin safety."
        actions={[
          { label: "Landed Cost Calculator", href: "/tools/landed-cost-calculator-importers" },
          { label: "Cost Per Unit After Fees", href: "/tools/cost-per-unit-after-shipping-import-fees" },
          { label: "Break-Even Selling Price", href: "/tools/break-even-selling-price-after-import-costs" }
        ]}
      />

      <section className="space-y-4">
        <AnalyticalSectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Natural clarifications for landed cost calculation and import fee assumptions."
        />
        <FAQSection items={faqItems} />
      </section>

      <Card className="border-border/85 shadow-none">
        <CardContent className="p-5 text-sm text-muted-foreground">
          Continue analysis:{" "}
          <Link href="/landed-cost-vs-product-cost" className="text-primary hover:text-primary/80">
            landed cost vs product cost
          </Link>
          {" "},{" "}
          <Link href="/how-to-calculate-profit-margin-after-shipping-and-fees" className="text-primary hover:text-primary/80">
            profit margin after shipping and fees
          </Link>
          {" "},
          <Link href="/how-discounts-affect-profit-margin" className="text-primary hover:text-primary/80">
            how discounts affect profit margin
          </Link>
          {" "}, and{" "}
          <Link href="/guides" className="text-primary hover:text-primary/80">
            all practical guides
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


