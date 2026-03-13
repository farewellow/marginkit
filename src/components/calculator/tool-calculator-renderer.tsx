"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

import { BreakEvenRoasCalculator } from "./tools/break-even-roas-calculator";
import { BreakEvenSellingPriceCalculator } from "./tools/break-even-selling-price-calculator";
import { CostPerUnitAfterFeesCalculator } from "./tools/cost-per-unit-after-fees-calculator";
import { DaysOfInventoryLeftCalculator } from "./tools/days-of-inventory-left-calculator";
import { DiscountImpactCalculator } from "./tools/discount-impact-calculator";
import { ImportProfitMarginCalculator } from "./tools/import-profit-margin-calculator";
import { InventoryCsvReorderAlertsTool } from "./tools/inventory-csv-reorder-alerts-tool";
import { LandedCostCalculator } from "./tools/landed-cost-calculator";
import { MarginAfterShippingFeesCalculator } from "./tools/margin-after-shipping-fees-calculator";
import { ReorderPointCalculator } from "./tools/reorder-point-calculator";
import { SafetyStockCalculator } from "./tools/safety-stock-calculator";
import { SupplierCostIncreaseImpactCalculator } from "./tools/supplier-cost-increase-impact-calculator";

interface ToolCalculatorRendererProps {
  slug: string;
}

export function ToolCalculatorRenderer({ slug }: ToolCalculatorRendererProps) {
  useEffect(() => {
    trackEvent("calculator_used", { slug });
  }, [slug]);

  switch (slug) {
    case "landed-cost-calculator-importers":
      return <LandedCostCalculator />;
    case "cost-per-unit-after-shipping-import-fees":
      return <CostPerUnitAfterFeesCalculator />;
    case "import-profit-margin-calculator":
      return <ImportProfitMarginCalculator />;
    case "supplier-cost-increase-impact-calculator":
      return <SupplierCostIncreaseImpactCalculator />;
    case "margin-calculator-after-shipping-fees":
      return <MarginAfterShippingFeesCalculator />;
    case "discount-impact-on-margin-calculator":
      return <DiscountImpactCalculator />;
    case "reorder-point-calculator-lead-time":
      return <ReorderPointCalculator />;
    case "safety-stock-calculator-ecommerce":
      return <SafetyStockCalculator />;
    case "days-of-inventory-left-calculator":
      return <DaysOfInventoryLeftCalculator />;
    case "break-even-selling-price-after-import-costs":
      return <BreakEvenSellingPriceCalculator />;
    case "break-even-roas-calculator-ecommerce":
      return <BreakEvenRoasCalculator />;
    case "upload-inventory-csv-reorder-alerts":
      return <InventoryCsvReorderAlertsTool />;
    default:
      return <p className="text-sm text-muted-foreground">Calculator not found for this slug.</p>;
  }
}