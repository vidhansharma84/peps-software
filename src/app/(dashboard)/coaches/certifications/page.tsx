"use client";

import { ColumnDef } from "@tanstack/react-table";
import { motion } from "framer-motion";
import {
  Award,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { DataTable, SortableHeader } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials, formatDate } from "@/lib/utils";
import { certifications } from "@/data/coaches";
import type { Certification } from "@/data/coaches";

const statusConfig: Record<
  string,
  { label: string; variant: "success" | "warning" | "destructive" }
> = {
  active: { label: "Active", variant: "success" },
  expiring_soon: { label: "Expiring Soon", variant: "warning" },
  expired: { label: "Expired", variant: "destructive" },
};

const columns: ColumnDef<Certification>[] = [
  {
    accessorKey: "coachName",
    header: ({ column }) => <SortableHeader column={column} title="Coach" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="text-xs bg-primary/10">
            {getInitials(row.original.coachName)}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">{row.original.coachName}</span>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader column={column} title="Certification" />
    ),
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-medium">{row.original.name}</p>
        <p className="text-xs text-muted-foreground">
          {row.original.issuedBy}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "issuedDate",
    header: ({ column }) => (
      <SortableHeader column={column} title="Issued Date" />
    ),
    cell: ({ row }) => (
      <span className="text-sm">{formatDate(row.original.issuedDate)}</span>
    ),
  },
  {
    accessorKey: "expiryDate",
    header: ({ column }) => (
      <SortableHeader column={column} title="Expiry Date" />
    ),
    cell: ({ row }) => (
      <span className="text-sm">{formatDate(row.original.expiryDate)}</span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.original.status;
      const config = statusConfig[status];
      return (
        <Badge variant={config.variant} className="capitalize">
          {status === "expiring_soon" ? (
            <span className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Expiring Soon
            </span>
          ) : status === "expired" ? (
            <span className="flex items-center gap-1">
              <XCircle className="h-3 w-3" />
              Expired
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Active
            </span>
          )}
        </Badge>
      );
    },
  },
];

export default function CertificationsPage() {
  const activeCerts = certifications.filter(
    (c) => c.status === "active"
  ).length;
  const expiringSoon = certifications.filter(
    (c) => c.status === "expiring_soon"
  ).length;
  const expired = certifications.filter((c) => c.status === "expired").length;

  const expiringAlerts = certifications.filter(
    (c) => c.status === "expiring_soon" || c.status === "expired"
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Certifications"
        description="Track and manage coaching certifications and expiry alerts"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard
          title="Active Certifications"
          value={activeCerts}
          icon={<CheckCircle2 className="h-5 w-5" />}
          gradient="from-emerald-500 to-emerald-600"
        />
        <StatsCard
          title="Expiring Soon"
          value={expiringSoon}
          icon={<AlertTriangle className="h-5 w-5" />}
          gradient="from-amber-500 to-amber-600"
        />
        <StatsCard
          title="Expired"
          value={expired}
          icon={<XCircle className="h-5 w-5" />}
          gradient="from-red-500 to-red-600"
        />
      </div>

      {/* Expiry Alerts */}
      {expiringAlerts.length > 0 && (
        <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-950/10 dark:border-amber-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Certification Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {expiringAlerts.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-background border"
                >
                  <div
                    className={`h-2 w-2 rounded-full ${
                      cert.status === "expired"
                        ? "bg-red-500"
                        : "bg-amber-500"
                    }`}
                  />
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-primary/10">
                      {getInitials(cert.coachName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{cert.coachName}</p>
                    <p className="text-xs text-muted-foreground">{cert.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {cert.status === "expired" ? "Expired on" : "Expires on"}
                    </p>
                    <p className="text-sm font-medium">
                      {formatDate(cert.expiryDate)}
                    </p>
                  </div>
                  <Badge
                    variant={
                      cert.status === "expired" ? "destructive" : "warning"
                    }
                    className="text-[10px]"
                  >
                    {cert.status === "expired" ? "Expired" : "Action Required"}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Certifications Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Award className="h-4 w-4" />
            All Certifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={certifications}
            searchKey="coachName"
            searchPlaceholder="Search by coach name..."
            showExport
          />
        </CardContent>
      </Card>
    </div>
  );
}
