import { apiClient } from "@/lib/api-client";
import { LoginRequest, LoginResponse, RegisterRequest } from "@/types/auth-api.types";

export const authService = {
  // Connexion initiale
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>("/auth/login", credentials);
    return data;
  },

  // Inscription (Multipart pour la photo)
  register: async (payload: RegisterRequest): Promise<LoginResponse> => {
    const formData = new FormData();
    const userData = {
      username: payload.username,
      password: payload.password,
      email: payload.email,
      phone: payload.phone,
      firstName: payload.firstName,
      lastName: payload.lastName,
      roles: payload.roles,
    };

    const userBlob = new Blob([JSON.stringify(userData)], { type: "application/json" });
    formData.append("user", userBlob);
    if (payload.file) formData.append("file", payload.file);

    const { data } = await apiClient.post<LoginResponse>("/auth/register", formData);
    return data;
  },

  // NOUVEAU : Rafraîchir le token d'accès en utilisant le refresh token
  refresh: async (refreshToken: string): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>("/auth/refresh", { refreshToken });
    return data;
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  },
};