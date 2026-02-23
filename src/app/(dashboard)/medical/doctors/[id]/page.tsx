"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Phone,
  Star,
  Clock,
  IndianRupee,
  GraduationCap,
  Briefcase,
  Users,
  CalendarCheck,
  TrendingUp,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { StatsCard } from "@/components/shared/stats-card";
import { EmptyState } from "@/components/shared/empty-state";
import { ChartCard } from "@/components/shared/chart-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import {
  getDoctorById,
  medicalAppointments,
  doctorRatingTrend,
} from "@/data/medical";
import { getInitials, formatCurrency, formatDate } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DoctorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const doctorId = params.id as string;
  const doctor = getDoctorById(doctorId);

  if (!doctor) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" className="gap-2" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <EmptyState
          title="Doctor not found"
          description={`No doctor found with ID "${doctorId}".`}
          action={
            <Button onClick={() => router.push("/medical/doctors")}>
              Go to Doctors
            </Button>
          }
        />
      </div>
    );
  }

  const doctorAppointments = medicalAppointments.filter(
    (a) => a.doctorId === doctorId
  );
  const completedAppointments = doctorAppointments.filter(
    (a) => a.status === "completed"
  );
  const uniquePatients = new Set(doctorAppointments.map((a) => a.patientId)).size;
  const todayAppointments = doctorAppointments.filter(
    (a) => a.date === "2026-02-23"
  );

  const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Back Button */}
      <Button variant="ghost" className="gap-2 -ml-2" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" />
        Back to Doctors
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
                  {getInitials(doctor.name.replace("Dr. ", ""))}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">{doctor.name}</h2>
                  <StatusBadge status={doctor.status} />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{doctor.specialization}</Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {doctor.rating}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GraduationCap className="h-4 w-4" />
                    {doctor.qualification}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    {doctor.experience} years experience
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {doctor.email}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {doctor.phone}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <IndianRupee className="h-4 w-4 text-emerald-500" />
                  <span className="font-medium">
                    Consultation Fee: {formatCurrency(doctor.consultationFee)}
                  </span>
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
            title="Total Consultations"
            value={completedAppointments.length}
            icon={<CalendarCheck className="h-6 w-6" />}
            gradient="from-blue-500 to-cyan-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Unique Patients"
            value={uniquePatients}
            icon={<Users className="h-6 w-6" />}
            gradient="from-emerald-500 to-green-600"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Today's Appointments"
            value={todayAppointments.length}
            icon={<Clock className="h-6 w-6" />}
            gradient="from-amber-500 to-orange-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Rating"
            value={`${doctor.rating}/5.0`}
            icon={<Star className="h-6 w-6" />}
            gradient="from-purple-500 to-violet-500"
          />
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Weekly Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {dayOrder.map((day) => (
                <div
                  key={day}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <span className="text-sm font-medium w-24">{day}</span>
                  {doctor.schedule[day] ? (
                    <Badge variant="outline">{doctor.schedule[day]}</Badge>
                  ) : (
                    <Badge variant="secondary">Off</Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Rating Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ChartCard
            title="Rating Trend"
            description="Doctor rating over the last 6 months"
            type="line"
            data={doctorRatingTrend}
            dataKeys={["rating"]}
            xAxisKey="month"
            colors={["#f59e0b"]}
            height={300}
          />
        </motion.div>
      </div>

      {/* Recent Patients from Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4" />
              Recent Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {doctorAppointments
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 10)
                .map((apt, index) => (
                  <motion.div
                    key={apt.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.03 }}
                    className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {getInitials(apt.patientName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{apt.patientName}</p>
                        <p className="text-xs text-muted-foreground">{apt.notes}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-right">
                      <div>
                        <p className="text-xs text-muted-foreground">{formatDate(apt.date)}</p>
                        <p className="text-xs text-muted-foreground">{apt.time}</p>
                      </div>
                      <StatusBadge status={apt.status} />
                    </div>
                  </motion.div>
                ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
