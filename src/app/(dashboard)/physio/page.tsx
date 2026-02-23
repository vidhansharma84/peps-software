"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  Users,
  IndianRupee,
  Star,
  Clock,
  ArrowRight,
  Plus,
  Activity,
  Stethoscope,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { ChartCard } from "@/components/shared/chart-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  appointments,
  therapists,
  weeklyAppointmentTrend,
} from "@/data/physio";
import { formatCurrency, getInitials } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function PhysioDashboardPage() {
  const todayAppointments = appointments.filter(
    (a) => a.date === "2026-02-23"
  );
  const activeTherapists = therapists.filter(
    (t) => t.status !== "off_duty"
  ).length;
  const monthRevenue = appointments
    .filter((a) => a.date.startsWith("2026-02") && a.status === "completed")
    .reduce((sum, a) => sum + a.fee, 0);
  const avgSatisfaction = (
    therapists.reduce((sum, t) => sum + t.rating, 0) / therapists.length
  ).toFixed(1);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Physio & Spa"
        description="Manage physiotherapy appointments, therapists, and spa services"
      >
        <Button asChild>
          <Link href="/physio/appointments">
            <Plus className="h-4 w-4 mr-2" />
            Book Appointment
          </Link>
        </Button>
      </PageHeader>

      {/* Stats Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={item}>
          <StatsCard
            title="Appointments Today"
            value={todayAppointments.length}
            change={12.5}
            changeLabel="vs yesterday"
            icon={<Calendar className="h-6 w-6" />}
            gradient="from-blue-500 to-cyan-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Active Therapists"
            value={activeTherapists}
            change={0}
            changeLabel="of 8 total"
            icon={<Users className="h-6 w-6" />}
            gradient="from-emerald-500 to-green-600"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Revenue This Month"
            value={formatCurrency(monthRevenue)}
            change={8.3}
            changeLabel="vs last month"
            icon={<IndianRupee className="h-6 w-6" />}
            gradient="from-amber-500 to-orange-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Avg Satisfaction"
            value={`${avgSatisfaction}/5.0`}
            change={2.1}
            changeLabel="vs last quarter"
            icon={<Star className="h-6 w-6" />}
            gradient="from-purple-500 to-violet-500"
          />
        </motion.div>
      </motion.div>

      {/* Chart + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointments Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <ChartCard
            title="Weekly Appointment Trend"
            description="Appointments and revenue over the past week"
            type="line"
            data={weeklyAppointmentTrend}
            dataKeys={["appointments"]}
            xAxisKey="day"
            colors={["hsl(var(--chart-1))"]}
            height={300}
          />
        </motion.div>

        {/* Therapist Availability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  Therapist Availability
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/physio/therapists">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {therapists.map((therapist) => (
                <div
                  key={therapist.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-primary/10">
                        {getInitials(therapist.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{therapist.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {therapist.specialization}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={therapist.status} />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Today's Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                Today&apos;s Appointments
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/physio/appointments">
                  View All <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {todayAppointments.length > 0 ? (
              <div className="space-y-3">
                {todayAppointments.slice(0, 8).map((apt, index) => (
                  <motion.div
                    key={apt.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="text-xs bg-primary/10">
                          {getInitials(apt.patientName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">
                          {apt.patientName}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {apt.time} - {apt.duration} min
                          <span className="mx-1">|</span>
                          <Stethoscope className="h-3 w-3" />
                          {apt.therapistName}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="capitalize">
                        {apt.type.replace("_", " ")}
                      </Badge>
                      <StatusBadge status={apt.status} />
                      <span className="text-sm font-medium">
                        {formatCurrency(apt.fee)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-sm text-muted-foreground">
                <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                No appointments scheduled for today
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
