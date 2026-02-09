import { apiClient } from "@/lib/api-client";
import { ManagerKpis } from "@/types/fleet.types";

export const fleetManagerService = {
  /**
   * Récupère les compteurs globaux pour l'écran d'accueil
   */
  getDashboardKpis: async (): Promise<ManagerKpis> => {
    const { data } = await apiClient.get<ManagerKpis>("/fleet-managers/kpis");
    return data;
  },

  /**
   * Met à jour le nom de l'entreprise
   */
  updateCompanyName: async (name: string): Promise<void> => {
    await apiClient.put("/fleet-managers/me/company", { companyName: name });
  }
};