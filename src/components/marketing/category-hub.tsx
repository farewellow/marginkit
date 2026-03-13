import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { ToolCategoryDefinition } from "@/types/tools";

import { SiteBreadcrumbs } from "@/components/layout/site-breadcrumbs";
import { FAQSection } from "@/components/marketing/faq-section";
import { CategoryOpenTracker } from "@/components/marketing/category-open-tracker";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ToolCard } from "@/components/marketing/tool-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCategoryById, toolsBySlug } from "@/data/tools";

interface CategoryHubProps {
  category: ToolCategoryDefinition;
}

export function CategoryHub({ category }: CategoryHubProps) {
  const hubTools = category.toolSlugs
    .map((slug) => toolsBySlug.get(slug))
    .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));

  const featuredTool = hubTools[0];

  const relatedTools = Array.from(new Set(hubTools.flatMap((tool) => tool.relatedTools)))
    .map((slug) => toolsBySlug.get(slug))
    .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));

  const groupedRelated = category.relatedCategoryIds
    .map((categoryId) => {
      const groupCategory = getCategoryById(categoryId);
      const items = relatedTools.filter((tool) => tool.category === categoryId).slice(0, 2);

      return {
        title: groupCategory?.title ?? "Related tools",
        items
      };
    })
    .filter((group) => group.items.length > 0);

  const useCaseBlocks = [
    {
      title: "When to use these tools",
      text: "Use this hub when you need fast operational decisions without opening multiple spreadsheets."
    },
    {
      title: "Decisions supported",
      text: "These calculators help with pricing thresholds, margin protection, reorder timing, and channel planning."
    }
  ];

  return (
    <div className="container space-y-8 py-8 sm:space-y-9 sm:py-10">
      <CategoryOpenTracker categorySlug={category.slug} />

      <SiteBreadcrumbs items={[{ label: "Home", href: "/" }, { label: category.title }]} />

      <section className="mx-auto max-w-4xl text-center">
        <Badge variant="secondary" className="mb-3 border border-primary/10 bg-primary/5 text-primary">
          Category hub
        </Badge>
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">{category.h1}</h1>
        <p className="mx-auto mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">{category.description}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {useCaseBlocks.map((block) => (
          <Card key={block.title} className="border-border/85 shadow-none">
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{block.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{block.text}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-5">
        <SectionHeading
          eyebrow="What to calculate first"
          title="Suggested flow"
          description="A practical sequence for faster decision-making in this category."
        />
        <Card className="border-border/85 shadow-none">
          <CardContent className="grid gap-3 p-5 md:grid-cols-3">
            {hubTools.slice(0, 3).map((tool, index) => (
              <div key={tool.id} className="rounded-xl border bg-background/70 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Step {index + 1}</p>
                <p className="mt-1 text-sm font-medium">{tool.title}</p>
                {index < Math.min(hubTools.length - 1, 2) ? <ArrowRight className="mt-2 h-4 w-4 text-muted-foreground" /> : null}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {featuredTool ? (
        <section className="space-y-5">
          <SectionHeading
            eyebrow="Best starting point"
            title="Start with this calculator first"
            description="For most users in this category, this tool gives the first high-impact decision signal."
          />
          <Card className="border-primary/20 bg-gradient-to-r from-sky-50/80 to-white">
            <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Featured start</p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight">{featuredTool.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{featuredTool.shortDescription}</p>
              </div>
              <Button asChild>
                <Link href={`/tools/${featuredTool.slug}`}>Open calculator</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      ) : null}

      <section className="space-y-5">
        <SectionHeading
          eyebrow="Tools"
          title="Core calculators in this hub"
          description="Choose a calculator and start with your real numbers."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hubTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {groupedRelated.length > 0 ? (
        <section className="space-y-5">
          <SectionHeading
            eyebrow="Related"
            title="Useful next tools"
            description="Continue analysis in adjacent workflows for fuller decisions."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {groupedRelated.map((group) => (
              <Card key={group.title} className="border-border/85 shadow-none">
                <CardContent className="space-y-3 p-5">
                  <p className="text-sm font-semibold">{group.title}</p>
                  <div className="space-y-2">
                    {group.items.map((tool) => (
                      <Link
                        key={tool.id}
                        href={`/tools/${tool.slug}`}
                        className="flex items-start gap-2 rounded-lg border bg-background/70 px-3 py-2 text-sm transition-colors hover:border-primary/30 hover:bg-primary/[0.04]"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>
                          <span className="font-medium">{tool.title}</span>
                          <span className="block text-xs text-muted-foreground">{tool.shortDescription}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      <section className="space-y-5">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Practical guidance for this category."
        />
        <FAQSection items={category.faq} />
      </section>
    </div>
  );
}
