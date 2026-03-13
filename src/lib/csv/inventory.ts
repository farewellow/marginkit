import { getInventoryStatus } from "@/lib/calculations";
import type {
  ColumnMapping,
  InventoryComputedRow,
  InventoryInsightLabel,
  InventoryMappedRow,
  ParsedCsvRow,
  RequiredCsvField
} from "@/types/csv";

export const requiredCsvFields: RequiredCsvField[] = [
  "sku",
  "current_stock",
  "average_daily_sales",
  "lead_time_days",
  "safety_stock"
];

function parseNumber(value: string | number | null | undefined): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (typeof value !== "string") return 0;

  const normalized = value.replace(/,/g, "").trim();
  if (!normalized) return 0;

  const numeric = Number(normalized);
  return Number.isFinite(numeric) ? numeric : 0;
}

export function mapRowWithColumns(row: ParsedCsvRow, mapping: ColumnMapping): InventoryMappedRow {
  return {
    sku: String(row[mapping.sku] ?? "").trim(),
    current_stock: parseNumber(row[mapping.current_stock]),
    average_daily_sales: parseNumber(row[mapping.average_daily_sales]),
    lead_time_days: parseNumber(row[mapping.lead_time_days]),
    safety_stock: parseNumber(row[mapping.safety_stock])
  };
}

export function getInventoryInsightLabel(row: InventoryMappedRow, reorderPoint: number): InventoryInsightLabel {
  if (row.average_daily_sales <= 0) return "No sales movement";
  if (row.current_stock <= 0) return "Out of stock";
  if (row.current_stock <= reorderPoint) return "Reorder now";
  if (row.current_stock <= reorderPoint * 1.2) return "Reorder soon";
  return "Stock level looks stable";
}

export function computeInventoryRow(row: InventoryMappedRow): InventoryComputedRow {
  const lead_time_demand = row.average_daily_sales * row.lead_time_days;
  const reorder_point = lead_time_demand + row.safety_stock;

  return {
    ...row,
    lead_time_demand,
    reorder_point,
    status: getInventoryStatus(row.current_stock, reorder_point),
    insightLabel: getInventoryInsightLabel(row, reorder_point)
  };
}

export function getColumnOptions(rows: ParsedCsvRow[]): string[] {
  if (rows.length === 0) return [];

  return Object.keys(rows[0]);
}

export function buildCsvSummarySentence(urgentCount: number, warningCount: number, rowCount: number): string {
  if (rowCount === 0) {
    return "Upload and map a CSV file to generate reorder insights.";
  }

  if (urgentCount > 0) {
    return `${urgentCount} SKU${urgentCount > 1 ? "s" : ""} need immediate replenishment.`;
  }

  if (warningCount > 0) {
    return "Some SKUs should be reviewed soon.";
  }

  return "No urgent reorder signals found.";
}
