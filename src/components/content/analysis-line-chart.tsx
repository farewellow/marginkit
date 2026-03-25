import { Card, CardContent } from "@/components/ui/card";

interface AnalysisLineChartSeries {
  name: string;
  color: string;
  values: number[];
}

interface AxisDomain {
  min?: number;
  max?: number;
  lockMinToZero?: boolean;
}

interface AnalysisLineChartProps {
  xLabels: string[];
  series: AnalysisLineChartSeries[];
  yAxisLabel: string;
  xAxisLabel: string;
  yTickFormatter?: (value: number) => string;
  secondarySeriesIndex?: number;
  secondaryYAxisLabel?: string;
  secondaryYTickFormatter?: (value: number) => string;
  yDomain?: AxisDomain;
  secondaryYDomain?: AxisDomain;
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

function calculateAxisRange(values: number[], domain?: AxisDomain) {
  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const spread = rawMax - rawMin;
  const padding = spread === 0 ? Math.max(1, rawMax * 0.1 || 1) : spread * 0.15;

  const computedMin = Math.max(0, rawMin - padding);
  const computedMax = rawMax + padding;

  const min =
    typeof domain?.min === "number"
      ? domain.min
      : domain?.lockMinToZero
        ? 0
        : computedMin;

  const max = typeof domain?.max === "number" ? domain.max : computedMax;

  return {
    min,
    max,
    range: Math.max(1, max - min)
  };
}

export function AnalysisLineChart({
  xLabels,
  series,
  yAxisLabel,
  xAxisLabel,
  yTickFormatter = (value) => `${value}`,
  secondarySeriesIndex,
  secondaryYAxisLabel,
  secondaryYTickFormatter = (value) => `${value}`,
  yDomain,
  secondaryYDomain
}: AnalysisLineChartProps) {
  const hasSecondaryAxis =
    typeof secondarySeriesIndex === "number" &&
    secondarySeriesIndex >= 0 &&
    secondarySeriesIndex < series.length &&
    !!secondaryYAxisLabel;

  const primarySeries = hasSecondaryAxis
    ? series.filter((_, index) => index !== secondarySeriesIndex)
    : series;
  const secondarySeries = hasSecondaryAxis ? series[secondarySeriesIndex] : null;

  const primaryValues = primarySeries.flatMap((item) => item.values);
  const primaryAxis = calculateAxisRange(primaryValues.length > 0 ? primaryValues : [0], yDomain);

  const secondaryAxis = secondarySeries
    ? calculateAxisRange(secondarySeries.values.length > 0 ? secondarySeries.values : [0], secondaryYDomain)
    : null;

  const yTicks = 5;
  const primaryTickValues = Array.from(
    { length: yTicks + 1 },
    (_, index) => primaryAxis.min + (index / yTicks) * primaryAxis.range
  );
  const primaryTickLabels = primaryTickValues.map((value) => yTickFormatter(value));
  const maxPrimaryTickLabelLength = primaryTickLabels.reduce((max, label) => Math.max(max, label.length), 0);

  const secondaryTickLabels = secondaryAxis
    ? primaryTickValues.map((_, index) => {
        const value = secondaryAxis.min + (index / yTicks) * secondaryAxis.range;
        return secondaryYTickFormatter(value);
      })
    : [];
  const maxSecondaryTickLabelLength = secondaryTickLabels.reduce((max, label) => Math.max(max, label.length), 0);

  const wrappedXLabels = xLabels.map((label) => wrapAxisLabel(label, MAX_LABEL_LINE_CHARS));
  const maxXLabelLines = wrappedXLabels.reduce((max, lines) => Math.max(max, lines.length), 1);

  const leftMargin = Math.min(150, Math.max(BASE_LEFT_MARGIN, 34 + maxPrimaryTickLabelLength * 7));
  const rightMargin = hasSecondaryAxis
    ? Math.min(170, Math.max(74, 30 + maxSecondaryTickLabelLength * 7))
    : BASE_RIGHT_MARGIN;
  const topMargin = BASE_TOP_MARGIN;
  const bottomMargin = BASE_BOTTOM_MARGIN + (maxXLabelLines - 1) * 14;

  const plotWidth = CHART_WIDTH - leftMargin - rightMargin;
  const plotHeight = CHART_HEIGHT - topMargin - bottomMargin;
  const xStep = xLabels.length > 1 ? plotWidth / (xLabels.length - 1) : 0;

  const getX = (index: number) => leftMargin + index * xStep;
  const getPrimaryY = (value: number) => topMargin + ((primaryAxis.max - value) / primaryAxis.range) * plotHeight;
  const getSecondaryY = (value: number) => {
    if (!secondaryAxis) {
      return getPrimaryY(value);
    }

    return topMargin + ((secondaryAxis.max - value) / secondaryAxis.range) * plotHeight;
  };

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
            {primaryTickValues.map((tickValue, index) => {
              const y = getPrimaryY(tickValue);

              return (
                <g key={`y-tick-${index}`}>
                  <line x1={leftMargin} y1={y} x2={CHART_WIDTH - rightMargin} y2={y} stroke="hsl(var(--border))" strokeDasharray="4 4" />
                  <text x={leftMargin - 14} y={y + 4} textAnchor="end" fill="hsl(var(--muted-foreground))">
                    {primaryTickLabels[index]}
                  </text>
                  {hasSecondaryAxis ? (
                    <text x={CHART_WIDTH - rightMargin + 12} y={y + 4} textAnchor="start" fill="hsl(var(--muted-foreground))">
                      {secondaryTickLabels[index]}
                    </text>
                  ) : null}
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
            {hasSecondaryAxis ? (
              <line
                x1={CHART_WIDTH - rightMargin}
                y1={topMargin}
                x2={CHART_WIDTH - rightMargin}
                y2={CHART_HEIGHT - bottomMargin}
                stroke="hsl(var(--foreground))"
              />
            ) : null}

            {series.map((item, seriesIndex) => {
              const points = item.values
                .map((value, index) => {
                  const y = hasSecondaryAxis && seriesIndex === secondarySeriesIndex ? getSecondaryY(value) : getPrimaryY(value);
                  return `${getX(index)},${y}`;
                })
                .join(" ");

              return (
                <g key={item.name}>
                  <polyline fill="none" stroke={item.color} strokeWidth={3} points={points} />
                  {item.values.map((value, index) => {
                    const y = hasSecondaryAxis && seriesIndex === secondarySeriesIndex ? getSecondaryY(value) : getPrimaryY(value);

                    return <circle key={`${item.name}-${index}`} cx={getX(index)} cy={y} r={4.5} fill={item.color} />;
                  })}
                </g>
              );
            })}

            <text x={leftMargin} y={topMargin - 14} textAnchor="start" fill="hsl(var(--muted-foreground))">
              {yAxisLabel}
            </text>
            {hasSecondaryAxis && secondaryYAxisLabel ? (
              <text x={CHART_WIDTH - rightMargin} y={topMargin - 14} textAnchor="end" fill="hsl(var(--muted-foreground))">
                {secondaryYAxisLabel}
              </text>
            ) : null}
            <text x={CHART_WIDTH / 2} y={CHART_HEIGHT - 18} textAnchor="middle" fill="hsl(var(--muted-foreground))">
              {xAxisLabel}
            </text>
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}