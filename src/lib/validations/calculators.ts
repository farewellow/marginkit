import { z } from "zod";

const nonNegativeNumber = (label: string) =>
  z.coerce.number().min(0, `${label} cannot be negative.`);

const positiveNumber = (label: string) => z.coerce.number().gt(0, `${label} must be greater than 0.`);

export const landedCostSchema = z.object({
  productCost: nonNegativeNumber("Product cost"),
  quantity: positiveNumber("Quantity"),
  shippingCost: nonNegativeNumber("Shipping cost"),
  customsDuty: nonNegativeNumber("Customs duty"),
  vatTax: nonNegativeNumber("VAT / tax"),
  insurance: nonNegativeNumber("Insurance"),
  otherFees: nonNegativeNumber("Other fees")
});

export const costPerUnitAfterFeesSchema = z.object({
  totalProductCost: nonNegativeNumber("Total product cost"),
  quantity: positiveNumber("Quantity"),
  shipping: nonNegativeNumber("Shipping"),
  importDuty: nonNegativeNumber("Import duty"),
  vatTax: nonNegativeNumber("VAT / tax"),
  handlingFees: nonNegativeNumber("Handling fees")
});

export const importProfitMarginSchema = z.object({
  totalLandedCost: nonNegativeNumber("Total landed cost"),
  quantity: positiveNumber("Quantity"),
  sellingPricePerUnit: positiveNumber("Selling price per unit")
});

export const supplierCostIncreaseSchema = z.object({
  currentCostPerUnit: nonNegativeNumber("Current cost per unit"),
  newCostPerUnit: nonNegativeNumber("New cost per unit"),
  sellingPricePerUnit: positiveNumber("Selling price per unit"),
  monthlyUnitsSold: nonNegativeNumber("Monthly units sold")
});

export const marginAfterFeesSchema = z.object({
  sellingPrice: positiveNumber("Selling price"),
  productCost: nonNegativeNumber("Product cost"),
  shippingCost: nonNegativeNumber("Shipping cost"),
  paymentFee: nonNegativeNumber("Payment fee"),
  otherVariableFees: nonNegativeNumber("Other variable fees")
});

export const discountImpactSchema = z.object({
  originalSellingPrice: positiveNumber("Original selling price"),
  costPerUnit: nonNegativeNumber("Cost per unit"),
  discountPercent: z.coerce
    .number()
    .min(0, "Discount cannot be negative.")
    .max(100, "Discount cannot exceed 100%"),
  currentMonthlyUnitsSold: nonNegativeNumber("Current monthly units sold")
});

export const reorderPointSchema = z.object({
  averageDailySales: nonNegativeNumber("Average daily sales"),
  leadTimeDays: nonNegativeNumber("Lead time days"),
  safetyStock: nonNegativeNumber("Safety stock")
});

export const safetyStockSchema = z.object({
  maxDailySales: nonNegativeNumber("Max daily sales"),
  averageDailySales: nonNegativeNumber("Average daily sales"),
  maxLeadTime: nonNegativeNumber("Max lead time"),
  averageLeadTime: nonNegativeNumber("Average lead time")
});

export const daysOfInventorySchema = z.object({
  currentStockUnits: nonNegativeNumber("Current stock units"),
  averageDailySales: nonNegativeNumber("Average daily sales")
});

export const breakEvenSellingPriceSchema = z.object({
  costPerUnit: nonNegativeNumber("Cost per unit"),
  shippingAndFeesPerUnit: nonNegativeNumber("Shipping and fees per unit"),
  targetProfitPerUnit: nonNegativeNumber("Target profit per unit")
});

export const breakEvenRoasSchema = z.object({
  sellingPrice: positiveNumber("Selling price"),
  productCost: nonNegativeNumber("Product cost"),
  shippingCost: nonNegativeNumber("Shipping cost"),
  otherVariableCosts: nonNegativeNumber("Other variable costs")
});