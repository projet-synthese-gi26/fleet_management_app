"use client";

import React from "react";
import { StatCard } from "../StatCard";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* En-tête de section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">
            Real Time Data
          </h2>
          <p className="text-text-secondary text-sm">
            Overview of your fleet status
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-surface border border-border-default hover:bg-surface-hover text-text-secondary px-4 py-2 rounded-lg text-sm transition-colors">
            <span className="material-symbols-outlined text-base">
              calendar_today
            </span>
            <span>Today</span>
          </button>
          <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm transition-colors shadow-sm">
            <span className="material-symbols-outlined text-base">add</span>
            <span>Add Vehicle</span>
          </button>
        </div>
      </div>

      {/* Cartes de statistiques (Ligne 1 - Inspiré de BlackBox) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Vehicles"
          value="124"
          subValue="Vehicles with Errors: 3"
          icon="local_shipping"
          color="error"
          trend="down"
          trendValue="2%"
        />
        <StatCard
          title="Vehicles on Route"
          value="32"
          subValue="Deviation from Route: 1"
          icon="alt_route"
          color="success"
          trend="up"
          trendValue="12%"
        />
        <StatCard
          title="Available"
          value="85"
          subValue="Ready for dispatch"
          icon="check_circle"
          color="info"
        />
        <StatCard
          title="Out of Service"
          value="7"
          subValue="Maintenance required"
          icon="build"
          color="warning"
        />
      </div>

      {/* Section Graphiques et Listes (Ligne 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicle Condition (Simulé sans librairie graphique pour l'instant) */}
        <div className="lg:col-span-2 bg-surface rounded-xl border border-border-default p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-text-primary">Vehicles Condition</h3>
            <button className="text-primary text-sm font-medium hover:underline">
              View Report
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Mock Circular Progress */}
            <div className="flex flex-col items-center gap-3 p-4 bg-background-secondary rounded-lg border border-border-default">
              <div className="relative size-24 rounded-full border-8 border-success/20 flex items-center justify-center">
                <span className="text-xl font-bold text-text-primary">85%</span>
                <div className="absolute inset-0 rounded-full border-8 border-success border-t-transparent rotate-45"></div>
              </div>
              <div className="text-center">
                <p className="font-bold text-success">Good</p>
                <p className="text-xs text-text-secondary">234 Vehicles</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 p-4 bg-background-secondary rounded-lg border border-border-default">
              <div className="relative size-24 rounded-full border-8 border-warning/20 flex items-center justify-center">
                <span className="text-xl font-bold text-text-primary">85%</span>
                <div className="absolute inset-0 rounded-full border-8 border-warning border-t-transparent -rotate-12"></div>
              </div>
              <div className="text-center">
                <p className="font-bold text-warning">Satisfactory</p>
                <p className="text-xs text-text-secondary">23 Vehicles</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 p-4 bg-background-secondary rounded-lg border border-border-default">
              <div className="relative size-24 rounded-full border-8 border-error/20 flex items-center justify-center">
                <span className="text-xl font-bold text-text-primary">85%</span>
                <div className="absolute inset-0 rounded-full border-8 border-error border-t-transparent rotate-180"></div>
              </div>
              <div className="text-center">
                <p className="font-bold text-error">Critical</p>
                <p className="text-xs text-text-secondary">7 Vehicles</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions / Alerts */}
        <div className="bg-surface rounded-xl border border-border-default p-6 shadow-sm">
          <h3 className="font-bold text-text-primary mb-4">Recent Alerts</h3>
          <div className="space-y-4">
            {[
              {
                title: "Speeding Alert",
                vehicle: "Toyota Yaris (CE 123 AB)",
                time: "10 min ago",
                type: "error",
              },
              {
                title: "Geofence Exit",
                vehicle: "Ford Transit (LT 999 XX)",
                time: "25 min ago",
                type: "warning",
              },
              {
                title: "Engine Check",
                vehicle: "Hilux (OU 456 ZZ)",
                time: "1h ago",
                type: "info",
              },
              {
                title: "Maintenance Due",
                vehicle: "Rav 4 (NO 111 AA)",
                time: "2h ago",
                type: "info",
              },
            ].map((alert, index) => (
              <div
                key={index}
                className="flex gap-3 items-start p-3 hover:bg-background-secondary rounded-lg transition-colors cursor-pointer border border-transparent hover:border-border-default"
              >
                <div
                  className={`min-w-2 size-2 mt-2 rounded-full bg-${alert.type}`}
                ></div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {alert.title}
                  </p>
                  <p className="text-xs text-text-secondary">{alert.vehicle}</p>
                  <p className="text-[10px] text-text-tertiary mt-1">
                    {alert.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm text-primary font-medium hover:bg-primary/5 rounded-lg transition-colors">
            View All Alerts
          </button>
        </div>
      </div>
    </div>
  );
}
