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

    const userData = {
      username: payload.username,
      password: payload.password,
      email: payload.email,
      phone: payload.phone,
      firstName: payload.firstName,
      lastName: payload.lastName,
      roles: payload.roles,
    };

    // Correct pour Spring Boot @RequestPart
    const userBlob = new Blob([JSON.stringify(userData)], {
      type: "application/json",
    });

    formData.append("user", userBlob);

    if (payload.file) {
      formData.append("file", payload.file);
    }

    const { data } = await apiClient.post<LoginResponse>(
      "/auth/register",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
