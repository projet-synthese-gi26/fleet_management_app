'use client';

import React, { createContext, useState, useEffect } from 'react';
import { Locale, defaultLocale, locales } from '@/lib/i18n/config';

import enDictionary from '../../../public/locales/en.json';
import frDictionary from '../../../public/locales/fr.json';

const dictionaries = {
    en: enDictionary,
    fr: frDictionary,
};

interface I18nContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string, section?: string) => string;
}

// Exporter le contexte pour qu'il soit accessible par le hook
export const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>(defaultLocale);

    // Initialiser depuis localStorage
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
        const dict = dictionaries[locale];
        if (!dict || !dict[section]) {
            console.warn(`Section "${section}" not found for locale "${locale}"`);
            return `[${section}:${key}]`;
        }
        return dict[section][key] || `[${section}:${key}]`;
    };

    return (
        <I18nContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </I18nContext.Provider>
    );
}