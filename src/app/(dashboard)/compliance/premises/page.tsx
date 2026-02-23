"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FlaskConical,
} from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable, SortableHeader } from "@/components/shared/data-table";
import {
  premisesCompliance,
  safetyCompliance,
} from "@/data/hefra";
import type {
  PremisesCompliance,
  SafetyCompliance,
} from "@/types/hefra";

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

function BoolIcon({ value }: { value: boolean }) {
  return value ? (
    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
  ) : (
    <XCircle className="h-4 w-4 text-red-500" />
  );
}

export default function PremisesSafetyPage() {
  const premisesColumns: ColumnDef<PremisesCompliance>[] = useMemo(
    () => [
      {
        accessorKey: "area",
        header: ({ column }) => (
          <SortableHeader column={column} title="Area" />
        ),
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.area}</p>
            <p className="text-xs text-muted-foreground">
              {row.original.dimensions}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "department",
        header: ({ column }) => (
          <SortableHeader column={column} title="Department" />
        ),
      },
      {
        accessorKey: "hasAdequateVentilation",
        header: "Ventilation",
        cell: ({ row }) => (
          <BoolIcon value={row.original.hasAdequateVentilation} />
        ),
      },
      {
        accessorKey: "hasWashBasin",
        header: "Wash Basin",
        cell: ({ row }) => <BoolIcon value={row.original.hasWashBasin} />,
      },
      {
        accessorKey: "hasToiletFacilities",
        header: "Toilet",
        cell: ({ row }) => (
          <BoolIcon value={row.original.hasToiletFacilities} />
        ),
      },
      {
        accessorKey: "hasWaterSupply",
        header: "Water",
        cell: ({ row }) => <BoolIcon value={row.original.hasWaterSupply} />,
      },
      {
        accessorKey: "hasElectricity",
        header: "Electricity",
        cell: ({ row }) => <BoolIcon value={row.original.hasElectricity} />,
      },
      {
        accessorKey: "hasBackupPower",
        header: "Backup Power",
        cell: ({ row }) => <BoolIcon value={row.original.hasBackupPower} />,
      },
      {
        accessorKey: "lastInspected",
        header: "Last Inspected",
        cell: ({ row }) => (
          <span className="text-sm">
            {new Date(row.original.lastInspected).toLocaleDateString()}
          </span>
        ),
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

  const safetyColumns: ColumnDef<SafetyCompliance>[] = useMemo(
    () => [
      {
        accessorKey: "area",
        header: ({ column }) => (
          <SortableHeader column={column} title="Area" />
        ),
        cell: ({ row }) => (
          <p className="font-medium">{row.original.area}</p>
        ),
      },
      {
        accessorKey: "department",
        header: "Department",
      },
      {
        accessorKey: "fireExtinguishers",
        header: "Fire Equip.",
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <BoolIcon value={row.original.fireExtinguishers} />
            {row.original.fireExtinguishers && (
              <span className="text-xs text-muted-foreground">
                Exp:{" "}
                {new Date(
                  row.original.fireExtinguisherExpiry
                ).toLocaleDateString()}
              </span>
            )}
          </div>
        ),
      },
      {
        accessorKey: "emergencyExits",
        header: "Emerg. Exits",
        cell: ({ row }) => (
          <BoolIcon value={row.original.emergencyExits} />
        ),
      },
      {
        accessorKey: "emergencyLighting",
        header: "Emerg. Lighting",
        cell: ({ row }) => (
          <BoolIcon value={row.original.emergencyLighting} />
        ),
      },
      {
        accessorKey: "firstAidKit",
        header: "First Aid",
        cell: ({ row }) => <BoolIcon value={row.original.firstAidKit} />,
      },
      {
        accessorKey: "ppe_available",
        header: "PPE",
        cell: ({ row }) => <BoolIcon value={row.original.ppe_available} />,
      },
      {
        accessorKey: "sharpsContainers",
        header: "Sharps",
        cell: ({ row }) => (
          <BoolIcon value={row.original.sharpsContainers} />
        ),
      },
      {
        accessorKey: "lastDrill",
        header: "Last Drill",
        cell: ({ row }) => (
          <span className="text-sm">
            {new Date(row.original.lastDrill).toLocaleDateString()}
          </span>
        ),
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

  // Waste management data grouped by department from safety compliance
  const wasteManagementData = useMemo(() => {
    const departments = [...new Set(safetyCompliance.map((s) => s.department))];
    return departments.map((dept) => {
      const items = safetyCompliance.filter((s) => s.department === dept);
      const wasteCompliant = items.filter((s) => s.wasteDisposal).length;
      const sharpsCompliant = items.filter((s) => s.sharpsContainers).length;
      const spillKitCompliant = items.filter((s) => s.spillKit).length;
      const total = items.length;
      return {
        department: dept,
        wasteDisposal: { compliant: wasteCompliant, total },
        sharpsContainers: { compliant: sharpsCompliant, total },
        spillKits: { compliant: spillKitCompliant, total },
        overallCompliant: wasteCompliant === total && sharpsCompliant === total && spillKitCompliant === total,
        issues: items.flatMap((s) =>
          s.issues.filter(
            (i) =>
              i.toLowerCase().includes("waste") ||
              i.toLowerCase().includes("sharps") ||
              i.toLowerCase().includes("spill")
          )
        ),
      };
    });
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Premises & Safety Compliance"
        description="Facility infrastructure, safety equipment, and environmental standards"
      />

      <Tabs defaultValue="premises" className="space-y-4">
        <TabsList>
          <TabsTrigger value="premises" className="gap-2">
            <Building2 className="h-4 w-4" />
            Premises
          </TabsTrigger>
          <TabsTrigger value="safety" className="gap-2">
            <ShieldCheck className="h-4 w-4" />
            Safety
          </TabsTrigger>
          <TabsTrigger value="waste" className="gap-2">
            <FlaskConical className="h-4 w-4" />
            Waste Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="premises">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <DataTable
              columns={premisesColumns}
              data={premisesCompliance}
              searchKey="area"
              searchPlaceholder="Search areas..."
              showExport
            />
          </motion.div>
        </TabsContent>

        <TabsContent value="safety">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <DataTable
              columns={safetyColumns}
              data={safetyCompliance}
              searchKey="area"
              searchPlaceholder="Search areas..."
              showExport
            />
          </motion.div>
        </TabsContent>

        <TabsContent value="waste">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {wasteManagementData.map((item) => (
              <Card key={item.department}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      {item.department}
                    </CardTitle>
                    {item.overallCompliant ? (
                      <Badge variant="success">Compliant</Badge>
                    ) : (
                      <Badge variant="warning">Issues Found</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Waste Disposal
                    </span>
                    <div className="flex items-center gap-2">
                      <span>
                        {item.wasteDisposal.compliant}/
                        {item.wasteDisposal.total}
                      </span>
                      <BoolIcon
                        value={
                          item.wasteDisposal.compliant ===
                          item.wasteDisposal.total
                        }
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Sharps Containers
                    </span>
                    <div className="flex items-center gap-2">
                      <span>
                        {item.sharpsContainers.compliant}/
                        {item.sharpsContainers.total}
                      </span>
                      <BoolIcon
                        value={
                          item.sharpsContainers.compliant ===
                          item.sharpsContainers.total
                        }
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Spill Kits</span>
                    <div className="flex items-center gap-2">
                      <span>
                        {item.spillKits.compliant}/{item.spillKits.total}
                      </span>
                      <BoolIcon
                        value={
                          item.spillKits.compliant === item.spillKits.total
                        }
                      />
                    </div>
                  </div>
                  {item.issues.length > 0 && (
                    <div className="pt-2 border-t">
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        Issues:
                      </p>
                      {item.issues.map((issue, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-1.5 text-xs text-red-500"
                        >
                          <AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" />
                          {issue}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
