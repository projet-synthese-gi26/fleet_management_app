import { User, Role } from '@/types/auth-api.types';
import { Locale } from '@/lib/i18n/config';

/**
 * Détermine la route racine en fonction du rôle le plus élevé de l'utilisateur
 */
export const getDashboardRoute = (user: User | null, locale: Locale): string => {
    if (!user) return `/${locale}/login`;

    const roles = user.roles || [];

    // 1. Super Admin & Admin vont vers l'espace d'administration globale
    if (roles.includes('FLEET_SUPER_ADMIN') || roles.includes('FLEET_ADMIN')) {
        return `/${locale}/admin`;
    }

    // 2. Le Chauffeur va vers son interface mobile-first
    if (roles.includes('FLEET_DRIVER')) {
        return `/${locale}/driver/dashboard`;
    }

    // 3. Par défaut, le Fleet Manager va vers son dashboard de gestion
    return `/${locale}/dashboard`;
};

/**
 * Vérifie si un utilisateur a la permission d'accéder à un préfixe de route
 */
export const canAccess = (user: User | null, path: string): boolean => {
    if (!user) return false;
    const roles = user.roles;

    if (path.includes('/admin')) {
        return roles.includes('FLEET_SUPER_ADMIN') || roles.includes('FLEET_ADMIN');
    }
    if (path.includes('/driver')) {
        return roles.includes('FLEET_DRIVER');
    }
    if (path.includes('/dashboard')) {
        return roles.includes('FLEET_MANAGER') || roles.includes('FLEET_ADMIN');
    }
    
    return true;
};