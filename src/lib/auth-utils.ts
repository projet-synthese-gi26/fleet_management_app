import { User, Role } from '@/types/auth-api.types';
import { Locale } from '@/lib/i18n/config';

/**
 * Redirection intelligente après connexion
 * Aligné sur la hiérarchie du Backend
 */
export const getDashboardRoute = (user: User | null, locale: Locale): string => {
    if (!user) return `/${locale}/login`;

    const roles = user.roles || [];

    // Priorité 1 : Super Admin (Gestion des Admins)
    if (roles.includes('FLEET_SUPER_ADMIN')) return `/${locale}/admin/super/admins`;

    // Priorité 2 : Admin (Gestion Managers & Ressources)
    if (roles.includes('FLEET_ADMIN')) return `/${locale}/admin/management/managers`;

    // Priorité 3 : Driver (Interface Mobile-First)
    if (roles.includes('FLEET_DRIVER')) return `/${locale}/driver/dashboard`;

    // Par défaut : Fleet Manager (Dashboard Opérationnel)
    return `/${locale}/dashboard`;
};

/**
 * Vérifie si l'utilisateur a le droit d'être sur l'URL actuelle
 */
export const isAuthorized = (user: User | null, path: string): boolean => {
    if (!user) return false;
    const roles = user.roles;

    // Protection des routes Super Admin
    if (path.includes('/admin/super')) return roles.includes('FLEET_SUPER_ADMIN');

    // Protection des routes Admin Global
    if (path.includes('/admin')) return roles.includes('FLEET_ADMIN') || roles.includes('FLEET_SUPER_ADMIN');

    // Protection des routes Chauffeur
    if (path.includes('/driver')) return roles.includes('FLEET_DRIVER');

    // Protection du Dashboard Manager
    if (path.includes('/dashboard')) return roles.includes('FLEET_MANAGER');

    return true;
};