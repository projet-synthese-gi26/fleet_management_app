"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile
  const [isCollapsed, setIsCollapsed] = useState(false); // Desktop

  return (
    <div className="min-h-screen bg-background-secondary">
      <Sidebar
        isOpen={isSidebarOpen}
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed(!isCollapsed)}
        closeMobileMenu={() => setIsSidebarOpen(false)}
      />

      <div
        className={`
                flex flex-col min-h-screen transition-all duration-300 ease-in-out
                ${isCollapsed ? "lg:pl-20" : "lg:pl-72"}
            `}
      >
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          <div className="max-w-[1600px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
