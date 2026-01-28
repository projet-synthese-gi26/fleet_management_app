"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/hooks/useI18n";
import {
  LayoutDashboard,
  Map,
  Truck,
  Users,
  Route,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Car,
  MapPin,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  isOpen: boolean; // Pour le mobile
  isCollapsed: boolean; // Pour le mode réduit (desktop)
  toggleCollapse: () => void;
  closeMobileMenu: () => void;
}

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Map, label: "Live Map", path: "/dashboard/map" },
  { icon: Truck, label: "Vehicles", path: "/dashboard/vehicles" },
  { icon: Users, label: "Drivers", path: "/dashboard/drivers" },
  { icon: Route, label: "Trips", path: "/dashboard/trips" },
  { icon: MapPin, label: "Geofencing", path: "/admin/geofencing" },
  { icon: Bell, label: "Alerts", path: "/dashboard/alerts" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

export function Sidebar({
  isOpen,
  isCollapsed,
  toggleCollapse,
  closeMobileMenu,
}: SidebarProps) {
  const { locale } = useI18n();
  const pathname = usePathname();

  const sidebarClasses = `
        fixed inset-y-0 left-0 z-30 flex flex-col 
        bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-2xl 
        transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${isCollapsed ? "lg:w-20" : "lg:w-72"}
        w-72
    `;

  return (
    <>
      {/* Overlay Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={sidebarClasses}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-blue-700">
          {!isCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <span className="text-xl font-bold">FleetControl</span>
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <div className="p-2 bg-white/10 rounded-lg">
                <Car className="w-6 h-6" />
              </div>
            </div>
          )}

          <button
            onClick={toggleCollapse}
            className="hidden lg:block p-1.5 rounded-lg hover:bg-white/10 transition-colors text-blue-200"
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
          {MENU_ITEMS.map((item) => {
            const href = `/${locale}${item.path}`;
            const isActive =
              pathname === href || pathname.startsWith(href + "/");
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                href={href}
                onClick={closeMobileMenu}
                className={`
                                    flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200
                                    ${
                                      isActive
                                        ? "bg-blue-700 text-white shadow-lg"
                                        : "text-blue-100 hover:text-white hover:bg-blue-700/50"
                                    }
                                    ${isCollapsed ? "justify-center" : ""}
                                `}
                title={isCollapsed ? item.label : ""}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? "text-white" : "text-blue-200"
                  }`}
                />
                {!isCollapsed && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer / Déconnexion */}
        <div className="p-4 border-t border-blue-700 bg-blue-900/50">
          <button
            className={`
                        flex items-center gap-3 w-full px-3 py-2.5 rounded-lg 
                        text-blue-100 hover:text-white hover:bg-blue-700/50 transition-colors
                        ${isCollapsed ? "justify-center" : ""}
                    `}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && (
              <span className="text-sm font-medium">Déconnexion</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
