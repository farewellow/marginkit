import { Card, CardContent } from "@/components/ui/card";

interface OperatorTakeawayCardProps {
  title: string;
  bullets: string[];
}

export function OperatorTakeawayCard({ title, bullets }: OperatorTakeawayCardProps) {
  return (
    <Card className="border-primary/20 bg-gradient-to-r from-sky-50/80 to-white shadow-none">
      <CardContent className="space-y-3.5 p-5 sm:p-6">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
        <ul className="space-y-2.5 pl-5 text-sm leading-6 text-muted-foreground">
          {bullets.map((item) => (
            <li key={item} className="list-disc marker:text-primary">
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
