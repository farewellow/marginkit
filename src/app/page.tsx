import Link from "next/link";
import { ArrowRight, Calculator, Layers3, LineChart, Package, ShieldCheck, TrendingUp } from "lucide-react";

import { CategoryCard } from "@/components/marketing/category-card";
import { CTASection } from "@/components/marketing/cta-section";
import { FAQSection } from "@/components/marketing/faq-section";
import { GuideCard } from "@/components/marketing/guide-card";
import { PageHero } from "@/components/marketing/page-hero";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ToolCard } from "@/components/marketing/tool-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { homepageFaqs } from "@/data/faqs";
import { guides } from "@/data/guides";
import { featuredTools } from "@/data/tools";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Free Cost, Margin, and Inventory Calculators for Importers and Sellers",
  description: "Use practical calculators for landed cost, margin, break-even pricing, reorder points, and inventory risk in minutes.",
  pathname: "/"
});

const steps = [
  {
    title: "Choose a tool",
    description: "Open the calculator that matches the decision you need today.",
    icon: Layers3
  },
  {
    title: "Enter your numbers",
    description: "Use real costs, sales, and stock values with instant validation.",
    icon: Calculator
  },
  {
    title: "Act on insights",
    description: "Get clear metrics plus risk labels to decide faster.",
    icon: LineChart
  }
];

const featuredGuides = guides.slice(0, 3);

const benefits = [
  "Built for real sellers",
  "Instant calculations",
  "No spreadsheet chaos",
  "Designed for growth into smarter workflows"
];

export default function HomePage() {
  return (
    <>
      <PageHero
        eyebrow="Free toolkit for sellers"
        title="Increase margin, price with confidence, and avoid stockouts"
        description="MarginKit gives importers, resellers, and e-commerce teams practical calculators to make pricing and inventory decisions in under a minute."
        stats={[
          { value: "12", label: "live calculators" },
          { value: "<60s", label: "to first result" },
          { value: "No login", label: "for core tools" }
        ]}
      >
        <Button asChild size="lg">
          <Link href="/tools/landed-cost-calculator-importers">Start with landed cost</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/tools">Explore all tools</Link>
        </Button>
      </PageHero>

      <section id="paths" className="container space-y-5 py-8">
        <SectionHeading
          eyebrow="User paths"
          title="Choose your workflow"
          description="Go straight to the calculators that match how you run your business."
        />
        <div className="grid gap-4 md:grid-cols-3">
          <CategoryCard
            href="/import-cost-tools"
            title="I import products"
            description="Estimate landed cost, per-unit import cost, and pricing floors before ordering."
          />
          <CategoryCard
            href="/marketplace-seller-tools"
            title="I sell online"
            description="Model margin, break-even price, and break-even ROAS for channel decisions."
          />
          <CategoryCard
            href="/inventory-planning-tools"
            title="I manage stock in spreadsheets"
            description="Plan reorder points, safety stock, and run CSV reorder alerts in-browser."
          />
        </div>
      </section>

      <section id="tools" className="container space-y-5 py-8">
        <Card className="border-primary/15 bg-gradient-to-br from-sky-50/80 via-white to-teal-50/70">
          <CardHeader className="p-5 pb-3 sm:p-6 sm:pb-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <SectionHeading
                  eyebrow="Featured calculators"
                  title="Most-used tools for weekly operator decisions"
                  description="Start here for cost, margin, and profitability clarity in seconds."
                />
              </div>
              <Badge className="border border-primary/15 bg-primary/10 text-primary">High-impact first</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-0 sm:p-6 sm:pt-0">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featuredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="container space-y-5 py-8">
        <SectionHeading
          eyebrow="How it works"
          title="Simple workflow, actionable output"
          description="Built to show value quickly without account setup or spreadsheet cleanup."
          align="center"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <Card key={step.title}>
              <CardHeader className="p-5 pb-3">
                <step.icon className="h-7 w-7 text-primary" />
                <CardTitle className="mt-3 text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container py-8">
        <Card className="border-border/70 bg-gradient-to-br from-white to-sky-50/70">
          <CardContent className="grid gap-6 p-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Why MarginKit</h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Built as a serious operating toolkit for importers and online sellers who need clean unit economics and reliable stock decisions.
              </p>
              <Link href="/profit-margin-tools" className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                See all profit tools <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <ul className="grid gap-2.5 text-sm">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 rounded-xl border bg-background/70 px-4 py-2.5">
                  <TrendingUp className="h-4 w-4 text-teal-600" />
                  {benefit}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="container py-8">
        <CTASection
          title="Run your next pricing or stock decision with confidence"
          description="Start free now. Upgrade later to save scenarios, compare SKUs, and automate reorder workflows."
        />
      </section>

      <section id="categories" className="container space-y-5 py-8">
        <SectionHeading
          eyebrow="Categories"
          title="Explore tools by operating function"
          description="Jump directly into focused hubs for cost, margin, inventory, and marketplace decisions."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <CategoryCard
            href="/import-cost-tools"
            title="Import cost tools"
            description="Landed cost, unit fee allocation, and import pricing thresholds."
          />
          <CategoryCard
            href="/profit-margin-tools"
            title="Profit margin tools"
            description="Margin, markup, discount impact, and supplier increase analysis."
          />
          <CategoryCard
            href="/inventory-planning-tools"
            title="Inventory planning tools"
            description="Reorder point, safety stock, runway checks, and CSV alert workflow."
          />
          <CategoryCard
            href="/marketplace-seller-tools"
            title="Marketplace seller tools"
            description="Break-even price and ROAS metrics for paid growth and channel economics."
          />
        </div>
      </section>

      <section id="guides" className="container space-y-5 py-8">
        <SectionHeading
          eyebrow="Guides"
          title="Learn with practical guides"
          description="Compact analytical pages for operators who want deeper decision context before running calculators."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {featuredGuides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} compact />
          ))}
        </div>
        <div>
          <Button asChild variant="outline">
            <Link href="/guides">Browse all guides</Link>
          </Button>
        </div>
      </section>

      <section className="container space-y-5 py-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Quick answers before you run your first calculation workflow."
        />
        <FAQSection items={homepageFaqs} />
      </section>

      <section className="container pb-8 pt-2">
        <Card className="border-border/75">
          <CardContent className="flex flex-col gap-3 p-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              Built for importers, resellers, e-commerce sellers, and marketplace operators.
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Fast calculations, clear insights, and architecture ready for Pro.
            </p>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
