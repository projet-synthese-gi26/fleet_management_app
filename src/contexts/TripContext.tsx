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

  // 🔄 Recovery Logic : Au chargement, on check si un trajet existe
  useEffect(() => {
    const initTrip = async () => {
      const activeTrip = await tripService.getCurrentTrip();
      if (activeTrip) {
        setCurrentTrip(activeTrip);
        startTelemetryLoop(activeTrip.id);
      }
      setIsLoading(false);
    };
    initTrip();
    return () => stopTelemetryLoop();
  }, []);

  const startTelemetryLoop = (tripId: string) => {
    stopTelemetryLoop();
    telemetryInterval.current = setInterval(() => {
      // Simulation GPS (En production, utiliser navigator.geolocation)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          tripService.sendTelemetry(tripId, {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            speed: pos.coords.speed || 0
          }).catch(console.error);
        });
      }
    }, 10000); // Toutes les 10 secondes selon spec
  };

  const stopTelemetryLoop = () => {
    if (telemetryInterval.current) clearInterval(telemetryInterval.current);
  };

  const startTrip = async (vehicleId?: string) => {
    try {
      const trip = await tripService.startTrip({ vehicleId });
      setCurrentTrip(trip);
      startTelemetryLoop(trip.id);
      toast.success("Trajet démarré !");
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Impossible de démarrer le trajet");
    }
  };

  const endTrip = async () => {
    if (!currentTrip) return;
    try {
      const finalTrip = await tripService.endTrip(currentTrip.id);
      stopTelemetryLoop();
      setCurrentTrip(null);
      toast.success(`Trajet terminé : ${finalTrip.distanceKm} km parcourus.`);
    } catch (err) {
      toast.error("Erreur lors de la clôture du trajet");
    }
  };

  return (
    <TripContext.Provider value={{ 
      currentTrip, 
      isTripActive: !!currentTrip, 
      startTrip, 
      endTrip, 
      isLoading 
    }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) throw new Error('useTrip must be used within a TripProvider');
  return context;
};