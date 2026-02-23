"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  Calendar,
  Clock,
  Dumbbell,
  TrendingUp,
  UserCheck,
  Check,
  AlertTriangle,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

import { gymMembers, membershipPlans, attendanceRecords, planColors } from "@/data/gym";
import { formatCurrency, formatDate } from "@/lib/utils";

// Simulating current logged-in member
const currentMember = gymMembers[0]; // Aarav Sharma - Platinum

export default function MyMembershipPage() {
  const plan = membershipPlans.find((p) => p.name === currentMember.plan);
  const myAttendance = attendanceRecords.filter((r) => r.memberId === currentMember.id);
  const daysUntilExpiry = Math.ceil(
    (new Date(currentMember.planExpiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  const memberSince = Math.ceil(
    (new Date().getTime() - new Date(currentMember.joinDate).getTime()) / (1000 * 60 * 60 * 24 * 30)
  );

  const thisMonthVisits = 18; // simulated
  const targetVisits = 25;
  const visitProgress = (thisMonthVisits / targetVisits) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <PageHeader
        title="My Membership"
        description="View your membership details, plan info, and attendance summary"
      />

      {/* Current Plan Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">{currentMember.name}</h2>
                  <Badge variant="outline" className={planColors[currentMember.plan]}>
                    <CreditCard className="h-3 w-3 mr-1" />
                    {currentMember.plan} Plan
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Member since {formatDate(currentMember.joinDate)} ({memberSince} months)
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{plan ? formatCurrency(plan.price) : "N/A"}</p>
                <p className="text-sm text-muted-foreground">per month</p>
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
          value={currentMember.totalVisits}
          change={12}
          changeLabel="this month"
          icon={<Dumbbell className="h-6 w-6" />}
          gradient="from-blue-500 to-cyan-500"
        />
        <StatsCard
          title="This Month"
          value={thisMonthVisits}
          icon={<TrendingUp className="h-6 w-6" />}
          gradient="from-emerald-500 to-green-600"
        />
        <StatsCard
          title="Days Remaining"
          value={daysUntilExpiry > 0 ? daysUntilExpiry : 0}
          icon={<Calendar className="h-6 w-6" />}
          gradient="from-amber-500 to-orange-500"
        />
        <StatsCard
          title="Avg/Week"
          value="4.2"
          icon={<Clock className="h-6 w-6" />}
          gradient="from-purple-500 to-violet-500"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plan Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Plan Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { label: "Plan", value: currentMember.plan },
                  { label: "Status", value: currentMember.status },
                  { label: "Expires", value: formatDate(currentMember.planExpiry) },
                  { label: "Monthly Fee", value: plan ? formatCurrency(plan.price) : "N/A" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>

              {daysUntilExpiry <= 30 && daysUntilExpiry > 0 && (
                <>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <span>Your plan expires in {daysUntilExpiry} days. Renew now to continue uninterrupted access.</span>
                  </div>
                  <Button className="w-full">Renew Membership</Button>
                </>
              )}

              {plan && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium mb-3">Your Plan Features</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Attendance Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                Attendance Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Monthly Target */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Monthly Goal</span>
                  <span className="font-medium">{thisMonthVisits}/{targetVisits} visits</span>
                </div>
                <Progress value={visitProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {targetVisits - thisMonthVisits > 0
                    ? `${targetVisits - thisMonthVisits} more visits to reach your monthly goal`
                    : "You have reached your monthly goal!"}
                </p>
              </div>

              <Separator />

              {/* Weekly Breakdown */}
              <div>
                <p className="text-sm font-medium mb-3">This Week</p>
                <div className="grid grid-cols-7 gap-1">
                  {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => {
                    const visited = i < 5 && i !== 2; // simulated
                    return (
                      <div key={i} className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">{day}</p>
                        <div
                          className={`h-8 w-8 mx-auto rounded-lg flex items-center justify-center ${
                            visited
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {visited ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <span className="text-xs">-</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Separator />

              {/* Recent Check-ins */}
              <div>
                <p className="text-sm font-medium mb-3">Recent Check-ins</p>
                <div className="space-y-2">
                  {myAttendance.slice(0, 3).map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{formatDate(record.date)}</span>
                      </div>
                      <span className="text-muted-foreground">
                        {new Date(record.checkIn).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {record.checkOut && (
                          <span>
                            {" - "}
                            {new Date(record.checkOut).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                  {myAttendance.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No attendance records found
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
