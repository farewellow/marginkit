import Link from "next/link";
import { Layers3 } from "lucide-react";
import type { ReactNode } from "react";

import type { ToolDefinition } from "@/types/tools";

import { ExampleBlock } from "@/components/calculator/example-block";
import { ProUpgradeCard } from "@/components/calculator/pro-upgrade-card";
import { SiteBreadcrumbs } from "@/components/layout/site-breadcrumbs";
import { FAQSection } from "@/components/marketing/faq-section";
import { RelatedTools } from "@/components/marketing/related-tools";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getCategoryById } from "@/data/tools";

interface CalculatorShellProps {
  tool: ToolDefinition;
  children: ReactNode;
}

export function CalculatorShell({ tool, children }: CalculatorShellProps) {
  const hubCategory = getCategoryById(tool.category);

  return (
    <div className="container space-y-8 py-8 sm:space-y-9 sm:py-10">
      <SiteBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          hubCategory ? { label: hubCategory.title, href: `/${hubCategory.slug}` } : { label: "Tools", href: "/tools" },
          { label: tool.title }
        ]}
      />

      <section className="mx-auto max-w-4xl text-center">
        <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
          <Badge variant="secondary" className="border border-border bg-muted/70 capitalize">
            {tool.category.replace(/-/g, " ")}
          </Badge>
          <Badge className="border border-primary/10 bg-primary/10 text-primary">Free tool</Badge>
        </div>
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">{tool.h1}</h1>
        <p className="mx-auto mt-3 max-w-3xl text-pretty text-sm text-muted-foreground sm:text-base">{tool.heroDescription}</p>
        {hubCategory ? (
          <p className="mt-2 text-xs text-muted-foreground">
            <Link href={`/${hubCategory.slug}`} className="text-primary hover:underline">
              Back to {hubCategory.title}
            </Link>
          </p>
        ) : null}
      </section>

      <section>{children}</section>

      <section className="space-y-5">
        <SectionHeading
          eyebrow="Worked example"
          title={tool.workedExample.title}
          description={tool.workedExample.description}
        />
        <ExampleBlock values={tool.workedExample.values} />
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-4 p-5">
            <SectionHeading
              eyebrow="How to use"
              title="Interpret your result correctly"
              description="Use these quick rules to keep pricing and inventory decisions grounded."
            />
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {tool.howToUse.map((item) => (
                <li key={item} className="list-disc pl-1 marker:text-primary">
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-4 p-5">
            <SectionHeading
              eyebrow="Common mistakes"
              title="Avoid costly calculation errors"
              description="These mistakes usually create hidden margin risk or stock friction."
            />
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {tool.commonMistakes.map((item) => (
                <li key={item} className="list-disc pl-1 marker:text-amber-600">
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-5">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Short answers for common edge cases and interpretation questions."
        />
        <FAQSection items={tool.faq} />
      </section>

      <RelatedTools relatedSlugs={tool.relatedTools} />

      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
          <Layers3 className="h-3.5 w-3.5" />
          Ready for scenario comparison and workflow automation
        </div>
        <ProUpgradeCard category={tool.category} />
      </section>
    </div>
  );
}
