"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, LayoutGrid, List, Mail, Phone } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/shared/status-badge";
import { DEPARTMENTS, ROLE_LABELS } from "@/lib/constants";
import { getInitials } from "@/lib/utils";
import { users } from "@/data/users";

export default function StaffDirectoryPage() {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const staffUsers = users.filter((u) => u.role !== "member");
  const filtered = staffUsers.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === "all" || u.department === deptFilter;
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesDept && matchesRole;
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Staff Directory" description={`${staffUsers.length} staff members across all departments`} />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={deptFilter} onValueChange={setDeptFilter}>
          <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Department" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {DEPARTMENTS.map((d) => <SelectItem key={d.slug} value={d.slug}>{d.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Role" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="super_admin">Super Admin</SelectItem>
            <SelectItem value="department_head">Department Head</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="staff">Staff</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-1">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="icon" onClick={() => setViewMode("grid")}><LayoutGrid className="h-4 w-4" /></Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="icon" onClick={() => setViewMode("list")}><List className="h-4 w-4" /></Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((user, index) => {
            const dept = DEPARTMENTS.find((d) => d.slug === user.department);
            return (
              <motion.div key={user.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-16 w-16 mb-3">
                        <AvatarFallback className="text-lg bg-primary/10">{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-sm">{user.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{ROLE_LABELS[user.role]}</p>
                      <div className="flex gap-1 mb-3">
                        {dept && <Badge variant="outline" className="text-[10px]">{dept.name}</Badge>}
                        <StatusBadge status={user.status} />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Mail className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Phone className="h-3.5 w-3.5" /></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filtered.map((user, index) => {
                const dept = DEPARTMENTS.find((d) => d.slug === user.department);
                return (
                  <motion.div key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.02 }} className="flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="text-sm bg-primary/10">{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <Badge variant="outline" className="hidden sm:inline-flex text-xs">{ROLE_LABELS[user.role]}</Badge>
                    {dept && <Badge variant="secondary" className="hidden md:inline-flex text-xs">{dept.name}</Badge>}
                    <StatusBadge status={user.status} />
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No staff members found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
