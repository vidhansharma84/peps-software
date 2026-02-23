"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Users,
  IndianRupee,
  MapPin,
  Wifi,
  Monitor,
  Mic,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { conferenceRooms } from "@/data/conference";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const configColors: Record<string, string> = {
  theatre: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  classroom: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  boardroom: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "u-shape": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

export default function ConferenceRoomsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Conference Rooms"
        description="Browse and manage all conference rooms and their configurations"
      >
        <Button asChild>
          <Link href="/conference/book">
            <Building2 className="h-4 w-4 mr-2" />
            Book a Room
          </Link>
        </Button>
      </PageHeader>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        {conferenceRooms.map((room) => (
          <motion.div key={room.id} variants={item}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{room.name}</CardTitle>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>Floor {room.floor}</span>
                    </div>
                  </div>
                  <StatusBadge status={room.status} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {room.description}
                </p>

                {/* Capacity & Rate */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{room.capacity}</span>
                    <span className="text-muted-foreground">seats</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <IndianRupee className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="font-semibold">{formatCurrency(room.hourlyRate)}</span>
                    <span className="text-muted-foreground">/hr</span>
                  </div>
                </div>

                {/* Configurations */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1.5">Configurations</p>
                  <div className="flex flex-wrap gap-1.5">
                    {room.configurations.map((config) => (
                      <span
                        key={config}
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium capitalize ${configColors[config] || "bg-gray-100 text-gray-700"}`}
                      >
                        {config}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1.5">Amenities</p>
                  <div className="flex flex-wrap gap-1.5">
                    {room.amenities.slice(0, 4).map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs font-normal">
                        {amenity}
                      </Badge>
                    ))}
                    {room.amenities.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{room.amenities.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action */}
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/conference/rooms/${room.id}`}>
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
