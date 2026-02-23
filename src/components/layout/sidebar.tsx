"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, LogOut, Settings, User,
  Dumbbell, Heart, Stethoscope, Trophy, Building2,
  Presentation, UtensilsCrossed, IndianRupee,
  LayoutDashboard, Users, CalendarCheck, UserCheck,
  ClipboardCheck, CreditCard, Package, Calendar,
  FileText, Siren, MapPin, Swords, DoorOpen, Wrench,
  UserPlus, Receipt, Monitor, ShoppingCart, BookOpen,
  ClipboardList, Truck, TrendingUp, Medal, Award,
  ArrowLeftRight, Wallet, PieChart, BarChart3, Megaphone,
  Home, GraduationCap, Shield, Pill, TestTube,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuthStore } from "@/stores/auth-store";
import { useSidebarStore } from "@/stores/sidebar-store";
import { getNavigation, getDepartment } from "@/lib/constants";
import type { NavItem } from "@/types";

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

function NavItemComponent({ item, isCollapsed }: { item: NavItem; isCollapsed: boolean }) {
  const pathname = usePathname();
  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"));
  const Icon = iconMap[item.icon] || LayoutDashboard;

  const linkContent = (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
        isActive && "bg-accent text-accent-foreground font-medium",
        isCollapsed && "justify-center px-2"
      )}
    >
      <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-primary")} />
      {!isCollapsed && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="truncate"
        >
          {item.title}
        </motion.span>
      )}
      {!isCollapsed && item.badge && item.badge > 0 && (
        <span className="ml-auto text-xs bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
          {item.badge}
        </span>
      )}
    </Link>
  );

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
        <TooltipContent side="right">{item.title}</TooltipContent>
      </Tooltip>
    );
  }

  return linkContent;
}

export function Sidebar() {
  const { user, logout } = useAuthStore();
  const { isCollapsed, toggle } = useSidebarStore();
  const pathname = usePathname();

  if (!user) return null;

  const navItems = getNavigation(user.role, user.department);
  const department = user.department ? getDepartment(user.department) : null;

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 68 : 256 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="hidden md:flex flex-col border-r bg-sidebar text-sidebar-foreground h-screen sticky top-0"
    >
      {/* Header */}
      <div className={cn("flex items-center h-14 px-4 border-b", isCollapsed && "justify-center px-2")}>
        {!isCollapsed ? (
          <Link href="/" className="flex items-center gap-2">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br text-white text-xs font-bold", department ? department.gradient : "from-primary to-primary/80")}>
              P
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
              <span className="font-semibold text-sm">PEPS</span>
              {department && <span className="text-[10px] text-muted-foreground">{department.name}</span>}
            </motion.div>
          </Link>
        ) : (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary to-primary/80 text-white text-xs font-bold">
            P
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-7 w-7 ml-auto", isCollapsed && "ml-0 mt-2")}
          onClick={toggle}
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-2">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <NavItemComponent key={item.href} item={item} isCollapsed={isCollapsed} />
          ))}
        </nav>
      </ScrollArea>

      {/* User section */}
      <div className="border-t p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn("w-full justify-start gap-2 h-auto py-2", isCollapsed && "justify-center px-2")}
            >
              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-[10px] bg-primary/10">{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="flex flex-col items-start text-xs">
                  <span className="font-medium truncate max-w-[140px]">{user.name}</span>
                  <span className="text-muted-foreground capitalize">{user.role.replace("_", " ")}</span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>{user.name}</span>
                <span className="text-xs font-normal text-muted-foreground">{user.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile"><User className="mr-2 h-4 w-4" />Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/settings"><Settings className="mr-2 h-4 w-4" />Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.aside>
  );
}
