"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Heart,
  AlertTriangle,
  Pill,
  FlaskConical,
  Clock,
  Activity,
  Droplets,
  User,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { ChartCard } from "@/components/shared/chart-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  getPatientById,
  getAppointmentsByPatient,
  getPrescriptionsByPatient,
  getLabResultsByPatient,
  vitalsHistory,
} from "@/data/medical";
import { formatDate, getInitials, getRelativeTime } from "@/lib/utils";

export default function PatientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const patientId = params.id as string;
  const patient = getPatientById(patientId);

  if (!patient) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" className="gap-2" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <EmptyState
          title="Patient not found"
          description={`No patient found with ID "${patientId}".`}
          action={
            <Button onClick={() => router.push("/medical/patients")}>
              Go to Patients
            </Button>
          }
        />
      </div>
    );
  }

  const appointments = getAppointmentsByPatient(patientId);
  const prescriptions = getPrescriptionsByPatient(patientId);
  const labResultsList = getLabResultsByPatient(patientId);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Back Button */}
      <Button variant="ghost" className="gap-2 -ml-2" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" />
        Back to Patients
      </Button>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                  {getInitials(patient.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">{patient.name}</h2>
                  <StatusBadge status={patient.status} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {patient.email}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {patient.phone}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    {patient.age} yrs, {patient.gender}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Droplets className="h-4 w-4" />
                    Blood Group: <Badge variant="outline" className="font-mono">{patient.bloodGroup}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Last Visit: {formatDate(patient.lastVisit)} ({getRelativeTime(patient.lastVisit)})
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabbed EMR View */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Allergies & Conditions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Allergies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {patient.allergies.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {patient.allergies.map((allergy) => (
                        <Badge key={allergy} variant="destructive">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No known allergies
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    Medical Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {patient.conditions.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {patient.conditions.map((condition) => (
                        <Badge key={condition} variant="warning">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No chronic conditions
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Vitals Chart */}
            <ChartCard
              title="Vitals Trend"
              description="Blood pressure and heart rate over the last 6 months"
              type="line"
              data={vitalsHistory}
              dataKeys={["systolic", "diastolic", "heartRate"]}
              xAxisKey="date"
              colors={["#ef4444", "#3b82f6", "#10b981"]}
              height={280}
            />

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{appointments.length}</p>
                    <p className="text-xs text-muted-foreground">Total Appointments</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <Pill className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{prescriptions.length}</p>
                    <p className="text-xs text-muted-foreground">Prescriptions</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <FlaskConical className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{labResultsList.length}</p>
                    <p className="text-xs text-muted-foreground">Lab Results</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4">
            {appointments.length > 0 ? (
              <div className="space-y-4">
                {appointments
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((apt, index) => (
                    <motion.div
                      key={apt.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex gap-3">
                              <div className="flex flex-col items-center">
                                <div
                                  className={`h-3 w-3 rounded-full mt-1 ${
                                    apt.status === "completed"
                                      ? "bg-emerald-500"
                                      : apt.status === "scheduled"
                                      ? "bg-blue-500"
                                      : apt.status === "cancelled"
                                      ? "bg-red-500"
                                      : "bg-amber-500"
                                  }`}
                                />
                                {index < appointments.length - 1 && (
                                  <div className="flex-1 w-px bg-border mt-1" />
                                )}
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-sm">{apt.doctorName}</p>
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
                                    className="text-xs"
                                  >
                                    {apt.type.replace("_", " ")}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{apt.notes}</p>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {formatDate(apt.date)}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {apt.time}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <StatusBadge status={apt.status} />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            ) : (
              <EmptyState
                title="No appointment history"
                description="This patient has no recorded appointments."
              />
            )}
          </TabsContent>

          {/* Prescriptions Tab */}
          <TabsContent value="prescriptions" className="space-y-4">
            {prescriptions.length > 0 ? (
              prescriptions
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((rx, index) => (
                  <motion.div
                    key={rx.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-base">{rx.diagnosis}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                              {rx.doctorName} &middot; {formatDate(rx.date)}
                            </p>
                          </div>
                          <Badge variant="outline">
                            {rx.medications.length} medication{rx.medications.length !== 1 ? "s" : ""}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {rx.medications.map((med, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border"
                          >
                            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Pill className="h-4 w-4 text-emerald-500" />
                            </div>
                            <div className="space-y-0.5">
                              <p className="font-medium text-sm">{med.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {med.dosage} &middot; {med.frequency} &middot; {med.duration}
                              </p>
                            </div>
                          </div>
                        ))}
                        {rx.notes && (
                          <>
                            <Separator />
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium text-foreground">Notes:</span> {rx.notes}
                            </p>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
            ) : (
              <EmptyState
                title="No prescriptions"
                description="This patient has no recorded prescriptions."
              />
            )}
          </TabsContent>

          {/* Lab Results Tab */}
          <TabsContent value="lab-results" className="space-y-4">
            {labResultsList.length > 0 ? (
              labResultsList
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((result, index) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-base">{result.testName}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                              Ordered by {result.orderedBy} &middot; {formatDate(result.date)}
                            </p>
                          </div>
                          <StatusBadge status={result.status} />
                        </div>
                      </CardHeader>
                      <CardContent>
                        {Object.keys(result.results).length > 0 ? (
                          <div className="space-y-2">
                            {Object.entries(result.results).map(([key, val]) => (
                              <div
                                key={key}
                                className="flex items-center justify-between p-2 rounded-lg border"
                              >
                                <span className="text-sm font-medium">{key}</span>
                                <div className="flex items-center gap-3">
                                  <span className="text-sm">{val.value}</span>
                                  <span className="text-xs text-muted-foreground">
                                    Ref: {val.reference}
                                  </span>
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
                ))
            ) : (
              <EmptyState
                title="No lab results"
                description="This patient has no recorded lab results."
              />
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
