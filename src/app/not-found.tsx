import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <section className="container py-20 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 text-muted-foreground">The requested page does not exist. Return to homepage or open tool hubs.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Button asChild>
          <Link href="/">Go home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/profit-margin-tools">Explore tools</Link>
        </Button>
      </div>
    </section>
  );
}