"use client";

import { Mail, Phone, Calendar, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/shared/page-header";
import { useAuthStore } from "@/stores/auth-store";
import { getInitials, formatDate } from "@/lib/utils";
import { ROLE_LABELS, getDepartment } from "@/lib/constants";

export default function ProfilePage() {
  const { user } = useAuthStore();
  if (!user) return null;

  const department = user.department ? getDepartment(user.department) : null;

  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader title="Profile" description="Your account information" />
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl bg-primary/10">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="space-y-4 flex-1">
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{ROLE_LABELS[user.role]}</Badge>
                  {department && <Badge className={`bg-gradient-to-r ${department.gradient} text-white border-0`}>{department.name}</Badge>}
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {formatDate(user.joinedAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="capitalize">{user.status}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
