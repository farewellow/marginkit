import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SiteBreadcrumbs } from "@/components/layout/site-breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Contact MarginKit",
  description: "Questions or feedback about MarginKit? Reach out to support for product, calculator, and workflow help.",
  pathname: "/contact"
});

const contactTopics = [
  "Calculator questions or unexpected results",
  "CSV workflow issues and data-format guidance",
  "Feature requests and product feedback",
  "Partnership and integration inquiries"
];

export default function ContactPage() {
  return (
    <div className="container space-y-8 py-8 sm:py-10">
      <SiteBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <section className="max-w-3xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Contact</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          MarginKit support is available for product questions, workflow feedback, and calculator guidance.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-[1.3fr_1fr]">
        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-4 p-6">
            <h2 className="text-base font-semibold">Support and feedback</h2>
            <p className="text-sm text-muted-foreground">
              We read every message and use feedback to improve calculator quality, usability, and decision workflows.
            </p>
            <p className="text-sm font-medium">You can contact us about:</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {contactTopics.map((topic) => (
                <li key={topic}>{`- ${topic}`}</li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground">
              Typical response time: within 1-2 business days.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="mailto:hello@marginkit.app">Email hello@marginkit.app</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/tools">
                  Browse all tools
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-3 p-6">
            <h2 className="text-base font-semibold">Useful links</h2>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/import-cost-tools" className="text-primary hover:text-primary/80">Import cost tools</Link>
              <Link href="/profit-margin-tools" className="text-primary hover:text-primary/80">Profit margin tools</Link>
              <Link href="/inventory-planning-tools" className="text-primary hover:text-primary/80">Inventory planning tools</Link>
              <Link href="/marketplace-seller-tools" className="text-primary hover:text-primary/80">Marketplace seller tools</Link>
              <Link href="/tools/upload-inventory-csv-reorder-alerts" className="text-primary hover:text-primary/80">CSV reorder alerts tool</Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
