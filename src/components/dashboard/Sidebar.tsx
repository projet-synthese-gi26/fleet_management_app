"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useI18n } from "@/hooks/useI18n";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, Truck, Users, ShieldCheck, 
  Settings, LogOut, Building2, MapPin, UserCog, 
  ChevronRight, Activity
} from "lucide-react";

const MENU_CONFIG = [
  { 
    title: "Supervision",
    roles: ['FLEET_SUPER_ADMIN'],
    items: [
      { icon: ShieldCheck, label: "Administrateurs", path: "/admin/super/admins" },
      { icon: Activity, label: "Santé Système", path: "/api/v1/health/diagnostic" }
    ]
  },
  { 
    title: "Administration",
    roles: ['FLEET_ADMIN', 'FLEET_SUPER_ADMIN'],
    items: [
      { icon: UserCog, label: "Gestion Managers", path: "/admin/management/managers" },
      { icon: Settings, label: "Ressources Parc", path: "/admin/resources" }
    ]
  },
  { 
    title: "Ma Flotte",
    roles: ['FLEET_MANAGER'],
    items: [
      { icon: LayoutDashboard, label: "Vue d'ensemble", path: "/dashboard" },
      { icon: Building2, label: "Mes Flottes", path: "/dashboard/fleets" },
      { icon: Truck, label: "Véhicules", path: "/dashboard/vehicles" },
      { icon: Users, label: "Chauffeurs", path: "/dashboard/drivers" },
      { icon: MapPin, label: "Geofencing", path: "/dashboard/geofencing" }
    ]
  }
];

export function Sidebar({ isCollapsed }: { isCollapsed: boolean }) {
  const { user, logout } = useAuth();
  const { locale } = useI18n();
  const pathname = usePathname();

  return (
    <aside className={`h-screen sticky top-0 bg-surface border-r border-border-default transition-all duration-300 ease-in-out flex flex-col ${isCollapsed ? 'w-20' : 'w-72'}`}>
      
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3">
        <div className="size-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
          <ShieldCheck className="text-white" size={24} />
        </div>
        {!isCollapsed && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-black text-xl tracking-tighter text-text-primary">
            Fleet<span className="text-primary">Control</span>
          </motion.span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-8 overflow-y-auto no-scrollbar">
        {MENU_CONFIG.map((section, idx) => {
          // Vérifie si l'utilisateur a au moins un rôle requis pour cette section
          if (!section.roles.some(role => user?.roles.includes(role as any))) return null;

          return (
            <div key={idx} className="space-y-2">
              {!isCollapsed && (
                <h3 className="px-4 text-[10px] font-bold uppercase tracking-widest text-text-tertiary">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname.includes(item.path);
                  return (
                    <Link 
                      key={item.path} 
                      href={`/${locale}${item.path}`}
                      className={`group flex items-center justify-between p-3 rounded-xl transition-all ${
                        isActive 
                          ? 'bg-primary/10 text-primary' 
                          : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={20} className={isActive ? 'text-primary' : 'text-text-tertiary group-hover:text-primary'} />
                        {!isCollapsed && <span className="text-sm font-semibold">{item.label}</span>}
                      </div>
                      {!isCollapsed && isActive && <ChevronRight size={14} />}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-border-default bg-background-secondary/50">
        <button 
          onClick={logout}
          className="flex items-center gap-3 p-3 w-full text-error hover:bg-error/10 rounded-xl transition-colors group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          {!isCollapsed && <span className="text-sm font-bold">Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
}