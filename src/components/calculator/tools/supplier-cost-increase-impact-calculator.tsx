"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CalculatorFormCard } from "@/components/calculator/calculator-form-card";
import { InterpretationCard } from "@/components/calculator/interpretation-card";
import { MetricCard } from "@/components/calculator/metric-card";
import { NumberField } from "@/components/calculator/number-field";
import { ResultsCard } from "@/components/calculator/results-card";
import { calculateSupplierCostIncreaseImpact } from "@/lib/calculations";
import { interpretSupplierCostIncrease } from "@/lib/calculations/interpretations";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import { supplierCostIncreaseSchema } from "@/lib/validations/calculators";

const schema = supplierCostIncreaseSchema;
type FormValues = z.infer<typeof schema>;

const defaultValues: FormValues = {
  currentCostPerUnit: 10,
  newCostPerUnit: 11.2,
  sellingPricePerUnit: 19,
  monthlyUnitsSold: 2000
};

export function SupplierCostIncreaseImpactCalculator() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues
  });

  const parsed = schema.safeParse(form.watch());
  const result = parsed.success ? calculateSupplierCostIncreaseImpact(parsed.data) : null;
  const interpretation =
    result
      ? interpretSupplierCostIncrease({
          oldMargin: result.oldMargin,
          newMargin: result.newMargin,
          monthlyProfitChange: result.monthlyProfitChange
        })
      : null;

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <CalculatorFormCard
        title="Model supplier cost increase"
        description="Compare old vs new margin and quantify monthly profit impact."
      >
        <form className="grid gap-4 sm:grid-cols-2">
          <NumberField<FormValues>
            name="currentCostPerUnit"
            label="Current cost per unit"
            register={form.register}
            error={form.formState.errors.currentCostPerUnit?.message}
          />
          <NumberField<FormValues>
            name="newCostPerUnit"
            label="New cost per unit"
            register={form.register}
            error={form.formState.errors.newCostPerUnit?.message}
          />
          <NumberField<FormValues>
            name="sellingPricePerUnit"
            label="Selling price per unit"
            register={form.register}
            error={form.formState.errors.sellingPricePerUnit?.message}
          />
          <NumberField<FormValues>
            name="monthlyUnitsSold"
            label="Monthly units sold"
            register={form.register}
            error={form.formState.errors.monthlyUnitsSold?.message}
          />
        </form>
      </CalculatorFormCard>

      <ResultsCard title="Results" description="Check monthly impact first, then evaluate the required repricing threshold.">
        {result && interpretation ? (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <MetricCard label="Monthly profit change" value={formatCurrency(result.monthlyProfitChange)} />
              <MetricCard label="Profit change per unit" value={formatCurrency(result.profitChangePerUnit)} />
              <MetricCard label="Old margin %" value={formatPercent(result.oldMargin)} />
              <MetricCard label="New margin %" value={formatPercent(result.newMargin)} />
              <MetricCard
                label="Required selling price to preserve old margin"
                value={formatCurrency(result.requiredPriceToPreserveOldMargin)}
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
