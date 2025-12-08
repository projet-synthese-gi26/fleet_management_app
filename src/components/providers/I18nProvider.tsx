'use client';

import React, { createContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Locale, defaultLocale, locales, getLocaleFromPathname } from '@/lib/i18n/config';
import { clientDictionaries, Dictionary } from '@/lib/i18n/utils';

interface I18nContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string, section?: string) => string;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const localeFromPath = getLocaleFromPathname(pathname);
    const [locale, setLocaleState] = useState<Locale>(localeFromPath);
    useEffect(() => {
        const newLocale = getLocaleFromPathname(pathname);
        if (newLocale !== locale) {
            setLocaleState(newLocale);
            if (typeof window !== 'undefined') {
                localStorage.setItem('locale', newLocale);
            }
        }
    }, [pathname]);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        if (typeof window !== 'undefined') {
            localStorage.setItem('locale', newLocale);
        }
    };

    const t = (key: string, section: string = 'common'): string => {
        const dict = clientDictionaries[locale];

        const sectionContent = dict[section as keyof Dictionary];

        if (!dict || !sectionContent) {
            console.warn(`Section "${section}" not found for locale "${locale}"`);
            return `[${section}:${key}]`;
        }

        const translation = sectionContent[key as keyof typeof sectionContent];

        if (!translation) {
            console.warn(`Translation key "${key}" not found in section "${section}" for locale "${locale}"`);
            return `[${section}:${key}]`;
        }

        return translation as string;
    };

    return (
        <I18nContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </I18nContext.Provider>
    );
}