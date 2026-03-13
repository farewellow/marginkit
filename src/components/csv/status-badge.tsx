import { Badge } from "@/components/ui/badge";
import type { InventoryStatus } from "@/lib/calculations";

interface StatusBadgeProps {
  status: InventoryStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (status === "urgent") {
    return <Badge variant="danger">Urgent</Badge>;
  }

  if (status === "warning") {
    return <Badge variant="warning">Warning</Badge>;
  }

  return <Badge variant="success">OK</Badge>;
}