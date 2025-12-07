export const lightTheme = {
    colors: {
        // Couleurs principales
        primary: '#2563eb',
        primaryHover: '#1d4ed8',
        primaryLight: '#dbeafe',
        secondary: '#64748b',
        secondaryHover: '#475569',

        // Backgrounds
        background: '#ffffff',
        backgroundSecondary: '#f8fafc',
        backgroundTertiary: '#f1f5f9',

        // Surfaces
        surface: '#ffffff',
        surfaceHover: '#f8fafc',

        // Textes
        textPrimary: '#0f172a',
        textSecondary: '#475569',
        textTertiary: '#94a3b8',
        textDisabled: '#cbd5e1',

        // Bordures
        border: '#e2e8f0',
        borderHover: '#cbd5e1',

        // Status
        success: '#10b981',
        successLight: '#d1fae5',
        warning: '#f59e0b',
        warningLight: '#fef3c7',
        error: '#ef4444',
        errorLight: '#fee2e2',
        info: '#3b82f6',
        infoLight: '#dbeafe',

        // Overlay
        overlay: 'rgba(0, 0, 0, 0.5)',
        overlayLight: 'rgba(0, 0, 0, 0.3)',
    },
    shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
    },
    borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        full: '9999px',
    },
    fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
    },
    fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
    },
    transitions: {
        fast: '150ms ease-in-out',
        normal: '250ms ease-in-out',
        slow: '350ms ease-in-out',
    },
};

export const darkTheme = {
    colors: {
        // Couleurs principales
        primary: '#3b82f6',
        primaryHover: '#2563eb',
        primaryLight: '#1e3a8a',
        secondary: '#94a3b8',
        secondaryHover: '#cbd5e1',

        // Backgrounds
        background: '#0f172a',
        backgroundSecondary: '#1e293b',
        backgroundTertiary: '#334155',

        // Surfaces
        surface: '#1e293b',
        surfaceHover: '#334155',

        // Textes
        textPrimary: '#f1f5f9',
        textSecondary: '#cbd5e1',
        textTertiary: '#94a3b8',
        textDisabled: '#64748b',

        // Bordures
        border: '#334155',
        borderHover: '#475569',

        // Status
        success: '#10b981',
        successLight: '#064e3b',
        warning: '#f59e0b',
        warningLight: '#78350f',
        error: '#ef4444',
        errorLight: '#7f1d1d',
        info: '#3b82f6',
        infoLight: '#1e3a8a',

        // Overlay
        overlay: 'rgba(0, 0, 0, 0.7)',
        overlayLight: 'rgba(0, 0, 0, 0.5)',
    },
    shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.5)',
    },
    spacing: lightTheme.spacing,
    borderRadius: lightTheme.borderRadius,
    fontSize: lightTheme.fontSize,
    fontWeight: lightTheme.fontWeight,
    transitions: lightTheme.transitions,
};

export type Theme = typeof lightTheme;
export type ThemeMode = 'light' | 'dark';