"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/hooks/useI18n"; // Assurez-vous que ce hook expose 'locale'

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  { icon: "dashboard", label: "Dashboard", path: "/dashboard" }, // Changé href en path
  { icon: "map", label: "Live Map", path: "/dashboard/map" },
  { icon: "local_shipping", label: "Vehicles", path: "/dashboard/vehicles" },
  { icon: "person", label: "Drivers", path: "/dashboard/drivers" },
  { icon: "route", label: "Trips", path: "/dashboard/trips" },
  { icon: "notifications", label: "Alerts", path: "/dashboard/alerts" },
  { icon: "settings", label: "Settings", path: "/dashboard/settings" },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { locale } = useI18n(); // Récupérer la locale actuelle
  const pathname = usePathname();

  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-black/50 transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-surface border-r border-border-default transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-center border-b border-border-default">
          <div className="flex items-center gap-2 text-primary font-bold text-xl">
            <span className="material-symbols-outlined text-3xl">hub</span>
            <span>FleetControl</span>
          </div>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="mb-4 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider">
            Menu
          </div>
          {MENU_ITEMS.map((item) => {
            // Construction de l'URL complète avec la locale
            const href = `/${locale}${item.path}`;
            const isActive = pathname === href;

            return (
              <Link
                key={item.path}
                href={href}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-text-secondary hover:bg-background-secondary hover:text-text-primary"
                }`}
              >
                <span
                  className={`material-symbols-outlined ${
                    isActive ? "filled" : ""
                  }`}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
