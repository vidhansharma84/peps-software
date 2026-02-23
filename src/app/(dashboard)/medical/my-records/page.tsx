"use client";

import { motion } from "framer-motion";
import {
  User,
  Calendar,
  Pill,
  FlaskConical,
  Heart,
  AlertTriangle,
  Clock,
  Droplets,
  Phone,
  Mail,
  Activity,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { ChartCard } from "@/components/shared/chart-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

import {
  patients,
  getAppointmentsByPatient,
  getPrescriptionsByPatient,
  getLabResultsByPatient,
  vitalsHistory,
} from "@/data/medical";
import { formatDate, getInitials, getRelativeTime } from "@/lib/utils";

// Mock current user as a patient
const currentUser = patients[0]; // Aarav Sharma

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function MyMedicalRecordsPage() {
  const appointments = getAppointmentsByPatient(currentUser.id);
  const prescriptions = getPrescriptionsByPatient(currentUser.id);
  const labResultsList = getLabResultsByPatient(currentUser.id);

  const upcomingAppointments = appointments.filter(
    (a) => a.status === "scheduled"
  );
  const activePrescriptions = prescriptions.filter(
    (p) => new Date(p.date) >= new Date("2026-02-01")
  );
  const recentLabResults = labResultsList
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Medical Records"
        description="View your health summary, appointments, prescriptions, and lab results"
      />

      {/* Profile Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                  {getInitials(currentUser.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">{currentUser.name}</h2>
                  <StatusBadge status={currentUser.status} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {currentUser.email}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {currentUser.phone}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    {currentUser.age} yrs, {currentUser.gender}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Droplets className="h-4 w-4" />
                    Blood Group: <Badge variant="outline" className="font-mono">{currentUser.bloodGroup}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={item}>
          <StatsCard
            title="Upcoming Appointments"
            value={upcomingAppointments.length}
            icon={<Calendar className="h-6 w-6" />}
            gradient="from-blue-500 to-cyan-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Active Prescriptions"
            value={activePrescriptions.length}
            icon={<Pill className="h-6 w-6" />}
            gradient="from-emerald-500 to-green-600"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Lab Results"
            value={labResultsList.length}
            icon={<FlaskConical className="h-6 w-6" />}
            gradient="from-amber-500 to-orange-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Total Visits"
            value={appointments.length}
            icon={<Activity className="h-6 w-6" />}
            gradient="from-purple-500 to-violet-500"
          />
        </motion.div>
      </motion.div>

      {/* Health Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Allergies
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentUser.allergies.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {currentUser.allergies.map((allergy) => (
                    <Badge key={allergy} variant="destructive">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No known allergies</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                Medical Conditions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentUser.conditions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {currentUser.conditions.map((condition) => (
                    <Badge key={condition} variant="warning">
                      {condition}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No chronic conditions</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Vitals Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <ChartCard
          title="Vitals Trend"
          description="Your blood pressure and heart rate over the last 6 months"
          type="line"
          data={vitalsHistory}
          dataKeys={["systolic", "diastolic", "heartRate"]}
          xAxisKey="date"
          colors={["#ef4444", "#3b82f6", "#10b981"]}
          height={280}
        />
      </motion.div>

      {/* Upcoming Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Upcoming Appointments
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/medical/appointments">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-3">
                {upcomingAppointments.map((apt, index) => (
                  <motion.div
                    key={apt.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{apt.doctorName}</p>
                      <p className="text-xs text-muted-foreground">{apt.notes}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(apt.date)}
                        <Clock className="h-3 w-3 ml-1" />
                        {apt.time}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          apt.type === "emergency"
                            ? "destructive"
                            : apt.type === "follow_up"
                            ? "info"
                            : "outline"
                        }
                        className="text-xs"
                      >
                        {apt.type.replace("_", " ")}
                      </Badge>
                      <StatusBadge status={apt.status} />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No upcoming appointments"
                description="You have no scheduled appointments."
                action={
                  <Button asChild size="sm">
                    <Link href="/medical/appointments">Book Appointment</Link>
                  </Button>
                }
              />
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Active Prescriptions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Pill className="h-4 w-4" />
                Active Prescriptions
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/medical/prescriptions">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {activePrescriptions.length > 0 ? (
              <div className="space-y-4">
                {activePrescriptions.map((rx, index) => (
                  <motion.div
                    key={rx.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 + index * 0.05 }}
                  >
                    <Card>
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{rx.diagnosis}</p>
                            <p className="text-xs text-muted-foreground">
                              {rx.doctorName} &middot; {formatDate(rx.date)}
                            </p>
                          </div>
                          <Badge variant="outline">
                            {rx.medications.length} med{rx.medications.length !== 1 ? "s" : ""}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          {rx.medications.map((med, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 text-sm p-2 rounded bg-muted/30"
                            >
                              <Pill className="h-3 w-3 text-emerald-500 flex-shrink-0" />
                              <span className="font-medium">{med.name}</span>
                              <span className="text-muted-foreground">
                                {med.dosage} &middot; {med.frequency}
                              </span>
                            </div>
                          ))}
                        </div>
                        {rx.notes && (
                          <p className="text-xs text-muted-foreground border-t pt-2">
                            {rx.notes}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No active prescriptions"
                description="You have no current prescriptions."
              />
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Lab Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <FlaskConical className="h-4 w-4" />
                Recent Lab Results
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/medical/lab-results">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recentLabResults.length > 0 ? (
              <div className="space-y-3">
                {recentLabResults.map((result, index) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65 + index * 0.05 }}
                  >
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-medium text-sm">{result.testName}</p>
                            <p className="text-xs text-muted-foreground">
                              {result.orderedBy} &middot; {formatDate(result.date)}
                            </p>
                          </div>
                          <StatusBadge status={result.status} />
                        </div>
                        {Object.keys(result.results).length > 0 ? (
                          <div className="space-y-1.5">
                            {Object.entries(result.results).map(([key, val]) => (
                              <div
                                key={key}
                                className="flex items-center justify-between text-sm p-2 rounded border"
                              >
                                <span>{key}</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-xs">{val.value}</span>
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
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            Results pending...
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No lab results"
                description="You have no recorded lab results."
              />
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
