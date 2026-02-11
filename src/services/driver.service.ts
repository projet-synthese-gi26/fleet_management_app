import { apiClient } from "@/lib/api-client";
import { Driver, DriverRegistrationRequest } from "@/types/driver.types";
import { UUID } from "@/types/base.types";

export const driverService = {
  /**
   * 08. Lister les chauffeurs (Filtré par flotte pour le manager)
   */
  getDrivers: async (fleetId?: UUID, isAssigned?: boolean): Promise<Driver[]> => {
    const { data } = await apiClient.get<Driver[]>("/drivers", {
      params: { fleetId, isAssigned }
    });
    return data;
  },

  /**
   * 10c. Inscrire un nouveau chauffeur directement dans une flotte
   * Format: Multipart (JSON "user" + Fichier "file")
   */
  registerInFleet: async (fleetId: UUID, request: DriverRegistrationRequest, file?: File): Promise<Driver> => {
    const formData = new FormData();
    const userBlob = new Blob([JSON.stringify(request)], { type: "application/json" });
    
    formData.append("user", userBlob);
    if (file) formData.append("file", file);

    const { data } = await apiClient.post<Driver>(`/fleets/${fleetId}/drivers/register`, formData);
    return data;
  },

  /**
   * 10c. Recruter un chauffeur existant via son email/username
   */
  recruitExisting: async (fleetId: UUID, identifier: string): Promise<void> => {
    await apiClient.post(`/fleets/${fleetId}/drivers`, { identifier });
  },

  /**
   * 08. Assigner un véhicule à un chauffeur
   * Déclenche le "Smart Swap" côté backend
   */
  assignVehicle: async (userId: UUID, vehicleId: UUID): Promise<void> => {
    await apiClient.post(`/drivers/${userId}/assign-vehicle`, { vehicleId });
  },

  /**
   * 08. Libérer un chauffeur (Retirer son véhicule actuel)
   */
  unassignVehicle: async (userId: UUID): Promise<void> => {
    await apiClient.post(`/drivers/${userId}/unassign-vehicle`, {});
  },

  /**
   * 10c. Retirer un chauffeur de la flotte (Détachement sans suppression)
   */
  removeFromFleet: async (fleetId: UUID, userId: UUID): Promise<void> => {
    await apiClient.delete(`/fleets/${fleetId}/drivers/${userId}`);
  },

 

};