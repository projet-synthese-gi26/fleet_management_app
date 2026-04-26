import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { authService } from "@/services/auth.service";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.trim() || "https://traefikdev.yowyob.com/fleet-management/api/v1";

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Variables pour gérer le rafraîchissement multiple
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Si l'erreur est 401 et qu'on n'a pas déjà essayé de rafraîchir
    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes("/auth/login")) {
      
      if (isRefreshing) {
        // Si un rafraîchissement est déjà en cours, on met la requête en attente
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        // Tentative de rafraîchissement
        const response = await authService.refresh(refreshToken);
        const { accessToken, refreshToken: newRefreshToken } = response;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        processQueue(null, accessToken);
        isRefreshing = false;

        // On relance la requête initiale avec le nouveau token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // Formatage de l'erreur pour le reste de l'app (comme fait en Tâche 1)
    const formattedError = {
      status: error.response?.status || 500,
      detail: error.response?.data?.detail || "Erreur de communication avec le serveur.",
      code: error.response?.data?.code || "SERVER_ERROR",
    };

    return Promise.reject(formattedError);
  }
);