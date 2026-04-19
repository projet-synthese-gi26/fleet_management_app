import { apiClient } from '@/lib/api-client';
import { FleetManager, UpdateManagerDto } from '@/types/fleet-manager.types';
import { UUID } from '@/types/base.types';

export const adminService = {
    // GET /admin/managers
    getAllManagers: async (): Promise<FleetManager[]> => {
        const { data } = await apiClient.get<FleetManager[]>('/admin/managers');
        return data;
    },

    // GET /admin/managers/{id}
    getManagerById: async (id: UUID): Promise<FleetManager> => {
        const { data } = await apiClient.get<FleetManager>(`/admin/managers/${id}`);
        return data;
    },

    // PUT /admin/managers/{id}
    updateManager: async (id: UUID, payload: UpdateManagerDto): Promise<FleetManager> => {
        const { data } = await apiClient.put<FleetManager>(`/admin/managers/${id}`, payload);
        return data;
    }
};