"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Phone,
  Mail,
  Award,
  Clock,
  CheckCircle,
  Calendar,
  TrendingUp,
  Users,
  MessageSquare,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { ChartCard } from "@/components/shared/chart-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  getTherapistById,
  getAppointmentsByTherapist,
  therapistPerformance,
} from "@/data/physio";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// Sample patient feedback
const feedbackData = [
  {
    id: "F001",
    patientName: "Aarav Gupta",
    rating: 5,
    comment:
      "Exceptional treatment. My back pain has reduced significantly after just 3 sessions.",
    date: "2026-02-20",
  },
  {
    id: "F002",
    patientName: "Sneha Joshi",
    rating: 5,
    comment:
      "Very professional and thorough. Explains every step of the treatment clearly.",
    date: "2026-02-18",
  },
  {
    id: "F003",
    patientName: "Rohan Mehta",
    rating: 4,
    comment:
      "Good therapy sessions. Helped me recover from my sports injury faster than expected.",
    date: "2026-02-15",
  },
  {
    id: "F004",
    patientName: "Meera Pillai",
    rating: 5,
    comment:
      "Highly recommend! Knowledgeable and empathetic therapist who genuinely cares about patient well-being.",
    date: "2026-02-12",
  },
  {
    id: "F005",
    patientName: "Vivek Choudhary",
    rating: 4,
    comment:
      "Consistent improvement with every visit. The exercise plans are very helpful.",
    date: "2026-02-08",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

export default function TherapistProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const therapist = getTherapistById(id);
  const therapistAppointments = getAppointmentsByTherapist(id);

  if (!therapist) {
    return (
      <div className="space-y-6">
        <PageHeader title="Therapist Not Found">
          <Button asChild variant="outline">
            <Link href="/physio/therapists">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Therapists
            </Link>
          </Button>
        </PageHeader>
        <EmptyState
          title="Therapist not found"
          description="The therapist you are looking for does not exist or has been removed."
        />
      </div>
    );
  }

  const completedSessions = therapistAppointments.filter(
    (a) => a.status === "completed"
  ).length;
  const upcomingSessions = therapistAppointments.filter(
    (a) => a.status === "scheduled"
  ).length;
  const totalRevenue = therapistAppointments
    .filter((a) => a.status === "completed")
    .reduce((sum, a) => sum + a.fee, 0);

  return (
    <div className="space-y-6">
      <PageHeader title={therapist.name} description={therapist.specialization}>
        <Button asChild variant="outline">
          <Link href="/physio/therapists">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Therapists
          </Link>
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <Avatar className="h-20 w-20 mx-auto">
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white">
                    {getInitials(therapist.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{therapist.name}</h2>
                  <p className="text-muted-foreground">
                    {therapist.specialization}
                  </p>
                  <div className="flex justify-center mt-2">
                    <StatusBadge status={therapist.status} />
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="flex items-center gap-1">
                    <StarRating rating={Math.floor(therapist.rating)} />
                    <span className="text-sm font-medium ml-1">
                      {therapist.rating}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span>{therapist.qualification}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{therapist.experience} years experience</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {therapist.sessionsCompleted.toLocaleString()} sessions
                      completed
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{therapist.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{therapist.email}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-semibold mb-2">
                    Specialization Details
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {therapist.specialization === "Sports Physiotherapy"
                      ? "Expert in treating sports-related injuries including ACL tears, rotator cuff injuries, and muscle strains. Uses evidence-based techniques for optimal recovery."
                      : therapist.specialization ===
                        "Orthopaedic Rehabilitation"
                      ? "Specializes in post-operative rehabilitation, joint replacement recovery, and managing chronic musculoskeletal conditions."
                      : therapist.specialization === "Therapeutic Massage"
                      ? "Certified in deep tissue, Swedish, and trigger point massage therapies. Focuses on pain relief and relaxation."
                      : therapist.specialization ===
                        "Acupuncture & Pain Management"
                      ? "Combines traditional acupuncture with modern pain management techniques for chronic pain and stress relief."
                      : `Experienced in ${therapist.specialization.toLowerCase()} with a holistic approach to patient care and recovery.`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Stats */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <motion.div variants={item}>
              <StatsCard
                title="Completed Sessions"
                value={completedSessions}
                icon={<CheckCircle className="h-5 w-5" />}
                gradient="from-emerald-500 to-green-600"
              />
            </motion.div>
            <motion.div variants={item}>
              <StatsCard
                title="Upcoming Sessions"
                value={upcomingSessions}
                icon={<Calendar className="h-5 w-5" />}
                gradient="from-blue-500 to-cyan-500"
              />
            </motion.div>
            <motion.div variants={item}>
              <StatsCard
                title="Revenue Generated"
                value={formatCurrency(totalRevenue)}
                icon={<TrendingUp className="h-5 w-5" />}
                gradient="from-amber-500 to-orange-500"
              />
            </motion.div>
          </motion.div>

          {/* Sessions Per Week Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ChartCard
              title="Sessions Per Week"
              description="Weekly session count over recent weeks"
              type="bar"
              data={therapistPerformance}
              dataKeys={["sessions"]}
              xAxisKey="week"
              colors={["hsl(var(--chart-2))"]}
              height={250}
            />
          </motion.div>

          {/* Appointment List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Recent Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {therapistAppointments.slice(0, 8).map((apt, index) => (
                    <motion.div
                      key={apt.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="flex items-center justify-between p-3 rounded-lg border bg-card"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs bg-primary/10">
                            {getInitials(apt.patientName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {apt.patientName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(apt.date)} at {apt.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize text-xs">
                          {apt.type.replace("_", " ")}
                        </Badge>
                        <StatusBadge status={apt.status} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Patient Feedback */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <CardTitle className="text-base">Patient Feedback</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedbackData.map((feedback, index) => (
                    <motion.div
                      key={feedback.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="p-4 rounded-lg border bg-muted/30"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className="text-xs bg-primary/10">
                              {getInitials(feedback.patientName)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">
                            {feedback.patientName}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(feedback.date)}
                        </span>
                      </div>
                      <StarRating rating={feedback.rating} />
                      <p className="text-sm text-muted-foreground mt-2">
                        {feedback.comment}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
