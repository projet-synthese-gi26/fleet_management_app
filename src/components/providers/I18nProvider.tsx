'use client';

import React, { createContext, useState, useEffect } from 'react';
import { Locale, defaultLocale, locales } from '@/lib/i18n/config';
import { clientDictionaries, Dictionary } from '@/lib/i18n/utils';

interface I18nContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string, section?: string) => string;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>(defaultLocale);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedLocale = localStorage.getItem('locale') as Locale;
            if (storedLocale && locales.includes(storedLocale)) {
                setLocaleState(storedLocale);
            }
        }
    }, []);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem('locale', newLocale);
    };

    const t = (key: string, section: string = 'common'): string => {
        const dict = clientDictionaries[locale];

        const sectionContent = dict[section as keyof Dictionary];

        if (!dict || !sectionContent) {
            console.warn(`Section "${section}" not found for locale "${locale}"`);
            return `[${section}:${key}]`;
        }

        return sectionContent[key as keyof typeof sectionContent] || `[${section}:${key}]`;
    };

    return (
        <I18nContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </I18nContext.Provider>
    );
}