export const defaultLocale = 'fr' as const;
export const locales = ['fr', 'en'] as const;

export type Locale = typeof locales[number];

export const localeNames: Record<Locale, string> = {
    fr: 'Français',
    en: 'English',
};

export function getLocaleFromPathname(pathname: string): Locale {
    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0];

    if (firstSegment && locales.includes(firstSegment as Locale)) {
        return firstSegment as Locale;
    }

    return defaultLocale;
}