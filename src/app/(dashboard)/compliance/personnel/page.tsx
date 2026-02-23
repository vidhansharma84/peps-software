"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Users,
  ShieldCheck,
  ShieldAlert,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { DataTable, SortableHeader } from "@/components/shared/data-table";
import { personnelCompliance } from "@/data/hefra";
import type { PersonnelCompliance } from "@/types/hefra";

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

export default function PersonnelCompliancePage() {
  const stats = useMemo(() => {
    const total = personnelCompliance.length;
    const compliant = personnelCompliance.filter(
      (p) => p.status === "compliant"
    ).length;
    const expiringSoon = personnelCompliance.filter((p) => {
      const days = getDaysRemaining(p.registrationExpiry);
      return days > 0 && days <= 90;
    }).length;
    const nonCompliant = personnelCompliance.filter(
      (p) => p.status === "non_compliant" || p.status === "expired"
    ).length;
    return { total, compliant, expiringSoon, nonCompliant };
  }, []);

  const columns: ColumnDef<PersonnelCompliance>[] = useMemo(
    () => [
      {
        accessorKey: "staffName",
        header: ({ column }) => (
          <SortableHeader column={column} title="Name" />
        ),
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.staffName}</p>
            <p className="text-xs text-muted-foreground">
              {row.original.staffId}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "role",
        header: ({ column }) => (
          <SortableHeader column={column} title="Role" />
        ),
      },
      {
        accessorKey: "department",
        header: ({ column }) => (
          <SortableHeader column={column} title="Department" />
        ),
      },
      {
        accessorKey: "professionalCouncil",
        header: "Council",
        cell: ({ row }) => (
          <span className="text-xs">{row.original.professionalCouncil}</span>
        ),
      },
      {
        accessorKey: "registrationNumber",
        header: "Registration #",
        cell: ({ row }) => (
          <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
            {row.original.registrationNumber}
          </code>
        ),
      },
      {
        accessorKey: "registrationExpiry",
        header: ({ column }) => (
          <SortableHeader column={column} title="Expiry" />
        ),
        cell: ({ row }) => {
          const days = getDaysRemaining(row.original.registrationExpiry);
          const isExpiring = days > 0 && days <= 90;
          const isExpired = days <= 0;
          return (
            <div
              className={`${
                isExpired
                  ? "text-red-500 font-medium"
                  : isExpiring
                  ? "text-amber-500 font-medium"
                  : ""
              }`}
            >
              <p className="text-sm">
                {new Date(
                  row.original.registrationExpiry
                ).toLocaleDateString()}
              </p>
              {isExpiring && (
                <p className="text-xs flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {days} days left
                </p>
              )}
              {isExpired && (
                <p className="text-xs flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Expired
                </p>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "yearsExperience",
        header: ({ column }) => (
          <SortableHeader column={column} title="Experience (yrs)" />
        ),
        cell: ({ row }) => (
          <span className="text-sm">{row.original.yearsExperience}</span>
        ),
      },
      {
        id: "cpd",
        header: "CPD Credits",
        cell: ({ row }) => {
          const { cpd_credits, cpd_required } = row.original;
          const isDeficient = cpd_credits < cpd_required;
          return (
            <span
              className={`text-sm ${
                isDeficient ? "text-amber-500 font-medium" : "text-emerald-600"
              }`}
            >
              {cpd_credits}/{cpd_required}
            </span>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge
            variant={
              getStatusBadge(row.original.status) as
                | "success"
                | "destructive"
                | "warning"
                | "info"
                | "secondary"
                | "default"
                | "outline"
            }
          >
            {formatStatus(row.original.status)}
          </Badge>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Personnel Compliance"
        description="Staff registration, qualifications, and council compliance tracking"
      />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Staff Tracked"
          value={stats.total}
          icon={<Users className="h-5 w-5" />}
          gradient="from-blue-500 to-indigo-600"
        />
        <StatsCard
          title="Fully Compliant"
          value={stats.compliant}
          change={3}
          changeLabel="vs last month"
          icon={<ShieldCheck className="h-5 w-5" />}
          gradient="from-emerald-500 to-green-600"
        />
        <StatsCard
          title="Expiring Soon"
          value={stats.expiringSoon}
          icon={<Clock className="h-5 w-5" />}
          gradient="from-amber-500 to-orange-600"
        />
        <StatsCard
          title="Non-Compliant"
          value={stats.nonCompliant}
          change={-1}
          changeLabel="vs last month"
          icon={<ShieldAlert className="h-5 w-5" />}
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
          data={personnelCompliance}
          searchKey="staffName"
          searchPlaceholder="Search staff..."
          showExport
        />
      </motion.div>
    </div>
  );
}
