import { apiClient } from "@/lib/api-client";
import { Trip, StartTripRequest, TelemetryRequest } from "@/types/trip.types";
import { UUID } from "@/types/base.types";

export const tripService = {
  /**
   * 11a. Démarrer une course (Driver)
   */
  startTrip: async (payload: StartTripRequest): Promise<Trip> => {
  const { data } = await apiClient.post<Trip>("/trips/start", payload);
  return data;
 },

  /**
   * 11a. Envoyer la position GPS (Télémétrie)
   */
  sendTelemetry: async (tripId: UUID, telemetry: TelemetryRequest): Promise<void> => {
    await apiClient.post(`/trips/${tripId}/telemetry`, telemetry);
  },

  /**
   * 11a. Terminer la course (Driver)
   */
  endTrip: async (tripId: UUID): Promise<Trip> => {
    const { data } = await apiClient.post<Trip>(`/trips/${tripId}/end`);
    return data;
  },

  /**
   * 11a. Récupérer la course active (Recovery)
   */
  getMyActiveTrip: async (): Promise<Trip | null> => {
    try {
      const { data } = await apiClient.get<Trip>("/trips/my-active");
      return data;
    } catch {
      return null;
    }
  }
};