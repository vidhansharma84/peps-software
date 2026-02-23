import { Badge } from "@/components/ui/badge";
import type { BadgeProps } from "@/components/ui/badge";

const statusConfig: Record<string, { label: string; variant: BadgeProps["variant"] }> = {
  active: { label: "Active", variant: "success" },
  inactive: { label: "Inactive", variant: "secondary" },
  suspended: { label: "Suspended", variant: "destructive" },
  pending: { label: "Pending", variant: "warning" },
  completed: { label: "Completed", variant: "success" },
  cancelled: { label: "Cancelled", variant: "destructive" },
  confirmed: { label: "Confirmed", variant: "success" },
  tentative: { label: "Tentative", variant: "warning" },
  available: { label: "Available", variant: "success" },
  booked: { label: "Booked", variant: "info" },
  maintenance: { label: "Maintenance", variant: "warning" },
  operational: { label: "Operational", variant: "success" },
  out_of_order: { label: "Out of Order", variant: "destructive" },
  occupied: { label: "Occupied", variant: "info" },
  vacant: { label: "Vacant", variant: "success" },
  reserved: { label: "Reserved", variant: "warning" },
  open: { label: "Open", variant: "warning" },
  in_progress: { label: "In Progress", variant: "info" },
  resolved: { label: "Resolved", variant: "success" },
  closed: { label: "Closed", variant: "secondary" },
  draft: { label: "Draft", variant: "secondary" },
  sent: { label: "Sent", variant: "info" },
  paid: { label: "Paid", variant: "success" },
  overdue: { label: "Overdue", variant: "destructive" },
  expired: { label: "Expired", variant: "destructive" },
  frozen: { label: "Frozen", variant: "info" },
  on_leave: { label: "On Leave", variant: "warning" },
  checked_in: { label: "Checked In", variant: "success" },
  checked_out: { label: "Checked Out", variant: "secondary" },
  preparing: { label: "Preparing", variant: "warning" },
  ready: { label: "Ready", variant: "success" },
  processed: { label: "Processed", variant: "success" },
  refunded: { label: "Refunded", variant: "info" },
  upcoming: { label: "Upcoming", variant: "info" },
  ongoing: { label: "Ongoing", variant: "success" },
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || { label: status, variant: "outline" as const };
  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}
