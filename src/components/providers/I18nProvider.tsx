'use client';

import React, { createContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Locale, getLocaleFromPathname } from '@/lib/i18n/config';
import { clientDictionaries } from '@/lib/i18n/utils';

// More flexible t function signature
type TFunction = {
    (key: string): string;
    (key: string, section: string): string;
    (key: string, options: { [key: string]: string | number }): string;
    (key: string, section: string, options: { [key: string]: string | number }): string;
    (key: string, section: string, fallback: string): string; // For cases like t(dynamicValue, section, fallback)
};

interface I18nContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: TFunction;
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
        }
    }, [pathname, locale]);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
    };

    const t: TFunction = (key: string, ...args: any[]): string => {
        let section = 'common';
        let options: { [key: string]: string | number } | undefined;
        let fallback: string | undefined = undefined;

        // Parse arguments
        if (args.length > 0) {
            if (typeof args[0] === 'string') {
                section = args[0];
                if (args.length > 1) {
                    if (typeof args[1] === 'object' && args[1] !== null) {
                        options = args[1];
                    } else if (typeof args[1] === 'string') {
                        fallback = args[1];
                    }
                }
            } else if (typeof args[0] === 'object' && args[0] !== null) {
                options = args[0];
            }
        }
        
        const dict = clientDictionaries[locale];
        const sectionContent = dict ? dict[section as keyof typeof dict] : undefined;
        const translation = sectionContent ? (sectionContent as Record<string, string>)[key] : undefined;

        if (!translation) {
            const finalFallback = fallback || key;
            // console.warn(`Translation key "${key}" not found in section "${section}" for locale "${locale}". Using fallback "${finalFallback}".`);
            return finalFallback;
        }

        let result = translation;
        if (options) {
            result = Object.entries(options).reduce((acc, [optKey, value]) => {
                const regex = new RegExp(`{${optKey}}`, 'g');
                return acc.replace(regex, String(value));
            }, translation);
        }

        return result;
    };

    return (
        <I18nContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </I18nContext.Provider>
    );
}