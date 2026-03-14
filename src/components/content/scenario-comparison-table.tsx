import type { ReactNode } from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ScenarioRow {
  scenario: string;
  cells: ReactNode[];
}

interface ScenarioComparisonTableProps {
  headers: string[];
  rows: ScenarioRow[];
}

export function ScenarioComparisonTable({ headers, rows }: ScenarioComparisonTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Scenario</TableHead>
          {headers.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.scenario}>
            <TableCell className="font-medium">{row.scenario}</TableCell>
            {row.cells.map((cell, index) => (
              <TableCell key={`${row.scenario}-${index}`}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
