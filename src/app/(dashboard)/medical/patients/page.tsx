"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { type ColumnDef } from "@tanstack/react-table";
import { Users, Eye } from "lucide-react";
import Link from "next/link";

import { PageHeader } from "@/components/shared/page-header";
import { DataTable, SortableHeader } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { patients, type Patient } from "@/data/medical";
import { getInitials, formatDate, getRelativeTime } from "@/lib/utils";

export default function MedicalPatientsPage() {
  const columns = useMemo<ColumnDef<Patient, unknown>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => <SortableHeader column={column} title="Patient" />,
        cell: ({ row }) => {
          const patient = row.original;
          return (
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  {getInitials(patient.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{patient.name}</p>
                <p className="text-xs text-muted-foreground">{patient.email}</p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "age",
        header: ({ column }) => <SortableHeader column={column} title="Age" />,
        cell: ({ row }) => (
          <span className="text-sm">{row.original.age} yrs</span>
        ),
      },
      {
        accessorKey: "gender",
        header: "Gender",
        cell: ({ row }) => (
          <span className="text-sm">{row.original.gender}</span>
        ),
      },
      {
        accessorKey: "bloodGroup",
        header: "Blood Group",
        cell: ({ row }) => (
          <Badge variant="outline" className="font-mono">
            {row.original.bloodGroup}
          </Badge>
        ),
      },
      {
        accessorKey: "conditions",
        header: "Conditions",
        cell: ({ row }) => {
          const conditions = row.original.conditions;
          if (conditions.length === 0) {
            return <span className="text-sm text-muted-foreground">None</span>;
          }
          return (
            <div className="flex flex-wrap gap-1">
              {conditions.slice(0, 2).map((c) => (
                <Badge key={c} variant="secondary" className="text-xs">
                  {c}
                </Badge>
              ))}
              {conditions.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{conditions.length - 2}
                </Badge>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "lastVisit",
        header: ({ column }) => <SortableHeader column={column} title="Last Visit" />,
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {getRelativeTime(row.original.lastVisit)}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/medical/patients/${row.original.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              View
            </Link>
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patients"
        description="Manage patient records and medical histories"
      >
        <Button asChild>
          <Link href="/medical/patients">
            <Users className="h-4 w-4 mr-2" />
            Add Patient
          </Link>
        </Button>
      </PageHeader>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <DataTable
          columns={columns}
          data={patients}
          searchKey="name"
          searchPlaceholder="Search patients..."
        />
      </motion.div>
    </div>
  );
}
