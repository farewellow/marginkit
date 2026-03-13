"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CalculatorFormCard } from "@/components/calculator/calculator-form-card";
import { InterpretationCard } from "@/components/calculator/interpretation-card";
import { MetricCard } from "@/components/calculator/metric-card";
import { NumberField } from "@/components/calculator/number-field";
import { ResultsCard } from "@/components/calculator/results-card";
import { calculateLandedCost } from "@/lib/calculations";
import { interpretLandedCost } from "@/lib/calculations/interpretations";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { landedCostSchema } from "@/lib/validations/calculators";

const schema = landedCostSchema;
type FormValues = z.infer<typeof schema>;

const defaultValues: FormValues = {
  productCost: 12000,
  quantity: 1000,
  shippingCost: 1800,
  customsDuty: 950,
  vatTax: 1100,
  insurance: 200,
  otherFees: 150
};

export function LandedCostCalculator() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues
  });

  const values = form.watch();
  const parsed = schema.safeParse(values);
  const parsedData = parsed.success ? parsed.data : null;
  const result = parsedData ? calculateLandedCost(parsedData) : null;
  const interpretation =
    parsedData && result
      ? interpretLandedCost({
          totalExtraCosts: result.totalExtraCosts,
          productCost: parsedData.productCost,
          extraCostPerUnit: result.extraCostPerUnit,
          landedCostPerUnit: result.landedCostPerUnit
        })
      : null;

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <CalculatorFormCard
        title="Enter order and import costs"
        description="Product cost should be total order cost for the shipment."
      >
        <form className="grid gap-4 sm:grid-cols-2">
          <NumberField<FormValues>
            name="productCost"
            label="Product cost"
            helper="Total order product value"
            register={form.register}
            error={form.formState.errors.productCost?.message}
          />
          <NumberField<FormValues>
            name="quantity"
            label="Quantity"
            register={form.register}
            error={form.formState.errors.quantity?.message}
          />
          <NumberField<FormValues>
            name="shippingCost"
            label="Shipping cost"
            register={form.register}
            error={form.formState.errors.shippingCost?.message}
          />
          <NumberField<FormValues>
            name="customsDuty"
            label="Customs duty"
            register={form.register}
            error={form.formState.errors.customsDuty?.message}
          />
          <NumberField<FormValues>
            name="vatTax"
            label="VAT / tax"
            register={form.register}
            error={form.formState.errors.vatTax?.message}
          />
          <NumberField<FormValues>
            name="insurance"
            label="Insurance"
            register={form.register}
            error={form.formState.errors.insurance?.message}
          />
          <div className="sm:col-span-2">
            <NumberField<FormValues>
              name="otherFees"
              label="Other fees"
              register={form.register}
              error={form.formState.errors.otherFees?.message}
            />
          </div>
        </form>
      </CalculatorFormCard>

      <ResultsCard
        title="Results"
        description="Use landed cost per unit as your baseline for pricing and margin calculators."
      >
        {result && interpretation && parsedData ? (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <MetricCard label="Landed cost per unit" value={formatCurrency(result.landedCostPerUnit)} />
              <MetricCard label="Total landed cost" value={formatCurrency(result.totalLandedCost)} />
              <MetricCard label="Total extra costs" value={formatCurrency(result.totalExtraCosts)} />
              <MetricCard label="Extra cost per unit" value={formatCurrency(result.extraCostPerUnit)} />
              <MetricCard label="Quantity" value={formatNumber(parsedData.quantity, 0)} />
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
