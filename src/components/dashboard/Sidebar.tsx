// "use client";

// import React from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useAuth } from "@/contexts/AuthContext";
// import { useI18n } from "@/hooks/useI18n";
// import { motion } from "framer-motion";
// import { 
//   LayoutDashboard, Truck, Users, ShieldCheck, 
//   Settings, LogOut, Building2, MapPin, UserCog, 
//   ChevronRight, Activity
// } from "lucide-react";

// const MENU_CONFIG = [
//   { 
//     title: "Supervision",
//     roles: ['FLEET_SUPER_ADMIN'],
//     items: [
//       { icon: ShieldCheck, label: "Administrateurs", path: "/admin/super/admins" },
//       { icon: Activity, label: "Santé Système", path: "/api/v1/health/diagnostic" }
//     ]
//   },
//   { 
//     title: "Administration",
//     roles: ['FLEET_ADMIN', 'FLEET_SUPER_ADMIN'],
//     items: [
//       { icon: UserCog, label: "Gestion Managers", path: "/admin/management/managers" },
//       { icon: Settings, label: "Ressources Parc", path: "/admin/resources" }
//     ]
//   },
//   { 
//     title: "Ma Flotte",
//     roles: ['FLEET_MANAGER'],
//     items: [
//       { icon: LayoutDashboard, label: "Vue d'ensemble", path: "/dashboard" },
//       { icon: Building2, label: "Mes Flottes", path: "/dashboard/fleets" },
//       { icon: Truck, label: "Véhicules", path: "/dashboard/vehicles" },
//       { icon: Users, label: "Chauffeurs", path: "/dashboard/drivers" },
//       { icon: MapPin, label: "Geofencing", path: "/dashboard/geofencing" }
//     ]
//   }
// ];

// export function Sidebar({ isCollapsed }: { isCollapsed: boolean }) {
//   const { user, logout } = useAuth();
//   const { locale } = useI18n();
//   const pathname = usePathname();

//   return (
//     <aside className={`h-screen sticky top-0 bg-surface border-r border-border-default transition-all duration-300 ease-in-out flex flex-col ${isCollapsed ? 'w-20' : 'w-72'}`}>
      
//       {/* Logo Section */}
//       <div className="p-6 flex items-center gap-3">
//         <div className="size-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
//           <ShieldCheck className="text-white" size={24} />
//         </div>
//         {!isCollapsed && (
//           <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-black text-xl tracking-tighter text-text-primary">
//             Fleet<span className="text-primary">Control</span>
//           </motion.span>
//         )}
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 px-4 py-4 space-y-8 overflow-y-auto no-scrollbar">
//         {MENU_CONFIG.map((section, idx) => {
//           // Vérifie si l'utilisateur a au moins un rôle requis pour cette section
//           if (!section.roles.some(role => user?.roles.includes(role as any))) return null;

//           return (
//             <div key={idx} className="space-y-2">
//               {!isCollapsed && (
//                 <h3 className="px-4 text-[10px] font-bold uppercase tracking-widest text-text-tertiary">
//                   {section.title}
//                 </h3>
//               )}
//               <div className="space-y-1">
//                 {section.items.map((item) => {
//                   const isActive = pathname.includes(item.path);
//                   return (
//                     <Link 
//                       key={item.path} 
//                       href={`/${locale}${item.path}`}
//                       className={`group flex items-center justify-between p-3 rounded-xl transition-all ${
//                         isActive 
//                           ? 'bg-primary/10 text-primary' 
//                           : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
//                       }`}
//                     >
//                       <div className="flex items-center gap-3">
//                         <item.icon size={20} className={isActive ? 'text-primary' : 'text-text-tertiary group-hover:text-primary'} />
//                         {!isCollapsed && <span className="text-sm font-semibold">{item.label}</span>}
//                       </div>
//                       {!isCollapsed && isActive && <ChevronRight size={14} />}
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>
//           );
//         })}
//       </nav>

//       {/* User & Logout */}
//       <div className="p-4 border-t border-border-default bg-background-secondary/50">
//         <button 
//           onClick={logout}
//           className="flex items-center gap-3 p-3 w-full text-error hover:bg-error/10 rounded-xl transition-colors group"
//         >
//           <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
//           {!isCollapsed && <span className="text-sm font-bold">Déconnexion</span>}
//         </button>
//       </div>
//     </aside>
//   );
// }



















































































