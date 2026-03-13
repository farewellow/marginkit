"use client";

import Papa from "papaparse";
import { Download, FileSpreadsheet, Info } from "lucide-react";
import { useMemo, useState } from "react";

import { CalculatorFormCard } from "@/components/calculator/calculator-form-card";
import { MetricCard } from "@/components/calculator/metric-card";
import { ResultsCard } from "@/components/calculator/results-card";
import { ColumnMapper } from "@/components/csv/column-mapper";
import { CsvUploader } from "@/components/csv/csv-uploader";
import { ResultsTable } from "@/components/csv/results-table";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import {
  buildCsvSummarySentence,
  computeInventoryRow,
  getColumnOptions,
  mapRowWithColumns,
  requiredCsvFields
} from "@/lib/csv/inventory";
import { formatNumber } from "@/lib/formatters";
import type { ColumnMapping, ParsedCsvRow, RequiredCsvField } from "@/types/csv";

const emptyMapping: ColumnMapping = {
  sku: "",
  current_stock: "",
  average_daily_sales: "",
  lead_time_days: "",
  safety_stock: ""
};

const sampleCsvContent = `sku,current_stock,average_daily_sales,lead_time_days,safety_stock\nA100,80,10,5,20\nB200,150,10,5,20\nC300,110,10,5,20\nD400,60,10,5,20`;

function normalize(value: string): string {
  return value.toLowerCase().trim();
}

function getInitialMapping(columns: string[]): ColumnMapping {
  const initial = { ...emptyMapping };

  for (const field of requiredCsvFields) {
    const direct = columns.find((column) => normalize(column) === field);
    if (direct) {
      initial[field] = direct;
      continue;
    }

    const partial = columns.find((column) => normalize(column).includes(field));
    if (partial) {
      initial[field] = partial;
    }
  }

  return initial;
}

function isLikelyCsv(file: File): boolean {
  return file.name.toLowerCase().endsWith(".csv") || file.type.includes("csv");
}

export function InventoryCsvReorderAlertsTool() {
  const [rows, setRows] = useState<ParsedCsvRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [mapping, setMapping] = useState<ColumnMapping>(emptyMapping);
  const [error, setError] = useState<string>("");

  const isMappingComplete = requiredCsvFields.every((field) => Boolean(mapping[field]));

  const computedRows = useMemo(() => {
    if (!rows.length || !isMappingComplete) return [];

    return rows
      .map((row) => mapRowWithColumns(row, mapping))
      .filter((row) => row.sku)
      .map((row) => computeInventoryRow(row));
  }, [rows, mapping, isMappingComplete]);

  const urgentCount = computedRows.filter((row) => row.status === "urgent").length;
  const warningCount = computedRows.filter((row) => row.status === "warning").length;
  const okCount = computedRows.filter((row) => row.status === "ok").length;

  const summarySentence = buildCsvSummarySentence(urgentCount, warningCount, computedRows.length);

  const clearStateWithError = (message: string) => {
    setRows([]);
    setColumns([]);
    setMapping(emptyMapping);
    setError(message);
  };

  const handleFileSelected = (file: File | null) => {
    if (!file) return;

    if (!isLikelyCsv(file)) {
      clearStateWithError(
        "Please upload a valid CSV file. Required columns: sku, current_stock, average_daily_sales, lead_time_days, safety_stock."
      );
      return;
    }

    setError("");

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsed = (results.data ?? []) as ParsedCsvRow[];

        if (!parsed.length) {
          clearStateWithError(
            "We could not read rows from this file. Make sure it has headers and data rows with: sku, current_stock, average_daily_sales, lead_time_days, safety_stock."
          );
          return;
        }

        const detectedColumns = getColumnOptions(parsed);

        if (!detectedColumns.length) {
          clearStateWithError(
            "CSV headers are missing or unreadable. Required columns: sku, current_stock, average_daily_sales, lead_time_days, safety_stock."
          );
          return;
        }

        setRows(parsed);
        setColumns(detectedColumns);
        setMapping(getInitialMapping(detectedColumns));

        if (results.errors.length > 0) {
          setError(
            "Some rows contain formatting issues. Review column mapping and data values before relying on results."
          );
        }

        trackEvent("csv_uploaded", {
          rows: parsed.length,
          columns: detectedColumns.length
        });
      },
      error: () => {
        clearStateWithError(
          "Unable to parse CSV. Please use a valid CSV with columns: sku, current_stock, average_daily_sales, lead_time_days, safety_stock."
        );
      }
    });
  };

  const handleMappingChange = (field: RequiredCsvField, column: string) => {
    setMapping((prev) => ({ ...prev, [field]: column }));
  };

  const handleDownloadSample = () => {
    const blob = new Blob([sampleCsvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "marginkit-sample-inventory.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const showEmptyState = columns.length === 0 && rows.length === 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-2">
        <CalculatorFormCard
          title="Upload inventory CSV"
          description="Parse data in-browser, map columns, and compute reorder urgency for each SKU."
        >
          <div className="space-y-4">
            <CsvUploader onFileSelected={handleFileSelected} onDownloadSample={handleDownloadSample} error={error} />
            <ColumnMapper columns={columns} mapping={mapping} onChange={handleMappingChange} />
          </div>
        </CalculatorFormCard>

        <ResultsCard title="Alert summary" description={summarySentence}>
          <div className="grid gap-4 sm:grid-cols-2">
            <MetricCard label="Total rows analyzed" value={formatNumber(computedRows.length, 0)} />
            <MetricCard
              label="Urgent"
              value={formatNumber(urgentCount, 0)}
              tone={urgentCount > 0 ? "danger" : "default"}
            />
            <MetricCard
              label="Warning"
              value={formatNumber(warningCount, 0)}
              tone={warningCount > 0 ? "warning" : "default"}
            />
            <MetricCard label="OK" value={formatNumber(okCount, 0)} tone={okCount > 0 ? "success" : "default"} />
          </div>
        </ResultsCard>
      </div>

      {!isMappingComplete && columns.length > 0 ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Complete column mapping for all required fields to see row-level results.
        </p>
      ) : null}

      {showEmptyState ? (
        <div className="rounded-2xl border bg-card p-6">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">No CSV uploaded yet</h3>
              <p className="max-w-2xl text-sm text-muted-foreground">
                Upload a CSV file with inventory fields to generate reorder status and insight labels for each SKU.
              </p>
              <p className="flex items-start gap-2 rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-xs text-sky-800">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />
                Required columns: sku, current_stock, average_daily_sales, lead_time_days, safety_stock.
              </p>
              <Button type="button" variant="outline" size="sm" onClick={handleDownloadSample}>
                <Download className="mr-2 h-4 w-4" />
                Download sample CSV
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <ResultsTable rows={computedRows} />
    </div>
  );
}
