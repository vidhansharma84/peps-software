"use client";

import { use } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Trophy,
  TrendingUp,
  User,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { ChartCard } from "@/components/shared/chart-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { getInitials, formatDate } from "@/lib/utils";
import { athletes, coaches, performanceRecords } from "@/data/coaches";

const levelVariant: Record<string, "success" | "info" | "warning" | "secondary"> = {
  elite: "success",
  advanced: "info",
  intermediate: "warning",
  beginner: "secondary",
};

export default function AthleteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const athlete = athletes.find((a) => a.id === id);

  if (!athlete) {
    return (
      <EmptyState
        title="Athlete not found"
        description="The athlete you are looking for does not exist."
        action={
          <Link href="/coaches/athletes">
            <Button>Back to Athletes</Button>
          </Link>
        }
      />
    );
  }

  const coach = coaches.find((c) => c.id === athlete.coachId);
  const records = performanceRecords.filter(
    (r) => r.athleteId === athlete.id
  );

  const performanceChartData = records.map((r) => ({
    date: formatDate(r.date),
    speed: r.metrics.speed,
    endurance: r.metrics.endurance,
    technique: r.metrics.technique,
  }));

  const latestRecord = records[0];
  const avgMetrics = records.length > 0
    ? {
        speed: Math.round(
          records.reduce((s, r) => s + r.metrics.speed, 0) / records.length
        ),
        endurance: Math.round(
          records.reduce((s, r) => s + r.metrics.endurance, 0) / records.length
        ),
        technique: Math.round(
          records.reduce((s, r) => s + r.metrics.technique, 0) / records.length
        ),
      }
    : null;

  return (
    <div className="space-y-6">
      <PageHeader title="Athlete Profile" description={athlete.name}>
        <Link href="/coaches/athletes">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </Link>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="text-2xl bg-primary/10">
                    {getInitials(athlete.name)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{athlete.name}</h2>
                <p className="text-sm text-muted-foreground mb-2">
                  {athlete.sport} | Age {athlete.age}
                </p>
                <Badge
                  variant={levelVariant[athlete.level]}
                  className="capitalize mb-4"
                >
                  {athlete.level}
                </Badge>

                {/* Coach info */}
                {coach && (
                  <div className="w-full p-3 rounded-lg border mb-4">
                    <p className="text-xs text-muted-foreground mb-1">
                      Assigned Coach
                    </p>
                    <Link href={`/coaches/directory/${coach.id}`}>
                      <div className="flex items-center gap-3 hover:bg-accent/50 rounded-lg p-2 transition-colors">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs bg-primary/10">
                            {getInitials(coach.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <p className="text-sm font-medium">{coach.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {coach.specialization}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                )}

                {/* Personal Bests */}
                <div className="w-full">
                  <h4 className="text-sm font-semibold text-left mb-2 flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-amber-500" />
                    Personal Bests
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(athlete.personalBests).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between p-2 rounded-lg border text-sm"
                        >
                          <span className="text-muted-foreground">{key}</span>
                          <span className="font-semibold">{value}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Average Metrics */}
                {avgMetrics && (
                  <div className="w-full mt-4">
                    <h4 className="text-sm font-semibold text-left mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                      Average Metrics
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Speed</span>
                          <span className="font-medium">{avgMetrics.speed}%</span>
                        </div>
                        <Progress value={avgMetrics.speed} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">
                            Endurance
                          </span>
                          <span className="font-medium">
                            {avgMetrics.endurance}%
                          </span>
                        </div>
                        <Progress
                          value={avgMetrics.endurance}
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">
                            Technique
                          </span>
                          <span className="font-medium">
                            {avgMetrics.technique}%
                          </span>
                        </div>
                        <Progress
                          value={avgMetrics.technique}
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right side: Performance */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Chart */}
          {performanceChartData.length > 0 && (
            <ChartCard
              title="Performance Over Time"
              description="Tracking speed, endurance, and technique progression"
              type="area"
              data={performanceChartData}
              dataKeys={["speed", "endurance", "technique"]}
              xAxisKey="date"
              height={320}
            />
          )}

          {/* Performance Records */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Performance History</CardTitle>
            </CardHeader>
            <CardContent>
              {records.length > 0 ? (
                <div className="space-y-4">
                  {records.map((record, index) => (
                    <motion.div
                      key={record.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 rounded-lg border"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            {formatDate(record.date)}
                          </span>
                        </div>
                        <Badge
                          variant={
                            record.rating >= 4.5
                              ? "success"
                              : record.rating >= 4.0
                              ? "info"
                              : "secondary"
                          }
                        >
                          Rating: {record.rating.toFixed(1)}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div className="text-center p-2 rounded-lg bg-accent/50">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                            Speed
                          </p>
                          <p className="text-lg font-bold">
                            {record.metrics.speed}
                          </p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-accent/50">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                            Endurance
                          </p>
                          <p className="text-lg font-bold">
                            {record.metrics.endurance}
                          </p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-accent/50">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                            Technique
                          </p>
                          <p className="text-lg font-bold">
                            {record.metrics.technique}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {record.notes}
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No performance records"
                  description="No performance data has been recorded for this athlete yet."
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
