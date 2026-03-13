export interface LandedCostInput {
  productCost: number;
  quantity: number;
  shippingCost: number;
  customsDuty: number;
  vatTax: number;
  insurance: number;
  otherFees: number;
}

export interface CostPerUnitAfterFeesInput {
  totalProductCost: number;
  quantity: number;
  shipping: number;
  importDuty: number;
  vatTax: number;
  handlingFees: number;
}

export interface ImportProfitMarginInput {
  totalLandedCost: number;
  quantity: number;
  sellingPricePerUnit: number;
}

export interface SupplierCostIncreaseInput {
  currentCostPerUnit: number;
  newCostPerUnit: number;
  sellingPricePerUnit: number;
  monthlyUnitsSold: number;
}

export interface MarginAfterFeesInput {
  sellingPrice: number;
  productCost: number;
  shippingCost: number;
  paymentFee: number;
  otherVariableFees: number;
}

export interface DiscountImpactInput {
  originalSellingPrice: number;
  costPerUnit: number;
  discountPercent: number;
  currentMonthlyUnitsSold: number;
}

export interface ReorderPointInput {
  averageDailySales: number;
  leadTimeDays: number;
  safetyStock: number;
}

export interface SafetyStockInput {
  maxDailySales: number;
  averageDailySales: number;
  maxLeadTime: number;
  averageLeadTime: number;
}

export interface DaysOfInventoryLeftInput {
  currentStockUnits: number;
  averageDailySales: number;
}

export interface BreakEvenSellingPriceInput {
  costPerUnit: number;
  shippingAndFeesPerUnit: number;
  targetProfitPerUnit: number;
}

export interface BreakEvenRoasInput {
  sellingPrice: number;
  productCost: number;
  shippingCost: number;
  otherVariableCosts: number;
}