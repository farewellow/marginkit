"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CalculatorFormCard } from "@/components/calculator/calculator-form-card";
import { InterpretationCard } from "@/components/calculator/interpretation-card";
import { MetricCard } from "@/components/calculator/metric-card";
import { NumberField } from "@/components/calculator/number-field";
import { ResultsCard } from "@/components/calculator/results-card";
import { calculateMarginAfterShippingFees } from "@/lib/calculations";
import { interpretMarginAfterFees } from "@/lib/calculations/interpretations";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import { marginAfterFeesSchema } from "@/lib/validations/calculators";

const schema = marginAfterFeesSchema;
type FormValues = z.infer<typeof schema>;

const defaultValues: FormValues = {
  sellingPrice: 39,
  productCost: 18,
  shippingCost: 4,
  paymentFee: 1.5,
  otherVariableFees: 1
};

export function MarginAfterShippingFeesCalculator() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues
  });

  const parsed = schema.safeParse(form.watch());
  const result = parsed.success ? calculateMarginAfterShippingFees(parsed.data) : null;
  const interpretation = result ? interpretMarginAfterFees({ marginPercent: result.marginPercent }) : null;

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <CalculatorFormCard
        title="Include shipping and variable selling fees"
        description="Use this view to see true contribution margin per order."
      >
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
            name="paymentFee"
            label="Payment fee"
            register={form.register}
            error={form.formState.errors.paymentFee?.message}
          />
          <div className="sm:col-span-2">
            <NumberField<FormValues>
              name="otherVariableFees"
              label="Other variable fees"
              register={form.register}
              error={form.formState.errors.otherVariableFees?.message}
            />
          </div>
        </form>
      </CalculatorFormCard>

      <ResultsCard title="Results" description="Use contribution margin to decide safe promotion and acquisition spend windows.">
        {result && interpretation ? (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <MetricCard label="Margin %" value={formatPercent(result.marginPercent)} />
              <MetricCard label="Profit" value={formatCurrency(result.profit)} />
              <MetricCard label="Total cost" value={formatCurrency(result.totalCost)} />
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