// "use client";

// import React from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useAuth } from "@/contexts/AuthContext";
// import { useI18n } from "@/hooks/useI18n";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   LayoutDashboard, Truck, Users, ShieldCheck, 
//   Settings, LogOut, Building2, MapPin, UserCog, 
//   ChevronLeft, Activity, ChevronRight
// } from "lucide-react";

// interface SidebarProps {
//   isCollapsed: boolean;
//   setIsCollapsed: (val: boolean) => void;
//   isMobileOpen: boolean;
//   closeMobile: () => void;
// }

// export function Sidebar({ isCollapsed, setIsCollapsed, isMobileOpen, closeMobile }: SidebarProps) {
//   const { user, logout } = useAuth();
//   const { locale } = useI18n();
//   const pathname = usePathname();

//   // Helper pour vérifier les rôles (gère les rôles avec ou sans ROLE_)
//   const hasRole = (requiredRoles: string[]) => {
//     return requiredRoles.some(role => 
//       user?.roles.includes(role as any) || 
//       user?.roles.includes(`ROLE_${role}` as any)
//     );
//   };

//   return (
//     <>
//       {/* Overlay Mobile */}
//       <AnimatePresence>
//         {isMobileOpen && (
//           <motion.div 
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             onClick={closeMobile}
//             className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
//           />
//         )}
//       </AnimatePresence>

//       <aside className={`
//         fixed inset-y-0 left-0 z-50 bg-surface border-r border-border-default transition-all duration-300 ease-in-out flex flex-col
//         ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//         ${isCollapsed ? 'w-20' : 'w-72'}
//       `}>
        
//         {/* Toggle Button - Version Desktop (Flottant sur le bord) */}
//         <button 
//           onClick={() => setIsCollapsed(!isCollapsed)}
//           className="hidden lg:flex absolute -right-3 top-12 size-6 bg-surface border border-border-default rounded-full items-center justify-center shadow-md hover:text-primary transition-colors z-150"
//         >
//           {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
//         </button>

//         {/* Logo Section */}
//         <div className="h-20 flex items-center px-6 gap-3 shrink-0">
//           <div className="size-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
//             <ShieldCheck className="text-white" size={24} />
//           </div>
//           {!isCollapsed && (
//             <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-black text-xl tracking-tighter text-text-primary whitespace-nowrap">
//               Fleet<span className="text-primary">Control</span>
//             </motion.span>
//           )}
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 px-4 py-4 space-y-8 overflow-y-auto no-scrollbar">
//           {MENU_CONFIG.map((section, idx) => {
//             if (!hasRole(section.roles)) return null;

//             return (
//               <div key={idx} className="space-y-2">
//                 {!isCollapsed && (
//                   <h3 className="px-4 text-[10px] font-bold uppercase tracking-widest text-text-tertiary">
//                     {section.title}
//                   </h3>
//                 )}
//                 <div className="space-y-1">
//                   {section.items.map((item) => {
//                     const isActive = pathname.includes(item.path);
//                     return (
//                       <Link 
//                         key={item.path} 
//                         href={`/${locale}${item.path}`}
//                         onClick={() => isMobileOpen && closeMobile()}
//                         className={`group flex items-center justify-between p-3 rounded-xl transition-all ${
//                           isActive 
//                             ? 'bg-primary/10 text-primary' 
//                             : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
//                         }`}
//                       >
//                         <div className="flex items-center gap-3">
//                           <item.icon size={20} className={isActive ? 'text-primary' : 'text-text-tertiary group-hover:text-primary'} />
//                           {!isCollapsed && <span className="text-sm font-semibold whitespace-nowrap">{item.label}</span>}
//                         </div>
//                       </Link>
//                     );
//                   })}
//                 </div>
//               </div>
//             );
//           })}
//         </nav>

