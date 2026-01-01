"use client";

import React, { useState } from "react";
import { MOCK_VEHICLES } from "@/data/mockVehicles";

interface MapSidebarProps {
  onVehicleSelect: (vehicle: any) => void;
  selectedVehicleId: string | null;
}

export function MapSidebar({
  onVehicleSelect,
  selectedVehicleId,
}: MapSidebarProps) {
  const [filter, setFilter] = useState<"all" | "moving" | "stopped">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVehicles = MOCK_VEHICLES.filter((v) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "moving" && v.status === "moving") ||
      (filter === "stopped" && (v.status === "stopped" || v.status === "idle"));

    const matchesSearch =
      v.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.driverName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="absolute top-4 left-4 z-[400] w-[90%] max-w-sm flex flex-col gap-3 max-h-[calc(100vh-200px)] sm:max-h-[calc(100vh-120px)] pointer-events-none">
      {/* Search Box */}
      <div className="bg-surface rounded-xl shadow-lg border border-border-default p-3 pointer-events-auto">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">
            search
          </span>
          <input
            type="text"
            placeholder="Search driver or plate..."
            className="w-full pl-10 pr-4 py-2 bg-background-secondary rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 text-text-primary placeholder:text-text-tertiary border border-transparent focus:border-primary/50 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 mt-3">
          {["all", "moving", "stopped"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === f
                  ? "bg-primary text-white shadow-sm"
                  : "bg-background-secondary text-text-secondary hover:bg-background-tertiary"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* List Container */}
      <div className="bg-surface rounded-xl shadow-lg border border-border-default overflow-hidden flex-1 pointer-events-auto flex flex-col">
        <div className="p-3 bg-background-secondary border-b border-border-default flex justify-between items-center">
          <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">
            Vehicles List
          </span>
          <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
            {filteredVehicles.length}
          </span>
        </div>

        <div className="overflow-y-auto p-2 space-y-2">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              onClick={() => onVehicleSelect(vehicle)}
              className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                selectedVehicleId === vehicle.id
                  ? "bg-primary/5 border-primary shadow-sm"
                  : "bg-surface border-border-default hover:border-primary/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`relative size-10 rounded-full flex items-center justify-center ${
                    vehicle.status === "moving"
                      ? "bg-success/10 text-success"
                      : "bg-text-tertiary/10 text-text-tertiary"
                  }`}
                >
                  <span className="material-symbols-outlined">
                    {vehicle.type === "CAR"
                      ? "directions_car"
                      : vehicle.type === "TRUCK"
                      ? "local_shipping"
                      : "two_wheeler"}
                  </span>
                  <div
                    className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-white ${
                      vehicle.status === "moving" ? "bg-success" : "bg-error"
                    }`}
                  ></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-text-primary truncate">
                      {vehicle.driverName}
                    </h4>
                    <span className="text-[10px] font-medium text-text-tertiary">
                      {vehicle.licensePlate}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-text-secondary flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        speed
                      </span>
                      {vehicle.speed} km/h
                    </p>
                    {vehicle.status === "moving" && (
                      <span className="text-[10px] text-success animate-pulse font-medium">
                        Moving
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredVehicles.length === 0 && (
            <div className="p-8 text-center text-text-tertiary text-sm">
              No vehicles found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
