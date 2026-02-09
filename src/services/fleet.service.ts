import { apiClient } from "@/lib/api-client";
import { Fleet, FleetRequest, FleetStats } from "@/types/fleet.types";

export const fleetService = {
  /**
   * Liste toutes les flottes du manager connecté
   */
  listMyFleets: async (): Promise<Fleet[]> => {
    const { data } = await apiClient.get<Fleet[]>("/fleets");
    return data;
  },

  /**
   * Crée une nouvelle flotte
   */
  createFleet: async (payload: FleetRequest): Promise<Fleet> => {
    const { data } = await apiClient.post<Fleet>("/fleets", payload);
    return data;
  },

  /**
   * Récupère les détails et KPIs d'une flotte
   */
  getFleetStats: async (fleetId: string): Promise<FleetStats> => {
    const { data } = await apiClient.get<FleetStats>(`/fleets/${fleetId}/stats`);
    return data;
  },

  /**
   * Met à jour les informations d'une flotte
   */
  updateFleet: async (id: string, payload: FleetRequest): Promise<Fleet> => {
    const { data } = await apiClient.put<Fleet>(`/fleets/${id}`, payload);
    return data;
  },

  /**
   * Supprime une flotte (uniquement si elle est vide)
   */
  deleteFleet: async (id: string): Promise<void> => {
    await apiClient.delete(`/fleets/${id}`);
  }
};