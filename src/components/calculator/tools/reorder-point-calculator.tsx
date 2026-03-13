"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CalculatorFormCard } from "@/components/calculator/calculator-form-card";
import { InterpretationCard } from "@/components/calculator/interpretation-card";
import { MetricCard } from "@/components/calculator/metric-card";
import { NumberField } from "@/components/calculator/number-field";
import { ResultsCard } from "@/components/calculator/results-card";
import { calculateReorderPoint } from "@/lib/calculations";
import { interpretReorderPoint } from "@/lib/calculations/interpretations";
import { formatNumber } from "@/lib/formatters";
import { reorderPointSchema } from "@/lib/validations/calculators";

const schema = reorderPointSchema;
type FormValues = z.infer<typeof schema>;

const defaultValues: FormValues = {
  averageDailySales: 22,
  leadTimeDays: 25,
  safetyStock: 180
};

export function ReorderPointCalculator() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues
  });

  const parsed = schema.safeParse(form.watch());
  const parsedData = parsed.success ? parsed.data : null;
  const result = parsedData ? calculateReorderPoint(parsedData) : null;
  const interpretation =
    parsedData && result
      ? interpretReorderPoint({
          leadTimeDemand: result.leadTimeDemand,
          safetyStock: parsedData.safetyStock,
          reorderPoint: result.reorderPoint
        })
      : null;

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <CalculatorFormCard
        title="Input sales velocity and lead time"
        description="Set the reorder threshold that protects against stockouts."
      >
        <form className="grid gap-4">
          <NumberField<FormValues>
            name="averageDailySales"
            label="Average daily sales"
            register={form.register}
            error={form.formState.errors.averageDailySales?.message}
          />
          <NumberField<FormValues>
            name="leadTimeDays"
            label="Lead time in days"
            register={form.register}
            error={form.formState.errors.leadTimeDays?.message}
          />
          <NumberField<FormValues>
            name="safetyStock"
            label="Safety stock"
            register={form.register}
            error={form.formState.errors.safetyStock?.message}
          />
        </form>
      </CalculatorFormCard>

      <ResultsCard title="Results" description="Use reorder point as your operational trigger, not as a one-time estimate.">
        {result && interpretation && parsedData ? (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <MetricCard label="Reorder point" value={formatNumber(result.reorderPoint, 0)} />
              <MetricCard label="Lead time demand" value={formatNumber(result.leadTimeDemand, 0)} />
              <MetricCard label="Safety stock" value={formatNumber(parsedData.safetyStock, 0)} />
            </div>
            <InterpretationCard interpretation={interpretation} />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Please correct highlighted fields to see results.</p>
        )}
      </ResultsCard>
    </div>
  );
}
