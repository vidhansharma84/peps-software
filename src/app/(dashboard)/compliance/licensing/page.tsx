"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Award,
  FileCheck,
  FileWarning,
  CalendarCheck,
  Clock,
} from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable, SortableHeader } from "@/components/shared/data-table";
import { licenses, complianceDocuments } from "@/data/hefra";
import type { HeFRALicense, ComplianceDocument } from "@/types/hefra";

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

export default function LicensingDocumentsPage() {
  const documentColumns: ColumnDef<ComplianceDocument>[] = useMemo(
    () => [
      {
        accessorKey: "title",
        header: ({ column }) => (
          <SortableHeader column={column} title="Title" />
        ),
        cell: ({ row }) => (
          <p className="font-medium">{row.original.title}</p>
        ),
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
          <Badge variant="outline">{formatStatus(row.original.type)}</Badge>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
          <span className="text-sm">{formatStatus(row.original.category)}</span>
        ),
      },
      {
        accessorKey: "department",
        header: ({ column }) => (
          <SortableHeader column={column} title="Department" />
        ),
      },
      {
        accessorKey: "uploadDate",
        header: "Upload Date",
        cell: ({ row }) => (
          <span className="text-sm">
            {new Date(row.original.uploadDate).toLocaleDateString()}
          </span>
        ),
      },
      {
        accessorKey: "expiryDate",
        header: ({ column }) => (
          <SortableHeader column={column} title="Expiry" />
        ),
        cell: ({ row }) => {
          const expiry = row.original.expiryDate;
          if (!expiry) {
            return <span className="text-sm text-muted-foreground">N/A</span>;
          }
          const days = getDaysRemaining(expiry);
          return (
            <span
              className={`text-sm ${
                days <= 0
                  ? "text-red-500 font-medium"
                  : days <= 90
                  ? "text-amber-500 font-medium"
                  : ""
              }`}
            >
              {new Date(expiry).toLocaleDateString()}
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
      {
        accessorKey: "version",
        header: "Version",
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            v{row.original.version}
          </span>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Licensing & Documentation"
        description="Facility licenses, permits, and regulatory documentation"
      />

      <Tabs defaultValue="licenses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="licenses" className="gap-2">
            <Award className="h-4 w-4" />
            Licenses
          </TabsTrigger>
          <TabsTrigger value="documents" className="gap-2">
            <FileCheck className="h-4 w-4" />
            Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="licenses">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {licenses.map((license: HeFRALicense) => {
              const daysRemaining = getDaysRemaining(license.expiryDate);
              const isExpired = daysRemaining <= 0;
              const isExpiring = daysRemaining > 0 && daysRemaining <= 90;
              return (
                <Card key={license.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-base">
                          {formatStatus(license.type)}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {license.department}
                        </p>
                      </div>
                      <Badge
                        variant={
                          getStatusBadge(license.status) as
                            | "success"
                            | "destructive"
                            | "warning"
                            | "info"
                            | "secondary"
                            | "default"
                            | "outline"
                        }
                      >
                        {formatStatus(license.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          License #
                        </span>
                        <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                          {license.licenseNumber}
                        </code>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Issued
                        </span>
                        <span>
                          {new Date(
                            license.issuedDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Expiry
                        </span>
                        <span
                          className={
                            isExpired
                              ? "text-red-500 font-medium"
                              : isExpiring
                              ? "text-amber-500 font-medium"
                              : ""
                          }
                        >
                          {new Date(
                            license.expiryDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Days Remaining
                        </span>
                        <span
                          className={`font-medium ${
                            isExpired
                              ? "text-red-500"
                              : isExpiring
                              ? "text-amber-500"
                              : "text-emerald-500"
                          }`}
                        >
                          {isExpired
                            ? `Expired ${Math.abs(daysRemaining)} days ago`
                            : `${daysRemaining} days`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Renewal Fee
                        </span>
                        <span className="font-medium">
                          GHS {license.renewalFee.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">
                        Conditions:
                      </p>
                      <ul className="space-y-1">
                        {license.conditions.map((condition, idx) => (
                          <li
                            key={idx}
                            className="text-xs flex items-start gap-1.5"
                          >
                            <span className="text-muted-foreground mt-0.5">
                              {idx + 1}.
                            </span>
                            {condition}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Issuing Authority: {license.issuingAuthority}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </motion.div>
        </TabsContent>

        <TabsContent value="documents">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <DataTable
              columns={documentColumns}
              data={complianceDocuments}
              searchKey="title"
              searchPlaceholder="Search documents..."
              showExport
            />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
