import { apiClient } from "@/lib/api-client";
import { ResourceCatalog, ResourceItem } from "@/types/vehicle.types";

export const referenceService = {
  /**
   * Récupère l'intégralité des ressources (Lecture seule)
   */
  getAllResources: async (): Promise<ResourceCatalog> => {
    const { data } = await apiClient.get<ResourceCatalog>("/vehicles/resources/all");
    return data;
  },

  /**
   * Récupère une liste spécifique
   */
  getLookup: async (resourceName: string): Promise<ResourceItem[]> => {
    const { data } = await apiClient.get<ResourceItem[]>(`/vehicles/lookup/${resourceName}`);
    return data;
  },

  /**
   * CRÉER une ressource (ex: une nouvelle marque ou une couleur)
   * @param category le segment d'URL (ex: 'brands', 'colors', 'vehicle-types')
   */
  createResource: async (category: string, payload: { code: string; label: string; description?: string }): Promise<ResourceItem> => {
    const { data } = await apiClient.post<ResourceItem>(`/admin/resources/${category}`, payload);
    return data;
  },

  /**
   * MODIFIER une ressource existante
   */
  updateResource: async (category: string, id: string, payload: { code: string; label: string; description?: string }): Promise<ResourceItem> => {
    const { data } = await apiClient.put<ResourceItem>(`/admin/resources/${category}/${id}`, payload);
    return data;
  },

  /**
   * SUPPRIMER une ressource
   */
  deleteResource: async (category: string, id: string): Promise<void> => {
    await apiClient.delete(`/admin/resources/${category}/${id}`);
  }
};