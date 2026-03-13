import type {
  BreakEvenRoasInput,
  BreakEvenSellingPriceInput,
  CostPerUnitAfterFeesInput,
  DaysOfInventoryLeftInput,
  DiscountImpactInput,
  ImportProfitMarginInput,
  LandedCostInput,
  MarginAfterFeesInput,
  ReorderPointInput,
  SafetyStockInput,
  SupplierCostIncreaseInput
} from "@/types/calculators";

function safeDivide(numerator: number, denominator: number): number {
  if (denominator === 0) return 0;
  return numerator / denominator;
}

export function calculateLandedCost(input: LandedCostInput) {
  const totalExtraCosts =
    input.shippingCost + input.customsDuty + input.vatTax + input.insurance + input.otherFees;
  const totalLandedCost = input.productCost + totalExtraCosts;
  const landedCostPerUnit = safeDivide(totalLandedCost, input.quantity);
  const extraCostPerUnit = safeDivide(totalExtraCosts, input.quantity);

  return {
    totalExtraCosts,
    totalLandedCost,
    landedCostPerUnit,
    extraCostPerUnit,
    insight: totalExtraCosts > input.productCost * 0.5 ? "High import overhead" : "Import overhead is manageable"
  };
}

export function calculateCostPerUnitAfterFees(input: CostPerUnitAfterFeesInput) {
  const baseCostPerUnit = safeDivide(input.totalProductCost, input.quantity);
  const totalFees = input.shipping + input.importDuty + input.vatTax + input.handlingFees;
  const totalCost = input.totalProductCost + totalFees;
  const costPerUnitAfterFees = safeDivide(totalCost, input.quantity);

  return {
    baseCostPerUnit,
    totalFees,
    totalCost,
    costPerUnitAfterFees,
    insight:
      costPerUnitAfterFees > baseCostPerUnit * 1.2
        ? "Fees materially increase unit cost"
        : "Fee impact is moderate"
  };
}

export function calculateImportProfitMargin(input: ImportProfitMarginInput) {
  const costPerUnit = safeDivide(input.totalLandedCost, input.quantity);
  const profitPerUnit = input.sellingPricePerUnit - costPerUnit;
  const totalProfit = profitPerUnit * input.quantity;
  const marginPercent = safeDivide(profitPerUnit, input.sellingPricePerUnit) * 100;
  const markupPercent = safeDivide(profitPerUnit, costPerUnit) * 100;

  return {
    costPerUnit,
    profitPerUnit,
    totalProfit,
    marginPercent,
    markupPercent,
    insight: getMarginInsight(marginPercent)
  };
}

export function calculateSupplierCostIncreaseImpact(input: SupplierCostIncreaseInput) {
  const oldProfitPerUnit = input.sellingPricePerUnit - input.currentCostPerUnit;
  const newProfitPerUnit = input.sellingPricePerUnit - input.newCostPerUnit;
  const oldMargin = safeDivide(oldProfitPerUnit, input.sellingPricePerUnit) * 100;
  const newMargin = safeDivide(newProfitPerUnit, input.sellingPricePerUnit) * 100;
  const profitChangePerUnit = newProfitPerUnit - oldProfitPerUnit;
  const monthlyProfitChange = profitChangePerUnit * input.monthlyUnitsSold;
  const requiredPriceToPreserveOldMargin = safeDivide(input.newCostPerUnit, 1 - oldMargin / 100);

  return {
    oldMargin,
    newMargin,
    profitChangePerUnit,
    monthlyProfitChange,
    requiredPriceToPreserveOldMargin,
    insight:
      monthlyProfitChange < 0
        ? "Cost increase materially reduces profit"
        : "Cost increase impact is limited"
  };
}

export function calculateMarginAfterShippingFees(input: MarginAfterFeesInput) {
  const totalCost = input.productCost + input.shippingCost + input.paymentFee + input.otherVariableFees;
  const profit = input.sellingPrice - totalCost;
  const marginPercent = safeDivide(profit, input.sellingPrice) * 100;
  const markupPercent = safeDivide(profit, totalCost) * 100;

  return {
    totalCost,
    profit,
    marginPercent,
    markupPercent,
    insight: getMarginInsight(marginPercent)
  };
}

