"use client";

import type { ColumnMapping, RequiredCsvField } from "@/types/csv";

import { Label } from "@/components/ui/label";

const labels: Record<RequiredCsvField, string> = {
  sku: "SKU",
  current_stock: "Current stock",
  average_daily_sales: "Average daily sales",
  lead_time_days: "Lead time days",
  safety_stock: "Safety stock"
};

interface ColumnMapperProps {
  columns: string[];
  mapping: ColumnMapping;
  onChange: (field: RequiredCsvField, column: string) => void;
}

export function ColumnMapper({ columns, mapping, onChange }: ColumnMapperProps) {
  if (!columns.length) return null;

  return (
    <div className="rounded-2xl border p-5">
      <h3 className="text-lg font-semibold">Map CSV columns</h3>
      <p className="mt-1 text-sm text-muted-foreground">Match your CSV headers to required calculation fields.</p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {(Object.keys(labels) as RequiredCsvField[]).map((field) => (
          <div key={field}>
            <Label htmlFor={`map-${field}`}>{labels[field]}</Label>
            <select
              id={`map-${field}`}
              className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-sm"
              value={mapping[field]}
              onChange={(event) => onChange(field, event.target.value)}
            >
              <option value="">Select column</option>
              {columns.map((column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}