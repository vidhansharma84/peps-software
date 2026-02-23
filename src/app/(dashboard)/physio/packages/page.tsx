"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Check,
  Star,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { spaPackages, type SpaPackage } from "@/data/physio";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

function PackageCard({ pkg }: { pkg: SpaPackage }) {
  const handleBookNow = () => {
    toast.success(`Booking initiated for "${pkg.name}" package`);
  };

  return (
    <Card
      className={cn(
        "overflow-hidden h-full flex flex-col transition-all hover:shadow-xl",
        pkg.popular && "ring-2 ring-primary shadow-lg relative"
      )}
    >
      {pkg.popular && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 gap-1">
            <Star className="h-3 w-3 fill-current" />
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader
        className={cn(
          "pb-4",
          pkg.popular
            ? "bg-gradient-to-br from-primary/10 to-primary/5"
            : "bg-muted/30"
        )}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles
              className={cn(
                "h-5 w-5",
                pkg.popular ? "text-primary" : "text-muted-foreground"
              )}
            />
            <h3 className="font-bold text-lg">{pkg.name}</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {pkg.description}
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col pt-6 space-y-6">
        {/* Price */}
        <div className="text-center">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl font-bold">
              {formatCurrency(pkg.price)}
            </span>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{pkg.duration} minutes</span>
          </div>
        </div>

        <Separator />

        {/* Includes */}
        <div className="flex-1 space-y-3">
          <p className="text-sm font-semibold">Includes:</p>
          <ul className="space-y-2.5">
            {pkg.includes.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-start gap-2.5"
              >
                <div className="h-5 w-5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-sm">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Book Button */}
        <Button
          onClick={handleBookNow}
          className={cn(
            "w-full gap-2",
            pkg.popular
              ? "bg-gradient-to-r from-primary to-primary/80"
              : ""
          )}
          variant={pkg.popular ? "default" : "outline"}
          size="lg"
        >
          Book Now
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

export default function PackagesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Spa Packages"
        description="Explore our curated spa and wellness packages for the ultimate relaxation experience"
      />

      {/* Package Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
      >
        {spaPackages.map((pkg) => (
          <motion.div key={pkg.id} variants={item}>
            <PackageCard pkg={pkg} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
