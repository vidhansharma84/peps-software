"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  CalendarDays,
  TrendingUp,
  Clock,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { ChartCard } from "@/components/shared/chart-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { coaches, athletes, performanceRecords } from "@/data/coaches";

const performanceTrends = [
  { month: "Sep", speed: 78, endurance: 74, technique: 80 },
  { month: "Oct", speed: 80, endurance: 76, technique: 82 },
  { month: "Nov", speed: 82, endurance: 79, technique: 84 },
  { month: "Dec", speed: 84, endurance: 81, technique: 85 },
  { month: "Jan", speed: 85, endurance: 83, technique: 87 },
  { month: "Feb", speed: 87, endurance: 85, technique: 89 },
];

const upcomingSessions = [
  { id: "s1", coach: "Harpreet Singh", sport: "Cricket", time: "06:00 AM", venue: "Main Ground", athletes: 8 },
  { id: "s2", coach: "Bhavana Reddy", sport: "Athletics", time: "06:30 AM", venue: "Athletics Track", athletes: 5 },
  { id: "s3", coach: "Dinesh Chauhan", sport: "Football", time: "04:00 PM", venue: "Football Field", athletes: 4 },
  { id: "s4", coach: "Vinod Thakur", sport: "Swimming", time: "05:00 AM", venue: "Swimming Pool", athletes: 4 },
  { id: "s5", coach: "Rajendra Prasad", sport: "Basketball", time: "05:30 PM", venue: "Indoor Court", athletes: 5 },
];

export default function CoachesDashboardPage() {
  const activeCoaches = coaches.filter((c) => c.status === "active").length;
  const totalAthletes = athletes.length;
  const avgPerformance =
    performanceRecords.reduce((sum, r) => sum + r.rating, 0) /
    performanceRecords.length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Coaches Dashboard"
        description="Overview of coaching activities, athlete performance, and upcoming sessions"
      >
        <Link href="/coaches/directory">
          <Button>View All Coaches</Button>
        </Link>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Coaches"
          value={coaches.length}
          change={10}
          changeLabel="vs last quarter"
          icon={<Users className="h-5 w-5" />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Active Athletes"
          value={totalAthletes}
          change={8}
          changeLabel="vs last month"
          icon={<UserCheck className="h-5 w-5" />}
          gradient="from-emerald-500 to-emerald-600"
        />
        <StatsCard
          title="Sessions This Week"
          value={18}
          change={5}
          changeLabel="vs last week"
          icon={<CalendarDays className="h-5 w-5" />}
          gradient="from-amber-500 to-amber-600"
        />
        <StatsCard
          title="Avg Performance"
          value={`${avgPerformance.toFixed(1)}/5`}
          change={3.2}
          changeLabel="vs last month"
          icon={<TrendingUp className="h-5 w-5" />}
          gradient="from-violet-500 to-violet-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Trends Chart */}
        <div className="lg:col-span-2">
          <ChartCard
            title="Performance Trends"
            description="Average athlete metrics over the last 6 months"
            type="line"
            data={performanceTrends}
            dataKeys={["speed", "endurance", "technique"]}
            xAxisKey="month"
            height={320}
          />
        </div>

        {/* Upcoming Sessions */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Upcoming Sessions</CardTitle>
              <Link href="/coaches/schedule">
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  View All <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
              >
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="text-xs bg-primary/10">
                    {getInitials(session.coach)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{session.coach}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{session.time}</span>
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{session.venue}</span>
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px] shrink-0">
                  {session.sport}
                </Badge>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Performance Records */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Recent Performance Records</CardTitle>
            <Link href="/coaches/performance">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View Analytics <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {performanceRecords.slice(0, 5).map((record, index) => {
              const coach = coaches.find((c) => c.id === record.coachId);
              return (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="flex items-center gap-4 p-3 rounded-lg border"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="text-xs bg-primary/10">
                      {getInitials(record.athleteName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{record.athleteName}</p>
                    <p className="text-xs text-muted-foreground">
                      Coach: {coach?.name} | {record.sport}
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-3 text-xs">
                    <div className="text-center">
                      <p className="text-muted-foreground">Speed</p>
                      <p className="font-semibold">{record.metrics.speed}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground">Endurance</p>
                      <p className="font-semibold">{record.metrics.endurance}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground">Technique</p>
                      <p className="font-semibold">{record.metrics.technique}</p>
                    </div>
                  </div>
                  <Badge
                    variant={record.rating >= 4.5 ? "success" : record.rating >= 4.0 ? "info" : "secondary"}
                    className="shrink-0"
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
  );
}
