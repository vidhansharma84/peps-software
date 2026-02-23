"use client";

import { motion } from "framer-motion";
import {
  Users,
  CalendarCheck,
  FlaskConical,
  Stethoscope,
  Clock,
  ArrowRight,
  UserPlus,
  FileText,
  TestTube2,
  Activity,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { ChartCard } from "@/components/shared/chart-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  patients,
  doctors,
  medicalAppointments,
  labResults,
  appointmentsByDay,
} from "@/data/medical";
import { complianceSummary, licenses } from "@/data/hefra";
import { getInitials } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function MedicalDashboardPage() {
  const todayAppointments = medicalAppointments.filter(
    (a) => a.date === "2026-02-23"
  );
  const totalAppointments = medicalAppointments.length;
  const pendingLabResults = labResults.filter(
    (l) => l.status === "pending"
  ).length;
  const activeDoctors = doctors.filter(
    (d) => d.status === "available" || d.status === "busy"
  ).length;

  const quickActions = [
    { label: "New Patient", icon: UserPlus, href: "/medical/patients", color: "from-blue-500 to-cyan-500" },
    { label: "Appointments", icon: CalendarCheck, href: "/medical/appointments", color: "from-emerald-500 to-green-500" },
    { label: "Prescriptions", icon: FileText, href: "/medical/prescriptions", color: "from-amber-500 to-orange-500" },
    { label: "Lab Results", icon: TestTube2, href: "/medical/lab-results", color: "from-purple-500 to-violet-500" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Medical Centre"
        description="Overview of medical centre operations, patients, and appointments"
      >
        <Button asChild>
          <Link href="/medical/appointments">
            <CalendarCheck className="h-4 w-4 mr-2" />
            View Appointments
          </Link>
        </Button>
      </PageHeader>

      {/* HeFRA Compliance Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className={`border-l-4 ${complianceSummary.criticalIssues > 0 ? "border-l-amber-500 bg-amber-500/5" : "border-l-emerald-500 bg-emerald-500/5"}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                {complianceSummary.criticalIssues > 0 ? (
                  <ShieldAlert className="h-5 w-5 text-amber-500" />
                ) : (
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                )}
                <div>
                  <p className="text-sm font-medium">
                    HeFRA Compliance Score: <span className={complianceSummary.overallScore >= 80 ? "text-emerald-500" : "text-amber-500"}>{complianceSummary.overallScore}%</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {complianceSummary.criticalIssues > 0 && (
                      <span className="text-amber-500 font-medium">{complianceSummary.criticalIssues} critical issue{complianceSummary.criticalIssues > 1 ? "s" : ""} require attention. </span>
                    )}
                    {complianceSummary.compliant}/{complianceSummary.totalItems} items compliant per Act 829 standards.
                    {(() => {
                      const expiringLicenses = licenses.filter(
                        (l) => l.status === "expired" || (l.status === "active" && new Date(l.expiryDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000))
                      );
                      return expiringLicenses.length > 0 ? ` ${expiringLicenses.length} license${expiringLicenses.length > 1 ? "s" : ""} expiring soon.` : "";
                    })()}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/compliance">
                  <ShieldCheck className="h-3.5 w-3.5 mr-1.5" />
                  View Compliance
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={item}>
          <StatsCard
            title="Patients Today"
            value={todayAppointments.length}
            change={12.5}
            changeLabel="vs last week"
            icon={<Users className="h-6 w-6" />}
            gradient="from-blue-500 to-cyan-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Total Appointments"
            value={totalAppointments}
            change={8.3}
            changeLabel="vs last month"
            icon={<CalendarCheck className="h-6 w-6" />}
            gradient="from-emerald-500 to-green-600"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Pending Lab Results"
            value={pendingLabResults}
            change={-15.0}
            changeLabel="vs yesterday"
            icon={<FlaskConical className="h-6 w-6" />}
            gradient="from-amber-500 to-orange-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Active Doctors"
            value={`${activeDoctors}/${doctors.length}`}
            icon={<Stethoscope className="h-6 w-6" />}
            gradient="from-purple-500 to-violet-500"
          />
        </motion.div>
      </motion.div>

      {/* Chart + Today's Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <ChartCard
            title="Appointments by Day"
            description="Weekly appointment distribution"
            type="bar"
            data={appointmentsByDay}
            dataKeys={["appointments"]}
            xAxisKey="day"
            colors={["hsl(var(--chart-1))"]}
            height={280}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Doctor Availability</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/medical/doctors">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {getInitials(doctor.name.replace("Dr. ", ""))}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{doctor.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {doctor.specialization}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={doctor.status} />
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
              <CardTitle className="text-base">Today&apos;s Appointments</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/medical/appointments">
                  View All <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayAppointments.slice(0, 8).map((apt, index) => (
                <motion.div
                  key={apt.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                        {getInitials(apt.patientName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{apt.patientName}</p>
                      <p className="text-xs text-muted-foreground">
                        {apt.doctorName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {apt.time}
                      </div>
                      <Badge
                        variant={
                          apt.type === "emergency"
                            ? "destructive"
                            : apt.type === "follow_up"
                            ? "info"
                            : apt.type === "checkup"
                            ? "secondary"
                            : "outline"
                        }
                        className="text-xs mt-0.5"
                      >
                        {apt.type.replace("_", " ")}
                      </Badge>
                    </div>
                    <StatusBadge status={apt.status} />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {quickActions.map((action) => (
                <Link key={action.label} href={action.href}>
                  <div className="flex flex-col items-center gap-2 p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors cursor-pointer group">
                    <div
                      className={`h-10 w-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}
                    >
                      <action.icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium">{action.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
