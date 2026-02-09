"use client";

import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { isAuthorized } from "@/lib/auth-utils";
import { PageLoader } from "@/components/ui/Spinner";

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // 1. Si non connecté -> Login
      if (!isAuthenticated && !pathname.includes('/login') && !pathname.includes('/signup')) {
        router.push('/login');
      }
      // 2. Si connecté mais pas autorisé sur cette route
      else if (isAuthenticated && !isAuthorized(user, pathname)) {
        // Redirige vers sa page d'accueil naturelle
        router.push('/'); 
      }
    }
  }, [user, isLoading, isAuthenticated, pathname, router]);

  if (isLoading) return <PageLoader />;

  return <>{children}</>;
}