export function calculateDiscountImpact(input: DiscountImpactInput) {
  const discountedPrice = input.originalSellingPrice * (1 - input.discountPercent / 100);
  const oldProfitPerUnit = input.originalSellingPrice - input.costPerUnit;
  const newProfitPerUnit = discountedPrice - input.costPerUnit;
  const oldMargin = safeDivide(oldProfitPerUnit, input.originalSellingPrice) * 100;
  const newMargin = safeDivide(newProfitPerUnit, discountedPrice) * 100;
  const oldTotalProfit = oldProfitPerUnit * input.currentMonthlyUnitsSold;
  const additionalUnitsNeeded =
    newProfitPerUnit <= 0
      ? null
      : Math.max(0, safeDivide(oldTotalProfit, newProfitPerUnit) - input.currentMonthlyUnitsSold);

  return {
    discountedPrice,
    oldProfitPerUnit,
    newProfitPerUnit,
    oldMargin,
    newMargin,
    additionalUnitsNeeded,
    warning:
      newProfitPerUnit <= 0 ? "Discount removes all unit profit. Additional units target is not feasible." : null,
    insight:
      newProfitPerUnit <= 0
        ? "Discount hurts profitability"
        : newMargin < oldMargin - 8
          ? "Margin drops sharply"
          : "Discount impact is manageable"
  };
}

export function calculateReorderPoint(input: ReorderPointInput) {
  const leadTimeDemand = input.averageDailySales * input.leadTimeDays;
  const reorderPoint = leadTimeDemand + input.safetyStock;

  return {
    leadTimeDemand,
    reorderPoint,
    insight: input.safetyStock > 0 ? "Reorder soon when stock approaches threshold" : "No safety buffer included"
  };
}

export function calculateSafetyStock(input: SafetyStockInput) {
  const safetyStock = Math.max(
    0,
    input.maxDailySales * input.maxLeadTime - input.averageDailySales * input.averageLeadTime
  );

  return {
    safetyStock,
    insight: safetyStock === 0 ? "Low volatility profile" : "Safety buffer recommended"
  };
}

export function calculateDaysOfInventoryLeft(input: DaysOfInventoryLeftInput) {
  if (input.averageDailySales === 0) {
    return {
      daysLeft: null,
      warning: "Average daily sales is 0. Days of inventory cannot be calculated.",
      insight: "No sales velocity data"
    };
  }

  const daysLeft = safeDivide(input.currentStockUnits, input.averageDailySales);

  return {
    daysLeft,
    warning: null,
    insight:
      daysLeft < 14 ? "Stockout risk" : daysLeft < 30 ? "Reorder soon" : "Inventory runway looks healthy"
  };
}

export function calculateBreakEvenSellingPrice(input: BreakEvenSellingPriceInput) {
  const breakEvenSellingPrice = input.costPerUnit + input.shippingAndFeesPerUnit + input.targetProfitPerUnit;

  return {
    breakEvenSellingPrice,
    insight: input.targetProfitPerUnit === 0 ? "Pure break-even pricing" : "Target-profit pricing floor"
  };
}

export function calculateBreakEvenRoas(input: BreakEvenRoasInput) {
  const grossProfitBeforeAds = input.sellingPrice - (input.productCost + input.shippingCost + input.otherVariableCosts);
  const breakEvenCac = grossProfitBeforeAds;
  const breakEvenRoas = breakEvenCac > 0 ? input.sellingPrice / breakEvenCac : null;

  return {
    grossProfitBeforeAds,
    breakEvenCac,
    breakEvenRoas,
    warning:
      breakEvenCac <= 0
        ? "Break-even CAC is zero or negative. Improve unit economics before scaling ads."
        : null,
    insight:
      breakEvenCac <= 0
        ? "Unit economics are unhealthy"
        : breakEvenRoas !== null && breakEvenRoas > 3
          ? "High ROAS threshold"
          : "ROAS target looks attainable"
  };
}

export function getMarginInsight(marginPercent: number): string {
  if (marginPercent < 0) return "Negative margin risk";
  if (marginPercent < 15) return "Low margin risk";
  if (marginPercent < 30) return "Stable margin";
  return "Healthy margin";
}

export type InventoryStatus = "urgent" | "warning" | "ok";

export function getInventoryStatus(currentStock: number, reorderPoint: number): InventoryStatus {
  if (currentStock <= reorderPoint) return "urgent";
  if (currentStock <= reorderPoint * 1.2) return "warning";
  return "ok";
}
