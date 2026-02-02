import { apiClient } from "@/lib/api-client";
import { UpdateProfileDto, UpdatePasswordDto } from "@/types/account.types";
import { User } from "@/types/auth-api.types";

export const accountService = {
  // 🔒 3.1. Me
  getProfile: async (): Promise<User> => {
    const { data } = await apiClient.get<User>("/account");
    return data;
  },

  // 🔒 3.2. Update Identity
  updateProfile: async (payload: UpdateProfileDto): Promise<User> => {
    const { data } = await apiClient.put<User>("/account", payload);
    return data;
  },

  // 🔒 3.3. Update Password
  updatePassword: async (payload: UpdatePasswordDto): Promise<void> => {
    // La spec dit 204 No Content
    await apiClient.put("/account/password", payload);
  },

  // 🔒 3.4. Change Picture
  updatePicture: async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);
    await apiClient.post("/account/picture", formData);
  },

  // 🔒 3.5. Delete Account
  deleteAccount: async (): Promise<void> => {
    await apiClient.delete("/account");
  },
};
