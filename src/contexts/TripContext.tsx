"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Trip } from '@/types/trip.types';
import { tripService } from '@/services/trip.service';
import { toast } from 'sonner';

interface TripContextType {
  currentTrip: Trip | null;
  isTripActive: boolean;
  startTrip: (vehicleId?: string) => Promise<void>;
  endTrip: () => Promise<void>;
  isLoading: boolean;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const telemetryInterval = useRef<NodeJS.Timeout | null>(null);

  // 🔄 RECOVERY : Au chargement, on vérifie si une course est déjà en cours sur le serveur
  useEffect(() => {
    const initTrip = async () => {
      try {
        const activeTrip = await tripService.getMyActiveTrip();
        if (activeTrip) {
          setCurrentTrip(activeTrip);
          startTelemetryLoop(activeTrip.id);
        }
      } catch (e) {
        console.error("Erreur recovery trip");
      } finally {
        setIsLoading(false);
      }
    };
    initTrip();
    return () => stopTelemetryLoop();
  }, []);

  const startTelemetryLoop = (tripId: string) => {
    stopTelemetryLoop();
    telemetryInterval.current = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            tripService.sendTelemetry(tripId, {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
              speed: pos.coords.speed || 0
            }).catch(err => console.error("Erreur télémétrie:", err));
          },
          (err) => console.warn("GPS non disponible"),
          { enableHighAccuracy: true }
        );
      }
    }, 10000); // 10 secondes
  };

  const stopTelemetryLoop = () => {
    if (telemetryInterval.current) {
      clearInterval(telemetryInterval.current);
      telemetryInterval.current = null;
    }
  };

  const startTrip = async (vehicleId?: string) => {
    try {
      const trip = await tripService.startTrip({ vehicleId });
      setCurrentTrip(trip);
      startTelemetryLoop(trip.id);
      toast.success("Course démarrée ! GPS actif.");
    } catch (err: any) {
      toast.error("Impossible de démarrer", { description: err.detail });
    }
  };

  const endTrip = async () => {
    if (!currentTrip) return;
    try {
      const finalTrip = await tripService.endTrip(currentTrip.id);
      stopTelemetryLoop();
      setCurrentTrip(null);
      toast.success(`Course terminée. Distance : ${finalTrip.distanceKm?.toFixed(1)} km.`);
    } catch (err: any) {
      toast.error("Erreur lors de la clôture", { description: err.detail });
    }
  };

  return (
    <TripContext.Provider value={{ currentTrip, isTripActive: !!currentTrip, startTrip, endTrip, isLoading }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) throw new Error('useTrip doit être utilisé dans un TripProvider');
  return context;
};