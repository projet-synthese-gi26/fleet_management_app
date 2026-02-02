import { DriverSidebar } from "@/components/driver/DriverSidebar";
import { TripProvider } from "@/contexts/TripContext";
import React from "react";

export default function DriverLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <TripProvider>
            <div className="flex h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden">
                <DriverSidebar />
                <main className="flex-1 flex flex-col h-full overflow-y-auto">
                    {children}
                </main>
            </div>
        </TripProvider>
    );
}
