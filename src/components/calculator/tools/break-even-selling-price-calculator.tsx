"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CalculatorFormCard } from "@/components/calculator/calculator-form-card";
import { InterpretationCard } from "@/components/calculator/interpretation-card";
import { MetricCard } from "@/components/calculator/metric-card";
import { NumberField } from "@/components/calculator/number-field";
import { ResultsCard } from "@/components/calculator/results-card";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-2">
        <CalculatorFormCard title="Set your unit economics" description="Combine cost, fees, and target profit to define a usable price floor.">
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

        <ResultsCard
          title="Break-even result"
          description="This is your minimum selling price for current import-cost assumptions and target unit profit."
        >
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

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-3.5 p-5 sm:p-6">
            <h2 className="text-lg font-semibold tracking-tight">What costs to include before calculating break-even</h2>
            <ul className="space-y-2.5 pl-5 text-sm leading-6 text-muted-foreground">
              <li className="list-disc marker:text-primary">Product unit cost from supplier invoice.</li>
              <li className="list-disc marker:text-primary">Shipping, duty, tax, and customs handling allocated per unit.</li>
              <li className="list-disc marker:text-primary">Marketplace, payment, and fulfillment fees tied to each sale.</li>
              <li className="list-disc marker:text-primary">A realistic target profit per unit based on risk and cash goals.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/85 shadow-none">
          <CardContent className="space-y-3.5 p-5 sm:p-6">
            <h2 className="text-lg font-semibold tracking-tight">Break-even price vs profitable price</h2>
            <p className="text-sm leading-6 text-muted-foreground">
              Break-even price is your floor. Profitable price should sit above that floor with enough buffer for discounts, ad spend, and
              cost drift. If your planned market price is close to break-even, margin risk is high.
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              Build a stronger pricing stack with
              <Link href="/landed-cost-formula" className="text-primary hover:text-primary/80">
                {" "}landed cost formula
              </Link>
              ,
              <Link href="/how-to-calculate-landed-cost-for-imported-products" className="text-primary hover:text-primary/80">
                {" "}landed cost workflow
              </Link>
              ,
              <Link href="/how-to-calculate-profit-margin-after-shipping-and-fees" className="text-primary hover:text-primary/80">
                {" "}real margin calculation
              </Link>
              , and
              <Link href="/landed-cost-vs-product-cost" className="text-primary hover:text-primary/80">
                {" "}landed cost vs product cost
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}