import { Card, CardContent } from "@/components/ui/card";

interface AnalysisLineChartSeries {
  name: string;
  color: string;
  values: number[];
}

interface AnalysisLineChartProps {
  xLabels: string[];
  series: AnalysisLineChartSeries[];
  yAxisLabel: string;
  xAxisLabel: string;
  yTickFormatter?: (value: number) => string;
}

const CHART_WIDTH = 760;
const CHART_HEIGHT = 360;
const MARGIN = {
  top: 24,
  right: 24,
  bottom: 64,
  left: 68
};

export function AnalysisLineChart({
  xLabels,
  series,
  yAxisLabel,
  xAxisLabel,
  yTickFormatter = (value) => `${value}`
}: AnalysisLineChartProps) {
  const allValues = series.flatMap((item) => item.values);
  const rawMin = Math.min(...allValues);
  const rawMax = Math.max(...allValues);

  const spread = rawMax - rawMin;
  const padding = spread === 0 ? Math.max(1, rawMax * 0.1 || 1) : spread * 0.15;
  const yMin = Math.max(0, rawMin - padding);
  const yMax = rawMax + padding;
  const yRange = yMax - yMin || 1;

  const plotWidth = CHART_WIDTH - MARGIN.left - MARGIN.right;
  const plotHeight = CHART_HEIGHT - MARGIN.top - MARGIN.bottom;

  const xStep = xLabels.length > 1 ? plotWidth / (xLabels.length - 1) : 0;

  const getX = (index: number) => MARGIN.left + index * xStep;
  const getY = (value: number) => MARGIN.top + ((yMax - value) / yRange) * plotHeight;

  const yTicks = 5;
  const yTickValues = Array.from({ length: yTicks + 1 }, (_, index) => yMin + (index / yTicks) * yRange);

  return (
    <Card className="border-border/85 shadow-none">
      <CardContent className="space-y-3.5 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2.5 text-[11px] text-muted-foreground">
          {series.map((item) => (
            <span key={item.name} className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              {item.name}
            </span>
          ))}
        </div>

        <div className="w-full overflow-x-auto">
          <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className="min-w-[640px] w-full text-xs" role="img" aria-label={yAxisLabel}>
            {yTickValues.map((tickValue, index) => {
              const y = getY(tickValue);

              return (
                <g key={`y-tick-${index}`}>
                  <line x1={MARGIN.left} y1={y} x2={CHART_WIDTH - MARGIN.right} y2={y} stroke="hsl(var(--border))" strokeDasharray="4 4" />
                  <text x={MARGIN.left - 10} y={y + 4} textAnchor="end" fill="hsl(var(--muted-foreground))">
                    {yTickFormatter(tickValue)}
                  </text>
                </g>
              );
            })}

            {xLabels.map((label, index) => (
              <g key={label}>
                <line
                  x1={getX(index)}
                  y1={MARGIN.top}
                  x2={getX(index)}
                  y2={CHART_HEIGHT - MARGIN.bottom}
                  stroke="hsl(var(--border))"
                  strokeDasharray="2 6"
                />
                <text x={getX(index)} y={CHART_HEIGHT - MARGIN.bottom + 22} textAnchor="middle" fill="hsl(var(--muted-foreground))">
                  {label}
                </text>
              </g>
            ))}

            <line
              x1={MARGIN.left}
              y1={CHART_HEIGHT - MARGIN.bottom}
              x2={CHART_WIDTH - MARGIN.right}
              y2={CHART_HEIGHT - MARGIN.bottom}
              stroke="hsl(var(--foreground))"
            />
            <line x1={MARGIN.left} y1={MARGIN.top} x2={MARGIN.left} y2={CHART_HEIGHT - MARGIN.bottom} stroke="hsl(var(--foreground))" />

            {series.map((item) => {
              const points = item.values.map((value, index) => `${getX(index)},${getY(value)}`).join(" ");

              return (
                <g key={item.name}>
                  <polyline fill="none" stroke={item.color} strokeWidth={3} points={points} />
                  {item.values.map((value, index) => (
                    <circle key={`${item.name}-${index}`} cx={getX(index)} cy={getY(value)} r={4.5} fill={item.color} />
                  ))}
                </g>
              );
            })}

            <text x={MARGIN.left - 50} y={MARGIN.top - 6} fill="hsl(var(--muted-foreground))">
              {yAxisLabel}
            </text>
            <text x={CHART_WIDTH / 2} y={CHART_HEIGHT - 16} textAnchor="middle" fill="hsl(var(--muted-foreground))">
              {xAxisLabel}
            </text>
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
