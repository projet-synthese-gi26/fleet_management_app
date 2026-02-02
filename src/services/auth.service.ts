import { apiClient } from "@/lib/api-client";
import { LoginRequest, LoginResponse, RegisterRequest, User } from "@/types/auth-api.types";

export const authService = {
  // 🟢 2.1. Login
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>("/auth/login", credentials);
    return data;
  },

  // 🟢 2.2. Register (Multipart/form-data conforme à la spec)
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

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  },
};