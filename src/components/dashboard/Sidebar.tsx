"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useI18n } from "@/hooks/useI18n";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Truck, Users, ShieldCheck, 
  Settings, LogOut, Building2, MapPin, UserCog, 
  Activity, ChevronRight, ChevronLeft
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
  isMobileOpen: boolean;
  closeMobile: () => void;
}

export function Sidebar({ isCollapsed, setIsCollapsed, isMobileOpen, closeMobile }: SidebarProps) {
  const { user, logout } = useAuth();
  const { locale } = useI18n();
  const pathname = usePathname();

  const hasRole = (requiredRoles: string[]) => {
    return requiredRoles.some(role => 
      user?.roles.includes(role as any) || 
      user?.roles.includes(`ROLE_${role}` as any)
    );
  };

  /**
   * Vérifie si un lien est actif de manière précise
   */
  const checkActive = (itemPath: string) => {
    const fullItemPath = `/${locale}${itemPath}`;
    
    // Cas 1 : Correspondance exacte
    if (pathname === fullItemPath) return true;
    
    // Cas 2 : Gestion des sous-routes (ex: /dashboard/vehicles doit activer /vehicles mais PAS /dashboard si on veut être strict)
    // Sauf pour le tableau de bord principal où on ne veut l'activer que si c'est le chemin exact
    if (itemPath === "/dashboard" || itemPath === "/admin") {
        return pathname === fullItemPath;
    }

    return pathname.startsWith(`${fullItemPath}/`);
  };

  return (
    <>
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeMobile}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`
        fixed inset-y-0 left-0 z-50 bg-surface border-r border-border-default transition-all duration-300 ease-in-out flex flex-col
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsed ? 'w-20' : 'w-72'}
      `}>
        
        <button 
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3 top-10 size-6 bg-surface border border-border-default rounded-full items-center justify-center shadow-md hover:text-primary transition-all z-[60] cursor-pointer"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <div className="h-20 flex items-center px-6 gap-3 shrink-0 overflow-hidden">
          <div className="size-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
            <ShieldCheck className="text-white" size={24} />
          </div>
          {!isCollapsed && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-black text-xl tracking-tighter text-text-primary whitespace-nowrap">
              Fleet<span className="text-primary">Control</span>
            </motion.span>
          )}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-8 overflow-y-auto no-scrollbar">
          {MENU_CONFIG.map((section, idx) => {
            if (!hasRole(section.roles)) return null;
            return (
              <div key={idx} className="space-y-2">
                {!isCollapsed && (
                  <h3 className="px-4 text-[10px] font-bold uppercase tracking-widest text-text-tertiary">
                    {section.title}
                  </h3>
                )}
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = checkActive(item.path); // ✅ Utilisation de la nouvelle fonction
                    return (
                      <Link 
                        key={item.path} 
                        href={`/${locale}${item.path}`}
                        onClick={() => isMobileOpen && closeMobile()}
                        className={`group flex items-center p-3 rounded-xl transition-all ${
                          isActive 
                            ? 'bg-primary/10 text-primary shadow-sm' 
                            : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                        } ${isCollapsed ? 'justify-center' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon 
                            size={20} 
                            className={`transition-colors ${isActive ? 'text-primary' : 'text-text-tertiary group-hover:text-primary'}`} 
                          />
                          {!isCollapsed && (
                            <span className={`text-sm font-semibold whitespace-nowrap ${isActive ? 'text-primary' : ''}`}>
                              {item.label}
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border-default">
          <button 
            onClick={logout}
            className={`flex items-center gap-3 p-3 w-full text-error hover:bg-error/10 rounded-xl transition-colors group ${isCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            {!isCollapsed && <span className="text-sm font-bold">Déconnexion</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

const MENU_CONFIG = [
    { 
      title: "Supervision",
      roles: ['FLEET_SUPER_ADMIN'],
      items: [
        { icon: ShieldCheck, label: "Administrateurs", path: "/admin/super/admins" },
        { icon: Activity, label: "Santé du Système", path: "/admin/diagnostic" }
      ]
    },
    { 
      title: "Administration",
      roles: ['FLEET_ADMIN', 'FLEET_SUPER_ADMIN'],
      items: [
        { icon: UserCog, label: "Gestion des Managers", path: "/admin/management/managers" },
        { icon: Settings, label: "Gestion des Ressources", path: "/admin/resources" }
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