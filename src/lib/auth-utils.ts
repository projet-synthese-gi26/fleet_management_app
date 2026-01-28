import { User } from '@/types/auth-api.types';
import { Locale } from '@/lib/i18n/config';

/**
 * Détermine la route de redirection en fonction du rôle de l'utilisateur
 */
export const getDashboardRoute = (user: User | null, locale: Locale): string => {
    if (!user) {
        return `/${locale}/login`;
    }

    const roles = user.roles || [];

    if (roles.includes('ADMIN') || roles.includes('ROLE_FLEET_ADMIN')) {
        return `/${locale}/admin`;
    }

    if (roles.includes('DRIVER') || roles.includes('FLEET_DRIVER')) {
        return `/${locale}/driver/dashboard`;
    }

    // Par défaut : Fleet Manager
    return `/${locale}/dashboard`;
};