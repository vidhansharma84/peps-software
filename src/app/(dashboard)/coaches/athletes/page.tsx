"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Eye, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable, SortableHeader } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { athletes, coaches } from "@/data/coaches";
import type { Athlete } from "@/data/coaches";

const levelVariant: Record<string, "success" | "info" | "warning" | "secondary"> = {
  elite: "success",
  advanced: "info",
  intermediate: "warning",
  beginner: "secondary",
};

const columns: ColumnDef<Athlete>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const athlete = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs bg-primary/10">
              {getInitials(athlete.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{athlete.name}</p>
            <p className="text-xs text-muted-foreground">Age: {athlete.age}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "sport",
    header: ({ column }) => <SortableHeader column={column} title="Sport" />,
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.sport}</Badge>
    ),
  },
  {
    accessorKey: "level",
    header: ({ column }) => <SortableHeader column={column} title="Level" />,
    cell: ({ row }) => (
      <Badge
        variant={levelVariant[row.original.level]}
        className="capitalize"
      >
        {row.original.level}
      </Badge>
    ),
  },
  {
    id: "coach",
    header: "Coach",
    cell: ({ row }) => {
      const coach = coaches.find((c) => c.id === row.original.coachId);
      return (
        <span className="text-sm">{coach?.name || "Unassigned"}</span>
      );
    },
  },
  {
    id: "personalBests",
    header: "Personal Bests",
    cell: ({ row }) => {
      const bests = Object.entries(row.original.personalBests);
      return (
        <div className="flex gap-1 flex-wrap">
          {bests.slice(0, 2).map(([key, val]) => (
            <Badge key={key} variant="secondary" className="text-[10px]">
              {key}: {val}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Link href={`/coaches/athletes/${row.original.id}`}>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Eye className="h-4 w-4" />
        </Button>
      </Link>
    ),
  },
];

export default function AthletesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Athletes"
        description={`${athletes.length} athletes across all sports`}
      />

      <DataTable
        columns={columns}
        data={athletes}
        searchKey="name"
        searchPlaceholder="Search athletes..."
        showExport
      />
    </div>
  );
}
