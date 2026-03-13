import type { ReactNode } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ResultsCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function ResultsCard({ title, description, children }: ResultsCardProps) {
  return (
    <Card className="h-full border-primary/20 bg-gradient-to-b from-primary/[0.04] to-white">
      <CardHeader className="p-5 pb-3 sm:p-6 sm:pb-4">
        <CardTitle className="text-xl">{title}</CardTitle>
        {description ? <CardDescription className="text-sm leading-relaxed">{description}</CardDescription> : null}
      </CardHeader>
      <CardContent
        className="space-y-4 p-5 pt-0 sm:p-6 sm:pt-0 [&_[data-metric-card]:first-of-type]:border-primary/35 [&_[data-metric-card]:first-of-type]:bg-primary/[0.08] [&_[data-metric-card]:first-of-type_[data-metric-value]]:text-3xl"
      >
        {children}
      </CardContent>
    </Card>
  );
}
