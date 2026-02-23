"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { type ColumnDef } from "@tanstack/react-table";
import { Users, Eye, MoreHorizontal } from "lucide-react";
import Link from "next/link";

import { PageHeader } from "@/components/shared/page-header";
import { DataTable, SortableHeader } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { residents, type Resident } from "@/data/dormitories";
import { getInitials, formatDate } from "@/lib/utils";

export default function ResidentsPage() {
  const columns = useMemo<ColumnDef<Resident, unknown>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => <SortableHeader column={column} title="Name" />,
        cell: ({ row }) => {
          const resident = row.original;
          return (
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  {getInitials(resident.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{resident.name}</p>
                <p className="text-xs text-muted-foreground">{resident.email}</p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "roomNumber",
        header: ({ column }) => <SortableHeader column={column} title="Room" />,
        cell: ({ row }) => (
          <Link
            href={`/dormitories/rooms/${row.original.roomId}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            {row.original.roomNumber}
          </Link>
        ),
      },
      {
        accessorKey: "buildingName",
        header: ({ column }) => <SortableHeader column={column} title="Building" />,
        cell: ({ row }) => (
          <span className="text-sm">{row.original.buildingName}</span>
        ),
      },
      {
        accessorKey: "department",
        header: ({ column }) => <SortableHeader column={column} title="Department" />,
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">{row.original.department}</span>
        ),
      },
      {
        accessorKey: "joinDate",
        header: ({ column }) => <SortableHeader column={column} title="Join Date" />,
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">{formatDate(row.original.joinDate)}</span>
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
        cell: ({ row }) => {
          const resident = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/dormitories/rooms/${resident.roomId}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Room
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <PageHeader title="Residents" description="Manage dormitory residents and their room assignments">
        <Button>
          <Users className="h-4 w-4 mr-2" />
          Add Resident
        </Button>
      </PageHeader>

      <DataTable
        columns={columns}
        data={residents}
        searchKey="name"
        searchPlaceholder="Search residents by name..."
        pageSize={10}
      />
    </motion.div>
  );
}
