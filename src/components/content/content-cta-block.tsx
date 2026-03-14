import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CtaAction {
  label: string;
  href: string;
}

interface ContentCtaBlockProps {
  title: string;
  description: string;
  actions: CtaAction[];
}

export function ContentCtaBlock({ title, description, actions }: ContentCtaBlockProps) {
  return (
    <Card className="overflow-hidden border-primary/15 bg-gradient-to-r from-sky-50/90 via-white to-teal-50/85">
      <CardContent className="flex flex-col gap-5 p-6 sm:p-7 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {actions.map((action, index) => (
            <Button key={action.href} asChild variant={index === 0 ? "default" : "outline"}>
              <Link href={action.href}>{action.label}</Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
