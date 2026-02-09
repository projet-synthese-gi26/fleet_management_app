"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/hooks/useI18n";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard, Map, Truck, Users, Route, Bell,
  Settings, LogOut, ChevronLeft, Car, MapPin, Building2,
  Link2, ShieldCheck, UserCog
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  toggleCollapse: () => void;
  closeMobileMenu: () => void;
}

// Définition de tous les items possibles
const ALL_MENU_ITEMS = [
  { icon: LayoutDashboard, labelKey: "dashboard", path: "/dashboard", roles: ["FLEET_MANAGER", "ADMIN", "ROLE_FLEET_ADMIN"] },
  { icon: UserCog, labelKey: "users", path: "/admin/users", roles: ["ADMIN", "ROLE_FLEET_ADMIN"] },
  { icon: Users, labelKey: "fleet_managers", path: "/admin/fleet-managers", roles: ["ADMIN", "ROLE_FLEET_ADMIN"] },
  { icon: Building2, labelKey: "fleets", path: "/dashboard/fleets", roles: ["FLEET_MANAGER", "ADMIN", "ROLE_FLEET_ADMIN"] },
  { icon: Link2, labelKey: "fleet_assignments", path: "/admin/fleet-assignments", roles: ["ADMIN", "ROLE_FLEET_ADMIN"] },
  { icon: Map, labelKey: "live_map", path: "/dashboard/map", roles: ["FLEET_MANAGER", "ADMIN", "ROLE_FLEET_ADMIN"] },
  { icon: MapPin, labelKey: "geofencing", path: "/admin/geofencing", roles: ["FLEET_MANAGER", "ADMIN", "ROLE_FLEET_ADMIN"] },
  { icon: Truck, labelKey: "vehicles", path: "/dashboard/vehicles", roles: ["FLEET_MANAGER", "ADMIN", "ROLE_FLEET_ADMIN"] },
  { icon: Users, labelKey: "drivers", path: "/dashboard/drivers", roles: ["FLEET_MANAGER", "ADMIN", "ROLE_FLEET_ADMIN"] },
  { icon: Route, labelKey: "trips", path: "/dashboard/trips", roles: ["FLEET_MANAGER", "ADMIN", "ROLE_FLEET_ADMIN"] },
  { icon: Bell, labelKey: "alerts", path: "/dashboard/alerts", roles: ["FLEET_MANAGER", "ADMIN", "ROLE_FLEET_ADMIN"] },
  { icon: Settings, labelKey: "settings", path: "/dashboard/settings", roles: ["FLEET_MANAGER", "ADMIN", "ROLE_FLEET_ADMIN"] },
];

export function Sidebar({ isOpen, isCollapsed, toggleCollapse, closeMobileMenu }: SidebarProps) {
  const { locale, t } = useI18n();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const sidebarW = isCollapsed ? 80 : 260;

  // Filtrage des items selon le rôle de l'utilisateur connecté
  const filteredMenuItems = ALL_MENU_ITEMS.filter(item => 
    item.roles.some(role => user?.roles.includes(role as any))
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isItemActive = (itemPath: string) => {
    const fullPath = `/${locale}${itemPath}`;
    return pathname.startsWith(fullPath) || pathname === fullPath;
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeMobileMenu} className="fixed inset-0 bg-black/30 z-20 lg:hidden" />
        )}
      </AnimatePresence>

      <motion.aside
        animate={{ x: (isOpen || !isMobile) ? 0 : -sidebarW, width: sidebarW }}
        className="fixed inset-y-0 left-0 z-30 flex flex-col bg-surface border-r border-border-default shadow-xl"
        style={{ width: sidebarW }}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-border-default shrink-0 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
              <Car size={20} className="text-white" />
            </div>
            {!isCollapsed && (
              <span className="text-base font-bold text-text-primary tracking-tight whitespace-nowrap">
                Fleet<span className="text-primary">Control</span>
              </span>
            )}
          </div>
          
          <button onClick={isMobile ? closeMobileMenu : toggleCollapse} className="w-8 h-8 flex items-center justify-center rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-all">
            <ChevronLeft size={18} style={{ transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {filteredMenuItems.map((item, index) => {
            const href = `/${locale}${item.path}`;
            const active = isItemActive(item.path);
            const Icon = item.icon;
            
            return (
              <Link key={item.path} href={href} onClick={() => isMobile && closeMobileMenu()}
                className={`flex items-center h-11 rounded-xl transition-all group relative ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'} ${active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'}`}>
                
                {active && !isCollapsed && <div className="absolute left-0 w-1 h-6 bg-white rounded-r-full" />}
                <Icon size={20} className="shrink-0" />
                {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">{t(item.labelKey, 'dashboard')}</span>}
                
                {isCollapsed && !isMobile && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-surface border border-border-default rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible whitespace-nowrap z-50 pointer-events-none">
                    <span className="text-sm font-medium text-text-primary">{t(item.labelKey, 'dashboard')}</span>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-4 pt-3 border-t border-border-default shrink-0">
          <button onClick={() => logout()} className={`flex items-center w-full h-11 rounded-xl transition-all text-text-secondary hover:text-error hover:bg-error/10 ${isCollapsed ? 'justify-center' : 'gap-3 px-3'}`}>
            <LogOut size={20} className="shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium">{t('logout', 'common')}</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}