"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Plus,
  CheckCircle,
  AlertCircle,
  Activity,
  TrendingDown,
  FileText,
  Stethoscope,
} from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { ChartCard } from "@/components/shared/chart-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { FormSheet } from "@/components/shared/form-sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  appointments,
  treatmentRecords,
  therapists,
  treatments,
} from "@/data/physio";
import { formatCurrency, formatDate, cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// Simulate current member is "Aarav Gupta" (PAT001)
const CURRENT_PATIENT_ID = "PAT001";
const CURRENT_PATIENT_NAME = "Aarav Gupta";

export default function MyAppointmentsPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");

  // Filter appointments for current member
  const myAppointments = appointments.filter(
    (a) => a.patientId === CURRENT_PATIENT_ID
  );
  const upcomingAppointments = myAppointments.filter(
    (a) => a.status === "scheduled" || a.status === "in_progress"
  );
  const pastAppointments = myAppointments.filter(
    (a) => a.status === "completed" || a.status === "cancelled"
  );

  // Treatment records for this patient
  const myRecords = useMemo(
    () =>
      treatmentRecords
        .filter((r) => r.patientId === CURRENT_PATIENT_ID)
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
    []
  );

  // Pain level chart data (before vs after)
  const painChartData = myRecords.map((r, i) => ({
    session: `S${i + 1}`,
    before: r.painLevelBefore,
    after: r.painLevelAfter,
  }));

  // Mobility trend
  const mobilityChartData = myRecords.map((r, i) => ({
    session: `S${i + 1}`,
    score: r.mobilityScore,
  }));

  // Stats
  const totalSessions = myRecords.length;
  const avgPainReduction =
    totalSessions > 0
      ? (
          myRecords.reduce(
            (sum, r) => sum + (r.painLevelBefore - r.painLevelAfter),
            0
          ) / totalSessions
        ).toFixed(1)
      : "0";
  const latestMobility =
    myRecords.length > 0 ? myRecords[myRecords.length - 1].mobilityScore : 0;

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Appointment booked successfully! We will confirm shortly.");
    setBookingOpen(false);
  };

  // Current treatment plan
  const activeTreatments = [
    {
      name: "Sports Injury Rehabilitation",
      sessions: "2 of 6 completed",
      progress: 33,
      next: "2026-02-25",
    },
    {
      name: "Deep Tissue Massage",
      sessions: "4 of 8 completed",
      progress: 50,
      next: "2026-02-27",
    },
    {
      name: "Electrotherapy (TENS)",
      sessions: "3 of 4 completed",
      progress: 75,
      next: "2026-02-24",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Appointments"
        description={`Welcome back, ${CURRENT_PATIENT_NAME}. Track your therapy progress and manage appointments.`}
      >
        <Button onClick={() => setBookingOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Book New Appointment
        </Button>
      </PageHeader>

      {/* Stats */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={item}>
          <StatsCard
            title="Total Sessions"
            value={totalSessions}
            icon={<CheckCircle className="h-6 w-6" />}
            gradient="from-blue-500 to-cyan-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Upcoming"
            value={upcomingAppointments.length}
            icon={<Calendar className="h-6 w-6" />}
            gradient="from-emerald-500 to-green-600"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Avg Pain Reduction"
            value={`${avgPainReduction} pts`}
            icon={<TrendingDown className="h-6 w-6" />}
            gradient="from-amber-500 to-orange-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Mobility Score"
            value={`${latestMobility}%`}
            change={5.2}
            changeLabel="vs first session"
            icon={<Activity className="h-6 w-6" />}
            gradient="from-purple-500 to-violet-500"
          />
        </motion.div>
      </motion.div>

      {/* Treatment Progress Charts */}
      {myRecords.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ChartCard
              title="Pain Level Progress"
              description="Pain levels before and after each session"
              type="line"
              data={painChartData}
              dataKeys={["before", "after"]}
              xAxisKey="session"
              colors={["#ef4444", "#22c55e"]}
              height={250}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ChartCard
              title="Mobility Score Trend"
              description="Your mobility improvement over sessions"
              type="area"
              data={mobilityChartData}
              dataKeys={["score"]}
              xAxisKey="session"
              colors={["hsl(var(--chart-2))"]}
              height={250}
            />
          </motion.div>
        </div>
      )}

      {/* Current Treatment Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <CardTitle className="text-base">
                Current Treatment Plan
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeTreatments.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.08 }}
                  className="p-4 rounded-lg border bg-muted/30 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-semibold">{plan.name}</h4>
                    <Stethoscope className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {plan.sessions}
                  </p>
                  <Progress value={plan.progress} className="h-2" />
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    Next: {formatDate(plan.next)}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Appointments Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">My Appointments</CardTitle>
                <TabsList>
                  <TabsTrigger value="upcoming">
                    Upcoming ({upcomingAppointments.length})
                  </TabsTrigger>
                  <TabsTrigger value="past">
                    Past ({pastAppointments.length})
                  </TabsTrigger>
                </TabsList>
              </div>

              <CardContent className="px-0 pt-4">
                <TabsContent value="upcoming" className="mt-0">
                  {upcomingAppointments.length > 0 ? (
                    <div className="space-y-3">
                      {upcomingAppointments.map((apt, index) => (
                        <motion.div
                          key={apt.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="capitalize">
                                {apt.type.replace("_", " ")}
                              </Badge>
                              <StatusBadge status={apt.status} />
                            </div>
                            <p className="text-sm font-medium mt-1">
                              with {apt.therapistName}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(apt.date)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {apt.time} ({apt.duration} min)
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold">
                              {formatCurrency(apt.fee)}
                            </p>
                            <Button variant="ghost" size="sm" className="mt-1">
                              Reschedule
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Calendar className="h-10 w-10 mx-auto mb-3 opacity-40" />
                      <p className="text-sm">No upcoming appointments</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={() => setBookingOpen(true)}
                      >
                        Book Now
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="past" className="mt-0">
                  {pastAppointments.length > 0 ? (
                    <div className="space-y-3">
                      {pastAppointments.map((apt, index) => (
                        <motion.div
                          key={apt.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between p-4 rounded-lg border bg-card"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="capitalize">
                                {apt.type.replace("_", " ")}
                              </Badge>
                              <StatusBadge status={apt.status} />
                            </div>
                            <p className="text-sm font-medium mt-1">
                              with {apt.therapistName}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(apt.date)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {apt.time} ({apt.duration} min)
                              </span>
                            </div>
                            {apt.notes && (
                              <p className="text-xs text-muted-foreground mt-1 italic">
                                {apt.notes}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold">
                              {formatCurrency(apt.fee)}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <AlertCircle className="h-10 w-10 mx-auto mb-3 opacity-40" />
                      <p className="text-sm">No past appointments found</p>
                    </div>
                  )}
                </TabsContent>
              </CardContent>
            </Tabs>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Book Appointment FormSheet */}
      <FormSheet
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        title="Book New Appointment"
        description="Schedule a new physiotherapy or spa session"
      >
        <form onSubmit={handleBookAppointment} className="space-y-4">
          <div className="space-y-2">
            <Label>Treatment Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select treatment" />
              </SelectTrigger>
              <SelectContent>
                {treatments.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name} - {formatCurrency(t.price)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Preferred Therapist</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select therapist" />
              </SelectTrigger>
              <SelectContent>
                {therapists
                  .filter((t) => t.status === "available")
                  .map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name} - {t.specialization}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Preferred Date</Label>
              <Input type="date" required />
            </div>
            <div className="space-y-2">
              <Label>Preferred Time</Label>
              <Input type="time" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Session Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select session type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="physiotherapy">Physiotherapy</SelectItem>
                <SelectItem value="massage">Massage</SelectItem>
                <SelectItem value="acupuncture">Acupuncture</SelectItem>
                <SelectItem value="hydrotherapy">Hydrotherapy</SelectItem>
                <SelectItem value="spa_treatment">Spa Treatment</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Special Requests / Notes</Label>
            <Textarea placeholder="Any specific concerns or preferences..." />
          </div>
          <Separator />
          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1">
              Confirm Booking
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setBookingOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </FormSheet>
    </div>
  );
}
