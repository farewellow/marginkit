import type { InventoryStatus } from "@/lib/calculations";

export type RequiredCsvField =
  | "sku"
  | "current_stock"
  | "average_daily_sales"
  | "lead_time_days"
  | "safety_stock";

export type InventoryInsightLabel =
  | "Out of stock"
  | "No sales movement"
  | "Reorder now"
  | "Reorder soon"
  | "Stock level looks stable";

export interface ParsedCsvRow {
  [key: string]: string | number | null | undefined;
}

export interface InventoryMappedRow {
  sku: string;
  current_stock: number;
  average_daily_sales: number;
  lead_time_days: number;
  safety_stock: number;
}

export interface InventoryComputedRow extends InventoryMappedRow {
  lead_time_demand: number;
  reorder_point: number;
  status: InventoryStatus;
  insightLabel: InventoryInsightLabel;
}

export interface ColumnMapping {
  sku: string;
  current_stock: string;
  average_daily_sales: string;
  lead_time_days: string;
  safety_stock: string;
}
