"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Wrench,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Activity,
} from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { DataTable, SortableHeader } from "@/components/shared/data-table";
import { equipmentCompliance } from "@/data/hefra";
import type { EquipmentCompliance } from "@/types/hefra";

function getStatusBadge(status: string) {
  const variants: Record<string, string> = {
    compliant: "success",
    active: "success",
    passed: "success",
    current: "success",
    non_compliant: "destructive",
    failed: "destructive",
    expired: "destructive",
    non_functional: "destructive",
    partially_compliant: "warning",
    pending_review: "info",
    scheduled: "info",
    pending: "warning",
    in_progress: "info",
    under_review: "info",
    draft: "secondary",
    suspended: "destructive",
  };
  return variants[status] || "secondary";
}

function formatStatus(status: string) {
  return status
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function getDaysRemaining(dateStr: string) {
  const now = new Date();
  const target = new Date(dateStr);
  return Math.ceil(
    (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
}

const conditionColors: Record<string, string> = {
  excellent: "text-emerald-600",
  good: "text-blue-600",
  fair: "text-amber-600",
  poor: "text-red-500",
  non_functional: "text-red-700 font-bold",
};

export default function EquipmentCompliancePage() {
  const stats = useMemo(() => {
    const total = equipmentCompliance.length;
    const certified = equipmentCompliance.filter(
      (e) => e.certificationStatus === "compliant"
    ).length;
    const dueForCalibration = equipmentCompliance.filter((e) => {
      const days = getDaysRemaining(e.nextCalibration);
      return days <= 30 && days > 0;
    }).length;
    const nonFunctional = equipmentCompliance.filter(
      (e) => e.condition === "non_functional" || e.condition === "poor"
    ).length;
    return { total, certified, dueForCalibration, nonFunctional };
  }, []);

  const columns: ColumnDef<EquipmentCompliance>[] = useMemo(
    () => [
      {
        accessorKey: "equipmentName",
        header: ({ column }) => (
          <SortableHeader column={column} title="Equipment" />
        ),
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.equipmentName}</p>
            <p className="text-xs text-muted-foreground">
              {row.original.manufacturer}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "serialNumber",
        header: "Serial #",
        cell: ({ row }) => (
          <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
            {row.original.serialNumber}
          </code>
        ),
      },
      {
        accessorKey: "department",
        header: ({ column }) => (
          <SortableHeader column={column} title="Department" />
        ),
      },
      {
        accessorKey: "calibrationDate",
        header: "Last Calibration",
        cell: ({ row }) => (
          <span className="text-sm">
            {new Date(row.original.calibrationDate).toLocaleDateString()}
          </span>
        ),
      },
      {
        accessorKey: "nextCalibration",
        header: ({ column }) => (
          <SortableHeader column={column} title="Next Calibration" />
        ),
        cell: ({ row }) => {
          const days = getDaysRemaining(row.original.nextCalibration);
          const isOverdue = days <= 0;
          const isUpcoming = days > 0 && days <= 30;
          return (
            <div
              className={`${
                isOverdue
                  ? "text-red-500 font-medium"
                  : isUpcoming
                  ? "text-amber-500 font-medium"
                  : ""
              }`}
            >
              <p className="text-sm">
                {new Date(
                  row.original.nextCalibration
                ).toLocaleDateString()}
              </p>
              {isOverdue && (
                <p className="text-xs flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Overdue by {Math.abs(days)} days
                </p>
              )}
              {isUpcoming && (
                <p className="text-xs flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Due in {days} days
                </p>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "condition",
        header: "Condition",
        cell: ({ row }) => (
          <span
            className={`text-sm font-medium ${
              conditionColors[row.original.condition] || ""
            }`}
          >
            {formatStatus(row.original.condition)}
          </span>
        ),
      },
      {
        accessorKey: "certificationStatus",
        header: "Certification",
        cell: ({ row }) => (
          <Badge
            variant={
              getStatusBadge(row.original.certificationStatus) as
                | "success"
                | "destructive"
                | "warning"
                | "info"
                | "secondary"
                | "default"
                | "outline"
            }
          >
            {formatStatus(row.original.certificationStatus)}
          </Badge>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Equipment Compliance"
        description="Medical equipment calibration, maintenance, and certification tracking"
      />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Equipment"
          value={stats.total}
          icon={<Activity className="h-5 w-5" />}
          gradient="from-blue-500 to-indigo-600"
        />
        <StatsCard
          title="Certified"
          value={stats.certified}
          change={2}
          changeLabel="vs last month"
          icon={<ShieldCheck className="h-5 w-5" />}
          gradient="from-emerald-500 to-green-600"
        />
        <StatsCard
          title="Due for Calibration"
          value={stats.dueForCalibration}
          icon={<Clock className="h-5 w-5" />}
          gradient="from-amber-500 to-orange-600"
        />
        <StatsCard
          title="Non-Functional"
          value={stats.nonFunctional}
          change={-1}
          changeLabel="vs last month"
          icon={<Wrench className="h-5 w-5" />}
          gradient="from-red-500 to-rose-600"
        />
      </div>

      {/* Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DataTable
          columns={columns}
          data={equipmentCompliance}
          searchKey="equipmentName"
          searchPlaceholder="Search equipment..."
          showExport
        />
      </motion.div>
    </div>
  );
}
