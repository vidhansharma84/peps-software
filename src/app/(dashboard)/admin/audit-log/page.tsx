"use client";

import { motion } from "framer-motion";
import { type ColumnDef } from "@tanstack/react-table";
import { FileText, Shield, Download } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { DataTable, SortableHeader } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateTime, getInitials } from "@/lib/utils";
import { toast } from "sonner";

interface AuditEntry {
  id: string;
  userName: string;
  userRole: string;
  action: string;
  resource: string;
  department: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}

const auditData: AuditEntry[] = [
  { id: "al-001", userName: "Rajesh Krishnamurthy", userRole: "Super Admin", action: "Updated", resource: "System Settings", department: "Admin", details: "Changed session timeout from 30 to 60 minutes", ipAddress: "192.168.1.10", timestamp: "2025-12-20T15:30:00" },
  { id: "al-002", userName: "Arjun Malhotra", userRole: "Dept. Head", action: "Approved", resource: "Membership Plan", department: "Gym", details: "Approved new Premium Annual membership plan", ipAddress: "192.168.1.45", timestamp: "2025-12-20T14:22:00" },
  { id: "al-003", userName: "Dr. Meera Iyer", userRole: "Dept. Head", action: "Updated", resource: "Member Profile", department: "Physio", details: "Updated treatment plan for patient #P-234", ipAddress: "192.168.2.12", timestamp: "2025-12-20T13:15:00" },
  { id: "al-004", userName: "Deepak Tiwari", userRole: "Manager", action: "Created", resource: "Booking", department: "Gym", details: "Created group class booking for Yoga Basics", ipAddress: "192.168.1.46", timestamp: "2025-12-20T12:00:00" },
  { id: "al-005", userName: "Kavitha Naidu", userRole: "Dept. Head", action: "Approved", resource: "Booking", department: "Sports", details: "Approved booking for Cricket Ground - Jan 15", ipAddress: "192.168.3.20", timestamp: "2025-12-20T11:45:00" },
  { id: "al-006", userName: "Sunita Venkataraman", userRole: "Super Admin", action: "Created", resource: "User Account", department: "Admin", details: "Created new staff account for Priya Singh", ipAddress: "192.168.1.11", timestamp: "2025-12-20T11:30:00" },
  { id: "al-007", userName: "Balaji Murugan", userRole: "Dept. Head", action: "Updated", resource: "Menu Item", department: "Canteen", details: "Updated price for South Indian Thali from 120 to 140", ipAddress: "192.168.4.15", timestamp: "2025-12-20T10:50:00" },
  { id: "al-008", userName: "Dr. Vikram Rao", userRole: "Dept. Head", action: "Created", resource: "Prescription", department: "Medical", details: "Issued prescription #RX-4521 for patient Rahul M.", ipAddress: "192.168.2.30", timestamp: "2025-12-20T10:20:00" },
  { id: "al-009", userName: "Pradeep Sharma", userRole: "Dept. Head", action: "Updated", resource: "Room Status", department: "Dormitories", details: "Marked Room 204B as under maintenance", ipAddress: "192.168.5.10", timestamp: "2025-12-20T09:45:00" },
  { id: "al-010", userName: "Lakshmi Sundaram", userRole: "Dept. Head", action: "Created", resource: "Event", department: "Conference", details: "Created event: Annual Sports Day Planning Meet", ipAddress: "192.168.6.22", timestamp: "2025-12-20T09:30:00" },
  { id: "al-011", userName: "Harpreet Singh", userRole: "Dept. Head", action: "Updated", resource: "Coach Schedule", department: "Coaches", details: "Updated weekly schedule for Coach Anil Kapoor", ipAddress: "192.168.7.18", timestamp: "2025-12-19T17:00:00" },
  { id: "al-012", userName: "Anitha Ramachandran", userRole: "Dept. Head", action: "Approved", resource: "Invoice", department: "Finance", details: "Approved vendor invoice #INV-2025-890 for equipment", ipAddress: "192.168.8.14", timestamp: "2025-12-19T16:30:00" },
  { id: "al-013", userName: "Nisha Pillai", userRole: "Manager", action: "Deleted", resource: "Expired Membership", department: "Gym", details: "Removed 12 expired trial memberships from system", ipAddress: "192.168.1.47", timestamp: "2025-12-19T15:45:00" },
  { id: "al-014", userName: "Ravi Shankar", userRole: "Manager", action: "Updated", resource: "Appointment", department: "Physio", details: "Rescheduled appointment #A-678 to Dec 22", ipAddress: "192.168.2.13", timestamp: "2025-12-19T15:00:00" },
  { id: "al-015", userName: "Manoj Kumar", userRole: "Manager", action: "Created", resource: "Tournament", department: "Sports", details: "Created Inter-Department Badminton Tournament 2026", ipAddress: "192.168.3.21", timestamp: "2025-12-19T14:20:00" },
  { id: "al-016", userName: "Rajesh Krishnamurthy", userRole: "Super Admin", action: "Updated", resource: "Role Permissions", department: "Admin", details: "Updated manager permissions for Finance department", ipAddress: "192.168.1.10", timestamp: "2025-12-19T13:50:00" },
  { id: "al-017", userName: "Ganesh Nair", userRole: "Manager", action: "Updated", resource: "Inventory", department: "Canteen", details: "Updated stock levels for rice and cooking oil", ipAddress: "192.168.4.16", timestamp: "2025-12-19T12:30:00" },
  { id: "al-018", userName: "Dr. Arun Patel", userRole: "Manager", action: "Created", resource: "Lab Report", department: "Medical", details: "Generated lab report for blood work #LR-9012", ipAddress: "192.168.2.31", timestamp: "2025-12-19T11:15:00" },
  { id: "al-019", userName: "Suresh Babu", userRole: "Manager", action: "Approved", resource: "Visitor Pass", department: "Dormitories", details: "Approved visitor pass for Room 112A resident", ipAddress: "192.168.5.11", timestamp: "2025-12-19T10:45:00" },
  { id: "al-020", userName: "Karthik Rangan", userRole: "Manager", action: "Updated", resource: "Room Setup", department: "Conference", details: "Changed setup for Hall B from theater to boardroom", ipAddress: "192.168.6.23", timestamp: "2025-12-19T10:00:00" },
  { id: "al-021", userName: "Anil Kapoor", userRole: "Manager", action: "Created", resource: "Training Plan", department: "Coaches", details: "Created 8-week training plan for junior athletes", ipAddress: "192.168.7.19", timestamp: "2025-12-18T16:30:00" },
  { id: "al-022", userName: "Prasad Gupta", userRole: "Manager", action: "Created", resource: "Budget Report", department: "Finance", details: "Generated Q4 2025 department-wise budget report", ipAddress: "192.168.8.15", timestamp: "2025-12-18T15:20:00" },
  { id: "al-023", userName: "Sanjay Kulkarni", userRole: "Dept. Head", action: "Updated", resource: "Announcement", department: "Management", details: "Published holiday schedule for Jan 2026", ipAddress: "192.168.9.10", timestamp: "2025-12-18T14:00:00" },
  { id: "al-024", userName: "Sunita Venkataraman", userRole: "Super Admin", action: "Deleted", resource: "User Account", department: "Admin", details: "Deactivated account for resigned staff member", ipAddress: "192.168.1.11", timestamp: "2025-12-18T13:30:00" },
  { id: "al-025", userName: "Ramesh Yadav", userRole: "Staff", action: "Updated", resource: "Equipment", department: "Gym", details: "Logged maintenance for Treadmill #T-05", ipAddress: "192.168.1.50", timestamp: "2025-12-18T12:00:00" },
  { id: "al-026", userName: "Shweta Patil", userRole: "Staff", action: "Created", resource: "Appointment", department: "Physio", details: "Booked new appointment slot for patient #P-301", ipAddress: "192.168.2.14", timestamp: "2025-12-18T11:30:00" },
  { id: "al-027", userName: "Geeta Bhandari", userRole: "Staff", action: "Updated", resource: "Patient Record", department: "Medical", details: "Updated vitals for patient #P-189", ipAddress: "192.168.2.32", timestamp: "2025-12-18T10:15:00" },
  { id: "al-028", userName: "Vinod Thakur", userRole: "Staff", action: "Updated", resource: "Facility", department: "Sports", details: "Marked Tennis Court 2 as available after repair", ipAddress: "192.168.3.22", timestamp: "2025-12-17T16:45:00" },
  { id: "al-029", userName: "Raghunath Shetty", userRole: "Staff", action: "Created", resource: "POS Order", department: "Canteen", details: "Processed bulk order #BO-456 for event catering", ipAddress: "192.168.4.17", timestamp: "2025-12-17T15:30:00" },
  { id: "al-030", userName: "Jyoti Kaur", userRole: "Staff", action: "Updated", resource: "Booking", department: "Conference", details: "Confirmed AV equipment for Main Hall booking", ipAddress: "192.168.6.24", timestamp: "2025-12-17T14:10:00" },
  { id: "al-031", userName: "Dinesh Chauhan", userRole: "Staff", action: "Updated", resource: "Athlete Record", department: "Coaches", details: "Updated performance metrics for athlete #A-045", ipAddress: "192.168.7.20", timestamp: "2025-12-17T13:00:00" },
  { id: "al-032", userName: "Usha Maheshwari", userRole: "Staff", action: "Created", resource: "Transaction", department: "Finance", details: "Recorded payment receipt #PR-2025-1234", ipAddress: "192.168.8.16", timestamp: "2025-12-17T11:40:00" },
  { id: "al-033", userName: "Ashok Pandey", userRole: "Staff", action: "Created", resource: "Maintenance Request", department: "Dormitories", details: "Submitted plumbing repair request for Block C", ipAddress: "192.168.5.12", timestamp: "2025-12-17T10:20:00" },
  { id: "al-034", userName: "Rajesh Krishnamurthy", userRole: "Super Admin", action: "Updated", resource: "Security Settings", department: "Admin", details: "Enabled two-factor authentication requirement", ipAddress: "192.168.1.10", timestamp: "2025-12-16T17:00:00" },
  { id: "al-035", userName: "Vivek Mishra", userRole: "Manager", action: "Created", resource: "Report", department: "Management", details: "Generated staff attendance summary for December", ipAddress: "192.168.9.11", timestamp: "2025-12-16T15:30:00" },
];

