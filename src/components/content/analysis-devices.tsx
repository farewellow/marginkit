import { Card, CardContent } from "@/components/ui/card";

interface ComparisonFrameProps {
  leftTitle: string;
  leftPoints: string[];
  rightTitle: string;
  rightPoints: string[];
}

export function ComparisonFrame({ leftTitle, leftPoints, rightTitle, rightPoints }: ComparisonFrameProps) {
  return (
    <Card className="border-border/85 shadow-none">
      <CardContent className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
        <div className="rounded-xl border bg-background/70 p-4 sm:p-5">
          <p className="text-sm font-semibold">{leftTitle}</p>
          <ul className="mt-2.5 space-y-2.5 pl-5 text-sm leading-6 text-muted-foreground">
            {leftPoints.map((item) => (
              <li key={item} className="list-disc marker:text-amber-600">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border bg-primary/[0.05] p-4 sm:p-5">
          <p className="text-sm font-semibold">{rightTitle}</p>
          <ul className="mt-2.5 space-y-2.5 pl-5 text-sm leading-6 text-muted-foreground">
            {rightPoints.map((item) => (
              <li key={item} className="list-disc marker:text-primary">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

interface ProgressionStage {
  label: string;
  metric: string;
  detail: string;
}

interface ProgressionStagesProps {
  title: string;
  stages: ProgressionStage[];
}

export function ProgressionStages({ title, stages }: ProgressionStagesProps) {
  return (
    <Card className="border-border/85 shadow-none">
      <CardContent className="space-y-4 p-5 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary/90">{title}</p>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, index) => (
            <div key={stage.label} className="rounded-xl border bg-background/70 p-3.5 sm:p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Stage {index + 1}</p>
              <p className="mt-1 text-sm font-semibold">{stage.label}</p>
              <p className="mt-1 text-base font-semibold tracking-tight text-primary">{stage.metric}</p>
              <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{stage.detail}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface ThresholdNoteProps {
  title: string;
  description: string;
  bullets: string[];
}

export function ThresholdNote({ title, description, bullets }: ThresholdNoteProps) {
  return (
    <Card className="border-primary/20 bg-gradient-to-r from-sky-50/80 to-white shadow-none">
      <CardContent className="space-y-3.5 p-5 sm:p-6">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
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
