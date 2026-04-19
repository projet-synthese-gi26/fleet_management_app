// src/app/[locale]/admin/layout.tsx
"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background-secondary overflow-hidden">
      <Sidebar
        isMobileOpen={isSidebarOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={() => setIsCollapsed(!isCollapsed)}
        closeMobile={() => setIsSidebarOpen(false)}
      />

      <div className={`flex flex-col flex-1 h-full transition-all duration-300 ease-in-out ${isCollapsed ? "lg:pl-20" : "lg:pl-72"}`}>
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-[1600px] mx-auto min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}