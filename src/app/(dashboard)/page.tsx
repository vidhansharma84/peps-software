"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

export default function DashboardRedirect() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    switch (user.role) {
      case "super_admin":
        router.push("/admin");
        break;
      case "member":
        router.push("/portal");
        break;
      default:
        if (user.department) {
          router.push(`/${user.department}`);
        } else {
          router.push("/admin");
        }
        break;
    }
  }, [user, router]);

  return (
    <div className="flex h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}
