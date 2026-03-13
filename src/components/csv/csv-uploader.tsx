"use client";

import { Download, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CsvUploaderProps {
  onFileSelected: (file: File | null) => void;
  onDownloadSample: () => void;
  error?: string;
}

export function CsvUploader({ onFileSelected, onDownloadSample, error }: CsvUploaderProps) {
  return (
    <div className="space-y-3 rounded-2xl border border-dashed p-5">
      <label htmlFor="csv-upload" className="flex items-center gap-2 text-sm font-medium">
        <UploadCloud className="h-4 w-4 text-primary" />
        Upload CSV file
      </label>
      <Input
        id="csv-upload"
        type="file"
        accept=".csv,text/csv"
        onChange={(event) => onFileSelected(event.target.files?.[0] ?? null)}
      />
      <p className="text-xs text-muted-foreground">
        Required fields: sku, current_stock, average_daily_sales, lead_time_days, safety_stock.
      </p>
      <Button type="button" variant="outline" size="sm" onClick={onDownloadSample} className="w-fit">
        <Download className="mr-2 h-4 w-4" />
        Download sample CSV
      </Button>
      {error ? <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">{error}</p> : null}
    </div>
  );
}
