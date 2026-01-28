import { apiClient } from '@/lib/api-client';
import { UpdateProfileDto, UpdatePasswordDto } from '@/types/account.types';
import { User } from '@/types/auth-api.types';

export const accountService = {
    // GET /account (Déjà utilisé dans auth.service, mais utile ici aussi)
    getProfile: async (): Promise<User> => {
        const { data } = await apiClient.get<User>('/account');
        return data;
    },

    // PUT /account
    updateProfile: async (payload: UpdateProfileDto): Promise<User> => {
        const { data } = await apiClient.put<User>('/account', payload);
        return data;
    },

    // PUT /account/password
    updatePassword: async (payload: UpdatePasswordDto): Promise<void> => {
        await apiClient.put('/account/password', payload);
    },

    // POST /account/picture
    updatePicture: async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);

        // L'API doit retourner l'URL de la nouvelle image ou l'objet User mis à jour
        const { data } = await apiClient.post<any>('/account/picture', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data.photoUrl || data; // Adaptation selon le retour exact de l'API
    },

    // DELETE /account
    deleteAccount: async (): Promise<void> => {
        await apiClient.delete('/account');
    }
};