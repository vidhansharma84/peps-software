"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  TrendingUp,
  Star,
  IndianRupee,
  ArrowUpRight,
  Percent,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import { DEPARTMENTS } from "@/lib/constants";
import { departmentStats } from "@/data/departments";
import { formatCurrency } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DepartmentsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <PageHeader
        title="Departments"
        description="Overview of all 10 departments in the organization."
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        {DEPARTMENTS.map((dept) => {
          const stats = departmentStats.find((s) => s.slug === dept.slug);

          return (
            <motion.div key={dept.slug} variants={item}>
              <Link href={`/${dept.slug}`}>
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border hover:border-primary/20">
                  {/* Gradient Accent Bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${dept.gradient}`} />

                  <CardContent className="p-5 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-11 w-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${dept.gradient} text-white font-bold text-sm shadow-md`}
                        >
                          {dept.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                            {dept.name}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {dept.description}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="h-3 w-3" />
                          Staff
                        </div>
                        <p className="text-lg font-bold">{stats?.staffCount ?? dept.staffCount}</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="h-3 w-3" />
                          Members
                        </div>
                        <p className="text-lg font-bold">
                          {(stats?.memberCount ?? dept.memberCount).toLocaleString()}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <IndianRupee className="h-3 w-3" />
                          Revenue
                        </div>
                        <p className="text-sm font-semibold">
                          {stats && stats.revenue > 0
                            ? formatCurrency(stats.revenue)
                            : "--"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="h-3 w-3" />
                          Rating
                        </div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-semibold">
                            {stats?.satisfaction.toFixed(1) ?? "--"}
                          </p>
                          {stats && (
                            <Badge
                              variant={
                                stats.satisfaction >= 4.0
                                  ? "success"
                                  : stats.satisfaction >= 3.5
                                  ? "warning"
                                  : "destructive"
                              }
                              className="text-[10px] px-1.5 py-0"
                            >
                              / 5
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Occupancy Bar */}
                    {stats && (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Percent className="h-3 w-3" />
                            Occupancy
                          </span>
                          <span className="font-medium">{stats.occupancy}%</span>
                        </div>
                        <Progress value={stats.occupancy} className="h-1.5" />
                      </div>
                    )}

                    {/* Growth */}
                    {stats && stats.monthlyGrowth > 0 && (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-600">
                        <TrendingUp className="h-3 w-3" />
                        <span className="font-medium">+{stats.monthlyGrowth}%</span>
                        <span className="text-muted-foreground">monthly growth</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
