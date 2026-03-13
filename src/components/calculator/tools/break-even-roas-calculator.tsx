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
import { calculateBreakEvenRoas } from "@/lib/calculations";
import { interpretBreakEvenRoas } from "@/lib/calculations/interpretations";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { breakEvenRoasSchema } from "@/lib/validations/calculators";

const schema = breakEvenRoasSchema;
type FormValues = z.infer<typeof schema>;

const defaultValues: FormValues = {
  sellingPrice: 55,
  productCost: 27,
  shippingCost: 4,
  otherVariableCosts: 2
};

export function BreakEvenRoasCalculator() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues
  });

  const parsed = schema.safeParse(form.watch());
  const result = parsed.success ? calculateBreakEvenRoas(parsed.data) : null;
  const interpretation =
    result
      ? interpretBreakEvenRoas({
          breakEvenCac: result.breakEvenCac,
          breakEvenRoas: result.breakEvenRoas,
          warning: result.warning
        })
      : null;

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <CalculatorFormCard title="Input order economics before ads" description="Find CAC and ROAS break-even limits for paid traffic.">
        <form className="grid gap-4 sm:grid-cols-2">
          <NumberField<FormValues>
            name="sellingPrice"
            label="Selling price"
            register={form.register}
            error={form.formState.errors.sellingPrice?.message}
          />
          <NumberField<FormValues>
            name="productCost"
            label="Product cost"
            register={form.register}
            error={form.formState.errors.productCost?.message}
          />
          <NumberField<FormValues>
            name="shippingCost"
            label="Shipping cost"
            register={form.register}
            error={form.formState.errors.shippingCost?.message}
          />
          <NumberField<FormValues>
            name="otherVariableCosts"
            label="Other variable costs"
            register={form.register}
            error={form.formState.errors.otherVariableCosts?.message}
          />
        </form>
      </CalculatorFormCard>

      <ResultsCard title="Results" description="Evaluate campaign viability using break-even CAC and ROAS guardrails.">
        {result && interpretation ? (
          <div className="space-y-4">
            {result.warning ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                <AlertTriangle className="mr-2 inline h-4 w-4" />
                {result.warning}
              </div>
            ) : null}
            <div className="grid gap-4 sm:grid-cols-2">
              <MetricCard
                label="Break-even ROAS"
                value={result.breakEvenRoas === null ? "N/A" : formatNumber(result.breakEvenRoas, 2)}
              />
              <MetricCard label="Break-even CAC" value={formatCurrency(result.breakEvenCac)} tone={result.breakEvenCac <= 0 ? "danger" : "default"} />
              <MetricCard label="Gross profit before ads" value={formatCurrency(result.grossProfitBeforeAds)} />
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
