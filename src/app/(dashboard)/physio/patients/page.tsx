"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ColumnDef } from "@tanstack/react-table";
import {
  Users,
  TrendingUp,
  TrendingDown,
  Minus,
  Activity,
  X,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { DataTable, SortableHeader } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { ChartCard } from "@/components/shared/chart-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  treatmentRecords,
  getTreatmentRecordsByPatient,
} from "@/data/physio";
import { formatDate, getInitials, cn } from "@/lib/utils";

// Aggregate patient data
interface PatientSummary {
  patientId: string;
  patientName: string;
  totalSessions: number;
  lastVisit: string;
  avgPainReduction: number;
  latestMobility: number;
  mobilityTrend: "up" | "down" | "stable";
  progress: "improving" | "stable" | "declining";
}

function buildPatientSummaries(): PatientSummary[] {
  const patientMap = new Map<
    string,
    {
      patientName: string;
      sessions: typeof treatmentRecords;
    }
  >();

  treatmentRecords.forEach((r) => {
    if (!patientMap.has(r.patientId)) {
      patientMap.set(r.patientId, { patientName: r.patientName, sessions: [] });
    }
    patientMap.get(r.patientId)!.sessions.push(r);
  });

  const summaries: PatientSummary[] = [];
  patientMap.forEach((data, patientId) => {
    const sessions = data.sessions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const totalSessions = sessions.length;
    const avgPainReduction =
      sessions.reduce(
        (sum, s) => sum + (s.painLevelBefore - s.painLevelAfter),
        0
      ) / totalSessions;
    const latestMobility = sessions[0]?.mobilityScore || 0;
    const previousMobility = sessions[1]?.mobilityScore || latestMobility;
    const mobilityTrend: "up" | "down" | "stable" =
      latestMobility > previousMobility
        ? "up"
        : latestMobility < previousMobility
        ? "down"
        : "stable";

    const improvingCount = sessions.filter(
      (s) => s.progress === "improving"
    ).length;
    const progress: "improving" | "stable" | "declining" =
      improvingCount > totalSessions / 2
        ? "improving"
        : sessions.filter((s) => s.progress === "declining").length >
          totalSessions / 3
        ? "declining"
        : "stable";

    summaries.push({
      patientId,
      patientName: data.patientName,
      totalSessions,
      lastVisit: sessions[0]?.date || "",
      avgPainReduction: Math.round(avgPainReduction * 10) / 10,
      latestMobility,
      mobilityTrend,
      progress,
    });
  });

  return summaries;
}

const progressConfig: Record<string, { label: string; variant: "success" | "warning" | "destructive" }> = {
  improving: { label: "Improving", variant: "success" },
  stable: { label: "Stable", variant: "warning" },
  declining: { label: "Declining", variant: "destructive" },
};

export default function PatientsPage() {
  const patientSummaries = useMemo(buildPatientSummaries, []);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  const selectedRecords = selectedPatient
    ? getTreatmentRecordsByPatient(selectedPatient).sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
    : [];

  const painChartData = selectedRecords.map((r, i) => ({
    session: `Session ${i + 1}`,
    before: r.painLevelBefore,
    after: r.painLevelAfter,
  }));

  const mobilityChartData = selectedRecords.map((r, i) => ({
    session: `Session ${i + 1}`,
    score: r.mobilityScore,
  }));

  const columns: ColumnDef<PatientSummary>[] = [
    {
      accessorKey: "patientName",
      header: ({ column }) => (
        <SortableHeader column={column} title="Patient" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs bg-primary/10">
              {getInitials(row.original.patientName)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{row.original.patientName}</p>
            <p className="text-xs text-muted-foreground">
              {row.original.patientId}
            </p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "totalSessions",
      header: ({ column }) => (
        <SortableHeader column={column} title="Total Sessions" />
      ),
      cell: ({ row }) => (
        <span className="text-sm font-medium">
          {row.original.totalSessions}
        </span>
      ),
    },
    {
      accessorKey: "lastVisit",
      header: ({ column }) => (
        <SortableHeader column={column} title="Last Visit" />
      ),
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.lastVisit ? formatDate(row.original.lastVisit) : "-"}
        </span>
      ),
    },
    {
      accessorKey: "avgPainReduction",
      header: ({ column }) => (
        <SortableHeader column={column} title="Avg Pain Reduction" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">
            {row.original.avgPainReduction}
          </span>
          <span className="text-xs text-muted-foreground">pts</span>
          {row.original.avgPainReduction > 0 && (
            <ArrowDownRight className="h-3 w-3 text-emerald-500" />
          )}
        </div>
      ),
    },
    {
      accessorKey: "latestMobility",
      header: ({ column }) => (
        <SortableHeader column={column} title="Mobility Score" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Progress
            value={row.original.latestMobility}
            className="h-2 w-16"
          />
          <span className="text-sm">{row.original.latestMobility}%</span>
          {row.original.mobilityTrend === "up" ? (
            <TrendingUp className="h-3 w-3 text-emerald-500" />
          ) : row.original.mobilityTrend === "down" ? (
            <TrendingDown className="h-3 w-3 text-red-500" />
          ) : (
            <Minus className="h-3 w-3 text-muted-foreground" />
          )}
        </div>
      ),
    },
    {
      accessorKey: "progress",
      header: "Progress",
      cell: ({ row }) => {
        const config = progressConfig[row.original.progress];
        return <Badge variant={config.variant}>{config.label}</Badge>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedPatient(row.original.patientId)}
        >
          <Activity className="h-4 w-4 mr-1" />
          Details
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patient Records"
        description="Treatment history and progress tracking for all patients"
      >
        <Button variant="outline">
          <Users className="h-4 w-4 mr-2" />
          {patientSummaries.length} Patients
        </Button>
      </PageHeader>

      {/* Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DataTable
          columns={columns}
          data={patientSummaries}
          searchKey="patientName"
          searchPlaceholder="Search patients..."
        />
      </motion.div>

      {/* Patient Detail Panel */}
      <AnimatePresence>
        {selectedPatient && selectedRecords.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10">
                        {getInitials(selectedRecords[0].patientName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">
                        {selectedRecords[0].patientName} - Treatment Progress
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {selectedRecords.length} sessions tracked
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedPatient(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard
                title="Pain Level Trend"
                description="Before and after pain levels across sessions"
                type="line"
                data={painChartData}
                dataKeys={["before", "after"]}
                xAxisKey="session"
                colors={["#ef4444", "#22c55e"]}
                height={280}
              />
              <ChartCard
                title="Mobility Score Trend"
                description="Mobility improvement over sessions"
                type="area"
                data={mobilityChartData}
                dataKeys={["score"]}
                xAxisKey="session"
                colors={["hsl(var(--chart-1))"]}
                height={280}
              />
            </div>

            {/* Session History */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Session History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedRecords
                    .slice()
                    .reverse()
                    .map((record, index) => (
                      <motion.div
                        key={record.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="flex items-center justify-between p-3 rounded-lg border bg-card"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {formatDate(record.date)}
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {record.treatment}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              by {record.therapistName}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">
                              Pain
                            </p>
                            <span className="text-red-500">
                              {record.painLevelBefore}
                            </span>
                            <span className="mx-1 text-muted-foreground">
                              &rarr;
                            </span>
                            <span className="text-emerald-500">
                              {record.painLevelAfter}
                            </span>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">
                              Mobility
                            </p>
                            <span className="font-medium">
                              {record.mobilityScore}%
                            </span>
                          </div>
                          <Badge
                            variant={progressConfig[record.progress].variant}
                          >
                            {progressConfig[record.progress].label}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
