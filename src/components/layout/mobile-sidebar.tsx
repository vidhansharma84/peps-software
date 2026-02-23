"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Dumbbell, Heart, Stethoscope, Trophy, Building2,
  Presentation, UtensilsCrossed, IndianRupee,
  LayoutDashboard, Users, CalendarCheck, UserCheck,
  ClipboardCheck, CreditCard, Package, Calendar,
  FileText, Siren, MapPin, Swords, DoorOpen, Wrench,
  UserPlus, Receipt, Monitor, ShoppingCart, BookOpen,
  ClipboardList, Truck, TrendingUp, Medal, Award,
  ArrowLeftRight, Wallet, PieChart, BarChart3, Megaphone,
  Home, GraduationCap, Shield, Settings, LogOut, User,
  Pill, TestTube,
} from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/stores/auth-store";
import { useSidebarStore } from "@/stores/sidebar-store";
import { getNavigation, getDepartment } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Users, Dumbbell, Heart, Stethoscope, Trophy,
  Building2, Presentation, UtensilsCrossed, IndianRupee,
  CalendarCheck, UserCheck, ClipboardCheck, CreditCard, Package,
  Calendar, FileText, Siren, MapPin, Swords, DoorOpen, Wrench,
  UserPlus, Receipt, Monitor, ShoppingCart, BookOpen, ClipboardList,
  Truck, TrendingUp, Medal, Award, ArrowLeftRight, Wallet, PieChart,
  BarChart3, Megaphone, Home, GraduationCap, Shield, Settings,
  Pill, TestTube, Building: Building2, User,
};

export function MobileSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { isMobileOpen, setMobileOpen } = useSidebarStore();

  if (!user) return null;

  const navItems = getNavigation(user.role, user.department);
  const department = user.department ? getDepartment(user.department) : null;

  return (
    <Sheet open={isMobileOpen} onOpenChange={setMobileOpen}>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br text-white text-xs font-bold", department ? department.gradient : "from-primary to-primary/80")}>
              P
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm">PEPS</span>
              {department && <span className="text-[10px] text-muted-foreground font-normal">{department.name}</span>}
            </div>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1 h-[calc(100vh-140px)]">
          <nav className="space-y-1 p-2">
            {navItems.map((item) => {
              const Icon = iconMap[item.icon] || LayoutDashboard;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                    isActive && "bg-accent text-accent-foreground font-medium"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive && "text-primary")} />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
        <div className="border-t p-3">
          <div className="flex items-center gap-2 mb-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user.name}</span>
              <span className="text-xs text-muted-foreground capitalize">{user.role.replace("_", " ")}</span>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-destructive" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
