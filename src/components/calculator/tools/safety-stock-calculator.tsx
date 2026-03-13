"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CalculatorFormCard } from "@/components/calculator/calculator-form-card";
import { InterpretationCard } from "@/components/calculator/interpretation-card";
import { MetricCard } from "@/components/calculator/metric-card";
import { NumberField } from "@/components/calculator/number-field";
import { ResultsCard } from "@/components/calculator/results-card";
import { calculateSafetyStock } from "@/lib/calculations";
import { interpretSafetyStock } from "@/lib/calculations/interpretations";
import { formatNumber } from "@/lib/formatters";
import { safetyStockSchema } from "@/lib/validations/calculators";

const schema = safetyStockSchema;
type FormValues = z.infer<typeof schema>;

const defaultValues: FormValues = {
  maxDailySales: 60,
  averageDailySales: 35,
  maxLeadTime: 28,
  averageLeadTime: 21
};

export function SafetyStockCalculator() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues
  });

  const parsed = schema.safeParse(form.watch());
  const parsedData = parsed.success ? parsed.data : null;
  const result = parsedData ? calculateSafetyStock(parsedData) : null;
  const interpretation = result ? interpretSafetyStock({ safetyStock: result.safetyStock }) : null;

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <CalculatorFormCard
        title="Input demand and lead-time spread"
        description="Safety stock is floored at zero when volatility profile is low."
      >
        <form className="grid gap-4 sm:grid-cols-2">
          <NumberField<FormValues>
            name="maxDailySales"
            label="Max daily sales"
            register={form.register}
            error={form.formState.errors.maxDailySales?.message}
          />
          <NumberField<FormValues>
            name="averageDailySales"
            label="Average daily sales"
            register={form.register}
            error={form.formState.errors.averageDailySales?.message}
          />
          <NumberField<FormValues>
            name="maxLeadTime"
            label="Max lead time"
            register={form.register}
            error={form.formState.errors.maxLeadTime?.message}
          />
          <NumberField<FormValues>
            name="averageLeadTime"
            label="Average lead time"
            register={form.register}
            error={form.formState.errors.averageLeadTime?.message}
          />
        </form>
      </CalculatorFormCard>

      <ResultsCard title="Results" description="Use this safety buffer together with reorder point for stronger planning.">
        {result && interpretation && parsedData ? (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <MetricCard label="Safety stock" value={formatNumber(result.safetyStock, 0)} />
              <MetricCard label="Max daily sales" value={formatNumber(parsedData.maxDailySales, 0)} />
              <MetricCard label="Average daily sales" value={formatNumber(parsedData.averageDailySales, 0)} />
              <MetricCard label="Lead-time spread" value={formatNumber(parsedData.maxLeadTime - parsedData.averageLeadTime, 0)} />
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
