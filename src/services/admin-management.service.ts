import { apiClient } from "@/lib/api-client";
import { FleetManager } from "@/types/fleet-manager.types";

/**
 * Service pour les administrateurs (FLEET_ADMIN) 
 * pour gérer les comptes des gestionnaires d'entreprises.
 */
export const adminManagementService = {
  /**
   * Récupère la liste de tous les Fleet Managers inscrits
   */
  listManagers: async (): Promise<FleetManager[]> => {
    const { data } = await apiClient.get<FleetManager[]>("/admin/management/managers");
    return data;
  },

  /**
   * Récupère les détails complets d'un manager spécifique
   */
  getManagerDetails: async (id: string): Promise<FleetManager> => {
    const { data } = await apiClient.get<FleetManager>(`/admin/management/managers/${id}`);
    return data;
  },

  /**
   * Alterne l'état du compte (Active <=> Désactive)
   * Déclenche la mise à jour de 'is_active' dans fleet.users côté backend
   */
  toggleManagerStatus: async (id: string): Promise<void> => {
    await apiClient.patch(`/admin/management/managers/${id}/toggle`);
  }
};