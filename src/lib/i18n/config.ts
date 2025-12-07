export const defaultLocale = 'fr' as const;
export const locales = ['fr', 'en'] as const;

export type Locale = typeof locales[number];

export const localeNames: Record<Locale, string> = {
    fr: 'Français',
    en: 'English',
};

export function getLocaleFromPathname(pathname: string): Locale {
    const locale = pathname.split('/')[1];
    return locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
}