import type { InventoryComputedRow } from "@/types/csv";

import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatNumber } from "@/lib/formatters";

import { StatusBadge } from "./status-badge";

interface ResultsTableProps {
  rows: InventoryComputedRow[];
}

function InsightBadge({ label }: { label: InventoryComputedRow["insightLabel"] }) {
  if (label === "Out of stock") {
    return <Badge variant="danger">{label}</Badge>;
  }

  if (label === "No sales movement") {
    return <Badge variant="secondary">{label}</Badge>;
  }

  if (label === "Reorder now") {
    return <Badge variant="danger">{label}</Badge>;
  }

  if (label === "Reorder soon") {
    return <Badge variant="warning">{label}</Badge>;
  }

  return <Badge variant="success">{label}</Badge>;
}

export function ResultsTable({ rows }: ResultsTableProps) {
  if (!rows.length) {
    return null;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>SKU</TableHead>
          <TableHead>Current stock</TableHead>
          <TableHead>Avg daily sales</TableHead>
          <TableHead>Lead time days</TableHead>
          <TableHead>Safety stock</TableHead>
          <TableHead>Reorder point</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Insight</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.sku}>
            <TableCell className="font-medium">{row.sku}</TableCell>
            <TableCell>{formatNumber(row.current_stock, 0)}</TableCell>
            <TableCell>{formatNumber(row.average_daily_sales, 2)}</TableCell>
            <TableCell>{formatNumber(row.lead_time_days, 0)}</TableCell>
            <TableCell>{formatNumber(row.safety_stock, 0)}</TableCell>
            <TableCell>{formatNumber(row.reorder_point, 0)}</TableCell>
            <TableCell>
              <StatusBadge status={row.status} />
            </TableCell>
            <TableCell>
              <InsightBadge label={row.insightLabel} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
