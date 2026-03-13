"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CalculatorFormCard } from "@/components/calculator/calculator-form-card";
import { InterpretationCard } from "@/components/calculator/interpretation-card";
import { MetricCard } from "@/components/calculator/metric-card";
import { NumberField } from "@/components/calculator/number-field";
import { ResultsCard } from "@/components/calculator/results-card";
import { calculateBreakEvenSellingPrice } from "@/lib/calculations";
import { interpretBreakEvenSellingPrice } from "@/lib/calculations/interpretations";
import { formatCurrency } from "@/lib/formatters";
import { breakEvenSellingPriceSchema } from "@/lib/validations/calculators";

const schema = breakEvenSellingPriceSchema;
type FormValues = z.infer<typeof schema>;

const defaultValues: FormValues = {
  costPerUnit: 11,
  shippingAndFeesPerUnit: 4,
  targetProfitPerUnit: 6
};

export function BreakEvenSellingPriceCalculator() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues
  });

  const parsed = schema.safeParse(form.watch());
  const parsedData = parsed.success ? parsed.data : null;
  const result = parsedData ? calculateBreakEvenSellingPrice(parsedData) : null;
  const interpretation =
    parsedData && result
      ? interpretBreakEvenSellingPrice({
          targetProfitPerUnit: parsedData.targetProfitPerUnit,
          breakEvenSellingPrice: result.breakEvenSellingPrice
        })
      : null;

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <CalculatorFormCard title="Set your unit economics" description="Combine cost, fees, and target profit to get pricing floor.">
        <form className="grid gap-4">
          <NumberField<FormValues>
            name="costPerUnit"
            label="Cost per unit"
            register={form.register}
            error={form.formState.errors.costPerUnit?.message}
          />
          <NumberField<FormValues>
            name="shippingAndFeesPerUnit"
            label="Shipping and fees per unit"
            register={form.register}
            error={form.formState.errors.shippingAndFeesPerUnit?.message}
          />
          <NumberField<FormValues>
            name="targetProfitPerUnit"
            label="Target profit per unit"
            register={form.register}
            error={form.formState.errors.targetProfitPerUnit?.message}
          />
        </form>
      </CalculatorFormCard>

      <ResultsCard title="Results" description="Use this as your minimum viable selling price for profitable operations.">
        {result && interpretation && parsedData ? (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <MetricCard label="Break-even selling price" value={formatCurrency(result.breakEvenSellingPrice)} />
              <MetricCard label="Cost per unit" value={formatCurrency(parsedData.costPerUnit)} />
              <MetricCard label="Shipping and fees per unit" value={formatCurrency(parsedData.shippingAndFeesPerUnit)} />
              <MetricCard label="Target profit per unit" value={formatCurrency(parsedData.targetProfitPerUnit)} />
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
