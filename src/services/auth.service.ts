import { apiClient } from "@/lib/api-client";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from "@/types/auth-api.types";

export const authService = {
  // 02. Auth - Login
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>(
      "/auth/login",
      credentials,
    );
    return data;
  },

  // 02. Auth - Register (Multipart)
  register: async (payload: RegisterRequest): Promise<LoginResponse> => {
    const formData = new FormData();

    // 1. Préparation de l'objet User en JSON
    const userJson = JSON.stringify({
      username: payload.username,
      password: payload.password,
      email: payload.email,
      phone: payload.phone,
      firstName: payload.firstName,
      lastName: payload.lastName,
      roles: payload.roles,
    });

    // 2. Ajout de la partie 'user' en tant que Blob avec le type application/json
    // C'est la méthode la plus robuste pour Spring Boot (@RequestPart)
    formData.append("user", userJson);

    // 3. Ajout du fichier si présent
    if (payload.file) {
      formData.append("file", payload.file);
    }

    // 4. Envoi de la requête
    const { data } = await apiClient.post<LoginResponse>(
      "/auth/register",
      formData,
      {
        headers: {
          // "Content-Type: multipart/form-data; boundary=----WebKitFormBoundary..."
          "Content-Type": undefined,
        },
        // Nécessaire pour certains environnements Axios pour ne pas transformer le FormData
        transformRequest: (data) => data,
      },
    );
    return data;
  },

  // 03. Account - Get Profile
  getProfile: async (): Promise<User> => {
    const { data } = await apiClient.get<User>("/account");
    return data;
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
  },
};
