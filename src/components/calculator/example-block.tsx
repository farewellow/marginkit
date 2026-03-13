import { CheckCircle2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface ExampleBlockProps {
  values: string[];
}

export function ExampleBlock({ values }: ExampleBlockProps) {
  return (
    <Card>
      <CardContent className="grid gap-3 p-6 sm:grid-cols-2">
        {values.map((value) => (
          <div key={value} className="flex items-start gap-2 rounded-xl border bg-background px-4 py-3 text-sm">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
            <span>{value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}