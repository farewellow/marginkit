import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { ToolCalculatorRenderer } from "@/components/calculator/tool-calculator-renderer";
import { allToolSlugs, getToolBySlug } from "@/data/tools";
import { buildMetadata } from "@/lib/seo/metadata";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allToolSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return buildMetadata({
      title: "Tool not found",
      description: "Requested tool does not exist.",
      pathname: `/tools/${slug}`
    });
  }

  return buildMetadata({
    title: tool.seoTitle,
    description: tool.seoDescription,
    pathname: `/tools/${tool.slug}`
  });
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return (
    <CalculatorShell tool={tool}>
      <ToolCalculatorRenderer slug={slug} />
    </CalculatorShell>
  );
}
