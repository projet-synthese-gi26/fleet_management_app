import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { ProblemDetail } from "@/types/api-error.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    // Gestion automatique du Content-Type pour FormData
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor (Le cœur de la gestion d'erreur)
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ProblemDetail>) => {
    const status = error.response?.status;
    const problem = error.response?.data;

    // Cas 1: Pas de réponse du tout (Réseau / Serveur down)
    if (!status) {
      toast.error("Erreur de connexion", {
        description:
          "Impossible de joindre le serveur. Vérifiez votre connexion.",
      });
      return Promise.reject(error);
    }

    // Cas 2: 401 Unauthorized (Session expirée ou invalide)
    // On ne redirige PAS si on est déjà sur la page de login pour éviter une boucle
    if (status === 401 && !window.location.pathname.includes("/login")) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        toast.warning("Session expirée", {
          description: "Veuillez vous reconnecter.",
        });
        // Redirection forcée (plus sûr que router.push hors composant React)
        setTimeout(() => (window.location.href = "/fr/login"), 1000);
      }
    }

    // Cas 3: 403 Forbidden
    if (status === 403) {
      toast.error("Permission refusée", {
        description:
          "Vous n'avez pas les droits nécessaires pour effectuer cette action.",
      });
    }

    // Cas 4: 500+ Server Errors
    if (status >= 500) {
      toast.error("Erreur Serveur", {
        description:
          "Une erreur technique est survenue. Veuillez contacter le support.",
      });
    }

    // On rejette l'erreur enrichie pour que le composant puisse gérer les 400/409 spécifiques
    return Promise.reject({
      status: status,
      title: problem?.title || "Erreur",
      detail: problem?.detail || "Une erreur est survenue",
      instance: problem?.instance,
      originalError: error,
    });
  },
);
