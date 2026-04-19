"use client";

import React, { useState } from "react";
import { vehicleService } from "@/services/vehicle.service";
import { toast } from "sonner";
import { Gauge, Fuel, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ManualTelemetryUpdateProps {
  vehicleId: string;
  licensePlate?: string;
}

export function ManualTelemetryUpdate({
  vehicleId,
  licensePlate,
}: ManualTelemetryUpdateProps) {
  const [fuelLevel, setFuelLevel] = useState("50");
  const [odometer, setOdometer] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!odometer) {
      toast.error("Veuillez saisir le kilométrage actuel.");
      return;
    }

    setIsUpdating(true);
    try {
      // Spec 3.B : PATCH /api/v1/vehicles/{id}/operational
      await vehicleService.patchOperationalData(vehicleId, {
        fuelLevel: `${fuelLevel}%`,
        odometerReading: parseFloat(odometer),
      });
      toast.success("Données du véhicule transmises !");
    } catch (error: any) {
      toast.error("Échec de la mise à jour", { description: error.detail });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1c2127] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Gauge size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            État du bord
          </h3>
          <p className="text-[10px] text-slate-500">
            {licensePlate || "Véhicule assigné"}
          </p>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Fuel Selector */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium">
            <span className="flex items-center gap-1 text-slate-500">
              <Fuel size={12} /> Niveau Carburant
            </span>
            <span className="text-primary font-bold">{fuelLevel}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
            value={fuelLevel}
            onChange={(e) => setFuelLevel(e.target.value)}
          />
        </div>

        {/* Odometer Input */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-500">
            Kilométrage (Odomètre)
          </label>
          <div className="relative">
            <input
              type="number"
              placeholder="Ex: 12500"
              className="w-full pl-3 pr-10 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              value={odometer}
              onChange={(e) => setOdometer(e.target.value)}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">
              KM
            </span>
          </div>
        </div>

        <Button
          type="submit"
          isLoading={isUpdating}
          className="w-full h-10 text-sm gap-2"
        >
          <Send size={14} />
          Mettre à jour
        </Button>
      </form>
    </div>
  );
}
