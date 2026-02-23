"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dumbbell, Heart, Stethoscope, Trophy, Building2,
  Presentation, UtensilsCrossed, IndianRupee,
  LayoutDashboard, Shield, UserCog, Users, User, LogIn,
  Sun, Moon, GraduationCap,
} from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuthStore, DEMO_CREDENTIALS } from "@/stores/auth-store";
import { loginSchema, type LoginFormData } from "@/lib/validators";
import type { DepartmentSlug, Role } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";

const quickLoginOptions: {
  label: string;
  role: Role;
  department?: DepartmentSlug;
  icon: React.ReactNode;
  color: string;
}[] = [
  { label: "Super Admin", role: "super_admin", icon: <Shield className="h-4 w-4" />, color: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20" },
  { label: "Gym Head", role: "department_head", department: "gym", icon: <Dumbbell className="h-4 w-4" />, color: "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border-orange-500/20" },
  { label: "Medical Head", role: "department_head", department: "medical", icon: <Stethoscope className="h-4 w-4" />, color: "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border-rose-500/20" },
  { label: "Finance Head", role: "department_head", department: "finance", icon: <IndianRupee className="h-4 w-4" />, color: "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20" },
  { label: "Sports Manager", role: "manager", department: "sports", icon: <Trophy className="h-4 w-4" />, color: "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20" },
  { label: "Canteen Manager", role: "manager", department: "canteen", icon: <UtensilsCrossed className="h-4 w-4" />, color: "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 border-yellow-500/20" },
  { label: "Dorm Staff", role: "staff", department: "dormitories", icon: <Building2 className="h-4 w-4" />, color: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20" },
  { label: "Member", role: "member", icon: <GraduationCap className="h-4 w-4" />, color: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-purple-500/20" },
];

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAs } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    login(data.email, data.password);
    toast.success("Logged in successfully!");
    router.push("/");
    setIsLoading(false);
  };

  const fillCredentials = (email: string, password: string) => {
    setValue("email", email);
    setValue("password", password);
  };

  const handleQuickLogin = (role: Role, department?: DepartmentSlug) => {
    loginAs(role, department);
    toast.success(`Logged in as ${role.replace("_", " ")}`);
    router.push("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <div className="flex justify-between items-center mb-8">
        <div className="lg:hidden">
          <h1 className="text-2xl font-bold">PEPS Management</h1>
          <p className="text-sm text-muted-foreground">Sign in to continue</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="ml-auto"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>

      <Card className="border-0 shadow-none lg:border lg:shadow-sm">
        <CardHeader className="px-0 lg:px-6">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Enter your credentials or use quick login</CardDescription>
        </CardHeader>
        <CardContent className="px-0 lg:px-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@peps.edu.in"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter any password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
              Quick Login As
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {quickLoginOptions.map((option) => (
              <motion.div key={option.label} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className={`w-full justify-start gap-2 h-auto py-2.5 text-xs font-medium border ${option.color}`}
                  onClick={() => handleQuickLogin(option.role, option.department)}
                >
                  {option.icon}
                  {option.label}
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
              Demo Credentials
            </span>
          </div>

          <ScrollArea className="h-[200px] rounded-md border">
            <div className="p-3">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium text-muted-foreground">Role</th>
                    <th className="text-left py-2 font-medium text-muted-foreground">Email</th>
                    <th className="text-left py-2 font-medium text-muted-foreground">Password</th>
                  </tr>
                </thead>
                <tbody>
                  {DEMO_CREDENTIALS.map((cred) => (
                    <tr
                      key={cred.email}
                      className="border-b last:border-0 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => fillCredentials(cred.email, cred.password)}
                    >
                      <td className="py-2 font-medium">{cred.role}</td>
                      <td className="py-2 text-muted-foreground">{cred.email}</td>
                      <td className="py-2 font-mono text-muted-foreground">{cred.password}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollArea>
          <p className="text-[10px] text-muted-foreground text-center mt-2">
            Click any row to fill credentials
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
