"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Megaphone, AlertTriangle, Info, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { FormSheet } from "@/components/shared/form-sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getRelativeTime } from "@/lib/utils";

interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: "low" | "medium" | "high" | "urgent";
  author: string;
  targetDepartments: string[] | "all";
  createdAt: string;
  status: "active" | "expired" | "draft";
}

const announcements: Announcement[] = [
  { id: "a1", title: "Annual Sports Day 2026", content: "The Annual Sports Day will be held on January 15, 2026. All departments are requested to submit their team rosters by January 5.", priority: "high", author: "Rajesh Kumar", targetDepartments: "all", createdAt: "2025-12-20T10:00:00", status: "active" },
  { id: "a2", title: "Gym Equipment Upgrade", content: "New cardio equipment will be installed in the gym from December 25-27. The gym will be partially closed during this period.", priority: "medium", author: "Vikram Singh", targetDepartments: ["gym"], createdAt: "2025-12-19T14:30:00", status: "active" },
  { id: "a3", title: "Holiday Schedule Update", content: "The campus will follow a modified schedule during the holiday season (Dec 24 - Jan 2). Please check with your department heads for details.", priority: "high", author: "Sunita Venkataraman", targetDepartments: "all", createdAt: "2025-12-18T09:00:00", status: "active" },
  { id: "a4", title: "Medical Centre - New Doctor", content: "Dr. Anil Kapoor (Orthopedic Specialist) will be joining the Medical Centre starting January 3, 2026.", priority: "medium", author: "Dr. Priya Sharma", targetDepartments: ["medical"], createdAt: "2025-12-17T11:00:00", status: "active" },
  { id: "a5", title: "Canteen Menu Revision", content: "The canteen menu has been updated with new healthy options. The revised menu will be effective from January 1, 2026.", priority: "low", author: "Dinesh Choudhary", targetDepartments: ["canteen"], createdAt: "2025-12-16T16:00:00", status: "active" },
  { id: "a6", title: "Fire Safety Drill", content: "A mandatory fire safety drill will be conducted on December 28 at 11:00 AM. All staff and residents must participate.", priority: "urgent", author: "Rajesh Kumar", targetDepartments: "all", createdAt: "2025-12-15T10:00:00", status: "active" },
  { id: "a7", title: "Swimming Pool Maintenance", content: "The swimming pool will be closed for maintenance from December 22-24. We apologize for the inconvenience.", priority: "medium", author: "Suresh Reddy", targetDepartments: ["sports"], createdAt: "2025-12-14T13:00:00", status: "active" },
  { id: "a8", title: "Dormitory Inspection Schedule", content: "Quarterly dormitory inspection will be conducted from January 8-10. Please ensure rooms are maintained.", priority: "medium", author: "Meena Kumari", targetDepartments: ["dormitories"], createdAt: "2025-12-13T09:30:00", status: "active" },
  { id: "a9", title: "Budget Submission Deadline", content: "All department heads must submit their Q1 2026 budget proposals by December 31, 2025.", priority: "high", author: "Anita Desai", targetDepartments: "all", createdAt: "2025-12-12T10:00:00", status: "active" },
  { id: "a10", title: "Staff Training Workshop", content: "A workshop on 'Digital Tools for Department Management' will be held on January 5. Registration is open.", priority: "low", author: "Sunita Venkataraman", targetDepartments: "all", createdAt: "2025-12-11T14:00:00", status: "active" },
];

const priorityConfig = {
  low: { icon: Info, color: "text-blue-500", bg: "bg-blue-500/10", badge: "info" as const },
  medium: { icon: CheckCircle, color: "text-amber-500", bg: "bg-amber-500/10", badge: "warning" as const },
  high: { icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-500/10", badge: "warning" as const },
  urgent: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10", badge: "destructive" as const },
};

export default function AnnouncementsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? announcements : announcements.filter((a) => a.priority === filter);

  return (
    <div className="space-y-6">
      <PageHeader title="Announcements" description="Create and manage announcements for departments">
        <Button onClick={() => setShowCreate(true)} className="gap-2">
          <Plus className="h-4 w-4" /> New Announcement
        </Button>
      </PageHeader>

      <div className="flex gap-2">
        {["all", "urgent", "high", "medium", "low"].map((p) => (
          <Button key={p} variant={filter === p ? "default" : "outline"} size="sm" onClick={() => setFilter(p)} className="capitalize text-xs">
            {p}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((announcement, index) => {
          const config = priorityConfig[announcement.priority];
          const Icon = config.icon;
          return (
            <motion.div key={announcement.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex gap-4">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${config.bg} shrink-0`}>
                      <Icon className={`h-5 w-5 ${config.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-sm">{announcement.title}</h3>
                        <Badge variant={config.badge} className="shrink-0 capitalize">{announcement.priority}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{announcement.content}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>By {announcement.author}</span>
                        <span>·</span>
                        <span>{getRelativeTime(announcement.createdAt)}</span>
                        <span>·</span>
                        <span>{announcement.targetDepartments === "all" ? "All Departments" : (announcement.targetDepartments as string[]).join(", ")}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <FormSheet open={showCreate} onOpenChange={setShowCreate} title="New Announcement" description="Create a new announcement for departments">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Announcement created!"); setShowCreate(false); }}>
          <div className="space-y-2">
            <Label>Title</Label>
            <Input placeholder="Announcement title" />
          </div>
          <div className="space-y-2">
            <Label>Content</Label>
            <Textarea placeholder="Write your announcement..." rows={4} />
          </div>
          <div className="space-y-2">
            <Label>Priority</Label>
            <Select defaultValue="medium">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Target</Label>
            <Select defaultValue="all">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="gym">Gym</SelectItem>
                <SelectItem value="medical">Medical Centre</SelectItem>
                <SelectItem value="sports">Sports Facilities</SelectItem>
                <SelectItem value="canteen">Canteen</SelectItem>
                <SelectItem value="dormitories">Dormitories</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">Create Announcement</Button>
        </form>
      </FormSheet>
    </div>
  );
}
