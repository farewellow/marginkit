import type { ReactNode } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CalculatorFormCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function CalculatorFormCard({ title, description, children }: CalculatorFormCardProps) {
  return (
    <Card className="h-full border-border/85 bg-white/95">
      <CardHeader className="p-5 pb-3 sm:p-6 sm:pb-4">
        <CardTitle className="text-xl">{title}</CardTitle>
        {description ? <CardDescription className="text-sm leading-relaxed">{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="p-5 pt-0 sm:p-6 sm:pt-0">{children}</CardContent>
    </Card>
  );
}
