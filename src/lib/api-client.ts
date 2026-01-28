import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur pour injecter le token
apiClient.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Intercepteur pour gérer les erreurs (ex: 401 Unauthorized)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Optionnel : Redirection auto ou nettoyage si token expiré
            if (typeof window !== 'undefined') {
                // localStorage.removeItem('accessToken');
                // window.location.href = '/login'; 
            }
        }
        return Promise.reject(error);
    }
);