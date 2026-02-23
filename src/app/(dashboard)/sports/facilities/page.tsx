"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Landmark,
  MapPin,
  Users,
  IndianRupee,
  Search,
  Plus,
  Waves,
  CircleDot,
  LayoutGrid,
  Dumbbell,
} from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import { facilities } from "@/data/sports";
import type { Facility } from "@/data/sports";

const typeIcons: Record<Facility["type"], React.ReactNode> = {
  court: <LayoutGrid className="h-5 w-5" />,
  field: <CircleDot className="h-5 w-5" />,
  pool: <Waves className="h-5 w-5" />,
  track: <Dumbbell className="h-5 w-5" />,
  arena: <Landmark className="h-5 w-5" />,
};

const typeColors: Record<Facility["type"], string> = {
  court: "from-blue-500 to-cyan-500",
  field: "from-emerald-500 to-green-600",
  pool: "from-sky-500 to-blue-600",
  track: "from-orange-500 to-amber-500",
  arena: "from-purple-500 to-violet-500",
};

export default function FacilitiesPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = facilities.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.sport.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || f.type === typeFilter;
    const matchesStatus = statusFilter === "all" || f.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Sports Facilities" description="View and manage all sports facilities">
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Facility
        </Button>
      </PageHeader>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search facilities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="court">Court</SelectItem>
            <SelectItem value="field">Field</SelectItem>
            <SelectItem value="pool">Pool</SelectItem>
            <SelectItem value="track">Track</SelectItem>
            <SelectItem value="arena">Arena</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="booked">Booked</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((facility, index) => (
          <motion.div
            key={facility.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={`/sports/facilities/${facility.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="p-0">
                  <div
                    className={`h-24 bg-gradient-to-br ${typeColors[facility.type]} rounded-t-lg flex items-center justify-center`}
                  >
                    <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center text-white">
                      {typeIcons[facility.type]}
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-sm truncate">{facility.name}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs capitalize">
                          {facility.type}
                        </Badge>
                        <StatusBadge status={facility.status} />
                      </div>
                    </div>
                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <CircleDot className="h-3 w-3" />
                        <span>{facility.sport}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{facility.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Users className="h-3 w-3" />
                          Capacity: {facility.capacity}
                        </span>
                        <span className="flex items-center gap-1 font-medium text-foreground">
                          <IndianRupee className="h-3 w-3" />
                          {formatCurrency(facility.hourlyRate)}/hr
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {facility.amenities.slice(0, 3).map((amenity) => (
                        <Badge key={amenity} variant="secondary" className="text-[10px] px-1.5 py-0">
                          {amenity}
                        </Badge>
                      ))}
                      {facility.amenities.length > 3 && (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                          +{facility.amenities.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Landmark className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-1">No facilities found</h3>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
