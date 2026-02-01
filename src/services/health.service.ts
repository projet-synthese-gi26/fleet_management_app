import { apiClient } from "@/lib/api-client";

export interface SystemHealth {
  status: "UP" | "DOWN" | "DEGRADED";
  components: {
    db: { status: string };
    auth: { status: string };
    // ... autres
  };
}

export const healthService = {
  check: async (): Promise<SystemHealth> => {
    const { data } = await apiClient.get<SystemHealth>("/health/diagnostic");
    return data;
  },
};
