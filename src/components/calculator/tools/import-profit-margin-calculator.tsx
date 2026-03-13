"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CalculatorFormCard } from "@/components/calculator/calculator-form-card";
import { InterpretationCard } from "@/components/calculator/interpretation-card";
import { MetricCard } from "@/components/calculator/metric-card";
import { NumberField } from "@/components/calculator/number-field";
import { ResultsCard } from "@/components/calculator/results-card";
import { calculateImportProfitMargin } from "@/lib/calculations";
import { interpretImportProfitMargin } from "@/lib/calculations/interpretations";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import { importProfitMarginSchema } from "@/lib/validations/calculators";

const schema = importProfitMarginSchema;
type FormValues = z.infer<typeof schema>;

const defaultValues: FormValues = {
  totalLandedCost: 18000,
  quantity: 1200,
  sellingPricePerUnit: 24
};

export function ImportProfitMarginCalculator() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues
  });

  const parsed = schema.safeParse(form.watch());
  const result = parsed.success ? calculateImportProfitMargin(parsed.data) : null;
  const interpretation = result ? interpretImportProfitMargin({ marginPercent: result.marginPercent }) : null;

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <CalculatorFormCard
        title="Enter landed cost and selling price"
        description="Convert full landed cost into profit, margin, and markup metrics."
      >
        <form className="grid gap-4">
          <NumberField<FormValues>
            name="totalLandedCost"
            label="Total landed cost"
            register={form.register}
            error={form.formState.errors.totalLandedCost?.message}
          />
          <NumberField<FormValues>
            name="quantity"
            label="Quantity"
            register={form.register}
            error={form.formState.errors.quantity?.message}
          />
          <NumberField<FormValues>
            name="sellingPricePerUnit"
            label="Selling price per unit"
            register={form.register}
            error={form.formState.errors.sellingPricePerUnit?.message}
          />
        </form>
      </CalculatorFormCard>

      <ResultsCard title="Results" description="Use margin as your primary pricing guardrail and markup for cost-side planning.">
        {result && interpretation ? (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <MetricCard label="Margin %" value={formatPercent(result.marginPercent)} />
              <MetricCard label="Profit per unit" value={formatCurrency(result.profitPerUnit)} />
              <MetricCard label="Cost per unit" value={formatCurrency(result.costPerUnit)} />
              <MetricCard label="Total profit" value={formatCurrency(result.totalProfit)} />
              <MetricCard label="Markup %" value={formatPercent(result.markupPercent)} />
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
