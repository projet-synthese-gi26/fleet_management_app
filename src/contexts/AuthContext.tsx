"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginRequest, RegisterRequest } from '@/types/auth-api.types';
import { authService } from '@/services/auth.service';
import { accountService } from '@/services/account.service';
import { useRouter, usePathname } from 'next/navigation';
import { useI18n } from '@/hooks/useI18n';
import { getDashboardRoute } from '@/lib/auth-utils';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const { locale } = useI18n();
    const refreshUser = async () => {
    try {
        const updatedProfile = await accountService.getProfile();
        setUser(updatedProfile);
    } catch (error) {
        console.error("Impossible de rafraîchir le profil");
    }
};


    // Initialisation : Vérifie si une session existe au chargement de la page
    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    // L'appel à /account déclenche la synchro mÃ©tier côté backend
                    const userData = await accountService.getProfile();
                    setUser(userData);
                } catch (error) {
                    console.error("Session invalide ou expirée");
                    logout();
                }
            }
            setIsLoading(false);
        };
        initAuth();
    }, []);

    const login = async (credentials: LoginRequest) => {
        setIsLoading(true);
        try {
            const response = await authService.login(credentials);
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            
            // On récupère le profil complet immédiatement pour avoir les infos métier
            const fullProfile = await accountService.getProfile();
            setUser(fullProfile);
            
            // Redirection intelligente basée sur le rôle
            router.push(getDashboardRoute(fullProfile, locale));
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (data: RegisterRequest) => {
        setIsLoading(true);
        try {
            const response = await authService.register(data);
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            
            const fullProfile = await accountService.getProfile();
            setUser(fullProfile);
            
            router.push(getDashboardRoute(fullProfile, locale));
        } catch (error) {
            throw error; // Laissé à la gestion du composant SignUp pour les toasts
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        // On évite la redirection infinie si on est déjà sur login
        if (!pathname.includes('/login')) {
            router.push(`/${locale}/login`);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error('useAuth doit être utilisé dans un AuthProvider');
    return context;
};