"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CalculatorFormCard } from "@/components/calculator/calculator-form-card";
import { InterpretationCard } from "@/components/calculator/interpretation-card";
import { MetricCard } from "@/components/calculator/metric-card";
import { NumberField } from "@/components/calculator/number-field";
import { ResultsCard } from "@/components/calculator/results-card";
import { calculateCostPerUnitAfterFees } from "@/lib/calculations";
import { interpretCostPerUnitAfterFees } from "@/lib/calculations/interpretations";
import { formatCurrency } from "@/lib/formatters";
import { costPerUnitAfterFeesSchema } from "@/lib/validations/calculators";

const schema = costPerUnitAfterFeesSchema;
type FormValues = z.infer<typeof schema>;

const defaultValues: FormValues = {
  totalProductCost: 7500,
  quantity: 500,
  shipping: 900,
  importDuty: 250,
  vatTax: 200,
  handlingFees: 100
};

export function CostPerUnitAfterFeesCalculator() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues
  });

  const parsed = schema.safeParse(form.watch());
  const result = parsed.success ? calculateCostPerUnitAfterFees(parsed.data) : null;
  const interpretation =
    result
      ? interpretCostPerUnitAfterFees({
          baseCostPerUnit: result.baseCostPerUnit,
          costPerUnitAfterFees: result.costPerUnitAfterFees
        })
      : null;

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <CalculatorFormCard
        title="Add product and import fee data"
        description="Distribute total fees across quantity to reveal true unit cost."
      >
        <form className="grid gap-4 sm:grid-cols-2">
          <NumberField<FormValues>
            name="totalProductCost"
            label="Total product cost"
            register={form.register}
            error={form.formState.errors.totalProductCost?.message}
          />
          <NumberField<FormValues>
            name="quantity"
            label="Quantity"
            register={form.register}
            error={form.formState.errors.quantity?.message}
          />
          <NumberField<FormValues>
            name="shipping"
            label="Shipping"
            register={form.register}
            error={form.formState.errors.shipping?.message}
          />
          <NumberField<FormValues>
            name="importDuty"
            label="Import duty"
            register={form.register}
            error={form.formState.errors.importDuty?.message}
          />
          <NumberField<FormValues>
            name="vatTax"
            label="VAT / tax"
            register={form.register}
            error={form.formState.errors.vatTax?.message}
          />
          <NumberField<FormValues>
            name="handlingFees"
            label="Handling fees"
            register={form.register}
            error={form.formState.errors.handlingFees?.message}
          />
        </form>
      </CalculatorFormCard>

      <ResultsCard title="Results" description="Compare before/after fee impact before setting final SKU pricing.">
        {result && interpretation ? (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <MetricCard label="Cost per unit after fees" value={formatCurrency(result.costPerUnitAfterFees)} />
              <MetricCard label="Cost per unit before fees" value={formatCurrency(result.baseCostPerUnit)} />
              <MetricCard label="Total fees" value={formatCurrency(result.totalFees)} />
              <MetricCard label="Total cost" value={formatCurrency(result.totalCost)} />
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
