"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Dumbbell,
  Clock,
  TrendingUp,
  CreditCard,
  Activity,
  UserCheck,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

import { getGymMemberById, planColors, membershipPlans, attendanceRecords } from "@/data/gym";
import { formatDate, getInitials, getRelativeTime, formatCurrency } from "@/lib/utils";

export default function GymMemberDetailPage() {
  const params = useParams();
  const router = useRouter();
  const memberId = params.id as string;
  const member = getGymMemberById(memberId);

  if (!member) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" className="gap-2" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <EmptyState
          title="Member not found"
          description={`No gym member found with ID "${memberId}".`}
          action={
            <Button onClick={() => router.push("/gym/members")}>
              Go to Members
            </Button>
          }
        />
      </div>
    );
  }

  const plan = membershipPlans.find((p) => p.name === member.plan);
  const memberAttendance = attendanceRecords.filter((r) => r.memberId === member.id);
  const daysUntilExpiry = Math.ceil(
    (new Date(member.planExpiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Back Button */}
      <Button variant="ghost" className="gap-2 -ml-2" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" />
        Back to Members
      </Button>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground text-2xl font-bold shrink-0">
                {getInitials(member.name)}
              </div>

              <div className="flex-1 space-y-3 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h2 className="text-xl font-bold">{member.name}</h2>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={member.status} />
                    <Badge variant="outline" className={planColors[member.plan]}>
                      <CreditCard className="h-3 w-3 mr-1" />
                      {member.plan} Plan
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4 shrink-0" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4 shrink-0" />
                    <span>Joined {formatDate(member.joinDate)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatsCard
          title="Total Visits"
          value={member.totalVisits}
          icon={<Dumbbell className="h-6 w-6" />}
          gradient="from-blue-500 to-cyan-500"
        />
        <StatsCard
          title="Last Visit"
          value={getRelativeTime(member.lastVisit)}
          icon={<Clock className="h-6 w-6" />}
          gradient="from-emerald-500 to-green-600"
        />
        <StatsCard
          title="Plan Expiry"
          value={`${daysUntilExpiry > 0 ? daysUntilExpiry : 0} days`}
          icon={<Calendar className="h-6 w-6" />}
          gradient="from-amber-500 to-orange-500"
        />
        <StatsCard
          title="Monthly Fee"
          value={plan ? formatCurrency(plan.price) : "N/A"}
          icon={<CreditCard className="h-6 w-6" />}
          gradient="from-purple-500 to-violet-500"
        />
      </motion.div>

      {/* Plan Info + Attendance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Plan Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Plan", value: member.plan },
                { label: "Status", value: member.status },
                { label: "Joined", value: formatDate(member.joinDate) },
                { label: "Expires", value: formatDate(member.planExpiry) },
                { label: "Monthly Fee", value: plan ? formatCurrency(plan.price) : "N/A" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}

              {plan && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium mb-2">Plan Features</p>
                    <ul className="space-y-1.5">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <UserCheck className="h-3.5 w-3.5 mt-0.5 text-emerald-500 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Attendance Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">This Month</span>
                  <span className="font-medium">{memberAttendance.length} visits</span>
                </div>
                <Progress value={Math.min((memberAttendance.length / 25) * 100, 100)} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Avg. Visits/Week</span>
                  <span className="font-medium">
                    {(member.totalVisits / Math.max(1, Math.ceil((new Date().getTime() - new Date(member.joinDate).getTime()) / (7 * 24 * 60 * 60 * 1000)))).toFixed(1)}
                  </span>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium mb-3">Recent Check-ins</p>
                {memberAttendance.length > 0 ? (
                  <div className="space-y-2">
                    {memberAttendance.slice(0, 5).map((record) => (
                      <div key={record.id} className="flex items-center justify-between text-sm p-2 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>
                            {new Date(record.checkIn).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                        <span className="text-muted-foreground">
                          {record.checkOut
                            ? new Date(record.checkOut).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
                            : "Still in gym"}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No recent attendance records</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
