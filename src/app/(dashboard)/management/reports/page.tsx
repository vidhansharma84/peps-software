"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Calendar, BarChart3, PieChart, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { ChartCard } from "@/components/shared/chart-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { DEPARTMENTS } from "@/lib/constants";
import { departmentStats } from "@/data/departments";
import { formatCurrency } from "@/lib/utils";

const reportTemplates = [
  { id: "revenue", title: "Revenue Report", description: "Monthly revenue breakdown by department", icon: <TrendingUp className="h-5 w-5" />, color: "bg-emerald-500/10 text-emerald-500" },
  { id: "occupancy", title: "Occupancy Report", description: "Facility utilization across departments", icon: <BarChart3 className="h-5 w-5" />, color: "bg-blue-500/10 text-blue-500" },
  { id: "satisfaction", title: "Satisfaction Report", description: "Customer satisfaction survey results", icon: <PieChart className="h-5 w-5" />, color: "bg-purple-500/10 text-purple-500" },
  { id: "staff", title: "Staff Report", description: "Staff distribution and performance metrics", icon: <FileText className="h-5 w-5" />, color: "bg-amber-500/10 text-amber-500" },
];

const revenueByDept = departmentStats.filter((d) => d.revenue > 0).map((d) => {
  const dept = DEPARTMENTS.find((dep) => dep.slug === d.slug);
  return { name: dept?.name.split(" ")[0] || d.slug, value: d.revenue };
});

const occupancyByDept = departmentStats.map((d) => {
  const dept = DEPARTMENTS.find((dep) => dep.slug === d.slug);
  return { name: dept?.name.split(" ")[0] || d.slug, value: d.occupancy };
});

export default function ReportsPage() {
  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  return (
    <div className="space-y-6">
      <PageHeader title="Reports" description="Generate and download departmental reports">
        <Button variant="outline" className="gap-2" onClick={() => toast.success("Report downloaded!")}>
          <Download className="h-4 w-4" /> Download PDF
        </Button>
      </PageHeader>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Department</Label>
              <Select value={selectedDept} onValueChange={setSelectedDept}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {DEPARTMENTS.map((d) => <SelectItem key={d.slug} value={d.slug}>{d.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Period</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full gap-2" onClick={() => toast.success("Report generated!")}>
                <BarChart3 className="h-4 w-4" /> Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTemplates.map((template, index) => (
          <motion.div key={template.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => toast.success(`${template.title} generated!`)}>
              <CardContent className="pt-6">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${template.color} mb-3`}>
                  {template.icon}
                </div>
                <h3 className="font-semibold text-sm mb-1">{template.title}</h3>
                <p className="text-xs text-muted-foreground">{template.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Revenue Distribution" description="Revenue split by department" type="donut" data={revenueByDept} height={300} />
        <ChartCard title="Occupancy Rates" description="Facility utilization percentage" type="bar" data={occupancyByDept} dataKeys={["value"]} xAxisKey="name" colors={["#6366f1"]} height={300} />
      </div>
    </div>
  );
}
