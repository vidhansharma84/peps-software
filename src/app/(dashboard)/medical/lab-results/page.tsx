"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { type ColumnDef } from "@tanstack/react-table";
import {
  FlaskConical,
  Eye,
  Pill,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { DataTable, SortableHeader } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { FormSheet } from "@/components/shared/form-sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { labResults, type LabResult } from "@/data/medical";
import { getInitials, formatDate } from "@/lib/utils";

export default function MedicalLabResultsPage() {
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState<LabResult | null>(null);

  const columns = useMemo<ColumnDef<LabResult, unknown>[]>(
    () => [
      {
        accessorKey: "patientName",
        header: ({ column }) => <SortableHeader column={column} title="Patient" />,
        cell: ({ row }) => {
          const result = row.original;
          return (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {getInitials(result.patientName)}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">{result.patientName}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "testName",
        header: ({ column }) => <SortableHeader column={column} title="Test Name" />,
        cell: ({ row }) => (
          <span className="text-sm font-medium">{row.original.testName}</span>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => {
          const cat = row.original.category;
          const categoryColors: Record<string, string> = {
            blood: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
            urine: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
            imaging: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
            other: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
          };
          return (
            <Badge variant="outline" className={categoryColors[cat]}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Badge>
          );
        },
      },
      {
        accessorKey: "date",
        header: ({ column }) => <SortableHeader column={column} title="Date" />,
        cell: ({ row }) => (
          <span className="text-sm">{formatDate(row.original.date)}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          return <StatusBadge status={status} />;
        },
      },
      {
        accessorKey: "orderedBy",
        header: "Ordered By",
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {row.original.orderedBy}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedResult(row.original);
              setDetailOpen(true);
            }}
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Lab Results"
        description="View and manage laboratory test results"
      >
        <Button variant="outline" asChild>
          <a href="/medical/patients">
            <FlaskConical className="h-4 w-4 mr-2" />
            Order Test
          </a>
        </Button>
      </PageHeader>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <DataTable
          columns={columns}
          data={labResults}
          searchKey="patientName"
          searchPlaceholder="Search by patient name..."
        />
      </motion.div>

      {/* Detail Sheet */}
      <FormSheet
        open={detailOpen}
        onOpenChange={setDetailOpen}
        title="Lab Result Details"
        description={
          selectedResult
            ? `${selectedResult.testName} - ${selectedResult.patientName}`
            : ""
        }
      >
        {selectedResult && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Patient</p>
                <p className="text-sm font-medium">{selectedResult.patientName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Date</p>
                <p className="text-sm font-medium">{formatDate(selectedResult.date)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Ordered By</p>
                <p className="text-sm font-medium">{selectedResult.orderedBy}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Category</p>
                <p className="text-sm font-medium capitalize">{selectedResult.category}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Status:</span>
              <StatusBadge status={selectedResult.status} />
            </div>

            <Separator />

            {Object.keys(selectedResult.results).length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm font-medium">Test Results</p>
                {Object.entries(selectedResult.results).map(([key, val]) => (
                  <Card key={key}>
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">{key}</p>
                          <p className="text-xs text-muted-foreground">
                            Reference: {val.reference}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono">{val.value}</span>
                          {val.flag && (
                            <Badge
                              variant={
                                val.flag === "high"
                                  ? "destructive"
                                  : val.flag === "low"
                                  ? "info"
                                  : "success"
                              }
                              className="text-xs"
                            >
                              {val.flag.toUpperCase()}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FlaskConical className="h-8 w-8 mx-auto mb-2 text-muted-foreground opacity-50" />
                <p className="text-sm text-muted-foreground">
                  Results are pending. Check back later.
                </p>
              </div>
            )}
          </div>
        )}
      </FormSheet>
    </div>
  );
}
