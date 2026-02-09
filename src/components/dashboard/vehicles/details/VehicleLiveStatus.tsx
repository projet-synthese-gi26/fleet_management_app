"use client";

import React, { useState, useEffect, useCallback } from "react";
import { vehicleService } from "@/services/vehicle.service";
import { OperationalParameters } from "@/types/vehicle.types";
import { MapPin, Navigation, RefreshCw, Clock } from "lucide-react";
import dynamic from "next/dynamic";

// Import dynamique pour éviter l'erreur "window is not defined" de Leaflet
const MiniMap = dynamic(() => import("./VehicleMiniMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-100 animate-pulse flex items-center justify-center text-xs">
      Chargement carte...
    </div>
  ),
});

export default function VehicleLiveStatus({
  vehicleId,
}: {
  vehicleId: string;
}) {
  const [data, setData] = useState<OperationalParameters | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const telemetry = await vehicleService.getOperationalData(vehicleId);
      setData(telemetry);
    } catch (e) {
      console.error("Erreur télémétrie", e);
    } finally {
      setIsLoading(false);
    }
  }, [vehicleId]);

  useEffect(() => {
    fetchData();
    let interval: NodeJS.Timeout;
    if (isAutoRefresh) {
      interval = setInterval(fetchData, 15000);
    }
    return () => clearInterval(interval);
  }, [isAutoRefresh, fetchData]);

  if (!data && isLoading)
    return (
      <div className="h-64 bg-slate-50 rounded-2xl border border-dashed border-border-default animate-pulse" />
    );

  // Calculs sécurisés pour éviter les erreurs undefined
  const lat = data?.latitude;
  const lng = data?.longitude;
  const speed = data?.currentSpeed ?? 0;
  const fuel = data?.fuelLevel ?? "0%";

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Barre d'état */}
      <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div
            className={`size-2.5 rounded-full ${isAutoRefresh ? "bg-success animate-pulse" : "bg-slate-300"}`}
          />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            {isAutoRefresh ? "Live Tracking" : "Paused"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAutoRefresh(!isAutoRefresh)}
            className="text-[9px] font-bold px-2 py-1 rounded bg-slate-50 text-slate-600 hover:bg-slate-100"
          >
            {isAutoRefresh ? "PAUSE" : "RESUME"}
          </button>
          <button
            onClick={fetchData}
            className="text-slate-400 hover:text-primary"
          >
            <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gauges */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-4">
              Vitesse
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-slate-800">
                {speed}
              </span>
              <span className="text-xs font-bold text-slate-400">km/h</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-end mb-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                Carburant
              </p>
              <span className="text-sm font-black text-slate-700">{fuel}</span>
            </div>
            <div className="flex gap-1 h-2">
              {[...Array(10)].map((_, i) => {
                const levelNum = parseInt(fuel);
                const isActive = (i + 1) * 10 <= levelNum;
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-full ${isActive ? "bg-primary" : "bg-slate-100"}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Carte */}
        <div className="lg:col-span-2 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm overflow-hidden min-h-[320px] relative">
          {lat !== undefined && lng !== undefined ? (
            <>
              <MiniMap lat={lat} lng={lng} />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-white shadow-xl z-[1000] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">
                      Coordonnées GPS
                    </p>
                    <p className="text-xs font-mono font-bold text-slate-700">
                      {lat.toFixed(5)}, {lng.toFixed(5)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase">
                    <Clock size={10} />
                    {data?.lastUpdate
                      ? new Date(data.lastUpdate).toLocaleTimeString()
                      : "N/A"}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
              <Navigation size={40} className="mb-2 opacity-20" />
              <p className="text-xs font-bold uppercase tracking-widest">
                En attente de signal GPS...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
