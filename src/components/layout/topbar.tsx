"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Bell, Sun, Moon, Menu, Search, ChevronRight,
  Shield, Dumbbell, Stethoscope, IndianRupee,
  Trophy, UtensilsCrossed, Building2, Heart,
  Presentation, LayoutDashboard, GraduationCap, UserCog, Users2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuthStore } from "@/stores/auth-store";
import { useNotificationStore } from "@/stores/notification-store";
import { useSidebarStore } from "@/stores/sidebar-store";
import { DEPARTMENTS, ROLE_LABELS } from "@/lib/constants";
import { getRelativeTime } from "@/lib/utils";
import type { DepartmentSlug, Role } from "@/types";

const roleOptions: { role: Role; department?: DepartmentSlug; label: string; icon: React.ReactNode }[] = [
  { role: "super_admin", label: "Super Admin", icon: <Shield className="h-4 w-4" /> },
  { role: "department_head", department: "gym", label: "Gym Head", icon: <Dumbbell className="h-4 w-4" /> },
  { role: "department_head", department: "medical", label: "Medical Head", icon: <Stethoscope className="h-4 w-4" /> },
  { role: "department_head", department: "finance", label: "Finance Head", icon: <IndianRupee className="h-4 w-4" /> },
  { role: "department_head", department: "sports", label: "Sports Head", icon: <Trophy className="h-4 w-4" /> },
  { role: "department_head", department: "physio", label: "Physio Head", icon: <Heart className="h-4 w-4" /> },
  { role: "department_head", department: "canteen", label: "Canteen Head", icon: <UtensilsCrossed className="h-4 w-4" /> },
  { role: "department_head", department: "dormitories", label: "Dorm Head", icon: <Building2 className="h-4 w-4" /> },
  { role: "department_head", department: "conference", label: "Conference Head", icon: <Presentation className="h-4 w-4" /> },
  { role: "department_head", department: "management", label: "Management Head", icon: <LayoutDashboard className="h-4 w-4" /> },
  { role: "manager", department: "gym", label: "Gym Manager", icon: <Dumbbell className="h-4 w-4" /> },
  { role: "manager", department: "canteen", label: "Canteen Manager", icon: <UtensilsCrossed className="h-4 w-4" /> },
  { role: "staff", department: "medical", label: "Medical Staff", icon: <Stethoscope className="h-4 w-4" /> },
  { role: "staff", department: "dormitories", label: "Dorm Staff", icon: <Building2 className="h-4 w-4" /> },
  { role: "member", label: "Member / Student", icon: <GraduationCap className="h-4 w-4" /> },
];

export function Topbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { user, loginAs } = useAuthStore();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotificationStore();
  const { toggleMobile } = useSidebarStore();

  if (!user) return null;

  // Generate breadcrumbs from pathname
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = segments.map((segment, index) => ({
    label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
    href: "/" + segments.slice(0, index + 1).join("/"),
    isLast: index === segments.length - 1,
  }));

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
      {/* Mobile menu button */}
      <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobile}>
        <Menu className="h-5 w-5" />
      </Button>

      {/* Breadcrumb */}
      <nav className="hidden md:flex items-center text-sm text-muted-foreground">
        {breadcrumbs.map((crumb, i) => (
          <span key={crumb.href} className="flex items-center">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 mx-1" />}
            <span className={crumb.isLast ? "text-foreground font-medium" : "hover:text-foreground cursor-pointer"}
              onClick={() => !crumb.isLast && router.push(crumb.href)}>
              {crumb.label}
            </span>
          </span>
        ))}
      </nav>

      <div className="flex-1" />

      {/* Role Switcher */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="hidden sm:flex gap-2 text-xs">
            <UserCog className="h-3.5 w-3.5" />
            Switch Role
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Quick Role Switch</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ScrollArea className="h-[300px]">
            {roleOptions.map((option) => (
              <DropdownMenuItem
                key={option.label}
                onClick={() => {
                  loginAs(option.role, option.department);
                  router.push("/");
                }}
                className="gap-2"
              >
                {option.icon}
                <span className="text-xs">{option.label}</span>
                {user.role === option.role && user.department === (option.department || null) && (
                  <Badge variant="secondary" className="ml-auto text-[10px]">Current</Badge>
                )}
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Theme toggle */}
      <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>

      {/* Notifications */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] text-destructive-foreground flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" className="h-auto py-0 px-1 text-xs text-primary" onClick={markAllAsRead}>
                Mark all read
              </Button>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ScrollArea className="h-[300px]">
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex flex-col items-start gap-1 p-3 cursor-pointer"
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-center gap-2 w-full">
                  {!notification.read && <div className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                  <span className="font-medium text-sm truncate">{notification.title}</span>
                </div>
                <span className="text-xs text-muted-foreground line-clamp-2">{notification.message}</span>
                <span className="text-[10px] text-muted-foreground">{getRelativeTime(notification.createdAt)}</span>
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
