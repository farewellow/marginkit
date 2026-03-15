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

const CHART_WIDTH = 820;
const CHART_HEIGHT = 420;
const BASE_TOP_MARGIN = 36;
const BASE_RIGHT_MARGIN = 36;
const BASE_BOTTOM_MARGIN = 90;
const BASE_LEFT_MARGIN = 84;
const MAX_LABEL_LINE_CHARS = 15;

function wrapAxisLabel(label: string, maxCharsPerLine: number): string[] {
  if (label.length <= maxCharsPerLine) {
    return [label];
  }

  const words = label.split(" ");
  if (words.length === 1) {
    const chunks: string[] = [];
    for (let index = 0; index < label.length; index += maxCharsPerLine) {
      chunks.push(label.slice(index, index + maxCharsPerLine));
    }
    return chunks;
  }

  const lines: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (candidate.length <= maxCharsPerLine) {
      currentLine = candidate;
      return;
    }

    if (currentLine) {
      lines.push(currentLine);
      currentLine = word;
      return;
    }

    for (let index = 0; index < word.length; index += maxCharsPerLine) {
      lines.push(word.slice(index, index + maxCharsPerLine));
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

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

  const yTicks = 5;
  const yTickValues = Array.from({ length: yTicks + 1 }, (_, index) => yMin + (index / yTicks) * yRange);
  const yTickLabels = yTickValues.map((value) => yTickFormatter(value));
  const maxYTickLabelLength = yTickLabels.reduce((max, label) => Math.max(max, label.length), 0);

  const wrappedXLabels = xLabels.map((label) => wrapAxisLabel(label, MAX_LABEL_LINE_CHARS));
  const maxXLabelLines = wrappedXLabels.reduce((max, lines) => Math.max(max, lines.length), 1);

  const leftMargin = Math.min(150, Math.max(BASE_LEFT_MARGIN, 34 + maxYTickLabelLength * 7));
  const rightMargin = BASE_RIGHT_MARGIN;
  const topMargin = BASE_TOP_MARGIN;
  const bottomMargin = BASE_BOTTOM_MARGIN + (maxXLabelLines - 1) * 14;

  const plotWidth = CHART_WIDTH - leftMargin - rightMargin;
  const plotHeight = CHART_HEIGHT - topMargin - bottomMargin;
  const xStep = xLabels.length > 1 ? plotWidth / (xLabels.length - 1) : 0;

  const getX = (index: number) => leftMargin + index * xStep;
  const getY = (value: number) => topMargin + ((yMax - value) / yRange) * plotHeight;

  return (
    <Card className="border-border/85 shadow-none">
      <CardContent className="space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2.5 text-[11px] leading-5 text-muted-foreground">
          {series.map((item) => (
            <span key={item.name} className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              {item.name}
            </span>
          ))}
        </div>

        <div className="w-full overflow-x-auto pb-1">
          <svg
            viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
            className="h-auto min-w-[700px] w-full text-xs"
            role="img"
            aria-label={`${yAxisLabel} by ${xAxisLabel}`}
          >
            {yTickValues.map((tickValue, index) => {
              const y = getY(tickValue);

              return (
                <g key={`y-tick-${index}`}>
                  <line x1={leftMargin} y1={y} x2={CHART_WIDTH - rightMargin} y2={y} stroke="hsl(var(--border))" strokeDasharray="4 4" />
                  <text x={leftMargin - 14} y={y + 4} textAnchor="end" fill="hsl(var(--muted-foreground))">
                    {yTickLabels[index]}
                  </text>
                </g>
              );
            })}

            {xLabels.map((label, index) => {
              const anchor = xLabels.length === 1 ? "middle" : index === 0 ? "start" : index === xLabels.length - 1 ? "end" : "middle";
              const offset = xLabels.length === 1 ? 0 : index === 0 ? 8 : index === xLabels.length - 1 ? -8 : 0;

              return (
                <g key={label}>
                  <line
                    x1={getX(index)}
                    y1={topMargin}
                    x2={getX(index)}
                    y2={CHART_HEIGHT - bottomMargin}
                    stroke="hsl(var(--border))"
                    strokeDasharray="2 6"
                  />
                  <text
                    x={getX(index) + offset}
                    y={CHART_HEIGHT - bottomMargin + 26}
                    textAnchor={anchor}
                    fill="hsl(var(--muted-foreground))"
                  >
                    {wrappedXLabels[index].map((line, lineIndex) => (
                      <tspan key={`${label}-${lineIndex}`} x={getX(index) + offset} dy={lineIndex === 0 ? 0 : 13}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              );
            })}

            <line
              x1={leftMargin}
              y1={CHART_HEIGHT - bottomMargin}
              x2={CHART_WIDTH - rightMargin}
              y2={CHART_HEIGHT - bottomMargin}
              stroke="hsl(var(--foreground))"
            />
            <line x1={leftMargin} y1={topMargin} x2={leftMargin} y2={CHART_HEIGHT - bottomMargin} stroke="hsl(var(--foreground))" />

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

            <text x={leftMargin} y={topMargin - 14} textAnchor="start" fill="hsl(var(--muted-foreground))">
              {yAxisLabel}
            </text>
            <text x={CHART_WIDTH / 2} y={CHART_HEIGHT - 18} textAnchor="middle" fill="hsl(var(--muted-foreground))">
              {xAxisLabel}
            </text>
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
