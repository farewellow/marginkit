import { toolsBySlug } from "@/data/tools";

import { SectionHeading } from "@/components/marketing/section-heading";
import { ToolCard } from "@/components/marketing/tool-card";

interface RelatedToolsProps {
  relatedSlugs: string[];
}

export function RelatedTools({ relatedSlugs }: RelatedToolsProps) {
  const related = relatedSlugs
    .map((slug) => toolsBySlug.get(slug))
    .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));

  if (!related.length) {
    return null;
  }

  return (
    <section className="space-y-5">
      <SectionHeading
        eyebrow="Related"
        title="Related tools"
        description="Use these next to compare scenarios and validate decisions from multiple angles."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {related.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}
