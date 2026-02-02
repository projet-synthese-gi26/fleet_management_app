import { apiClient } from "@/lib/api-client";
import { Driver, RegisterDriverDto, RecruitDriverDto } from "@/types/driver.types";
import { UUID } from "@/types/base.types";

export const driverService = {
  // 📋 3.3. Lister les chauffeurs (Filtré par flotte)
  getDriversByFleet: async (fleetId: UUID): Promise<Driver[]> => {
    const { data } = await apiClient.get<Driver[]>(`/drivers`, {
      params: { fleetId }
    });
    return data;
  },

  // 🔍 3.4. Détails
  getDriverById: async (userId: UUID): Promise<Driver> => {
    const { data } = await apiClient.get<Driver>(`/drivers/${userId}`);
    return data;
  },

  // 📝 2.1. Inscrire un nouveau (User + Driver)
  registerInFleet: async (fleetId: UUID, payload: RegisterDriverDto): Promise<Driver> => {
    const { data } = await apiClient.post<Driver>(`/fleets/${fleetId}/drivers/register`, payload);
    return data;
  },

  // 🤝 2.2. Recruter un existant
  recruitExisting: async (fleetId: UUID, payload: RecruitDriverDto): Promise<void> => {
    await apiClient.post(`/fleets/${fleetId}/drivers/recruit`, payload);
  },

  // 🚫 3.5. Retirer de la flotte
  removeFromFleet: async (fleetId: UUID, userId: UUID): Promise<void> => {
    await apiClient.delete(`/fleets/${fleetId}/drivers/${userId}`);
  },

  // 🔑 4.1. Assigner un véhicule
  assignVehicle: async (userId: UUID, vehicleId: UUID): Promise<void> => {
    await apiClient.post(`/drivers/${userId}/assign-vehicle`, { vehicleId });
  },

  // 🔓 4.2. Libérer le chauffeur
  unassignVehicle: async (userId: UUID): Promise<void> => {
    await apiClient.post(`/drivers/${userId}/unassign-vehicle`, {});
  }
};