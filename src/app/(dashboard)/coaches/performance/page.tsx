"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  BarChart3,
  Target,
  Zap,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { ChartCard } from "@/components/shared/chart-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getInitials } from "@/lib/utils";
import { coaches, athletes, performanceRecords } from "@/data/coaches";

const sportPerformance = [
  { sport: "Cricket", speed: 82, endurance: 80, technique: 86 },
  { sport: "Athletics", sport_short: "Ath", speed: 88, endurance: 84, technique: 85 },
  { sport: "Football", speed: 82, endurance: 88, technique: 78 },
  { sport: "Swimming", speed: 88, endurance: 86, technique: 90 },
  { sport: "Basketball", speed: 79, endurance: 83, technique: 83 },
  { sport: "Hockey", speed: 85, endurance: 87, technique: 86 },
  { sport: "Tennis", speed: 82, endurance: 80, technique: 88 },
  { sport: "Badminton", speed: 90, endurance: 78, technique: 85 },
];

const monthlyTrends = [
  { month: "Sep", avgRating: 3.8, sessions: 42, improvement: 5.2 },
  { month: "Oct", avgRating: 4.0, sessions: 48, improvement: 6.1 },
  { month: "Nov", avgRating: 4.1, sessions: 45, improvement: 7.4 },
  { month: "Dec", avgRating: 4.2, sessions: 40, improvement: 6.8 },
  { month: "Jan", avgRating: 4.3, sessions: 50, improvement: 8.2 },
  { month: "Feb", avgRating: 4.4, sessions: 52, improvement: 9.1 },
];

const coachComparison = coaches
  .filter((c) => c.status === "active")
  .map((c) => {
    const records = performanceRecords.filter((r) => r.coachId === c.id);
    const avgRating =
      records.length > 0
        ? records.reduce((s, r) => s + r.rating, 0) / records.length
        : 0;
    return {
      name: c.name.split(" ")[0],
      rating: Number(avgRating.toFixed(1)),
      athletes: c.athleteCount,
      sport: c.sport,
    };
  })
  .sort((a, b) => b.rating - a.rating);

export default function PerformancePage() {
  const [sportFilter, setSportFilter] = useState<string>("all");

  const totalRecords = performanceRecords.length;
  const avgSpeed = Math.round(
    performanceRecords.reduce((s, r) => s + r.metrics.speed, 0) / totalRecords
  );
  const avgEndurance = Math.round(
    performanceRecords.reduce((s, r) => s + r.metrics.endurance, 0) /
      totalRecords
  );
  const avgTechnique = Math.round(
    performanceRecords.reduce((s, r) => s + r.metrics.technique, 0) /
      totalRecords
  );
  const avgRating =
    performanceRecords.reduce((s, r) => s + r.rating, 0) / totalRecords;

  const eliteAthletes = athletes.filter((a) => a.level === "elite").length;

  const filteredRecords =
    sportFilter === "all"
      ? performanceRecords
      : performanceRecords.filter((r) => r.sport === sportFilter);

  const topPerformers = [...performanceRecords]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Performance Analytics"
        description="Comprehensive performance analysis across all sports and athletes"
      >
        <Select value={sportFilter} onValueChange={setSportFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Sports" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sports</SelectItem>
            {[
              "Cricket",
              "Athletics",
              "Football",
              "Swimming",
              "Basketball",
              "Hockey",
              "Tennis",
              "Badminton",
            ].map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Avg Speed Score"
          value={avgSpeed}
          change={4.2}
          changeLabel="vs last month"
          icon={<Zap className="h-5 w-5" />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Avg Endurance"
          value={avgEndurance}
          change={3.8}
          changeLabel="vs last month"
          icon={<Target className="h-5 w-5" />}
          gradient="from-emerald-500 to-emerald-600"
        />
        <StatsCard
          title="Avg Technique"
          value={avgTechnique}
          change={5.1}
          changeLabel="vs last month"
          icon={<BarChart3 className="h-5 w-5" />}
          gradient="from-amber-500 to-amber-600"
        />
        <StatsCard
          title="Elite Athletes"
          value={eliteAthletes}
          change={12}
          changeLabel="vs last quarter"
          icon={<TrendingUp className="h-5 w-5" />}
          gradient="from-violet-500 to-violet-600"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="comparison">Coach Comparison</TabsTrigger>
          <TabsTrigger value="sports">By Sport</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard
              title="Monthly Performance Trends"
              description="Average rating and session counts over time"
              type="area"
              data={monthlyTrends}
              dataKeys={["avgRating", "improvement"]}
              xAxisKey="month"
              height={300}
            />
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPerformers.map((record, index) => {
                    const athlete = athletes.find(
                      (a) => a.id === record.athleteId
                    );
                    return (
                      <motion.div
                        key={record.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-3 p-3 rounded-lg border"
                      >
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">
                          #{index + 1}
                        </div>
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="text-xs bg-primary/10">
                            {getInitials(record.athleteName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">
                            {record.athleteName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {record.sport}
                            {athlete && ` | ${athlete.level}`}
                          </p>
                        </div>
                        <Badge
                          variant={
                            record.rating >= 4.5 ? "success" : "info"
                          }
                        >
                          {record.rating.toFixed(1)}
                        </Badge>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Coach Comparison Tab */}
        <TabsContent value="comparison" className="space-y-6">
          <ChartCard
            title="Coach Performance Comparison"
            description="Average athlete rating per coach"
            type="bar"
            data={coachComparison}
            dataKeys={["rating", "athletes"]}
            xAxisKey="name"
            height={350}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coachComparison.map((coach, index) => (
              <motion.div
                key={coach.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="text-sm bg-primary/10">
                          {getInitials(coach.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{coach.name}</p>
                        <Badge variant="outline" className="text-[10px]">
                          {coach.sport}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">
                            Avg Rating
                          </span>
                          <span className="font-medium">
                            {coach.rating}/5
                          </span>
                        </div>
                        <Progress
                          value={(coach.rating / 5) * 100}
                          className="h-2"
                        />
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">
                          Athletes
                        </span>
                        <span className="font-medium">{coach.athletes}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Sports Breakdown Tab */}
        <TabsContent value="sports" className="space-y-6">
          <ChartCard
            title="Performance by Sport"
            description="Average speed, endurance, and technique scores across sports"
            type="bar"
            data={sportPerformance}
            dataKeys={["speed", "endurance", "technique"]}
            xAxisKey="sport"
            height={350}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sportPerformance.map((sp, index) => (
              <motion.div
                key={sp.sport}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="text-sm font-semibold mb-3">{sp.sport}</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-muted-foreground">Speed</span>
                          <span className="font-medium">{sp.speed}%</span>
                        </div>
                        <Progress value={sp.speed} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-muted-foreground">
                            Endurance
                          </span>
                          <span className="font-medium">{sp.endurance}%</span>
                        </div>
                        <Progress value={sp.endurance} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-muted-foreground">
                            Technique
                          </span>
                          <span className="font-medium">{sp.technique}%</span>
                        </div>
                        <Progress value={sp.technique} className="h-1.5" />
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground">
                      Avg:{" "}
                      {Math.round(
                        (sp.speed + sp.endurance + sp.technique) / 3
                      )}
                      %
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
