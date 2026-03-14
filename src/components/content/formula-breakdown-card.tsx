import { Card, CardContent } from "@/components/ui/card";

interface FormulaItem {
  label: string;
  detail: string;
}

interface FormulaBreakdownCardProps {
  title: string;
  formula: string;
  items: FormulaItem[];
}

export function FormulaBreakdownCard({ title, formula, items }: FormulaBreakdownCardProps) {
  return (
    <Card className="border-border/85 shadow-none">
      <CardContent className="space-y-4 p-5 sm:p-6">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
        <p className="rounded-xl border bg-muted/25 px-3 py-2.5 font-mono text-[13px] leading-6 sm:text-sm">
          {formula}
        </p>
        <ul className="space-y-2.5 text-sm leading-6 text-muted-foreground">
          {items.map((item) => (
            <li key={item.label}>
              <span className="font-medium text-foreground">{item.label}:</span> {item.detail}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