//         {/* Footer / Logout */}
//         <div className="p-4 border-t border-border-default">
//           <button 
//             onClick={logout}
//             className={`flex items-center gap-3 p-3 w-full text-error hover:bg-error/10 rounded-xl transition-colors group ${isCollapsed ? 'justify-center' : ''}`}
//           >
//             <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
//             {!isCollapsed && <span className="text-sm font-bold">Déconnexion</span>}
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }

// const MENU_CONFIG = [
//   { 
//     title: "Supervision",
//     roles: ['SUPER_ADMIN', 'FLEET_SUPER_ADMIN'],
//     items: [
//       { icon: ShieldCheck, label: "Administrateurs", path: "/admin/super/admins" },
//       { icon: Activity, label: "Santé Système", path: "/admin/diagnostic" }
//     ]
//   },
//   { 
//     title: "Administration",
//     roles: ['ADMIN', 'FLEET_ADMIN', 'SUPER_ADMIN', 'FLEET_SUPER_ADMIN'],
//     items: [
//       { icon: UserCog, label: "Gestion Managers", path: "/admin/management/managers" },
//       { icon: Settings, label: "Ressources Parc", path: "/admin/resources" }
//     ]
//   },
//   { 
//     title: "Ma Flotte",
//     roles: ['MANAGER', 'FLEET_MANAGER'],
//     items: [
//       { icon: LayoutDashboard, label: "Vue d'ensemble", path: "/dashboard" },
//       { icon: Building2, label: "Mes Flottes", path: "/dashboard/fleets" },
//       { icon: Truck, label: "Véhicules", path: "/dashboard/vehicles" },
//       { icon: Users, label: "Chauffeurs", path: "/dashboard/drivers" },
//       { icon: MapPin, label: "Geofencing", path: "/dashboard/geofencing" }
//     ]
//   }
// ];












































// components/dashboard/Sidebar.tsx
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
  ChevronLeft, Activity, ChevronRight
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
        
        {/* Bouton de rétraction Desktop */}
        <button 
          type="button"
          onClick={() => setIsCollapsed?.(!isCollapsed)} // Le ?. évite l'erreur TypeError
          className="hidden lg:flex absolute -right-3 top-10 size-6 bg-surface border border-border-default rounded-full items-center justify-center shadow-md hover:text-primary transition-all z-[60] cursor-pointer"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Logo */}
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

        {/* Menu */}
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
                    const isActive = pathname.includes(item.path);
                    return (
                      <Link 
                        key={item.path} 
                        href={`/${locale}${item.path}`}
                        onClick={() => isMobileOpen && closeMobile()}
                        className={`group flex items-center p-3 rounded-xl transition-all ${
                          isActive 
                            ? 'bg-primary/10 text-primary' 
                            : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                        } ${isCollapsed ? 'justify-center' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon size={20} className={isActive ? 'text-primary' : 'text-text-tertiary group-hover:text-primary'} />
                          {!isCollapsed && <span className="text-sm font-semibold whitespace-nowrap">{item.label}</span>}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Logout */}
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
      roles: ['SUPER_ADMIN', 'FLEET_SUPER_ADMIN'],
      items: [
        { icon: ShieldCheck, label: "Administrateurs", path: "/admin/super/admins" },
        { icon: Activity, label: "Santé Système", path: "/admin/diagnostic" }
      ]
    },
    { 
      title: "Administration",
      roles: ['ADMIN', 'FLEET_ADMIN', 'SUPER_ADMIN', 'FLEET_SUPER_ADMIN'],
      items: [
        { icon: UserCog, label: "Gestion Managers", path: "/admin/management/managers" },
        { icon: Settings, label: "Ressources Parc", path: "/admin/resources" }
      ]
    },
    { 
      title: "Ma Flotte",
      roles: ['MANAGER', 'FLEET_MANAGER'],
      items: [
        { icon: LayoutDashboard, label: "Vue d'ensemble", path: "/dashboard" },
        { icon: Building2, label: "Mes Flottes", path: "/dashboard/fleets" },
        { icon: Truck, label: "Véhicules", path: "/dashboard/vehicles" },
        { icon: Users, label: "Chauffeurs", path: "/dashboard/drivers" },
        { icon: MapPin, label: "Geofencing", path: "/dashboard/geofencing" }
      ]
    }
  ];