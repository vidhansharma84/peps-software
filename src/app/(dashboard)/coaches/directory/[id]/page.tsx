"use client";

import { use } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Users,
  Award,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { ChartCard } from "@/components/shared/chart-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { EmptyState } from "@/components/shared/empty-state";
import { getInitials, formatDate } from "@/lib/utils";
import {
  coaches,
  athletes,
  performanceRecords,
  certifications,
} from "@/data/coaches";

export default function CoachDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const coach = coaches.find((c) => c.id === id);

  if (!coach) {
    return (
      <EmptyState
        title="Coach not found"
        description="The coach you are looking for does not exist."
        action={
          <Link href="/coaches/directory">
            <Button>Back to Directory</Button>
          </Link>
        }
      />
    );
  }

  const coachAthletes = athletes.filter((a) => a.coachId === coach.id);
  const coachRecords = performanceRecords.filter(
    (r) => r.coachId === coach.id
  );
  const coachCerts = certifications.filter((c) => c.coachId === coach.id);

  const avgRating =
    coachRecords.length > 0
      ? coachRecords.reduce((sum, r) => sum + r.rating, 0) / coachRecords.length
      : 0;

  const athletePerformanceData = coachRecords.map((r) => ({
    name: r.athleteName.split(" ")[0],
    speed: r.metrics.speed,
    endurance: r.metrics.endurance,
    technique: r.metrics.technique,
  }));

  return (
    <div className="space-y-6">
      <PageHeader title="Coach Profile" description={coach.name}>
        <Link href="/coaches/directory">
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
                    {getInitials(coach.name)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{coach.name}</h2>
                <p className="text-sm text-muted-foreground mb-2">
                  {coach.specialization}
                </p>
                <div className="flex gap-2 mb-4 flex-wrap justify-center">
                  <Badge>{coach.sport}</Badge>
                  <StatusBadge status={coach.status} />
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= Math.round(coach.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                  <span className="text-sm font-medium ml-1">
                    {coach.rating}
                  </span>
                </div>

                <div className="w-full space-y-3 text-sm">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-accent/50">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{coach.email}</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-accent/50">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{coach.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-accent/50">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span>{coach.experience} years experience</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-accent/50">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{coach.athleteCount} athletes assigned</span>
                  </div>
                </div>

                {/* Certifications */}
                <div className="w-full mt-4">
                  <h4 className="text-sm font-semibold text-left mb-2">
                    Certifications
                  </h4>
                  <div className="space-y-2">
                    {coachCerts.map((cert) => (
                      <div
                        key={cert.id}
                        className="flex items-center justify-between p-2 rounded-lg border text-xs"
                      >
                        <span className="truncate flex-1 text-left">
                          {cert.name}
                        </span>
                        <StatusBadge status={cert.status} />
                      </div>
                    ))}
                    {coachCerts.length === 0 && (
                      <p className="text-xs text-muted-foreground">
                        No certifications on record
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right side: Athletes & Performance */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Chart */}
          {athletePerformanceData.length > 0 && (
            <ChartCard
              title="Athlete Performance Metrics"
              description="Speed, Endurance, and Technique scores for each athlete"
              type="bar"
              data={athletePerformanceData}
              dataKeys={["speed", "endurance", "technique"]}
              xAxisKey="name"
              height={280}
            />
          )}

          {/* Athletes List */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  Assigned Athletes ({coachAthletes.length})
                </CardTitle>
                <Link href="/coaches/athletes">
                  <Button variant="ghost" size="sm" className="text-xs">
                    View All Athletes
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {coachAthletes.length > 0 ? (
                <div className="space-y-3">
                  {coachAthletes.map((athlete, index) => {
                    const record = coachRecords.find(
                      (r) => r.athleteId === athlete.id
                    );
                    return (
                      <motion.div
                        key={athlete.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link href={`/coaches/athletes/${athlete.id}`}>
                          <div className="flex items-center gap-4 p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="text-sm bg-primary/10">
                                {getInitials(athlete.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">
                                {athlete.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Age: {athlete.age} | {athlete.sport}
                              </p>
                            </div>
                            <Badge
                              variant={
                                athlete.level === "elite"
                                  ? "success"
                                  : athlete.level === "advanced"
                                  ? "info"
                                  : athlete.level === "intermediate"
                                  ? "warning"
                                  : "secondary"
                              }
                              className="capitalize text-[10px]"
                            >
                              {athlete.level}
                            </Badge>
                            {record && (
                              <div className="hidden sm:flex items-center gap-1 text-xs">
                                <TrendingUp className="h-3 w-3 text-emerald-500" />
                                <span className="font-medium">
                                  {record.rating.toFixed(1)}
                                </span>
                              </div>
                            )}
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <EmptyState
                  title="No athletes assigned"
                  description="This coach currently has no athletes."
                />
              )}
            </CardContent>
          </Card>

          {/* Recent Performance Records */}
          {coachRecords.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  Recent Performance Records
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {coachRecords.map((record, index) => (
                    <motion.div
                      key={record.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="p-3 rounded-lg border"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">
                          {record.athleteName}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(record.date)}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mb-2">
                        <div>
                          <p className="text-[10px] text-muted-foreground">
                            Speed
                          </p>
                          <Progress value={record.metrics.speed} className="h-1.5 mt-1" />
                          <p className="text-xs font-medium mt-0.5">
                            {record.metrics.speed}%
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground">
                            Endurance
                          </p>
                          <Progress
                            value={record.metrics.endurance}
                            className="h-1.5 mt-1"
                          />
                          <p className="text-xs font-medium mt-0.5">
                            {record.metrics.endurance}%
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground">
                            Technique
                          </p>
                          <Progress
                            value={record.metrics.technique}
                            className="h-1.5 mt-1"
                          />
                          <p className="text-xs font-medium mt-0.5">
                            {record.metrics.technique}%
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {record.notes}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
