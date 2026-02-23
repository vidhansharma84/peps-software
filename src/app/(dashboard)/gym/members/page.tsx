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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { gymMembers, planColors, type GymMember } from "@/data/gym";
import { getInitials, formatDate, getRelativeTime } from "@/lib/utils";

export default function GymMembersPage() {
  const columns = useMemo<ColumnDef<GymMember, unknown>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => <SortableHeader column={column} title="Member" />,
        cell: ({ row }) => {
          const member = row.original;
          return (
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.email}</p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "plan",
        header: ({ column }) => <SortableHeader column={column} title="Plan" />,
        cell: ({ row }) => {
          const plan = row.original.plan;
          return (
            <Badge variant="outline" className={planColors[plan]}>
              {plan}
            </Badge>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
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
        accessorKey: "totalVisits",
        header: ({ column }) => <SortableHeader column={column} title="Total Visits" />,
        cell: ({ row }) => (
          <span className="text-sm font-medium">{row.original.totalVisits}</span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const member = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/gym/members/${member.id}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Profile
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
      <PageHeader title="Gym Members" description="Manage all gym memberships and member profiles">
        <Button>
          <Users className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </PageHeader>

      <DataTable
        columns={columns}
        data={gymMembers}
        searchKey="name"
        searchPlaceholder="Search members by name..."
        pageSize={10}
      />
    </motion.div>
  );
}
