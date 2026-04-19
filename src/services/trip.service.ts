import { apiClient } from "@/lib/api-client";
import { Trip, StartTripRequest, TelemetryRequest } from "@/types/trip.types";
import { UUID } from "@/types/base.types";

export const tripService = {
  /**
   * 11a. Démarrer une course (Driver)
   * POST /api/v1/trips/start
   */
  startTrip: async (payload: StartTripRequest): Promise<Trip> => {
    const { data } = await apiClient.post<Trip>("/trips/start", payload);
    return data;
  },

  /**
   * 11a. Envoyer la position GPS (Télémétrie)
   * POST /api/v1/trips/{id}/telemetry
   */
  sendTelemetry: async (tripId: UUID, telemetry: TelemetryRequest): Promise<void> => {
    await apiClient.post(`/trips/${tripId}/telemetry`, telemetry);
  },

  /**
   * 11a. Terminer la course (Driver)
   * POST /api/v1/trips/{id}/end
   */
  endTrip: async (tripId: UUID): Promise<Trip> => {
    const { data } = await apiClient.post<Trip>(`/trips/${tripId}/end`);
    return data;
  },

  /**
   * 11a. Récupérer la course active (Recovery)
   * GET /api/v1/trips/my-active
   */
  getMyActiveTrip: async (): Promise<Trip | null> => {
    try {
      const { data } = await apiClient.get<Trip>("/trips/my-active");
      return data;
    } catch {
      return null;
    }
  },

  /**
   * 11b. Lister les trajets (Manager)
   * GET /api/v1/trips?fleetId=...
   */
  getManagerTrips: async (fleetId?: string): Promise<Trip[]> => {
    const { data } = await apiClient.get<Trip[]>("/trips", {
      params: { fleetId }
    });
    return data;
  },

  /**
   * 11b. Détails d'un trajet
   * GET /api/v1/trips/{id}
   */
  getTripById: async (tripId: UUID): Promise<Trip> => {
    const { data } = await apiClient.get<Trip>(`/trips/${tripId}`);
    return data;
  }
};