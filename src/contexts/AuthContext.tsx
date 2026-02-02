"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginRequest, RegisterRequest } from '@/types/auth-api.types';
import { authService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/hooks/useI18n';
import { accountService } from '@/services/account.service';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    refreshUser: () => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { locale } = useI18n();

    // Vérifier le token au chargement de l'app
    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    const userData = await accountService.getProfile();
                    setUser(userData);
                } catch (error) {
                    console.error("Session expired or invalid", error);
                    authService.logout();
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
            setUser(response.user);
            
            // Redirection intelligente selon le rôle
            if (response.user.roles.includes('ADMIN') || response.user.roles.includes('ROLE_FLEET_ADMIN')) {
                router.push(`/${locale}/admin`);
            } else if (response.user.roles.includes('DRIVER') || response.user.roles.includes('FLEET_DRIVER')) {
                router.push(`/${locale}/driver/dashboard`);
            } else {
                // Par défaut manager
                router.push(`/${locale}/dashboard`);
            }
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
            setUser(response.user);
            
            // Redirection intelligente identique au login
            const roles = response.user.roles || [];
            if (roles.includes('ADMIN') || roles.includes('ROLE_FLEET_ADMIN')) {
                router.push(`/${locale}/admin`);
            } else if (roles.includes('DRIVER') || roles.includes('FLEET_DRIVER')) {
                router.push(`/${locale}/driver/dashboard`);
            } else {
                router.push(`/${locale}/dashboard`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const refreshUser = async () => {
        try {
            const userData = await accountService.getProfile();
            setUser(userData);
        } catch (error) {
            console.error("Failed to refresh user profile", error);
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        router.push(`/${locale}/login`);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, refreshUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};