const actionColorMap: Record<string, string> = {
  Created: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  Updated: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  Deleted: "bg-red-500/10 text-red-700 dark:text-red-400",
  Approved: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
};

const columns: ColumnDef<AuditEntry>[] = [
  {
    accessorKey: "userName",
    header: ({ column }) => <SortableHeader column={column} title="User" />,
    cell: ({ row }) => {
      const entry = row.original;
      return (
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground text-[10px] font-semibold shrink-0">
            {getInitials(entry.userName)}
          </div>
          <div>
            <p className="text-sm font-medium leading-tight">{entry.userName}</p>
            <p className="text-[11px] text-muted-foreground">{entry.userRole}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const action = row.getValue("action") as string;
      return (
        <Badge
          variant="outline"
          className={`${actionColorMap[action] || ""} border-none font-medium`}
        >
          {action}
        </Badge>
      );
    },
  },
  {
    accessorKey: "resource",
    header: "Resource",
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.getValue("resource")}</span>
    ),
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => (
      <Badge variant="secondary" className="text-xs">
        {row.getValue("department")}
      </Badge>
    ),
  },
  {
    accessorKey: "details",
    header: "Details",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground line-clamp-1 max-w-[280px]">
        {row.getValue("details")}
      </span>
    ),
  },
  {
    accessorKey: "ipAddress",
    header: "IP Address",
    cell: ({ row }) => (
      <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
        {row.getValue("ipAddress")}
      </code>
    ),
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => <SortableHeader column={column} title="Timestamp" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground whitespace-nowrap">
        {formatDateTime(row.getValue("timestamp"))}
      </span>
    ),
  },
];

export default function AuditLogPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <PageHeader
        title="Audit Log"
        description="Track all actions and changes made across the system."
      >
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => toast.success("Audit log exported! (Demo)")}
        >
          <Download className="h-4 w-4" />
          Export Log
        </Button>
      </PageHeader>

      <DataTable
        columns={columns}
        data={auditData}
        searchKey="userName"
        searchPlaceholder="Search by user name..."
        showExport={false}
        pageSize={10}
      />
    </motion.div>
  );
}
