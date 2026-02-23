"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardCheck,
  ShieldCheck,
  ShieldX,
  Clock,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle2,
  Wrench,
} from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { inspectionRecords } from "@/data/hefra";
import type { InspectionRecord } from "@/types/hefra";

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

function getScoreColor(score: number) {
  if (score >= 80) return "text-emerald-600";
  if (score >= 60) return "text-amber-600";
  return "text-red-600";
}

function getScoreBarClass(score: number) {
  if (score >= 80) return "[&>div]:bg-emerald-500";
  if (score >= 60) return "[&>div]:bg-amber-500";
  return "[&>div]:bg-red-500";
}

export default function InspectionsPage() {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const stats = useMemo(() => {
    const total = inspectionRecords.length;
    const passed = inspectionRecords.filter(
      (i) => i.status === "passed"
    ).length;
    const failed = inspectionRecords.filter(
      (i) => i.status === "failed"
    ).length;
    const scheduled = inspectionRecords.filter(
      (i) => i.status === "scheduled"
    ).length;
    return { total, passed, failed, scheduled };
  }, []);

  const sortedInspections = useMemo(
    () =>
      [...inspectionRecords].sort(
        (a, b) =>
          new Date(b.inspectionDate).getTime() -
          new Date(a.inspectionDate).getTime()
      ),
    []
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inspections & Audits"
        description="HeFRA inspection records, findings, and corrective actions"
      />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Inspections"
          value={stats.total}
          icon={<ClipboardCheck className="h-5 w-5" />}
          gradient="from-blue-500 to-indigo-600"
        />
        <StatsCard
          title="Passed"
          value={stats.passed}
          change={1}
          changeLabel="vs last year"
          icon={<ShieldCheck className="h-5 w-5" />}
          gradient="from-emerald-500 to-green-600"
        />
        <StatsCard
          title="Failed"
          value={stats.failed}
          icon={<ShieldX className="h-5 w-5" />}
          gradient="from-red-500 to-rose-600"
        />
        <StatsCard
          title="Scheduled"
          value={stats.scheduled}
          icon={<Clock className="h-5 w-5" />}
          gradient="from-amber-500 to-orange-600"
        />
      </div>

      {/* Inspection Records */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <div className="rounded-md border">
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr_100px_100px_50px] gap-4 p-4 bg-muted/50 text-sm font-medium text-muted-foreground border-b">
            <span>Date</span>
            <span>Inspector</span>
            <span>Type</span>
            <span>Department</span>
            <span>Score</span>
            <span>Status</span>
            <span></span>
          </div>
          {sortedInspections.map((inspection, index) => (
            <motion.div
              key={inspection.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <div
                className="grid grid-cols-[1fr_1fr_1fr_1fr_100px_100px_50px] gap-4 p-4 items-center border-b hover:bg-muted/30 cursor-pointer transition-colors"
                onClick={() => toggleRow(inspection.id)}
              >
                <span className="text-sm">
                  {new Date(
                    inspection.inspectionDate
                  ).toLocaleDateString()}
                </span>
                <div>
                  <p className="text-sm font-medium">
                    {inspection.inspectorName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {inspection.inspectorTitle}
                  </p>
                </div>
                <span className="text-sm">
                  <Badge variant="outline">
                    {formatStatus(inspection.type)}
                  </Badge>
                </span>
                <span className="text-sm">{inspection.department}</span>
                <div>
                  {inspection.status !== "scheduled" ? (
                    <div className="space-y-1">
                      <span
                        className={`text-sm font-bold ${getScoreColor(
                          inspection.overallScore
                        )}`}
                      >
                        {inspection.overallScore}%
                      </span>
                      <Progress
                        value={inspection.overallScore}
                        className={`h-1.5 ${getScoreBarClass(
                          inspection.overallScore
                        )}`}
                      />
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">--</span>
                  )}
                </div>
                <Badge
                  variant={
                    getStatusBadge(inspection.status) as
                      | "success"
                      | "destructive"
                      | "warning"
                      | "info"
                      | "secondary"
                      | "default"
                      | "outline"
                  }
                >
                  {formatStatus(inspection.status)}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                >
                  {expandedRows.has(inspection.id) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <AnimatePresence>
                {expandedRows.has(inspection.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-muted/20 border-b">
                      {inspection.status === "scheduled" ? (
                        <p className="text-sm text-muted-foreground">
                          This inspection is scheduled for{" "}
                          {new Date(
                            inspection.inspectionDate
                          ).toLocaleDateString()}
                          . Details will be available after the inspection is
                          completed.
                        </p>
                      ) : (
                        <div className="grid gap-6 md:grid-cols-3">
                          {/* Findings */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                              Findings
                            </h4>
                            {inspection.findings.length > 0 ? (
                              <ul className="space-y-1.5">
                                {inspection.findings.map(
                                  (finding, idx) => (
                                    <li
                                      key={idx}
                                      className="text-xs flex items-start gap-1.5"
                                    >
                                      <span className="text-muted-foreground mt-0.5 shrink-0">
                                        {idx + 1}.
                                      </span>
                                      {finding}
                                    </li>
                                  )
                                )}
                              </ul>
                            ) : (
                              <p className="text-xs text-muted-foreground">
                                No findings recorded
                              </p>
                            )}
                          </div>

                          {/* Recommendations */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-500" />
                              Recommendations
                            </h4>
                            {inspection.recommendations.length > 0 ? (
                              <ul className="space-y-1.5">
                                {inspection.recommendations.map(
                                  (rec, idx) => (
                                    <li
                                      key={idx}
                                      className="text-xs flex items-start gap-1.5"
                                    >
                                      <span className="text-muted-foreground mt-0.5 shrink-0">
                                        {idx + 1}.
                                      </span>
                                      {rec}
                                    </li>
                                  )
                                )}
                              </ul>
                            ) : (
                              <p className="text-xs text-muted-foreground">
                                No recommendations
                              </p>
                            )}
                          </div>

                          {/* Corrective Actions */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold flex items-center gap-2">
                              <Wrench className="h-4 w-4 text-emerald-500" />
                              Corrective Actions
                            </h4>
                            {inspection.correctiveActions.length > 0 ? (
                              <ul className="space-y-1.5">
                                {inspection.correctiveActions.map(
                                  (action, idx) => (
                                    <li
                                      key={idx}
                                      className="text-xs flex items-start gap-1.5"
                                    >
                                      <span className="text-muted-foreground mt-0.5 shrink-0">
                                        {idx + 1}.
                                      </span>
                                      {action}
                                    </li>
                                  )
                                )}
                              </ul>
                            ) : (
                              <p className="text-xs text-muted-foreground">
                                No corrective actions
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Category Scores */}
                      {inspection.categories.length > 0 && (
                        <>
                          <Separator className="my-4" />
                          <div>
                            <h4 className="text-sm font-semibold mb-3">
                              Category Scores
                            </h4>
                            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                              {inspection.categories.map((cat) => (
                                <div
                                  key={cat.category}
                                  className="flex items-center gap-3 p-2 rounded-lg border"
                                >
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-xs font-medium">
                                        {formatStatus(cat.category)}
                                      </span>
                                      <span
                                        className={`text-xs font-bold ${getScoreColor(
                                          cat.score
                                        )}`}
                                      >
                                        {cat.score}%
                                      </span>
                                    </div>
                                    <Progress
                                      value={cat.score}
                                      className={`h-1.5 ${getScoreBarClass(
                                        cat.score
                                      )}`}
                                    />
                                  </div>
                                  <Badge
                                    variant={
                                      getStatusBadge(cat.status) as
                                        | "success"
                                        | "destructive"
                                        | "warning"
                                        | "info"
                                        | "secondary"
                                        | "default"
                                        | "outline"
                                    }
                                    className="text-[10px]"
                                  >
                                    {formatStatus(cat.status)}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {inspection.deadline && inspection.status !== "scheduled" && (
                        <div className="mt-4 text-xs text-muted-foreground">
                          Corrective action deadline:{" "}
                          <span className="font-medium text-foreground">
                            {new Date(
                              inspection.deadline
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
