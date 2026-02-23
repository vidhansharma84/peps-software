"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Star,
  Users,
  Mail,
  Phone,
  Award,
  Filter,
} from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getInitials } from "@/lib/utils";
import { coaches } from "@/data/coaches";

const sports = [
  "Cricket",
  "Football",
  "Basketball",
  "Swimming",
  "Athletics",
  "Badminton",
  "Tennis",
  "Hockey",
];

export default function CoachDirectoryPage() {
  const [search, setSearch] = useState("");
  const [sportFilter, setSportFilter] = useState<string>("all");

  const filtered = coaches.filter((coach) => {
    const matchesSearch =
      coach.name.toLowerCase().includes(search.toLowerCase()) ||
      coach.specialization.toLowerCase().includes(search.toLowerCase());
    const matchesSport =
      sportFilter === "all" || coach.sport === sportFilter;
    return matchesSearch && matchesSport;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Coach Directory"
        description={`${coaches.length} coaches across ${sports.length} sports`}
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or specialization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={sportFilter} onValueChange={setSportFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sport" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sports</SelectItem>
            {sports.map((sport) => (
              <SelectItem key={sport} value={sport}>
                {sport}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Coach Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((coach, index) => (
          <motion.div
            key={coach.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
          >
            <Link href={`/coaches/directory/${coach.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-16 w-16 mb-3">
                      <AvatarFallback className="text-lg bg-primary/10">
                        {getInitials(coach.name)}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-sm">{coach.name}</h3>
                    <p className="text-xs text-muted-foreground mb-1">
                      {coach.specialization}
                    </p>
                    <div className="flex gap-1 mb-3 flex-wrap justify-center">
                      <Badge variant="outline" className="text-[10px]">
                        {coach.sport}
                      </Badge>
                      <StatusBadge status={coach.status} />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">{coach.rating}</span>
                      <span className="text-xs text-muted-foreground">/ 5</span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{coach.athleteCount} athletes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        <span>{coach.experience}y exp</span>
                      </div>
                    </div>

                    {/* Experience Progress */}
                    <div className="w-full">
                      <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                        <span>Experience</span>
                        <span>{coach.experience} years</span>
                      </div>
                      <Progress
                        value={Math.min((coach.experience / 20) * 100, 100)}
                        className="h-1.5"
                      />
                    </div>

                    {/* Contact Icons */}
                    <div className="flex gap-2 mt-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Mail className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Phone className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No coaches found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
