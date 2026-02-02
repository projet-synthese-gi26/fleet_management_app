import { apiClient } from "@/lib/api-client";
import { Trip, TelemetryData, StartTripRequest } from "@/types/trip.types";

export const tripService = {
  // ▶️ 2.1. Démarrer une course
  startTrip: async (payload: StartTripRequest): Promise<Trip> => {
    const { data } = await apiClient.post<Trip>("/trips/start", payload);
    return data;
  },

  // 📡 2.2. Envoyer la Télémétrie
  sendTelemetry: async (
    tripId: string,
    telemetry: TelemetryData,
  ): Promise<void> => {
    await apiClient.post(`/trips/${tripId}/telemetry`, telemetry);
  },

  // 🏁 2.3. Terminer une course
  endTrip: async (tripId: string): Promise<Trip> => {
    const { data } = await apiClient.post<Trip>(`/trips/${tripId}/end`);
    return data;
  },

  // 🔄 2.4. Récupérer la course en cours (Recovery)
  getCurrentTrip: async (): Promise<Trip | null> => {
    try {
      const { data } = await apiClient.get<Trip>("/trips/current");
      return data;
    } catch (e) {
      return null;
    }
  },
};
