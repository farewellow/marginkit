import Link from "next/link";

import { SiteBreadcrumbs } from "@/components/layout/site-breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "MarginKit privacy overview covering calculator data handling, CSV processing, analytics, and contact.",
  pathname: "/privacy"
});

export default function PrivacyPage() {
  return (
    <div className="container space-y-8 py-8 sm:py-10">
      <SiteBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />

      <section className="max-w-3xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          This page explains how MarginKit handles data when you use calculators, upload CSV files, and contact support.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-3 p-5">
            <h2 className="text-base font-semibold">What data is processed</h2>
            <p className="text-sm text-muted-foreground">
              Calculator inputs are processed to generate results in your session. If you email us, we use your message only
              to respond and improve support quality.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-3 p-5">
            <h2 className="text-base font-semibold">CSV handling</h2>
            <p className="text-sm text-muted-foreground">
              Inventory CSV parsing runs in your browser. Uploaded files are not stored as persistent account data by the core tool.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-3 p-5">
            <h2 className="text-base font-semibold">Analytics and cookies</h2>
            <p className="text-sm text-muted-foreground">
              MarginKit may use basic analytics and essential cookies to understand product usage and improve reliability.
              We do not use calculator inputs for advertising profiles.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-3 p-5">
            <h2 className="text-base font-semibold">Contact</h2>
            <p className="text-sm text-muted-foreground">
              Privacy questions can be sent to <Link className="text-primary" href="mailto:hello@marginkit.app">hello@marginkit.app</Link>.
              We will reply as quickly as possible.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
