'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, defaultLocale, locales } from '../../lib/i18n/config';

import frDictionary from '../../../public/locales/fr.json';
import enDictionary from '../../../public/locales/en.json';

type Dictionary = Record<string, any>;

interface I18nContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string, section?: string) => string;
    dictionary: Dictionary;
}

const dictionaries: Record<Locale, Dictionary> = {
    fr: frDictionary,
    en: enDictionary,
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const getInitialLocale = (): Locale => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedLocale = localStorage.getItem('locale');
            if (storedLocale && locales.includes(storedLocale as Locale)) {
                return storedLocale as Locale;
            }
        }
        return defaultLocale;
    };

    const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem('locale', newLocale);
    };

    const t = (key: string, section: string = 'common'): string => {
        const dict = dictionaries[locale];
        if (!dict[section]) {
            console.warn(`Section "${section}" not found for locale "${locale}"`);
            return `[${section}:${key}]`;
        }
        return dict[section][key] || `[${section}:${key}]`;
    };

    return (
        <I18nContext.Provider value={{
            locale,
            setLocale,
            t,
            dictionary: dictionaries[locale]
        }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const context = useContext(I18nContext);
    if (context === undefined) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
}