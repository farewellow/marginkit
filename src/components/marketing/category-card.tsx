import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CategoryCardProps {
  href: string;
  title: string;
  description: string;
}

export function CategoryCard({ href, title, description }: CategoryCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <Card className="h-full border-border/85 transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
        <CardHeader className="p-5 pb-3">
          <div className="mb-2">
            <Badge variant="secondary" className="border border-border bg-muted/60">
              Tool hub
            </Badge>
          </div>
          <CardTitle className="flex items-center justify-between text-lg leading-snug sm:text-xl">
            {title}
            <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
