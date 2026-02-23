"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  IndianRupee,
  TrendingUp,
  Sparkles,
  Heart,
  Activity,
  Hand,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { treatments, type Treatment } from "@/data/physio";
import { formatCurrency } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const categoryConfig: Record<
  string,
  { label: string; icon: React.ReactNode; color: string; badgeVariant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" }
> = {
  physiotherapy: {
    label: "Physiotherapy",
    icon: <Activity className="h-5 w-5" />,
    color: "from-blue-500 to-cyan-500",
    badgeVariant: "info",
  },
  massage: {
    label: "Massage",
    icon: <Hand className="h-5 w-5" />,
    color: "from-amber-500 to-orange-500",
    badgeVariant: "warning",
  },
  spa: {
    label: "Spa",
    icon: <Sparkles className="h-5 w-5" />,
    color: "from-pink-500 to-rose-500",
    badgeVariant: "default",
  },
  wellness: {
    label: "Wellness",
    icon: <Heart className="h-5 w-5" />,
    color: "from-emerald-500 to-green-500",
    badgeVariant: "success",
  },
};

function TreatmentCard({ treatment }: { treatment: Treatment }) {
  const config = categoryConfig[treatment.category];

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full group">
      <div
        className={`h-2 bg-gradient-to-r ${config.color}`}
      />
      <CardContent className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
              {treatment.name}
            </h3>
            <Badge variant={config.badgeVariant} className="mt-1.5 text-xs">
              {config.label}
            </Badge>
          </div>
          <div
            className={`h-10 w-10 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center text-white shrink-0`}
          >
            {config.icon}
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {treatment.description}
        </p>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{treatment.duration} min</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold">
            <IndianRupee className="h-4 w-4" />
            <span>{formatCurrency(treatment.price)}</span>
          </div>
        </div>

        {/* Popularity Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Popularity
            </span>
            <span className="font-medium">{treatment.popularity}%</span>
          </div>
          <Progress value={treatment.popularity} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function TreatmentsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredTreatments =
    activeTab === "all"
      ? treatments
      : treatments.filter((t) => t.category === activeTab);

  const categoryCounts = {
    all: treatments.length,
    physiotherapy: treatments.filter((t) => t.category === "physiotherapy")
      .length,
    massage: treatments.filter((t) => t.category === "massage").length,
    spa: treatments.filter((t) => t.category === "spa").length,
    wellness: treatments.filter((t) => t.category === "wellness").length,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Treatment Catalog"
        description="Browse our comprehensive range of physiotherapy, massage, spa, and wellness treatments"
      />

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full justify-start flex-wrap h-auto gap-1 bg-transparent p-0">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              All ({categoryCounts.all})
            </TabsTrigger>
            <TabsTrigger
              value="physiotherapy"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Physiotherapy ({categoryCounts.physiotherapy})
            </TabsTrigger>
            <TabsTrigger
              value="massage"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Massage ({categoryCounts.massage})
            </TabsTrigger>
            <TabsTrigger
              value="spa"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Spa ({categoryCounts.spa})
            </TabsTrigger>
            <TabsTrigger
              value="wellness"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Wellness ({categoryCounts.wellness})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Treatment Grid */}
      <motion.div
        key={activeTab}
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {filteredTreatments.map((treatment) => (
          <motion.div key={treatment.id} variants={item}>
            <TreatmentCard treatment={treatment} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
