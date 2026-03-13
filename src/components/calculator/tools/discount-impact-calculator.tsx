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
import { calculateDiscountImpact } from "@/lib/calculations";
import { interpretDiscountImpact } from "@/lib/calculations/interpretations";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/formatters";
import { discountImpactSchema } from "@/lib/validations/calculators";

const schema = discountImpactSchema;
type FormValues = z.infer<typeof schema>;

const defaultValues: FormValues = {
  originalSellingPrice: 30,
  costPerUnit: 18,
  discountPercent: 10,
  currentMonthlyUnitsSold: 1200
};

export function DiscountImpactCalculator() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues
  });

  const parsed = schema.safeParse(form.watch());
  const result = parsed.success ? calculateDiscountImpact(parsed.data) : null;
  const interpretation =
    result
      ? interpretDiscountImpact({
          warning: result.warning,
          oldMargin: result.oldMargin,
          newMargin: result.newMargin
        })
      : null;

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <CalculatorFormCard
        title="Model discount profitability impact"
        description="See margin drop and the extra units required to keep total profit."
      >
        <form className="grid gap-4">
          <NumberField<FormValues>
            name="originalSellingPrice"
            label="Original selling price"
            register={form.register}
            error={form.formState.errors.originalSellingPrice?.message}
          />
          <NumberField<FormValues>
            name="costPerUnit"
            label="Cost per unit"
            register={form.register}
            error={form.formState.errors.costPerUnit?.message}
          />
          <NumberField<FormValues>
            name="discountPercent"
            label="Discount %"
            register={form.register}
            error={form.formState.errors.discountPercent?.message}
          />
          <NumberField<FormValues>
            name="currentMonthlyUnitsSold"
            label="Current monthly units sold"
            register={form.register}
            error={form.formState.errors.currentMonthlyUnitsSold?.message}
          />
        </form>
      </CalculatorFormCard>

      <ResultsCard title="Results" description="Check post-discount margin before expecting volume to compensate for profit loss.">
        {result && interpretation ? (
          <div className="space-y-4">
            {result.warning ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                <AlertTriangle className="mr-2 inline h-4 w-4" />
                {result.warning}
              </div>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <MetricCard label="New margin %" value={formatPercent(result.newMargin)} />
              <MetricCard label="Discounted price" value={formatCurrency(result.discountedPrice)} />
              <MetricCard label="Old margin %" value={formatPercent(result.oldMargin)} />
              <MetricCard label="Old profit per unit" value={formatCurrency(result.oldProfitPerUnit)} />
              <MetricCard label="New profit per unit" value={formatCurrency(result.newProfitPerUnit)} />
              <MetricCard
                label="Additional units needed"
                value={result.additionalUnitsNeeded === null ? "N/A" : formatNumber(result.additionalUnitsNeeded, 0)}
              />
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
