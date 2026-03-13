import Link from "next/link";

import { SiteBreadcrumbs } from "@/components/layout/site-breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "Readable terms for using MarginKit calculators and website content.",
  pathname: "/terms"
});

export default function TermsPage() {
  return (
    <div className="container space-y-8 py-8 sm:py-10">
      <SiteBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />

      <section className="max-w-3xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Terms of Service</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          These terms explain how MarginKit calculators and website content can be used.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-3 p-5">
            <h2 className="text-base font-semibold">Use of calculators</h2>
            <p className="text-sm text-muted-foreground">
              MarginKit outputs are decision-support estimates. You are responsible for validating results against your
              accounting, tax, legal, and operational context.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-3 p-5">
            <h2 className="text-base font-semibold">No guarantees</h2>
            <p className="text-sm text-muted-foreground">
              The service is provided as-is. We aim for accuracy and reliability, but we do not guarantee uninterrupted
              availability or suitability for every business case.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-3 p-5">
            <h2 className="text-base font-semibold">Acceptable use</h2>
            <p className="text-sm text-muted-foreground">
              You agree not to misuse the site, attempt unauthorized access, or use MarginKit in ways that harm the
              service or other users.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-3 p-5">
            <h2 className="text-base font-semibold">Service changes</h2>
            <p className="text-sm text-muted-foreground">
              Features may change over time as we improve the product. Material updates to these terms will be reflected
              on this page.
            </p>
          </CardContent>
        </Card>
      </section>

      <Card className="border-border/85 shadow-none">
        <CardContent className="p-5 text-sm text-muted-foreground">
          Questions about these terms can be sent to <Link className="text-primary" href="mailto:hello@marginkit.app">hello@marginkit.app</Link>.
        </CardContent>
      </Card>
    </div>
  );
}
