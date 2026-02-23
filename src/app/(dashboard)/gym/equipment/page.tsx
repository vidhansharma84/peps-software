"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dumbbell,
  MapPin,
  Calendar,
  Tag,
  Filter,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { equipment, type Equipment } from "@/data/gym";
import { formatDate } from "@/lib/utils";

const categories = ["All", "Cardio", "Strength", "Flexibility", "Functional"];

const categoryIcons: Record<string, string> = {
  Cardio: "from-red-500 to-pink-500",
  Strength: "from-blue-500 to-indigo-500",
  Flexibility: "from-green-500 to-emerald-500",
  Functional: "from-amber-500 to-orange-500",
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function GymEquipmentPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredEquipment = selectedCategory === "All"
    ? equipment
    : equipment.filter((e) => e.category === selectedCategory);

  const statusCounts = {
    operational: equipment.filter((e) => e.status === "operational").length,
    maintenance: equipment.filter((e) => e.status === "maintenance").length,
    out_of_order: equipment.filter((e) => e.status === "out_of_order").length,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <PageHeader title="Equipment" description="Track and manage all gym equipment">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-muted-foreground">{statusCounts.operational} Active</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            <span className="text-muted-foreground">{statusCounts.maintenance} Maintenance</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span className="text-muted-foreground">{statusCounts.out_of_order} Out of Order</span>
          </div>
        </div>
      </PageHeader>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
          >
            {cat === "All" && <Filter className="h-4 w-4 mr-1" />}
            {cat}
            {cat !== "All" && (
              <Badge variant="secondary" className="ml-1.5 h-5 px-1.5 text-xs">
                {equipment.filter((e) => e.category === cat).length}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Equipment Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        key={selectedCategory}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {filteredEquipment.map((eq) => (
          <motion.div key={eq.id} variants={item}>
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div
                    className={`h-10 w-10 rounded-lg bg-gradient-to-br ${categoryIcons[eq.category] || "from-gray-500 to-gray-600"} flex items-center justify-center text-white`}
                  >
                    <Dumbbell className="h-5 w-5" />
                  </div>
                  <StatusBadge status={eq.status} />
                </div>

                <div>
                  <h3 className="font-semibold text-sm">{eq.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{eq.brand}</p>
                </div>

                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Tag className="h-3 w-3" />
                    <span>{eq.category}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" />
                    <span>{eq.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    <span>Purchased {formatDate(eq.purchaseDate)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
