"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CalculatorFormCard } from "@/components/calculator/calculator-form-card";
import { InterpretationCard } from "@/components/calculator/interpretation-card";
import { MetricCard } from "@/components/calculator/metric-card";
import { NumberField } from "@/components/calculator/number-field";
import { ResultsCard } from "@/components/calculator/results-card";
import { calculateDaysOfInventoryLeft } from "@/lib/calculations";
import { interpretDaysOfInventory } from "@/lib/calculations/interpretations";
import { formatNumber } from "@/lib/formatters";
import { daysOfInventorySchema } from "@/lib/validations/calculators";

const schema = daysOfInventorySchema;
type FormValues = z.infer<typeof schema>;

const defaultValues: FormValues = {
  currentStockUnits: 1800,
  averageDailySales: 75
};

export function DaysOfInventoryLeftCalculator() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues
  });

  const parsed = schema.safeParse(form.watch());
  const parsedData = parsed.success ? parsed.data : null;
  const result = parsedData ? calculateDaysOfInventoryLeft(parsedData) : null;
  const interpretation = result ? interpretDaysOfInventory({ daysLeft: result.daysLeft, warning: result.warning }) : null;

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <CalculatorFormCard title="Input current stock and daily sales" description="Use this for a quick inventory runway check.">
        <form className="grid gap-4">
          <NumberField<FormValues>
            name="currentStockUnits"
            label="Current stock units"
            register={form.register}
            error={form.formState.errors.currentStockUnits?.message}
          />
          <NumberField<FormValues>
            name="averageDailySales"
            label="Average daily sales"
            register={form.register}
            error={form.formState.errors.averageDailySales?.message}
          />
        </form>
      </CalculatorFormCard>

      <ResultsCard title="Results" description="Compare runway days against supplier lead time to avoid reactive restocking.">
        {result && interpretation && parsedData ? (
          <div className="space-y-4">
            {result.warning ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                <AlertTriangle className="mr-2 inline h-4 w-4" />
                {result.warning}
              </div>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <MetricCard label="Days of inventory left" value={result.daysLeft === null ? "N/A" : formatNumber(result.daysLeft, 1)} />
              <MetricCard label="Current stock units" value={formatNumber(parsedData.currentStockUnits, 0)} />
              <MetricCard label="Average daily sales" value={formatNumber(parsedData.averageDailySales, 1)} />
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
