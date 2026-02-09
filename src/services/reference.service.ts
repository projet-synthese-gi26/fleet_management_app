import { apiClient } from "@/lib/api-client";
import { ResourceCatalog, ResourceItem } from "@/types/vehicle.types";

export const referenceService = {
  /**
   * Récupère l'intégralité des ressources du parc en un seul appel.
   * Très utile pour initialiser les formulaires de création de véhicule.
   */
  getAllResources: async (): Promise<ResourceCatalog> => {
    const { data } = await apiClient.get<ResourceCatalog>("/vehicles/resources/all");
    return data;
  },

  /**
   * Récupère une liste spécifique si besoin (ex: juste les couleurs)
   */
  getLookup: async (resourceName: string): Promise<ResourceItem[]> => {
    const { data } = await apiClient.get<ResourceItem[]>(`/vehicles/lookup/${resourceName}`);
    return data;
  }
};